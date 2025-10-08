import dotenv from 'dotenv'
dotenv.config();
const accountSid = 'AC78f64e614eb79038b7559bc497e76439';
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