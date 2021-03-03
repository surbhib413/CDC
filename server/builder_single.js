let parser = require("simple-excel-to-json");
let fs = require("fs");
const colors = require("colors");

let filename = process.argv[2];
let doc = parser.parseXls2Json(`./_data/${filename}.xlsx`, {
  isToCamelCase: true
});

fs.writeFile(
  `./_output/${filename}.json`,
  JSON.stringify(doc[0]),
  "utf8",
  function(err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log(`${filename}.xlsx is being read`.brightCyan);
    console.log(
      `${filename}.json has been generated from ${filename}.xlsx`.brightGreen
    );
  }
);
