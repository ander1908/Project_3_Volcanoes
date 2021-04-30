json_url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=significant-volcanic-eruption-database&q=&rows=850&start=0&facet=year&facet=tsu&facet=eq&facet=name&facet=location&facet=country&facet=type&facet=status"

var volSelect = d3.select('#selData');

// var table = d3.select('#sample-metadeta');

var bubbleChart = d3.select("bubble");
var volcanoData = d3.json(json_url).then(function(data) {
    const volcanoData = data.records.map(x => x);
    console.log(volcanoData)
    return volcanoData
});


function init() {

    //calling function below to reset
    resetData();

    d3.json(json_url).then((volcanoData => {
        // console.log(volcanoData);

        //---------------------------
        //Populate Dropdown with countries
        //------------------------------


    var dropDown = d3.select('#selData');
    // const volcanoData = x.fields.map(x => x);

        
        volcanoData.geometry.forEach((recordId => {
            var option = volSelect.append("option");
            option.text(recordId);
        }));//close forEach

        var initId = volSelect.property("value")

        //calling function i havent made
        plotCharts(initId);
    }));

    //     var defaultSample = names[0];
    //     visuals(defaultSample);
    //     readData(defaultSample);
    // })
}

function resetData() {
    bubbleChart.html("");

}



function filterData(volcanoData, type) {
    var filteredVolcanoData = volcanoData.filter(x => x.fields.name === country);
    console.log(filteredVolcanoData);
    return filteredVolcanoData;
};

// GOAL:

function plotCharts(recordId) {

    d3.json(json_url).then(function(data) {

        //-------------
        //Details Table
        //-------------

        var filteredData = volcanoData.fields.filter(event => event.name == name)[0];

        //interate thru keys and values 
        Object.entries(filteredData).forEach(([key,value]) => {

            var newList = detailsTable.append("ul");
            newList.attr("class", "list-group list-group-flush");

            // change the class attributes of the list item for styling
            listItem.attr("class", "list-group-item p-1 demo-text bg-transparent");

            listItem.text(`${key}: ${value}`);
        }); //close forEach

        //---------------
        //Retrieve Data for Plotting
        //---------------

        var individualEvent = filteredData.geometry.filter(event => event.recordId == recordId)[0];

        var name = [];
        var vei = [];
        var year = [];
        var year = [];
        var country = [];
        var status = [];

        Object.entries(individualEvent).forEach(([key, value]) => {

            switch (key) {
                case "name":
                    name.push(value);
                    break;
                case "vei":
                    vei.push(value);
                    break;
                case "year":
                    year.push(value);
                    break;
                case "recordid":
                    recordid.push(value);
                    break;
                default:
                    break;
            }
        });

        

            // const volcanoData = data.records.map(x => x);
            // var filteredVolcanoData = filterData(volcanoData, 'Vesuvius');
            // // var mtn = filteredVolcanoData.map(x => x.fields.name)
            // var event = filteredVolcanoData.map(x => x.geometry.recordid);
            // var time = filteredVolcanoData.map(x => x.fields.year);
            // var vei = filteredVolcanoData.map(x => x.fields.vei);
            
            var bubbleTrace = {
                x: time.slice(0,25).reverse(),
                y: vei,
                mode: 'markers',
                marker: {
                    size: vei * 1000, 
                    color: country[0],
                    colorscale: 'YlGnBu'
                }
            };
            var bubbleData = [bubbleTrace];
            Plotly.newPlot('bubble', bubbleData);        
        });
};

        
        
function selectData(recordId) {
            resetData();
            plotCharts(recordId);
}
        
init();





