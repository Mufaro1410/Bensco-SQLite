const knex = require('knex');
const config = require('../knexfile')
const db = knex(config.development)

async function createItem(data) {
    const [id] = await db('zones').insert(data).onConflict('location').ignore()
    return [id]
}

async function readItems() {
    return db('zones')
}

function readItem(id) {
    return db('zones').where({id:id}).first()
}

function updateItem(id, data) {
    return (
        db('zones').where({id}).update(data).then(() => {
            return readItem(id)
        })
    )
}

function deleteItem(id) {
    return db('zones').where({id}).del()
}


module.exports = {
    createItem,
    readItems,
    readItem,
    deleteItem,
    updateItem,
}