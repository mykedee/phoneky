const Email = require("../utils/sendEmail");
const axios = require("axios");
const crypto = require("crypto");
const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

exports.payStackPay = async (req, res) => {
  try {
    const { email, amount } = req.body;
  const response = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    {
      email: email,
      amount: amount * 100,
      // channels: ["card", "bank_transfer"],
      metadata: {
        cancel_action: "phoneky.onrender.com/checkout",
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  const authorization_url = response.data.data;
    if (authorization_url) {
      return res.json({ authorization_url });
    }
    res.status(200).json({ response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.payStackHook = async (req, res) => {
  try {
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_KEY)
      .update(JSON.stringify(req.body))
      .digest("hex");
    if (hash == req.headers["x-paystack-signature"]) {
      let  {event}  = req.body;
      let { data } = req.body;
      // console.log(event)
      if (event === "charge.success") {

        let id = data.id;
        let paidAt = data.paidAt;

      //If charge is successful, Order information will be stored in DB, retrieve, then populate 
      //the order confirmation email to be sent to the customer with information from it

        let user = {
          email: data.customer.email,
          paidAt,
          id
        };
        
        try {
          // await new Email(user).sendOrderConfirm();
          console.log("Order confirmation email sent successfully.");

        } catch (emailErr) {
          console.error("Error sending order confirmation email:", emailErr); 
        }
      }
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.getLocation = async (req, res) => {
  try {
    let locations = JSON.parse(
      fs.readFileSync(`${__dirname}/../data/location.json`),
    );
    res.json(locations);
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};
