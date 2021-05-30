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

// const session = require('express-session');
// const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose');
// const Auth0Strategy = require('passport-auth0')
// const findOrCreate = require('mongoose-findOrCreate');
const { auth } = require('express-openid-connect');
const config={
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.baseURL,
    clientID: process.env.clientID,
    issuerBaseURL: process.env.issuerBaseURL,
    secret: process.env.secret
};

app.use(auth(config));


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


// app.use(session({
//   secret: process.env.SECRET,
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

});
var Vendor = mongoose.model("Vendor", vendorSchema);

const productSchema= new mongoose.Schema({
  type: String,
  Name: String,
  Quantity: Number,
  Quantity_in: String,
  Price: Number,
  // Per: {type: String},
  Description: String
});

var Product= mongoose.model("Product", productSchema);

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
var Customer = mongoose.model("Customer", customerSchema);


const orderSchema= new mongoose.Schema({
  o_id: Number,
  v_id: Number,
  p_id: Number,
  c_id: Number,
  Quantity: Number,
  Total_Amount: Number,
});
var Order = mongoose.model("Order", orderSchema);

// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);







app.get("/", function(req, res){
res.render("index");
});

app.get("/register_login", function(req, res){
    res.render("Register-login");
});

//now working on the login routes
app.get("/vendor_login", function(req, res) {
    res.render("Vendor-login");
});

//now working on the register routes
app.get("/vendor_signup", function(req, res) {
    res.render("vendor-signup");
});

app.get("/customer_login", function(req, res) {
    res.render("Customer-login");
});

//now working on the register routes
app.get("/customer_signup", function(req, res) {
    res.render("customer-signup");
});

app.get("/cart",function(req,res){
  // look through all the users
  res.render("cart")
});

app.get("/store",function(req,res){
  // look through all the users
  if(req.oidc.isAuthenticated()){
    res.render("store");
  }
});

app.get("/vendors",function(req,res){
  // look through all the users
  res.render("vendors")
});

app.get('/product', function(req,res) {
res.render('products');
});

app.get('/add', function(req,res) {
    res.render('addProduct');
});

app.post('/new', function(req, res){
  new Product({
    // p_id : req.body.ProductId,
    Type  : req.body.ProductType,
    Name   : req.body.ProductName,
    Quantity   : req.body.ProductQuantity,
    Quantity_in   : req.body.ProductQuantityIn,
    Price: req.body.ProductPrice,
    // Per: req.body.ProductPer,
    Description : req.body.ProductDesc
  }).save(function(err, prd){
    if(err) {
      res.json(err);
    }
    else{
        res.send(prd);
    }
  });
});
app.listen(3000,function(){
  console.log("Server is up and running on port 3000")
});
