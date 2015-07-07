var R = require('ramda');
Labor = {};

var INITIAL_POPULATION = 4e6,
    MAX_CHILD_AGE = 14,
    MIN_ELDER_AGE = 65,
    YEARS = 60;

var Demography = module.exports = {};

Demography.difference = function difference(sum, n) {
    return Math.round((2 * sum) / (n * (n - 1)));
};

function cohort(age, size, year) {
    return {
        age: age,
        size: size,
        year: year
    };
}

// Create initial population pyramid
Demography.createCohorts = function createCohorts(population, years, year) {
    var difference = Demography.difference(population, years);
    return R.reduce(function (m, age) {
        var size = Math.round(difference * (years - age) * 0.5);
        return m.concat(cohort(age, size, year));
    }, [], R.range(0, years));
};

// 
Demography.nextCohorts = function nextCohorts(cohorts, born, died) {
    return perish(mature(cohorts,born),died);
}

// Advance cohorts by 1 year & add new born cohort
function mature(cohorts, born, year) {
        return R.map(function (d) {
            return cohort(d.age + 1, d.size, year);
        }, cohorts).concat(cohort(0, born, year));
    }
// Remove dead from the cohorts
function perish(cohorts, died) {
    return R.reduce(function (res, c) {
            var deaths = Math.round(Math.min(c.size / res.index, res.died));
            return {
                died: res.died - deaths,
                cohorts: res.cohorts.concat(c.size <= deaths ? cohort(c.age, c.size - deaths, c.year) : []),
                index: res.index + 1
            }
        }, {
            died: died,
            index: 1,
            cohorts: []
        },
        R.sortBy(R.compose(R.negate, R.prop('age')), cohorts));
}

Demography.groupCohorts = function (cohorts, groupSize) {
    var withGroup = Demography.addGroup(cohorts, groupSize),
        groups = R.groupBy(R.prop('group'),withGroup),
        keys = R.sortBy(function (groupName) {
            return parseInt(groupName.substr(0, groupName.indexOf('-')));
        },R.keys(groups));
    return R.map(function (key) {
        return R.merge({group: key}, {size: R.sum(R.pluck('size',groups[key]))});
    },keys);
};

Demography.addGroup = function (cohorts, size) {
    return R.map(function (cohort) {
        return R.merge({
            group: Demography.groupName(cohort.age, size)
        }, cohort);
    },cohorts);
};

Demography.groupName = function (age, size) {
    var start = Math.floor(age / size) * size;
    return start.toString() + " - " + (start + size - 1).toString();
};