var R = require('ramda');

// Represents physical capital of the country
var Capital = module.exports = {};

Capital.next = function next(now, investment, depreciation){
    return now+investment-depreciation;
}