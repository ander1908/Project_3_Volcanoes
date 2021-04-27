console.log("table.js")

// id="selDataset" in the index.html
var select_tag = d3.select("#selDataset");

// Allow User to select which country to show
select_tag
  .append("option")
  .property("value", "")
  .text("Select Country");

// Import the data into the table

country_list = [];
tableData = [];

d3.csv("static/data/volcano_data.csv").then((importedData) => {
  tableData = importedData
  console.log("tableData")
  console.log(tableData)

  var cuntries = importedData.map(x => x.country);
  // console.log("cuntries");
  // console.log(cuntries);

  cuntries.sort()

  // Elimiate country titles for the selection choice.
  cuntries.map((name) => {

    if (country_list.indexOf(name) === -1) {
      country_list.push(name)

      select_tag
        .append("option")
        .property("value", name)
        .text(name);
    }

  });

});

const tbody = d3.select("tbody");

function optionChanged(selected_country) {
  console.log("selected_country=", selected_country);

  // Bar Chart
  results = tableData.filter(row => row.country == selected_country);
  console.log("results")
  console.log(results)

  year_list = [];
  vei_list = [];
  text_list = [];

  var i = 0;

  results.forEach((row) => {
    i = i + 1
    console.log("y_list")
    console.log(row.year)
    year_list.push('case ' + i + ' - ' + row.year);
    vei_list.push(row.vei);
    text_list.push("Type: " + row.type + "<br>" + "Coordinates: " + row.coordinates);
  });

  var bar_trace = {
    y: year_list,
    x: vei_list,
    text: text_list,
    type: "bar",
    orientation: "h",
  };

  var data = [bar_trace];

  // Screen heading  
  var bar_layout = {
    title: selected_country + " - Volcano Cases after 1900-01-01",
    margin: { t: 30, l: 150 }
  };

  Plotly.newPlot("bar", data, bar_layout);

  // Table view
  tbody.html("");

  const tbl_header = tbody.append("tr");
  let header = tbl_header.append("th");
  header.text("Country");
  header = tbl_header.append("th");
  header.text("Coordinates");
  header = tbl_header.append("th");
  header.text("Type");
  header = tbl_header.append("th");
  header.text("VEI");
  header = tbl_header.append("th");
  header.text("Year");

  results.map((row) => {
    const tbl_data = tbody.append("tr");
    // console.log("row")
    // console.log(row)

    // Create multiple td cells for each row
    Object.values(row).forEach((value) => {
      let cell = tbl_data.append("td");
      cell.text(value);
    });
  });


}

//   console.log("importedData")
//   console.log(importedData)

//   var subject_ids = importedData.names;
//   // var subject_ids = importedData["names"];
//   console.log("Subject_ids")
//   console.log(subject_ids)

//   // subject_ids.forEach((id) => {
//   //   select_tag
//   //     .append("option")
//   //     .property("value", id)
//   //     .text(id);
//   // });

//   subject_ids.map((id) => {
//     select_tag
//       .append("option")
//       .property("value", id)
//       .text(id);
//   });

//   // index.html is loaded with the dashboard of 940 for the initial page load
//   optionChanged(subject_ids[0]);

// });

// // The function is triggered by an option change in the Dropdown box of "Test Subject ID No" in index.html
// // <select id="selDataset" onchange="optionChanged(this.value)">
// function optionChanged(selected_id) {
//   console.log("selected_id=", selected_id);

//   d3.json("samples.json").then((data) => {
//     //   Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//     // * Use`sample_values` as the values for the bar chart.
//     // * Use`otu_ids` as the labels for the bar chart.
//     // * Use`otu_labels` as the hovertext for the chart.

//     var samples = data.samples;
//     var results = samples.filter(sampleObj => sampleObj.id == selected_id);

//     console.log("samples: ");
//     console.log(samples);

//     var result = results[0];

//     console.log("results: ");
//     console.log(results);

//     console.log("result: ");
//     console.log(result);

//     var otu_ids = result.otu_ids;
//     var otu_labels = result.otu_labels;
//     var sample_values = result.sample_values;

//     var y_label = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

//     console.log("y_label: ");
//     console.log(y_label);

//     console.log("sample_valuese: ");
//     console.log(sample_values.slice(0, 10).reverse());

//     var bar_trace = {
//       y: y_label,
//       x: sample_values.slice(0, 10).reverse(),
//       text: otu_labels.slice(0, 10).reverse(),
//       type: "bar",
//       orientation: "h",
//     };

//     var data = [bar_trace];

//     var bar_layout = {
//       title: "Top 10 OTUs",
//       margin: { t: 30, l: 150 }
//     };

//     Plotly.newPlot("bar", data, bar_layout);

//     //==================================================

//     // Create a bubble chart that displays each sample.
//     // * Use`otu_ids` for the x values.
//     // * Use`sample_values` for the y values.
//     // * Use`sample_values` for the marker size.
//     // * Use`otu_ids` for the marker colors.
//     // * Use`otu_labels` for the text values.

//     var results = samples.filter(sampleObj => sampleObj.id == selected_id);
//     var result = results[0];

//     var otu_ids = result.otu_ids;
//     var otu_labels = result.otu_labels;
//     var sample_values = result.sample_values;

//     var bubble_trace = {
//       x: otu_ids,
//       y: sample_values,
//       text: otu_labels,
//       mode: "markers",
//       marker: {
//         size: sample_values,
//         color: otu_ids,
//         colorscale: "Earth"
//       }
//     };

//     var data = [bubble_trace];

//     var bubble_layout = {
//       hovermode: "closest",
//       xaxis: { title: "OTU ID" },
//       margin: { t: 30 }
//     };

//     Plotly.newPlot("bubble", [bubble_trace], bubble_layout);
//   });
//   //====================================================

//   // Demorgrphic info
//   d3.json("samples.json").then((data) => {
//     var metadata = data.metadata;

//     console.log("metadata");
//     console.log(metadata);

//     var results = metadata.filter(metadataObj => metadataObj.id == selected_id);
//     var result = results[0];

//     console.log("results")
//     console.log(results)

//     console.log("result")
//     console.log(result)

//     var fig = d3.select("#sample-metadata");

//     fig.html("");

//     Object.entries(results[0]).forEach(([key, value]) => {
//       fig.append("h5").text(`${key}: ${value}`);
//     });

//     // buildGauge(result.wfreq);

//   });
// }




