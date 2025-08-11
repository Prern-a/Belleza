const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

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

app.listen(PORT, () => {
  console.log(`PDF generation server is running on port ${PORT}`);
});
