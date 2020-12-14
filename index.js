const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const creds = require("./config");

const transport = {
  host: "smtp.gmail.com", // Don’t forget to replace with the SMTP host of your provider
  port: 587,
  auth: {
    user: creds.USER,
    pass: creds.PASS,
  },
};

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.listen(PORT);

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/public/index.html");
});

app.post("/send", (req, res, next) => {
  let content = "";

  const name = req.body.find((request) => request.id === "name");
  req.body.map((request) => {
    content += `${request.id}: ${request.value} \n`;
  });

  const mail = {
    from: name ? name.value : "",
    to: creds.USER,
    subject: "New RSVP",
    text: content,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});
