
import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client";
import sendEmail from "./services/sendEmail";
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

          // console.log({
          //   partition,
          //   offset: message.offset,
          //   value: message.value?.toString(),
          // }) 
          await new Promise(r => setTimeout(r, 1000));
          if (!message.value) {
            console.error("Received message with null value");
            return;
          }
          const {id, currentState } = JSON.parse(message.value.toString());
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
          // console.log(currentState);
          console.log(runningZap)
          let metadata: {[key: string]: string} = {};
          if(runningZap?.metadata){
            // console.log(runningZap?.metadata)
            metadata = runningZap.metadata as { [key: string]: string };
          }
          console.log(metadata)
          let crrAction=[];
          if(runningZap?.zap.actions){
            crrAction = runningZap?.zap?.actions.map(val=>{
              if(val.sortingOrder==currentState)
              {
                console.log(val)
                return {type:val.type.name,params:val.params};
              }
            });
            crrAction = crrAction.filter(x=>x!=undefined)
            console.log(crrAction);
            if(crrAction[0]?.type == 'Email'){
              console.log("Sending Email")
              let validData = true;
              if (crrAction[0]?.params && typeof crrAction[0].params === 'object' && !Array.isArray(crrAction[0].params)) {
                for (const keys of Object.keys(crrAction[0].params)) {
                    if (!metadata[keys]) {
                      validData = false;
                      console.log("Cant find the key in metadata")
                    }
                }
              }
              if(validData){
                await sendEmail({ to: metadata['to'], subject: metadata['subject'], body: metadata['body'] })
                console.log("Email sent")

              }
            }
            else if(crrAction[0]?.type == 'Whatsapp Message'){
              console.log("Send WhatsApp")
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
            producer.send({
              topic: TOPIC_NAME,
              messages: [{
                      value: JSON.stringify({
                          zapRunId: runningZap?.zapId,
                          currentState: currentState+1
                      })
                  }]
            })  
          }
        },
      })

}

main()