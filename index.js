//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const { response } = require('express');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signUp.html");
});

app.post("/", function(req, res) {
  var fName = req.body.fName;
  var phone = req.body.phone;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscibed",
      merge_fields: {
        FNAME: fName,
        PHONE: phone
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us5.api.mailchimp.com/3.0/lists/8ac7cfee0c",
    method: "POST",
    headers: {
      "Authorization": "gescale1 05fa85601ffe5a8ee4fb9ee0a6c15c09-us5"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
      console.log(error);
    } else {
      if (response.statusCode != 200) {
        res.sendFile(__dirname + "/failure.html");
        console.log(response.statusCode);
      } else {
        res.sendFile(__dirname + "/success.html");
      }
    }
  });
});

app.post("/backToMain", function (req, res){
  res.redirect("/");
})

app.listen(3000, function() {
  console.log("Server running on port 3000!");
});


// API KEY 05fa85601ffe5a8ee4fb9ee0a6c15c09-us5
// 8ac7cfee0c
