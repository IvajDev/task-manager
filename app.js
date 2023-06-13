import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import connectDB from "./dbConnection/dbConn.js";
import Item from "./models/schema-todolist-DB.js";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3000;

//Connection to MongoDB calling the connection function in /dbConn.js
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let today = new Date();

  const optionsObject = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const day = today.toLocaleDateString("en-US", optionsObject);
  //the method TLDS is simpler than the switch method for every weekday

  Item.find({})
    .then((documentsFounded) => {
      console.log(documentsFounded);
      res.render("list", { dayOfWeek: day, dateArr: documentsFounded });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/", function (req, res) {
  let date0 = req.body.date0;

  const addItem = Item.create({ name: `${date0}` });

  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const checkedBox = req.body.checkbox;

  console.log(req.body.checkbox);

  Item.deleteOne({ _id: `${checkedBox}` }).then(
    console.log("Document with _id:" + `${checkedBox}` + " deleted.")
  );

  res.redirect("/");
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB.");
  app.listen(port, function () {
    console.log(`Server running on port ${port}`);
  });
});
