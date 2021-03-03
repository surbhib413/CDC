const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const path = require("path")
const fs = require('fs')

const getMonthAndYear = () => {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return { month, year }
}

const getQuaterByMonth = (monthNumber) => {
    // uncomment the below code in case of actual data
    // if (monthNumber >= 4 && monthNumber <= 6) {
    //     return 1
    // } else if (monthNumber >= 7 && monthNumber <= 9) {
    //     return 2
    // } else if (monthNumber >= 10 && monthNumber <= 12) {
    //     return 3
    // } else {
    //     return 4
    // }
    return 4 // need to be removed in case of actual data
}

const getCurrFinDate = () => {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let quaterNumber = getQuaterByMonth(month)

    if (quaterNumber == 4) year -= 1
    let currFinDate = new Date(`04-01-${year}`)
    // uncomment the below code in case of actual data
    // return currFinDate
    return '2019-04-01T18:30:00.000Z' // need to be removed in case of actual data
}

const getStartOfMonth = () => {
    let date = new Date();
    // uncomment the below code in case of actual data
    // return new Date(date.getFullYear(), date.getMonth() - 1, 1)
    return '2020-01-31T18:30:00.000Z' /// need to be removed in case of actual data
}

const getEndOfMonth = () => {
    let date = new Date();
    // uncomment the below code in case of actual data
    // return new Date(date.getFullYear(), date.getMonth(), 0)
    return '2020-02-28T18:30:00.000Z' // need to be removed in case of actual data
}

const getStartOfDay = () => {
    let dateTimestamp = new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0);
    return new Date(dateTimestamp)
}

const getEndOfDay = () => {
    let dateTimestamp = new Date(new Date().setDate(new Date().getDate() - 1)).setHours(23, 59, 59, 999);
    return new Date(dateTimestamp)
}

// convert excel to json
const excelToJson = (filename) => {
    console.log("file name:", filename)
    const directoryPath = path.join(__dirname, '../_data', filename);
    console.log("file path:", directoryPath)
    let exceltojson;
    if (filename.split('.')[filename.split('.').length - 1] === 'xlsx') {
        exceltojson = xlsxtojson;
    } else {
        exceltojson = xlstojson;
    }
    return new Promise((resolve, reject) => {
        exceltojson({
            input: directoryPath,
            output: null, //since we don't need output.json
            lowerCaseHeaders: true
        }, function (err, result) {
            if (err) {
                reject({ error_code: 1, err_desc: err, data: null });
            }
            resolve({ error_code: 0, err_desc: null, data: result });
        });
    })
    // try {
    //     exceltojson({
    //         input: directoryPath,
    //         output: null, //since we don't need output.json
    //         lowerCaseHeaders: true
    //     }, function (err, result) {
    //         if (err) {
    //             return { error_code: 1, err_desc: err, data: null };
    //         }
    //         return { error_code: 0, err_desc: null, data: result };
    //     });
    // } catch (e) {
    //     console.log(e)
    //     return { error_code: 1, err_desc: "Corupted excel file" };
    // }
}

const writeFile = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            err ? reject(err) : resolve('file created')
        })
    })
}

module.exports = {
    getQuaterByMonth,
    getMonthAndYear,
    getCurrFinDate,
    getStartOfMonth,
    getEndOfMonth,
    getStartOfDay,
    getEndOfDay,
    excelToJson,
    writeFile
}