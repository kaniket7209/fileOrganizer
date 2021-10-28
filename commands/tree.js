
let fs = require("fs");
let path = require("path");


function treefn(dirPath) {
    if (dirPath == undefined) {
        // console.log("Please provide path");
        process.cwd();
        treehelper(process.cwd(), "");
        return;
    }
    else {
        let ifexist = fs.existsSync(dirPath); // return true / false
        if (ifexist) {
            treehelper(dirPath, "");
        }
        else {
            console.log("Kindly enter the correct path");
            return;
        }
        // helperorganize(dirPath, destpath);
    }
}

function treehelper(dirPath, indent) {
    //is file or folder
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile) {
        let filename = path.basename(dirPath);
        console.log(indent + "├──" + filename);
    }
    else {
        let dirname = path.basename(dirPath);
        console.log(indent + "└──" + dirname);
        let childrens = fs.readdirSync(dirPath);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(dirPath, childrens[i]);
            treehelper(childPath, indent + "\t");
        }
    }
}

module.exports = {
    treeKey : treefn
}