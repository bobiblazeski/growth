var R = require('ramda');

var Economy = module.exports = {};

function gdpPerHourWorked(capital,labor, productivity){
    return R.min([capital, labor, productivity]);
}

Economy.gdpPerCapita = function gdpPerCapita(gdp, population) { 
    return gdp / population; 
}

