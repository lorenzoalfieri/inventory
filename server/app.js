const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const product = require("./routes/product.route");
const app = express();

const mongoose = require("mongoose");

let mongoDB =  process.env.MONGODB_URI || "mongodb://localhost:27017/test";

mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var allowedOrigins = ['http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {

    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin)
      return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  }
}));

app.use("/products", product);

let port = 8080;
app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});

module.exports = app;
