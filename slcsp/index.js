var fs = require('fs');

function parseFile(fileName, cb) {
  var array = fs.readFileSync(fileName, 'utf8');
  array = array.split('\n').map(function(line) {
    return line = line.split(',');
  });
  return cb ? cb(array) : array;
}

function findSLCSP(area) {
  var currentArea = rateData[area].filter(function(plan) {
    return plan[2] === "Silver";
  });

  var lowestPlan = currentArea.sort(function(a, b) {
    return a[3] - b[3];
  });
  return lowestPlan[1][3];
};

function writeFile(file, data) {
  fs.writeFile(file, data, function(err) {
    if (err) {
      throw err;
    }
    console.log('File', file, 'successfully written');
  });
}

var knownAmbiguous = [];

var zipData = parseFile('zips.csv', function(data) {
  var zipObj = {};
  for (var i = 1; i < data.length-1; i++) {
    var zipCode = data[i][0];
    !zipObj[zipCode] ? zipObj[zipCode] = data[i] : knownAmbiguous.push(zipCode);
  }
  return zipObj;
});

var rateData = parseFile('plans.csv', function(data) {
  var rateObj = {};
  for (var i = 1; i < data.length-1; i++) {
    var rateArea = data[i][4];
    rateObj[rateArea] ? rateObj[rateArea].push(data[i]) : rateObj[rateArea] = new Array(data[i]);
  }
  return rateObj;
});

var slcspFile = parseFile('slcsp.csv', function(data) {
  for (var i = 1; i < data.length-1; i++) {
    var zip = data[i][0];
    var rateArea;
    if (!knownAmbiguous.includes(zip)) {
      rateArea = zipData[zip][4];
      data[i][1] = findSLCSP(rateArea);
    }
  }
  arrayToCSV(data);
});

function arrayToCSV(data) {
  data = data.map(function(arr) {
    return arr.join(',');
  }).join('\n');

  writeFile('testslcsp.csv', data);
};
