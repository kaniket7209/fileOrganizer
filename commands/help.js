// help is done
function helpfn() {
    console.log(`
    List of all commands:
                node main.js tree "directoryPath"
                node main.js organize "directoryPath"
                node main.js help;
    `);
}

module.exports = {
    helpKey : helpfn
}