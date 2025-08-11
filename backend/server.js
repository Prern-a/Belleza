const express = require("express");
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// PDF Generation Route
app.post("/generate-pdf", (req, res) => {
  const orderDetails = req.body;
  const doc = new PDFDocument();
  const filePath = path.join(
    __dirname,
    `../receipts/${orderDetails.receiptID}.pdf`
  );
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);
  
  const pageWidth = doc.page.width;
  const xPosition = (pageWidth - 150) / 2;
  doc.image("Top.png", xPosition, 0, { width: 150 });
  doc.moveDown(7);
  doc.fontSize(30).text("Receipt", { align: "center" });
  doc.moveDown(0.5);
  doc.fontSize(16).text(`Receipt Number: ${orderDetails.receiptID}`);
  doc.text(`Date: ${orderDetails.date}`);
  doc.text(`Amount Paid: Rs. ${orderDetails.totalCost}`);
  doc.text(`Address: ${orderDetails.address}`);
  doc.text(`Phone: ${orderDetails.phone}`);
  doc.text("Products:");
  
  orderDetails.products.forEach((product, index) => {
    doc.text(`${index + 1}. ${product.name} @ Rs. ${product.price}`);
  });
  
  doc.end();
  
  writeStream.on("finish", () => {
    res.download(filePath);
  });
});

// Email Sending Route
app.post("/send-receipt", async (req, res) => {
  const { email, orderDetails } = req.body;
  
  try {
    const transporter = nodemailer.createTransporter({
      service: "Gmail",
      auth: {
        user: "saxenasuryansh087@gmail.com",
        pass: "yegk pchn fmes iwhd",
      },
    });
    
    const pdfPath = path.join(__dirname, `../receipts/${orderDetails.receiptID}.pdf`);
    
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

// Start Server
app.listen(PORT, () => {
  console.log(`Combined server is running on port ${PORT}`);
});