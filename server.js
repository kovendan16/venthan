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
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>  
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h3>Message:${req.body.Subject}</h3>
  <h3>SUbject:${req.body.Message}</h3>

  `;
  console.log(req.body);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    //    from: "kovendan16@gmail.com",//
    to: process.env.EMAIL,
    subject: "from kovendan",
    html: output,
    // cc:"kovendan16@gmail.com",//
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(`${error}`);
      return res.send("unable to try later");
    } else {
      console.log("Email Sent: " + info.response);
    }
    response.send("message sent sucuessfully");
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
