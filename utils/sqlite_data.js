const data = require('../../merged.json')
const axios = require('axios')
const fs = require('fs')
const {createItem} = require('../controller/fleet')


const newData = Array()
const locationData = new Set()
const seperator = ' '

// selecting required variables (date, location, zones, assertId, assetName) from API data
const filteredData = (data) => {
    data.forEach((item) => {
        const {date, location, zones, assetId, assetName} = item
        if (!zones[0] == '') {
            const newObj = {date: splitStr(date, seperator)[0], time: splitStr(date, seperator)[1], location:location['address'], 
                            zones:zones[0], assetID:assetId, assetName:assetName}
            newData.push(newObj)
            locationData.add(location['address'])
        }
    })
    // return console.log([newData, locationData]);
    // return newData
    // createItem(newData)
    writeToFile('../fleet.json', newData)
}
    
// splitting date variable into date and time variables
function splitStr(str, seperator) {
    const newStr = str.split(seperator)
    return newStr
}

function writeToFile(path, content) {
    fs.writeFile(path, JSON.stringify(content), err => {
        if (err) throw err;
        console.log('complete');
    })
}

filteredData(data)

module.exports = filteredData