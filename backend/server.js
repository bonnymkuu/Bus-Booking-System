require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Passenger Schema
const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  seatNumber: { type: String, required: true },
  travelDate: { type: Date, required: true }, 
  bookingReference: { type: String, required: true },
  paymentStatus: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});


// Payment Schema
const paymentSchema = new mongoose.Schema({
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Passenger', required: true },
  amount: { type: Number, required: true },
  mpesaReceiptNumber: String,
  phoneNumber: { type: String, required: true },
  status: { type: String, default: 'pending' },
  transactionDate: Date,
  travelDate: { type: Date, required: true },
  seatNumbers: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

const Passenger = mongoose.model('Passenger', passengerSchema);
const Payment = mongoose.model('Payment', paymentSchema);

// M-Pesa Functions (same as before)
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

app.get('/api/payments/status', async (req, res) => {
  try {
    const { reference } = req.query;
    const passenger = await Passenger.findOne({ bookingReference: reference });
    
    if (!passenger) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({
      status: passenger.paymentStatus,
      bookingReference: passenger.bookingReference
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ error: 'Error checking payment status' });
  }
});

// Routes
app.post('/api/payments', async (req, res) => {
  try {
    const { passengers, amount, travelDate, seatNumbers } = req.body;
    
    if (!passengers || !passengers.length || !amount || !travelDate || !seatNumbers) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const primaryPassenger = passengers[0];
    const bookingReference = `BUS-${Date.now()}`;
    const phoneNumber = `${primaryPassenger.code}${primaryPassenger.phone}`;

    // Save passengers to MongoDB with seat numbers and travel date
    const savedPassengers = await Passenger.insertMany(
      passengers.map((p, index) => ({
        name: p.name,
        age: p.age,
        phone: `${p.code}${p.phone}`,
        gender: p.gender,
        country: p.nationality,
        seatNumber: seatNumbers[index], // Assign seat number
        bookingReference,
        travelDate: new Date(travelDate) // Include travel date
      }))
    );

    // Initiate STK Push
    const stkResponse = await initiateSTKPush(phoneNumber, amount, bookingReference);

    // Create payment record with seat numbers and travel date
    const payment = new Payment({
      passengerId: savedPassengers[0]._id,
      amount,
      phoneNumber,
      status: 'pending',
      travelDate: new Date(travelDate),
      seatNumbers // Store all seat numbers
    });
    await payment.save();

    res.json({
      success: true,
      message: 'Payment initiated successfully',
      bookingReference,
      data: stkResponse
    });

  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ 
      error: 'Payment processing failed',
      details: error.message 
    });
  }
});

app.post('/api/callback', async (req, res) => {
  try {
    const callbackData = req.body;

    if (callbackData.Body.stkCallback.CallbackMetadata) {
      const metadata = callbackData.Body.stkCallback.CallbackMetadata.Item;
      const receiptNumber = metadata.find(item => item.Name === 'MpesaReceiptNumber').Value;
      const phoneNumber = metadata.find(item => item.Name === 'PhoneNumber').Value;
      const amount = metadata.find(item => item.Name === 'Amount').Value;
      const transactionDate = metadata.find(item => item.Name === 'TransactionDate').Value;

      // Find and update payment
      const payment = await Payment.findOneAndUpdate(
        { phoneNumber, status: 'pending' },
        {
          status: 'completed',
          mpesaReceiptNumber: receiptNumber,
          transactionDate: new Date(transactionDate)
        },
        { new: true }
      );

      if (payment) {
        // Update passenger payment status
        await Passenger.updateMany(
          { bookingReference: payment.bookingReference },
          { paymentStatus: 'completed' }
        );
      }
    }

    res.status(200).send('Callback received');
  } catch (error) {
    console.error('Callback processing error:', error);
    res.status(500).send('Error processing callback');
  }
});

app.get('/api/seats/availability', async (req, res) => {
  try {
    const { travelDate } = req.query;
    
    if (!travelDate) {
      return res.status(400).json({ error: 'Travel date is required' });
    }

    // Find all booked seats for this date
    const bookedSeats = await Passenger.find({
      travelDate: new Date(travelDate),
      paymentStatus: 'completed'
    }).select('seatNumber');

    res.json({
      available: false,
      bookedSeats: bookedSeats.map(s => s.seatNumber)
    });
  } catch (error) {
    console.error('Seat availability error:', error);
    res.status(500).json({ error: 'Error checking seat availability' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});