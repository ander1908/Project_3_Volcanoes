// function buildPlot(volcanoes) {
//     d3.json("https://public.opendatasoft.com/api/records/1.0/search/?dataset=significant-volcanic-eruption-database&q=&rows=850&start=0&facet=year&facet=tsu&facet=eq&facet=name&facet=location&facet=country&facet=type&facet=status").then(function(data) {
//         var name = data.records.fields.name;
//         console.log(data)
//     });
// }

json_url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=significant-volcanic-eruption-database&q=&rows=850&start=0&facet=year&facet=tsu&facet=eq&facet=name&facet=location&facet=country&facet=type&facet=status"

// var volcanoData = Promise.all([json_url]).then((values) => {
//     json_url_ = values[0];
//     var volcanoData = d3.json(json_url_).then(function(data) {
//         const volcanoData = data.records.map(x => x)
        
//         return volcanoData
//         // var name = data.records.fields.name;
//         // console.log(data)
//     });
//     return volcanoData
//   });


// var volcanoData = d3.json(json_url).then(function(data) {
//     const volcanoData = data.records.map(x => x);
//     console.log(volcanoData)
//     return volcanoData
// });

// var dropDown = d3.select('#selDataset');

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

function init() {

    // resetData();

    var dropDown = d3.select('#selDataset');

    // const volcanoData = x.fields.map(x => x);
    d3.json(json_url).then((volcanoData) => {
        console.log(volcanoData);

        let volcanoDataRecords = volcanoData.records
        // Storing all countries, includes duplications
        let volcanDataRecordsCountries = []
        volcanoDataRecords.forEach((country_jsons) => {
            let country =  country_jsons.fields.country
            volcanDataRecordsCountries.push(country)
        });
        // var names = x.fields.name;

        // Deduplicating country array
        volcanDataRecordsCountries = [...new Set(volcanDataRecordsCountries)]
        volcanDataRecordsCountries.forEach((country) => {
            dropDown.append('option').text(country).property('value', country);
        })

        let defaultCountry = volcanDataRecordsCountries[0];
        console.log(defaultCountry)
        visuals(defaultCountry);
        readData(defaultCountry);
    })
}

// function resetData() {

// }

// FILE > ADD FOLDER TO WORKSPACE
// Control+D to select multiple instances of word

function optionChanged(newCountry) {
    console.log(newCountry);
    visuals(newCountry);
    readData(newCountry);
}

function filterData(volcanoData, country) {
    var filteredVolcanoData = volcanoData.filter(x => x.fields.country === country);
    console.log(filteredVolcanoData);
    return filteredVolcanoData;
};

function visuals(country) {
    d3.json(json_url).then((volcanoData) => {
        var countryData = filterData(volcanoData.records, country);
        console.log(volcanoData)

        // var name = [];
        // var event = [];
        // var year = [];
        // var vei = [];
        // var country = [];

        var event = countryData.map(x => x.geometry.recordid);
        var year = countryData.map(x => x.fields.year);
        var vei = countryData.map(x => x.fields.vei);
        var name = countryData.map(x => x.fields.name);
        var country = countryData.map(x => x.fields.country)
        
        var trace = {
            x: year,
            y: vei,
            text: name,
            mode: 'markers',
            marker: {
                size: vei * 5000, 
                color: name,
                colorscale: 'YlGnBu'
            }
        };
        var d = [trace];
        Plotly.newPlot('plot', d);   
    })
}

function readData(country) {
    console.log(country);
}


// GOAL:

// d3.json(json_url).then(function(data) {
//         const volcanoData = data.records.map(x => x);
//         console.log(volcanoData);
//         var filteredVolcanoData = filterData(volcanoData, 'Japan');
//         // var mtn = filteredVolcanoData.map(x => x.fields.name)
//         var event = filteredVolcanoData.map(x => x.geometry.recordid);
//         var year = filteredVolcanoData.map(x => x.fields.year);
//         var vei = filteredVolcanoData.map(x => x.fields.vei);
//         var name = filteredVolcanoData.map(x => x.fields.name);
//         var country = filteredVolcanoData.map(x => x.fields.country)
        
//         var trace = {
//             x: year.slice(0,25).reverse(),
//             y: vei,
//             text: name,
//             mode: 'markers',
//             marker: {
//                 size: vei * 5000, 
//                 color: name,
//                 colorscale: 'YlGnBu'
//             }
//         };
//         var d = [trace];
//         Plotly.newPlot('plot', d);        
//     });

init();
// function init() {

//     var name = [];
//     var event = [];
//     var year = [];
//     var vei = [];
//     var country = [];


//     var dropDown = d3.select('#selData');
//     const volcanoData = x.fields.map(x => x);
//     d3.json(json_url).then((volcanoData) => {
//         console.log(volcanoData);
//         var names = x.fields.name;
//         x.fields.name.forEach((name) => {
//             dropDown.append('option').text(name).property('value');
//         });
//         var defaultSample = names[0];
//         visuals(defaultSample);
//         readData(defaultSample);
//     })
// }


// function selectData(nextSample) {
//     visuals(nextSample);
//     readData(nextSample);
// }

// init();
// buildPlot(volcanoData, 'Stratovolcano');


// Chart A: X:Axis - Time (years) Y:Axis - explositivty index (VEI), type as Filter