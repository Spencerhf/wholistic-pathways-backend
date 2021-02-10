const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + "public"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GM_USER,
    pass: process.env.GM_PASS,
  },
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

app.get("/", (req, res) => {
  res.send("hello");
})

app.post("/send", (req, res) => {
  var mailOptions = {
    to: "haze4man@gmail.com",
    from: req.body.email,
    subject: req.body.email,
    text: `Hello, this is ${req.body.name}
    ${req.body.message}
    Email me back at ${req.body.email}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console
        .log("Email sent: " + info.response)
        .then((res) => res.status(200).send(res));
    }
  });
});

// require("./routes/apiRoutes")(app)

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
