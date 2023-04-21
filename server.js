const express = require("express");
const port = process.env.PORT || 5000;

const bodyparser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");

const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile("/index.html", { root: "public" });
});

app.post("/send_email", function (req, response) {
  const output = `Message 
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message:${req.body.Message}</h3>
    <h3>Subject:${req.body.Subject}</h3>
  `;
  console.log(req.body);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "kovendan16@gmail.com",
      pass: "qnxghfcswxnubean",
    },
  });

  var mailOptions = {
    to: "kovendan16@gmail.com",
    subject: `${req.body.Subject}   from you portfoliowebsite`,
    html: output,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(`${error}`);
      const message = `sorry unable to sent ${error}`;
      const script = `alert('${message}'); window.location.href='/';`;

      return response.send(`<script>${script}</script>`);
    } else {
      console.log("Email Sent: " + info.response);
      const message = "Message sent successfully!";
      const script = `alert('${message}'); window.location.href='/';`;
      response.send(`<script>${script}</script>`);
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
