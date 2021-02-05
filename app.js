const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + 'public'));

app.use(cors())
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

app.post("/send", (req, res) => {
  var mailOptions = {
    from: req.body.email,
    to: "haze4man@gmail.com",
    subject: `Hello this is ${req.body.name}`,
    text: `${req.body.message}, 
    From, ${req.body.name}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response)
      .then(res => res.status(200).send(res));
    }
  });
});

// require("./routes/apiRoutes")(app)

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
