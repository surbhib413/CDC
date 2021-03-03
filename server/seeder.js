//The purpose of seeder is to import, delete all the data from the json files
const fs = require("fs");
const mongoose = require("mongoose");

const config = require("config");
const colors = require("colors");

const db = config.get("mongoURI");

//Load models
const DataFromOtherSystems = require("./models/DataFromOtherSystems");

//Connect to database

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//Read JSON files
const dataFromOtherSystems = JSON.parse(
  fs.readFileSync(`${__dirname}\\_output\\DataFromOtherSystems.json`, "utf-8")
);
//import into DB
const importData = async () => {
  try {
    await DataFromOtherSystems.create(dataFromOtherSystems);

    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

//Delete DB
const deleteData = async () => {
  try {
    await Planning.deleteMany();

    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

//when node seeder is run from the terminal..this check is impt to
//to import the json files -i is passed as arg to the node seeder command in the terminal, node seeder -i
//to delete the data from the db, -d is passed as arg to the node seeder command in the terminal, node seeder -d
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
