var Economy = require('../server/economy');
var Demography = require('../server/demography');
var Util = require('../shared/util');

console.log(Economy.gdpPerCapita(100,20));


var data = [{"gender":"Male","startAge":5,"group":"0 - 4","size":285589}];

var cohorts = Demography.createCohorts(4e6, 70,1938);

var chunks = Util.chunk(cohorts,5);

console.log(cohorts,chunks);

console.log('grouped cohorts',Demography.groupCohorts(cohorts,5));
window.Demography = Demography;

d3plus.viz()
        .container('#viz')
        .data(data)
        .type("bar")
        .id("gender")
        .x({"stacked": true, "value": "size"})
        .y("startAge") 
        .y({"scale": "discrete"})        
        .draw()