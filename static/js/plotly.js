Plotly.d3.json('https://public.opendatasoft.com/api/records/1.0/search/?dataset=significant-volcanic-eruption-database&q=&rows=850&start=0&facet=year&facet=tsu&facet=eq&facet=name&facet=location&fac', function(err,rows){
    console.log(rows)
    function filter_unpacking(rows,key,year){
        console.log(year)
        return rows.filter(row=>row["Elevation (m)"] == year).map(row=>row[key])
    }
})
var frames = []
var slider = [] 
var n=4 
var y= 329
for (var i = 0; i <= n; i++)
{var z = filter_unpacking}



// d3.csv('../Resources/volcano.csv'), function(err, rows){
//     console.log(rows) 
//     function unpack(rows, key, year) {
//         console.log(year)
//     return rows.filter(row=>row["Elevation (m)"] == year).map(row=>row[key])
//       }

//     var data = [{
//         type: 'choropleth',
//         locationmode: 'Country',
//         locations: unpack(rows, 'Location'),
//         z: unpack(rows, 'Name'),
//         text: unpack(rows, 'Location'),
//         autocolorscale: true
//     }];

//     var layout = {
//       title: 'Pure alcohol consumption<br>among adults (age 15+) in 2010',
//       geo: {
//           projection: {
//               type: 'robinson'
//           }
// //       }
//     };

//     Plotly.newPlot("myDiv", data, layout, {showLink: false});

