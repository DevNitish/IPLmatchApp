/**
 * This sub-app take csv file and convert it to JSON file and saves the data in mongodb
 * Eg: Here it takes matches.csv file and convert it into json (in raw folder)
 * To start this app type `node jsonMaker.js`
 */
var fs = require("fs");
var mongoose=require("mongoose");
var MATCH=require('../server/models/match.js')
//connect to db
var config = require('../config/config'); // getting the mongo server from config file
mongoose.connect(config.mongoconnectionstring);
var data = fs.readFileSync('../raw/matches.csv');
var stringData=data.toString();
var arrayOne= stringData.split('\r\n');
var header=arrayOne[0].split(',');//get the header of the csv
var noOfRow=arrayOne.length;
var noOfCol=header.length;
var jArray=[];

var i=0,j=0; 
for (i = 1; i < noOfRow-1; i++) {

    var obj = {};
    var myNewLine=arrayOne[i].split(',');

    for (j = 0; j< noOfCol; j++) {
        var headerText = header[j].substring(0,header[j].length);
        var valueText = myNewLine[j].substring(0,myNewLine[j].length);
        obj[headerText] = valueText;
    };
    //save the details of match in mongo db
    MATCH.saveMatch(obj,(err,data)=>{
        if(err){
            console.log("somthing went wrong")
        }
        else{
            console.log("data inserted ",data);
        }

    })
    //push into an array for writing into an array
    jArray.push(obj);
};

//write the json data in file for making D3 chats diagrams
fs.writeFile( "../raw/shvsrcb.json", JSON.stringify( jArray ), "utf8");
