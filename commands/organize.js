
let fs = require("fs");
let path = require("path");
let types = {// key : value , key : values , 
    media: ["mp4", "mkv"], 
    archieves: ['zip', '7z', 'rar', 'tar'],
    documents: ['doc', 'pdf', 'txt'],//property
    app: ['exe', 'pkg'],
    images: ['jpg']
};

function organizefn(dirPath) {
    // console.log("Organize command implemented for ", dirPath);
    // 1. input - directory path given
    let destpath;
    if (dirPath == undefined) {
        // console.log("Please provide path");
        destpath = process.cwd();
        return;
    }
    else {
        let ifexist = fs.existsSync(dirPath); // return true / false
        if (ifexist) {
            // 2. create -> organised file -> directory(mkdir)
            destpath = path.join(dirPath, "organized files");
            if (fs.existsSync(destpath) == false) {
                fs.mkdirSync(destpath);
            }
        }
        else {
            console.log("Kindly enter the correct path");
            return;
        }
        helperorganize(dirPath, destpath);
    }
}
function helperorganize(src, dest) {
    // 3. identify category extensions in that folder
    let childname = fs.readdirSync(src);
    // console.log(childname);
    for (let i = 0; i < childname.length; i++) {
        //if folder no use if file i will organise u
        let childaddress = path.join(src, childname[i]);
        let isFile = fs.lstatSync(childaddress).isFile();
        if (isFile) {
            //  console.log(childname[i]);
            let category = getCategory(childname[i]);
            // console.log(childname[i], 'belongs to -> ', category);
            // 4. cut/ copy to the organised directory
            sendFiles(childaddress, dest, category);

        }
    }

}

function sendFiles(srcfilepath, dest, category) {
    let categorypath = path.join(dest, category);
    if (fs.existsSync(categorypath) == false) {
        fs.mkdirSync(categorypath);
    }
    let filename = path.basename(srcfilepath);
    let destfilepath = path.join(categorypath, filename);
    fs.copyFileSync(srcfilepath, destfilepath);
    console.log(filename, "copied to ", category);
    fs.unlinkSync(srcfilepath);
}



function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    // console.log(ext);
    for (let key in types) {
        let ctypearr = types[key];
        for (let i = 0; i < ctypearr.length; i++) {
            if (ext == ctypearr[i]) {
                return key;
            }
        }

    }
    return "others";

}




module.exports = {
    organizeKey: organizefn
}
