var parser = require("simple-excel-to-json");
let fs = require("fs");
const path = require("path");
const colors = require("colors");
const config = require("config");
const db = config.get("mongoURI");
const _ = require("lodash");

//console.log(process.argv[2]);

const directoryPath = path.join(__dirname, "_data");
let collectionArr = [];
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file

    let filename = file
      .split(".")
      .slice(0, -1)
      .join(".");
    //console.log(filename);

    let doc = parser.parseXls2Json(`./_data/${file}`, { isToCamelCase: true });

    fs.writeFile(
      `./_output/${filename}.json`,
      JSON.stringify({ ...doc }),
      "utf8",
      function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err.brightRed);
        }
        console.log(`${file} is being read`.brightCyan);
        console.log(
          `${filename}.json has been generated from ${file}`.brightGreen
        );
      }
    );
  });
});
