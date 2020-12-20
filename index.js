const express = require("express");
const router = express.Router();
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

router.post("/password", (req, res, next) => {
  const passwordToVerify = req.body.password || "";
  if (passwordToVerify === config.RSVP_PASS) {
    res.json({
      status: "success",
    });
  } else {
    res.json({
      status: "fail",
    });
  }
});

if (process.env.NODE_ENV === "production") {
  router.use(express.static("client/build"));

  const path = require("path");
  router.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

router.post("/send", (req, res, next) => {
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

app.use("", router);
