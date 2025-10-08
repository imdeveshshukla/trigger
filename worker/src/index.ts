
import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client";
import sendEmail from "./services/sendEmail";
import { parse } from "./utils/getParseMessage";
import { JsonObject } from "@prisma/client/runtime/library";
import { createRazorpayLink } from "./services/createRazorpayLink";
import { sendWhatsappMsg } from "./services/whatsapp";
const TOPIC_NAME = "zap-events"
const prisma = new PrismaClient();

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
})

async function main() {
    const consumer = kafka.consumer({ groupId: 'main-worker-2' });
    const users = await prisma.user.findMany()
    const producer =  kafka.producer();
    console.log(users)
    await producer.connect();
    await consumer.connect();

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true })

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
          // console.log(topic)

          console.log({
            partition,
            offset: message.offset,
            value: message.value?.toString(),
          }) 
          await new Promise(r => setTimeout(r, 1000));
          if (!message.value) {
            console.error("Received message with null value");
            return;
          }
          console.log("NEW MESSAGE ____________________________");
          const {zapRunId:id, currentState } = JSON.parse(message.value.toString());
          console.log("Current ID = > ",id)
          console.log(currentState)
          const runningZap = await prisma.running.findFirst({
            where:{
              id
            },
            include:{
              zap:{
                include:{
                  actions:{
                    include:{
                      type:true
                    }
                  }
                }
              },
            }
          })
          let metadata: {[key: string]: string} = {};
          if(runningZap?.metadata){
            // console.log(runningZap?.metadata)
            metadata = runningZap.metadata as { [key: string]: string };
          }
          let crrAction=[];
          if(runningZap?.zap.actions){
            crrAction = runningZap?.zap?.actions.map(val=>{
              if(val.sortingOrder==currentState)
              {
                return {type:val.type.name,params:val.params};
              }
            });
            crrAction = crrAction.filter(x=>x!=undefined)
            if(crrAction[0]?.type == 'Email'){
              console.log("Sending Email")
              const body = parse((crrAction[0].params as JsonObject)?.body as string,metadata);
              const to = parse((crrAction[0].params as JsonObject)?.to as string,metadata);
              await sendEmail({ to, subject: currentState ?? "Important", body });
            }
            else if(crrAction[0]?.type == 'Whatsapp'){
              console.log("Sending WhatsApp")
              const phone = parse((crrAction[0].params as JsonObject)?.phone as string,metadata);
              sendWhatsappMsg(phone);
            }
            else if(crrAction[0]?.type == 'Razorpay-link'){
              const name = parse((crrAction[0].params as JsonObject)?.name as string,metadata);
              const email = parse((crrAction[0].params as JsonObject)?.email as string,metadata);
              const phone = parse((crrAction[0].params as JsonObject)?.phone as string,metadata);
              const amount = Number(parse((crrAction[0].params as JsonObject)?.amount as string,metadata));
              await createRazorpayLink(name,phone,email,amount);
            }
            else{
              console.log('Unavailable Action')
            }
          }
          console.log("processing done");
          
          //Tells the consumer to commit the offset once the processing is done
          await consumer.commitOffsets([{
            topic: TOPIC_NAME,
            partition: partition,
            offset: (parseInt(message.offset) + 1).toString() // 5
          }])
          const lastState = (runningZap?.zap.actions.length || 1) -1 ;
          console.log("lastState  currentState");
          console.log(lastState+" "+currentState)
          //move to next action
          if(currentState != lastState){
            console.log("Pushing to kafka again for next step")
            producer.send({
              topic: TOPIC_NAME,
              messages: [{
                      value: JSON.stringify({
                          zapRunId: runningZap?.id,
                          currentState: currentState+1
                      })
                  }]
            })  
          }
        },
      })

}

main()