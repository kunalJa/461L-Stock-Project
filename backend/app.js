// REMEMBER TO ADD A LINK TO NEWS API

// NEWS API KEY : 3f262daf2c5445ec9dc7c196c6559dca

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongo = require("mongodb");
const cors = require("cors");
const https = require("https");

const app = express();
const server = require("http").Server(app);

const options = {
  hostname: "financialmodelingprep.com",
  port: 443,
  path: "/api/v3/stock/real-time-price/AAPL",
  method: "GET"
};

const req = https.request(options, res => {
  res.on("data", d => {
    process.stdout.write(d);
  });
});

req.on("error", error => {
  console.error(error);
});

req.end();

var url = "mongodb://localhost:27017/mydb";
var uri =
  "mongodb+srv://stockUser:stockUserPassword@cluster0-tdhz8.gcp.mongodb.net/test?retryWrites=true&w=majority";

var MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true });

var dbo;

client.connect(err => {
  if (err) throw err;
  console.log("Database created!");
  dbo = client.db("test");
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/../")));

server.listen(process.env.PORT || 8080, function() {
  console.log(`Server listening on ${process.env.PORT || 8080}`);
});
