#!/usr/bin/env node
let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");

var helpObj = require('./commands/help');
var treeObj = require('./commands/tree');
// console.log(treeObj);
var organizeObj = require('./commands/organize');
// console.log(inputArr);
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help; 

let command = inputArr[0];
switch (command) {
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Please 🙏 input right command");
        break;
}







