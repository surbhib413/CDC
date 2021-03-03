import React from "react";
const fs = require('fs');

function ConvertKMLtoArray() {

  let file;

  function fileChanged(e) {
    file = e.target.files[0]
    parseDocument(file)
  }
  function parseDocument(file) {
    let fileReader = new FileReader()
    fileReader.onload = async (e) => {
      let result = await extractGoogleCoords(e.target.result)
      // let resultJson = JSON.stringify(result);

      // fs.writeFile("./states.json", resultJson, 'utf8', function(err){
      //   if(err){
      //     console.log("An error occured while writing JSON Object to File.");
      //   return console.log(err);
      //   }
      //   console.log("states.json file has been saved.");
      // })

      //Do something with result object here

      console.log(result)

    }
    fileReader.readAsText(file)
  }

  async function extractGoogleCoords(plainText) {
    let parser = new DOMParser()
    let xmlDoc = parser.parseFromString(plainText, "text/xml")
    let googlePolygons = []
    let googleMarkers = []

    if (xmlDoc.documentElement.nodeName === "kml") {

      let placeMarkNames = [];
      for (const item of xmlDoc.getElementsByTagName('Placemark')) {

        //Commented out for districts code -
        // let placeMarkName = item.getElementsByTagName('value')[0].childNodes[0].nodeValue.trim();
        // placeMarkNames.push(placeMarkName);

        let polygons = item.getElementsByTagName('Polygon')
        let markers = item.getElementsByTagName('Point')

        // googlePolygons.map((polyObj, index) => {
        //   polyObj.name = placeMarkNames[index]
        // })
        // }
        for (const polygon of polygons) {
          let coords = polygon.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim()
          let points = coords.split(" ")

          let googlePolygonsPaths = []
          for (const point of points) {
            let coord = point.split(",")
            googlePolygonsPaths.push({ lat: +coord[1], lng: +coord[0] })
          }
          googlePolygons.push({ coordinates: googlePolygonsPaths })

        }


        /** MARKER PARSE **/
        for (const marker of markers) {
          let coords = marker.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim()
          let coord = coords.split(",")
          googleMarkers.push({ lat: +coord[1], lng: +coord[0] })
        }
      }
    } else {
      throw "error while parsing"
    }

    return { markers: googleMarkers, polygons: googlePolygons }

  }
  return (
    <input type='file' accept=".kml,.kmz" onChange={(e) => fileChanged(e)}></input>
  )
}
export default ConvertKMLtoArray;
