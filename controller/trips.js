const knex = require('knex');
const config = require('../knexfile')
const db = knex(config.development)

// const filteredData = require('../utils/sqlite_data')
// const data = require('../../merged.json')

async function createTripsData() {
    const [id] = await db('fleet').insert(data)
    return [id]
}

async function getAllTrips() {
    return await db('fleet')
        .select('fleet.id', 'fleet.date', 'fleet.time', 'fleet.location', 'fleet.zones', 'fleet.assetId', 'fleet.assetName', 'group.name')
        .join('zones', 'fleet.location', 'zones.location')
        .join('group', 'zones.group_id', 'group.id')
        .orderBy('fleet.assetName', 'fleet.date', 'fleet.time')
        // .groupBy('fleet.assetName')
}

async function getTripsByHoseName() {
    return db('fleet')
}

function getTripById(id) {
    return db('fleet').where({id:id}).first()
}


function updateTrip(id, data) {
    return (
        db('fleet').where({id}).update(data).then(() => {
            return readItem(id)
        })
        )
    }
    
function deleteTrip(id) {
    return db('fleet').where({id:id}).del()
}

// const insertData = (async () => {
//     filtered_data = filteredData(data)
//     await db('fleet').insert(filteredData[0])
//         .then(item => {
//             console.log("success");
//         }).catch(error => {
//             console.log(error);
//         })
// })

// insertData()

module.exports = {
    createTripsData,
    getAllTrips,
    getTripsByHoseName,
    getTripById,
    deleteTrip,
    updateTrip,
}