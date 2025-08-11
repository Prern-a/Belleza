const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/send-receipt", async (req, res) => {
  const { email, orderDetails } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "saxenasuryansh087@gmail.com",
        pass: "yegk pchn fmes iwhd",
      },
    });

    const pdfPath =
      "D:/belleza-master/belleza-master/src/receipts/" +
      orderDetails.receiptID +
      ".pdf";

    const mailOptions = {
      from: "saxenasuryansh087@gmail.com",
      to: email,
      subject: `Receipt for Order #${orderDetails.receiptID}`,
      text: `Thank you for your order. Please find the receipt attached.\n\nReceipt Number: ${orderDetails.receiptID}\nAmount Paid: ${orderDetails.totalCost}`,
      attachments: [
        {
          filename: `${orderDetails.receiptID}.pdf`,
          path: pdfPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("Email with PDF sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});

app.listen(3002, () => {
  console.log("Email server is running on port 3002");
});
