// /Login
// /Signup
// /Vendors
// /Customers
// /Orders

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const lodash = require('lodash');
// http = require('http');


const app=express();


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(express.methodOverride());
// app.use(session({
//   secret:process.env.SECRET,
//   resave: false,
//   saveUninitialized: false
// }));


mongoose.connect("mongodb://localhost:27017/vendorDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set("useCreateIndex", true);

const vendorSchema= new mongoose.Schema({
  v_id: Number,
  Name: String,
  Parent_Name: String,
  Contact_no: String,
  Email: String,
  DOB: Date,
  Age: Number,
  Gender: String,
  Perm_Address:{
    State: String,
    District: String,
    City: String,
    Locality: String,
    Street: String,
    Building: String,
    House_no: String
  },
  Curr_Address:{
    State: String,
    District: String,
    City: String,
    Locality: String,
    Street: String,
    House_no: String
  },
  License_no: String,
  Aadhar_no: String,
  Products:{
    P_id: Number,
    Type: String,
    Name: String,
    Quantity: Number,
    Quantity_in: String,
    Price: Number,
    Per: String,
    Description: String
  }
});
const Vendor = mongoose.model("Vendor", vendorSchema);


const customerSchema= new mongoose.Schema({
  c_id: Number,
  Name: String,
  Contact_no: String,
  Email: String,
  DOB: Date,
  Age: Number,
  Gender: String,
  Cust_Address:{
    State: String,
    District: String,
    City: String,
    Locaity: String,
    Street: String,
    House_no: String

  },
  Aadhar_no: String
});
const Customer = mongoose.model("Customer", customerSchema);


const orderSchema= new mongoose.Schema({
  o_id: Number,
  v_id: Number,
  p_id: Number,
  c_id: Number,
  Quantity: Number,
  Total_Amount: Number,
});
const Order = mongoose.model("Order", orderSchema);




app.get("/", function(req, res){
    res.render("index");
});

//now working on the login routes
app.get("/login", function(req, res) {
    res.render("Vendor-login");
});

//now working on the register routes
app.get("/signup", function(req, res) {
    res.render("vendor-signup");
});

app.get("/cart",function(req,res){
  // look through all the users
  res.render("cart")
});

app.get("/store",function(req,res){
  // look through all the users
  res.render("store")
});

app.listen(3000,function(){
  console.log("Server is up and running on port 3000");
});
