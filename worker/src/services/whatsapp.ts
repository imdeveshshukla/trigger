import dotenv from 'dotenv'
dotenv.config();
const accountSid = process.env.AUTH_SECRET_ID;
const authToken = process.env.AUTH_TWILIO;
const client = require('twilio')(accountSid, authToken);


export function sendWhatsappMsg(phone:string){
  client.messages
      .create({
                  from: 'whatsapp:+14155238886',
          contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
          contentVariables: '{"1":"12/1","2":"3pm"}',
          to: `whatsapp:+91${phone}`
      })
      .then((message:any) => (console.log(message.sid+" "+phone)))
      .catch((err:any)=>console.log(err));
}