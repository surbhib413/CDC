import andhraPradeshDistricts from "./jsonData/AndhraPradeshDistricts.json"
import arunachalPradeshDistricts from "./jsonData/ArunachalPradeshDistricts.json"
import biharDistricts from "./jsonData/BiharDistricts.json"
import chattisgarhDistricts from "./jsonData/ChattisgarhDistricts.json"
import goaDistricts from "./jsonData/GoaDistricts.json"
import gujaratDistricts from "./jsonData/GujaratDistricts.json"
import haryanaDistricts from "./jsonData/HaryanaDistricts.json"
import himachalPradeshDistricts from "./jsonData/HimachalPradeshDistricts.json"
import jammuLashmirDistricts from "./jsonData/JammuKashmirDistricts.json"
import jharkhandDistricts from "./jsonData/JharkhandDistricts.json"
import karnatakaDistricts from "./jsonData/KarnatakaDistricts.json"
import kerelaDistricts from "./jsonData/KerelaDistricts.json"
import madhyaPradeshDistricts from "./jsonData/MadhyaPradeshDistricts.json"
import maharashtraDistricts from "./jsonData/MaharashtraDistricts.json"
import manipurDistricts from "./jsonData/ManipurDistricts.json"
import meghalayaDistricts from "./jsonData/MeghalayaDistricts.json"
import mizoramDistricts from "./jsonData/MizoramDistricts.json"
import nagalandDistricts from "./jsonData/NagalandDistricts.json"
import odishaDistricts from "./jsonData/OdishaDistricts.json"

function renderDistricts(e, indianState) {
  console.log(indianState);
  console.log(e);
  //FIX THIS NEXT
  let lat = e.latLng;
  console.log(lat);
  if (indianState === "Andhra Pradesh") {
    this.setState({
      zoom: 8.1,
      center: e.latLng,
      jsonFile: andhraPradeshDistricts
    })
  }
  if (indianState === "Arunachal Pradesh") {
    this.setState({
      zoom: 8.4,
      center: e.latLng,
      jsonFile: arunachalPradeshDistricts
    })
  }
  if (indianState === "Bihar") {
    this.setState({
      zoom: 8.5,
      center: e.latLng,
      jsonFile: biharDistricts
    })
  }
  if (indianState === "Chhattisgarh") {
    this.setState({
      zoom: 8.2,
      center: e.latLng,
      jsonFile: chattisgarhDistricts
    })
  }
  if (indianState === "Goa") {
    this.setState({
      zoom: 10,
      center: e.latLng,
      jsonFile: goaDistricts
    })
  }
  if (indianState === "Gujarat") {
    this.setState({
      zoom: 8.2,
      center: e.latLng,
      jsonFile: gujaratDistricts
    })
  }
  if (indianState === "Haryana") {
    this.setState({
      zoom: 9,
      center: e.latLng,
      jsonFile: haryanaDistricts
    })
  }
  if (indianState === "Himachalpradesh") {
    this.setState({
      zoom: 9,
      center: e.latLng,
      jsonFile: himachalPradeshDistricts
    })
  }
  if (indianState === "Jammu & Kashmir") {
    this.setState({
      zoom: 8.2,
      center: e.latLng,
      jsonFile: jammuLashmirDistricts
    })
  }
  if (indianState === "Jharkhand") {
    this.setState({
      zoom: 8.4,
      center: e.latLng,
      jsonFile: jharkhandDistricts
    })
  }
  if (indianState === "Karnataka") {
    this.setState({
      zoom: 8.2,
      center: e.latLng,
      jsonFile: karnatakaDistricts
    })
  }
  if (indianState === "Kerala") {
    this.setState({
      zoom: 8.5,
      center: e.latLng,
      jsonFile: kerelaDistricts
    })
  }
  if (indianState === "Madhya Pradesh") {
    this.setState({
      zoom: 8,
      center: e.latLng,
      jsonFile: madhyaPradeshDistricts
    })
  }
  if (indianState === "Maharashtra") {
    this.setState({
      zoom: 8,
      center: e.latLng,
      jsonFile: maharashtraDistricts
    })
  }
  if (indianState === "Manipur") {
    this.setState({
      zoom: 9.2,
      center: e.latLng,
      jsonFile: manipurDistricts
    })
  }
  if (indianState === "Meghalaya") {
    this.setState({
      zoom: 9.2,
      center: e.latLng,
      jsonFile: meghalayaDistricts
    })
  }
  if (indianState === "Mizoram") {
    this.setState({
      zoom: 9.2,
      center: e.latLng,
      jsonFile: mizoramDistricts
    })
  }
  if (indianState === "Nagaland") {
    this.setState({
      zoom: 9.2,
      center: e.latLng,
      jsonFile: nagalandDistricts
    })
  }
  if (indianState === "Orissa") {
    this.setState({
      zoom: 8.2,
      center: e.latLng,
      jsonFile: odishaDistricts
    })
  }
}