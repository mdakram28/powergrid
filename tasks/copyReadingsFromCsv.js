var csvFileName = process.argv[2];
var fs = require('fs');
var csv = require('fast-csv');
var async = require('async');

var Models = require('../app/models');
var Reading = Models.Reading;

var moment = require('moment');

var i = 0;
var columns = [];

var allData = [];
var data = [];

var updateBlockLength = 1000;

fs.createReadStream(csvFileName)
    .pipe(csv())
    .on("data", function(row) {
        if (i > 0) {
            //console.log(i);
            var obj = {};
            for (var j = 0; j < row.length; j++) {
                obj[columns[j]] = row[j];
            }
            var ind = i;
			// var old = obj['datetime'];
            var d = Date.parse(obj['datetime']);
            if (!d) {
                d = moment(obj['datetime'], 'MM-DD-YYYY H.mm.SS A'); // for 06-01-2015  8.09.00 AM
                obj['datetime'] = d.format();
            } else {
                obj['datetime'] = moment(d).format();
            }
            data.push(obj);
            if (ind % updateBlockLength == 0) {
				console.log('items read :: '+data.length);
            }

        } else if (i == 0) {
            columns = row;
        }
        i++;
    })
    .on("end", function() {
        console.log("Done reading from CSV .. " + i);
		while(data.length > 0){
			allData.push(data.splice(0,updateBlockLength));
		}

        console.log("Total blocks :: " + allData.length);
		for (var j = 0; j < allData.length; j++) {
			console.log(j + " :: " + allData[j].length);
		}

        async.eachOfSeries(allData, function(block, ind, callback) {
            console.log("Writing block .. " + ind + " :: " + block.length);
            Reading.bulkCreate(block)
                .then(function() {
                    console.log('done ------------------------------------ ' + ind);
                    callback();
                }).catch(function(error) {
                    console.log('errror in ' + ind + ' :: ' + error.toString());
                    callback(error);
                });
        }, function(err) {
            if (err) {
                console.log("failed");
            } else {
                console.log("Complete");
            }
        })

    });
