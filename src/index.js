const express = require("express");
const mongoose = require("mongoose");
const route = require("./route/route");
const app = express();
const multer = require("multer");
const { AppConfig } = require("aws-sdk");

app.use(express.json());
app.use(multer().any());
mongoose
  .connect(
    "mongodb+srv://Ankita220296:Ankita704696@cluster0.d9vvv.mongodb.net/QuokkaDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(3000, function () {
  console.log("Express app running on port " + 3000);
});
