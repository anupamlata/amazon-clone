const functions = require("firebase-functions");
const express = require("express");
const cors =require('cors');
const { response, request } = require("express");
const stripe = require('stripe') 
('sk_test_51MBGdISGyb8FG0iWgJbycxZzminkmyx6LrKtMoop2OgVm8C2uBIXg2ck7Oy0KRIzgK5Wx3D5pj892YEo4HRZABda00Aizb9Uw1')

//API

//-App config
const app = express();

//-Middleware
app.use(cors({origin: true}));
app.use(express.json()); 

//-API routes
app.get('/',(request ,response) => response.status(200).send('hello world'))
app.post('/payments/create',async (request,response) => {
    const total = request.query.total; 
    console.log('Payment Request Received BOOM!! for this amount >>>',total)
    const paymentIntent =await stripe.paymentIntent.create({
        amount:total, //subunits of the currency
        currency:"usd",
    });
      //ok-created
      response.status(201).send({
        clientSecrete: paymentIntent.client_secret,
      })

});
//-Listen command
exports.api = functions.https.onRequest(app)

//example endpoint
//url from emulator dependencies
//http://localhost:5001/challenge-4b2b2/us-central1/api
 