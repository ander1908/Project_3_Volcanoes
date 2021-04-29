
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// var baseMaps = {
//     "StreetMap": streetmap
// };

// var overlayMaps = {
//     "Volcano Eruptions": volcanoes
// };

var layers = {
    HISTORICAL: new L.LayerGroup(),
    HOLOCENE: new L.LayerGroup(),
    RADIOCARBON: new L.LayerGroup(),
    ANTHROPOLOGY: new L.LayerGroup(),
    TEPHROCHRONOLOGY: new L.LayerGroup(),
    UNCERTAIN: new L.LayerGroup(),
    FUMAROLIC: new L.LayerGroup() 
};


var map = L.map("map-id", {
    center: [19.425,
        -155.292],
    zoom: 2,
    layers: [        
    layers.HISTORICAL,
    layers.HOLOCENE,
    layers.RADIOCARBON,
    layers.ANTHROPOLOGY,
    layers.TEPHROCHRONOLOGY,
    layers.UNCERTAIN,
    layers.FUMAROLIC
    ]

    // layers: [streetmap, volcanoes]
});
streetmap.addTo(map);

var overlays = {
    "Historical": layers.HISTORICAL,
    "Holocene":layers.HOLOCENE,
    "Radiocarbon":layers.RADIOCARBON,
    "Anthropology":layers.ANTHROPOLOGY,
    "Tephrochronology":layers.TEPHROCHRONOLOGY,
    "Uncertain":layers.UNCERTAIN,
    "Fumarolic":layers.FUMAROLIC
    }
L.control.layers(null, overlays).addTo(map);
        
var info = L.control({
    position: "bottomright"
});   

info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
};


var icons = {
    HISTORICAL: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "yellow",
      shape: "star"
    }),
    HOLOCENE: L.ExtraMarkers.icon({
      markerColor: "red",
      shape: "circle"
    }),
    RADIOCARBON: L.ExtraMarkers.icon({
      markerColor: "blue-dark",
      shape: "penta"
    }),
    ANTHROPOLOGY: L.ExtraMarkers.icon({
      markerColor: "orange",
      shape: "circle"
    }),
    TEPHROCHRONOLOGY: L.ExtraMarkers.icon({
      markerColor: "green",
      shape: "circle"
    }),
    UNCERTAIN: L.ExtraMarkers.icon({
        markerColor: "green",
        shape: "circle"
      }),
    FUMAROLIC: L.ExtraMarkers.icon({
        markerColor: "green",
        shape: "circle"
      })
};

d3.json("https://public.opendatasoft.com/api/records/1.0/search/?dataset=significant-volcanic-eruption-database&q=&rows=850&start=0&facet=year&facet=tsu&facet=eq&facet=name&facet=location&facet=country&facet=type&facet=status").then(function(statusMarkers) {
    var mtns = statusMarkers.records;


    var statusCount = {
        HISTORICAL:0,
        HOLOCENE:0,
        RADIOCARBON:0,
        ANTHROPOLOGY:0,
        TEPHROCHRONOLOGY:0,
        UNCERTAIN:0,
        FUMAROLIC:0 
    };
    var volcanoStatusCode;

    for(var index = 0; index < mtns.length; index++) {
        var mtn = mtns[index].fields;

        if (!mtn.Historical) {
            volcanoStatusCode = "Historical";
          }
          
          else if (!mtn.Holocene) {
            volcanoStatusCode = "Holocene";
          }
          
          else if (mtn.Radiocarbon) {
            volcanoStatusCode = "Radiocarbon";
          }
          
          else if (mtn.Anthropology) {
            volcanoStatusCode = "Anthropology";
          }

          else if (mtn.Thephrochronology) {
            volcanoStatusCode = "Thephrochronology";
          }

          else if (mtn.Uncertain) {
            volcanoStatusCode = "Uncertain";
          }
          
          else {
            volcanoStatusCode = "FUMAROLIC";
          }

          statusCount[volcanoStatusCode]++;
        
          var newMarker = L.marker([mtn.coordinates], {
              icon: icons[volcanoStatusCode]
          });

          newMarker.addTo(layers[volcanoStatusCode]);

          // Bind a popup to the marker that will  display on being clicked. This will be rendered as HTML.
          newMarker.bindPopup(mtn.name + "<br> Status: " + mtn.status + "<br> Eruption Year: " + mtn.year);
        }

});

function updateLegend(time, statusCount) {
    document.querySelector(".legend").innerHTML = [
      "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
      "<p class='historical'>Historical: " + statusCount.HISTORICAL + "</p>",
      "<p class='holocene'>Stations Coming Soon: " + statusCount.HOLOCENE + "</p>",
      "<p class='radiocarbon'>Empty Stations: " + statusCount.RADIOCARBON + "</p>",
      "<p class='low'>Low Stations: " + statusCount.ANTHROPOLOGY + "</p>",
      "<p class='healthy'>Healthy Stations: " + statusCount.TEPHROCHRONOLOGY + "</p>",
      "<p class='healthy'>Healthy Stations: " + statusCount.UNCERTAIN + "</p>",
      "<p class='healthy'>Healthy Stations: " + statusCount.FUMAROLIC + "</p>"
    ].join("");
}




// function createMarkers(response) {
//     console.log(response);
//     var mtns = response.records;

//     var volMarkers = [];

//     for(var index = 0; index < mtns.length; index++) {
//         var mtn = mtns[index].fields;

//         var volMarker = L.marker(mtn.coordinates)
//         .bindPopup("<h3>" + mtn.name + "<h3><h3>Type: " + mtn.type + "</h3><h3>Elevation: " + mtn.elevation + "</h3>");

//         volMarkers.push(volMarker);
        
//     }
    
//     createMap(L.layerGroup(volMarkers));
// }

