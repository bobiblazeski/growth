var Economy = require('../server/economy');
var Demography = require('../server/demography');
var Util = require('../shared/util');

console.log(Economy.gdpPerCapita(100,20));


//var data = [{"gender":"Male","startAge":5,"group":"0 - 4","size":285589}];

var cohorts = Demography.createCohorts(4e6, 70,1938);

var chunks = Util.chunk(cohorts,5);

console.log(cohorts,chunks);
var pyramid = Demography.groupCohorts(cohorts,5);
console.log('grouped cohorts',pyramid);
window.Demography = Demography;

d3plus.viz()
        .container('#pyramid')
        .data(pyramid)
        .type("bar")
        .id("gender")
        .x({"stacked": true, "value": "size"})
        .y("startAge") 
        .y({"scale": "discrete"})        
        .draw()


 var sample_data = [
    {"year": 1991, "name":"alpha", "value": 29},
    {"year": 1992, "name":"alpha", "value": 18},
    {"year": 1993, "name":"alpha", "value": 2},
    {"year": 1994, "name":"alpha", "value": 7},
    {"year": 1991, "name":"beta", "value": 11},
    {"year": 1992, "name":"beta", "value": 15},
    {"year": 1993, "name":"beta", "value": 37},
    {"year": 1994, "name":"beta", "value": 54}
  ]
  
  var attributes = [
    {"name": "alpha", "hex": "#CC0000"},
    {"name": "beta", "hex": "#00CC00"}
  ]

  var visualization = d3plus.viz()
    .container("#lines")
    .data(sample_data)
    .type("line")
    .id("name")
    .y("value")
    .x("year")
    .attrs(attributes)
    .color("hex")
    .draw()