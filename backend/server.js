require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Payment model
const Payment = mongoose.model('Payment', new mongoose.Schema({
  phoneNumber: String,
  amount: Number,
  bookingReference: String,
  status: { type: String, default: 'pending' },
  mpesaReceiptNumber: String,
  transactionDate: Date,
  createdAt: { type: Date, default: Date.now }
}));

// Generate M-Pesa access token
async function getMpesaAccessToken() {
  try {
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    const response = await axios.get(process.env.MPESA_AUTH_URL, {
      headers: { Authorization: `Basic ${auth}` }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting M-Pesa token:', error);
    throw error;
  }
}

// Initiate STK Push
async function initiateSTKPush(phoneNumber, amount, bookingReference) {
  try {
    const accessToken = await getMpesaAccessToken();
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, -4);
    const password = Buffer.from(`${process.env.MPESA_BUSINESS_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

    const response = await axios.post(process.env.MPESA_STK_PUSH_URL, {
      BusinessShortCode: process.env.MPESA_BUSINESS_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: process.env.MPESA_BUSINESS_SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: bookingReference,
      TransactionDesc: 'Bus Ticket Payment'
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error initiating STK Push:', error.response?.data || error.message);
    throw error;
  }
}

// Send SMS notification
async function sendSMS(phoneNumber, message) {
  try {
    const response = await axios.post('https://api.smsprovider.com/v1/send', {
      apiKey: process.env.SMS_API_KEY,
      senderId: process.env.SMS_SENDER_ID,
      phoneNumber,
      message
    });
    return response.data;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
}

// Payment endpoint
app.post('/api/payments', async (req, res) => {
  try {
    const { phoneNumber, amount, bookingReference } = req.body;
    
    // Validate input
    if (!phoneNumber || !amount || !bookingReference) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save payment record
    const payment = new Payment({
      phoneNumber,
      amount,
      bookingReference
    });
    await payment.save();

    // Initiate STK Push
    const stkResponse = await initiateSTKPush(phoneNumber, amount, bookingReference);
    
    // Send confirmation SMS
    const smsMessage = `Dear customer, please enter your M-Pesa PIN to complete payment of KES ${amount} for booking ${bookingReference}`;
    await sendSMS(phoneNumber, smsMessage);

    res.json({
      success: true,
      message: 'Payment initiated successfully',
      data: stkResponse
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Payment processing failed', details: error.message });
  }
});

// M-Pesa callback endpoint
app.post('/api/callback', async (req, res) => {
  try {
    const callbackData = req.body;
    console.log('M-Pesa callback received:', callbackData);

    // Find and update payment record
    if (callbackData.Body.stkCallback.CallbackMetadata) {
      const metadata = callbackData.Body.stkCallback.CallbackMetadata.Item;
      const receiptNumber = metadata.find(item => item.Name === 'MpesaReceiptNumber').Value;
      const phoneNumber = metadata.find(item => item.Name === 'PhoneNumber').Value;
      const amount = metadata.find(item => item.Name === 'Amount').Value;
      const transactionDate = metadata.find(item => item.Name === 'TransactionDate').Value;

      await Payment.findOneAndUpdate(
        { phoneNumber },
        {
          status: 'completed',
          mpesaReceiptNumber: receiptNumber,
          transactionDate: new Date(transactionDate)
        }
      );

      // Send confirmation SMS
      const smsMessage = `Payment of KES ${amount} received. Receipt: ${receiptNumber}. Thank you for booking with us!`;
      await sendSMS(phoneNumber, smsMessage);
    }

    res.status(200).send('Callback received');
  } catch (error) {
    console.error('Callback processing error:', error);
    res.status(500).send('Error processing callback');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});