const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
process.env.MONGODB_URI || 'mongodb://localhost/workout',
   {
  useNewUrlParser: true,
  userUnifiedTopology: true,
  userCreateIndex: true,
  useFindAndModify: false,
   }  
);


app.use(require("./Routes/api.js"));
app.use(require("./Routes/views.js"));

app.listen(PORT, () => {
    console.log(`Apprunning on port ${PORT}!`);
});