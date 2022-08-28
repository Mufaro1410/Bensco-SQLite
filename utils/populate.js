const data = require('./merged_lite.json')
// const axios = require('axios')
// const fs = require('fs')
const knex = require('knex');
const config = require('../knexfile')
const db = knex(config.development)

// selecting required variables (date, location, zones, assertId, assetName) from API data
const filteredData = (data) => {
    const newData = Array()
    const locationData = new Set()
    const seperator = ' '
    data.forEach((item) => {
        const {date, location, zones, assetId, assetName} = item
        if (!zones[0] == '') {
            const newObj = {date: splitStr(date, seperator)[0], time: splitStr(date, seperator)[1], location:location['address'], 
                            zones:zones[0], assetID:assetId, assetName:assetName}
            newData.push(newObj)
            locationData.add(location['address'])
        }
    })
    createFleetData(newData)
    createZones(locationData)
    // return [newData, locationData]
    // createItem(newData)
    // writeToFile('./fleet.json', newData)
    // writeToFile('./zones.json', Array.from(locationData))
}

// splitting date variable into date and time variables
function splitStr(str, seperator) {
    const newStr = str.split(seperator)
    return newStr
}

// creating a json file
// function writeToFile(path, content) {
//     fs.writeFile(path, JSON.stringify(content), err => {
//         if (err) throw err;
//         console.log('complete');
//     })
// }

const createZones = async (data) => {
    const zones_data = []
    data.forEach(zone => {
        zoneObject = {}
        zoneObject["location"] = zone
        zoneObject["group_id"] = 1
        zones_data.push(zoneObject)
    })

    await db('zones').insert(zones_data).onConflict('location').ignore()
        .then(record => {
            // res.status(201).json(record)
            // return [id]
            console.log('Success');
            process.exit(0)
        }).catch(error => {
            console.log(error);
            // res.status(500).json({msg: error})
            process.exit(1)
        })
}

const createFleetData = async (data) => {
    await db('fleet').insert(data)
    .then(item => {
        // res.status(201).json(item)
        console.log('success');
        // return [id]
        // process.exit(0)
    }).catch(error => {
        console.log(error);
        // res.status(500).json({msg: error})
        // process.exit(1)
    })
}

filteredData(data)

module.exports = filteredData