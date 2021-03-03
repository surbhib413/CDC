const fs = require("fs");

const path = require("path");

const source = path.join(__dirname, "_data/Planning_MOU_03.xlsx");

//console.log(source);

fs.readFile(source, "utf8", function(err, data) {
  // console.log(data);
});

const XLSX = require("xlsx");
const workbook = XLSX.readFile(source);
const sheet_name_list = workbook.SheetNames;
console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]));

// fs.readdir(source, function(err, files) {
//   files.map(file => {
//     fs.readFile(file, "utf8", function(err, data) {
//       if (err) {
//         console.log("err:- " + err);
//         throw err;
//       }
//       console.log(data);
//     });
//   });
// });
