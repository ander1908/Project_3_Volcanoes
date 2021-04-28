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

  var volcanoData = d3.json(json_url).then(function(data) {
    const volcanoData = data.records.map(x => x);
    console.log(volcanoData)
    return volcanoData
});


function filterData(volcanoData, type) {
    var filteredVolcanoData = volcanoData.filter(x => x.fields.name === type);
    console.log(filteredVolcanoData);
    return filteredVolcanoData;
};

// GOAL:

d3.json(json_url).then(function(data) {
        const volcanoData = data.records.map(x => x);
        var filteredVolcanoData = filterData(volcanoData, 'Vesuvius');
        // var mtn = filteredVolcanoData.map(x => x.fields.name)
        var event = filteredVolcanoData.map(x => x.geometry.recordid);
        var time = filteredVolcanoData.map(x => x.fields.year);
        var vei = filteredVolcanoData.map(x => x.fields.vei);
        
        var trace = {
            x: time.slice(0,25).reverse(),
            y: vei,
            mode: 'markers',
            marker: {
                size: vei * 1000, 
                color: event
            }
        };
        var d = [trace];
        Plotly.newPlot('plot', d);        
    });

function init() {
    var dropDown = d3.select('#selData');
    const volcanoData = data.records.map(x => x);
    d3.json(json_url).then((volcanoData) => {
        console.log(volcanoData);
        var names = x.fields.name;
        x.fields.name.forEach((name) => {
            dropDown.append('option').text(name).property('value');
        });
        var defaultSample = names[0];
        visuals(defaultSample);
        readData(defaultSample);
    })
}


function selectData(nextSample) {
    visuals(nextSample);
    readData(nextSample);
}

init();
// buildPlot(volcanoData, 'Stratovolcano');


// Chart A: X:Axis - Time (years) Y:Axis - explositivty index (VEI), type as Filter