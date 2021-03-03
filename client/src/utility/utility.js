// function getColor(value) {
//   if ((value === "poor") || (value <= 20 && value > 0)) {
//     return "#f44336"
//   }
//   if ((value === "fair") || (value <= 40 && value > 20)) {
//     return "#f58732"
//   }
//   if ((value === "good") || (value <= 60 && value > 40)) {
//     return "#ffc108"
//   }
//   if ((value === "very good") || (value <= 80 && value > 60)) {
//     return "#8bc34a"
//   }
//   if ((value === "excellent" || (value <= 100 && value > 80))) {
//     return "#1a9926"
//   }
// }

function inrFormat(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currency: 'INR',
  }).format(value);
}
function usdFormat(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currency: 'USD',
  }).format(value);
}
function getColor(value) {
  if ((value === "poor")) {
    return "#f44336"
  }
  if ((value === "fair")) {
    return "#f58732"
  }
  if ((value === "good")) {
    return "#ffc108"
  }
  if ((value === "very good")) {
    return "#8bc34a"
  }
  if ((value === "excellent")) {
    return "#1a9926"
  }
  else
    return "#1a9926"
}

function getGradient0(value) {
  if ((value === "poor")) {
    return "#ff513a"
  }
  if ((value === "fair")) {
    return "#ef9e0b"
  }
  if ((value === "good")) {
    return "#ffc25e"
  }
  if ((value === "very good")) {
    return "#b4ec51"
  }
  if ((value === "excellent")) {
    return "#b4ec51"
  }
  else
    return "#b4ec51"
}
function getGradient1(value) {
  if ((value === "poor")) {
    return "#e60000"
  }
  if ((value === "fair")) {
    return "#ee7810"
  }
  if ((value === "good")) {
    return "#ffdb47"
  }
  if ((value === "very good")) {
    return "#beffa4"
  }
  if ((value === "excellent")) {
    return "#225e0a"
  }
  else
    return "#225e0a"
}


function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export { getColor, toTitleCase, getGradient0, getGradient1, inrFormat, usdFormat };