export default [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [
      {
        color: "#141923"
      }
    ]
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        gamma: 0.01
      },
      {
        lightness: 20
      },
      {
        weight: "1.39"
      },
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        weight: "0.96"
      },
      {
        saturation: "9"
      },
      {
        visibility: "on"
      },
      {
        color: "#000000"
      }
    ]
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "shown",
        weight: "1.11"
      },
      {
        hue: "#fff"
      }
    ]
  },
  {
    //color country border
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        visibility: "hidden",
        lightness: 30
      },
      {
        saturation: "9"
      },
      {
        color: "#395d90"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        hue: "#b2ff00"
      },
      {
        weight: "6.64"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        saturation: 20
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        lightness: 20
      },
      {
        saturation: -20
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        lightness: 10
      },
      {
        saturation: -30
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#193a55"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        saturation: 25
      },
      {
        lightness: 25
      },
      {
        weight: "0.01"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        lightness: -20
      }
    ]
  }
];
