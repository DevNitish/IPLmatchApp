/**
 * this file for testing
 */
var fs = require("fs");
var data = fs.readFileSync('./data.csv');
var stringData = data.toString();

var calculator = function (S) {

    var mainArr = S.split('\r\n');
    var longestCall = 0;
    var free = null;
    var highestCallBill = 0;
    var largestPhone=0;
    const sixty = 60;
    var paidCallArr = [];
    var totalBill = 0;
    for (var i = 0; i < mainArr.length; i++) {
        var obj = mainArr[i];
        var slipted = obj.split(':');
        var sliptedPhone=obj.split('-');
        var phoneNumber=sliptedPhone[0].split(',')[1]+''+sliptedPhone[1]+''+sliptedPhone[2];
        var getH = slipted[0];
        var getM = slipted[1];
        var getS = slipted[2].split(',')[0];
        var duration = (parseInt(getH) * sixty * sixty) + (parseInt(getM) * sixty) + parseInt(getS);

        var bill = calculateBill(getH, getM, getS, duration);
        if (bill >= highestCallBill) {
            if(bill==highestCallBill){
                        if (phoneNumber>largestPhone) {
                        largestPhone=phoneNumber;
                        console.log("===");
                        }
            }else{
            highestCallBill = bill;
            }
        }
        totalBill += bill;
       console.log("bill",bill);
    }
    //for loop ends
    var finalBill = totalBill - highestCallBill;
     console.log( finalBill);

    return finalBill;
}
//main function
var calculateBill = function (hr, min, sec, duration) {
    var total = 0;
    if (duration < 300) {
        total = duration * 3;
         return total;
    } else if (min >= 5) {

        if (sec > 0) {
            total = (parseInt(min) + 1) * 150;
            console.log("here",parseInt(min) + 1);
        } else{
            total = min * 150;
        }
         return total;
    }
   
}
// 00:01:07,400-234-090
// 00:05:01,701-080-080
// 00:05:00,400-234-090

calculator(stringData);