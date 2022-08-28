const knex = require('knex');
const config = require('../knexfile')
const db = knex(config.development)

const createGroup = async (req, res) => {
    const body = req.body
    const [id] = await db('group').insert(body).onConflict('name').ignore()
    .then(item => {
        res.status(201).json(item)
        return [id]
    }).catch(error => {
        res.status(500).json({msg: error})
    })
}

const getGroups = async (req, res) => {
    await db('group')
    .then(items => {
        res.status(200).json(items)
    }).catch(error => {
        res.status(500).json({msg: error})
    })
}

const getGroup = async (req, res) => {
    const {id} = req.params
    await db('group').where({id}).first()
    .then(record => {
        if (record) {
            res.status(200).json(record)
        } else {
            res.status(404).json({msg: "record not found"})
        }
    }).catch(error => {
        res.status(500).json({msg: error})
    })
}

const updateGroup = async (req, res) => {
    const {id} = req.params;
    const body = req.body
    await db('group').where({id}).update(body)
    .then(record => {
        if (record) {
            res.status(200).json(record)
        } else {
            res.status(404).json({msg: "record not found"})
        }
    }).catch(error => {
        res.status(500).json({msg: error})
    })
}

const deleteGroup = async (req, res) => {
    const {id} = req.params;
    await db('group').where({id}).del()
    .then(count => {
        if (count > 0) {
            res.status(200).json({msg: "record(s) deleted successfull"})
        } else {
            res.status(404).json({msg: 'record(s) not found'})
        }
    }).catch(error => {
        res.status(500).json({msg: error})
    })
}


module.exports = {
    createGroup,
    getGroups,
    getGroup,
    updateGroup,
    deleteGroup
}