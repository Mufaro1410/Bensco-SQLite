const knex = require('knex');
const config = require('../knexfile')
const db = knex(config.development)

// const filteredData = require('../utils/sqlite_data')
// const data = require('../../merged.json')

async function createItem(data) {
    // data.forEach((row) => {
    //     const [id] = db('fleet').insert(row)
    //     return id
    // })
    const [id] = await db('fleet').insert(data)
    return [id]
}

async function readItems() {
    return db('fleet')
}

function readItem(id) {
    return db('fleet').where({id:id}).first()
}

function deleteItem(id) {
    return db('fleet').where({id:id}).del()
}

function updateItem(id, data) {
    return (
        db('fleet').where({id}).update(data).then(() => {
            return readItem(id)
        })
    )
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
    createItem,
    readItems,
    readItem,
    deleteItem,
    updateItem,
}