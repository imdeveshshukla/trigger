import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config();
export async function createRazorpayLink(name:string, phone:string, email:string, amount:number, currency = 'INR') {
  const RAZORPAY_KEY_ID = process.env.RZP_KEY_ID;
  const RAZORPAY_KEY_SECRET = process.env.RZP_SECRET_KEY;

  const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

  const payload = {
    amount: amount * 100, // Razorpay expects amount in paise
    currency: currency,
    accept_partial: true,
    first_min_partial_amount: 100,
    expire_by: Math.floor(Date.now() / 1000) + 3600, // expires in 1 hour
    reference_id: `REF_${Date.now()}`,
    description: `Payment from ${name}`,
    customer: {
      name: name,
      contact: phone,
      email: email
    },
    notify: {
      sms: true,
      email: true
    },
    reminder_enable: true,
    notes: {
      purpose: "Service Payment"
    },
    callback_url: "https://example-callback-url.com/",
    callback_method: "get"
  };

  try {
    const response = await axios.post(
      'https://api.razorpay.com/v1/payment_links/',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        }
      }
    );

  } catch (error:any) {
    console.error('Error creating Razorpay link:', error?.response?.data || error?.message);
    return { error: error?.response?.data || error?.message };
  }
}