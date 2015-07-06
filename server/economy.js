var R = require('ramda');


function gdpPerHourWorked(capital,labor, productivity){
    return R.min([capital, labor, productivity]);
}

