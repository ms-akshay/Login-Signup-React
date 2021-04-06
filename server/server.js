const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const Collection = require("./schema");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/reactdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));
app
  .get("/", (req, res) => {
    res.send("Hello Sir");
  })
  .listen(4000, () => {
    console.log("Server is running on port 4000");
  });

app.post("/signup", (req, res) => {
  var email = req.body.email;
  Collection.findOne({ email: req.body.email }, function (error, user) {
    if (user === null) {
      console.log("User Does not exist");
      Collection.create(req.body);
      res.send("Welcome");
    } else {
      // res.redirect("/signup");
      res.json("user already exist");
      console.log("User Already exist");
      //res.send("Choose a different mail id");
    }
    console.log(user);
  });
});

app.post("/login", async (req, res) => {
  const email2 = req.body.email;
  console.log("email heree is ", email2);
  var e = await Collection.findOne({ email: email2 });
  console.log("e here is ", e);
  if (e) {
    if (req.body.password === e.password) {
      console.log("User Exist");
      res.json("User Exist");
    } else {
      // res.redirect("/loginform");
      console.log("Wrong Password");
      res.json("Password incorrect");
    }
  } else {
    // res.redirect("/loginform");
    console.log("User does not exist");
    res.json("user does not exist");
    // console.log("User does not exist");
  }
});
