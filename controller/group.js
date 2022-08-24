const knex = require('knex');
const config = require('../knexfile')
const db = knex(config.development)

async function createItem(data) {
    const [id] = await db('group').insert(data).onConflict('name').ignore()
    return [id]
}

async function readItems() {
    return db('group')
}

function readItem(id) {
    return db('group').where({id}).first()
}

function updateItem(id, data) {
    return (
        db('group').where({id}).update(data).then(() => {
            return readItem(id)
        })
    )
}

function deleteItem(id) {
    return db('group').where({id}).del()
}


module.exports = {
    createItem,
    readItems,
    readItem,
    deleteItem,
    updateItem,
}