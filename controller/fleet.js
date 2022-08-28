const knex = require('knex');
const config = require('../knexfile')
const db = knex(config.development)

// const filteredData = require('../utils/sqlite_data')
// const data = require('../../merged.json')

const createFleetData = async (req, res) => {
    const [id] = await db('fleet').insert(req.body)
    .then(item => {
        res.status(201).json(item)
        return [id]
    }).catch(error => {
        console.log(error);
        res.status(500).json({msg: error})
    })
}

const getFleetData = async (req, res) => {
    db('fleet')
    .then(items => {
        res.status(200).json(items)
    }).catch(error => {
        res.status(500).json({msg: "couldn't retrieve records"})
    })
}

const getFleetDataPoint = async (req, res) => {
    const {id} = req.params;
    db('fleet').where({id:id}).first()
    .then(record => {
        if (record) {
            res.status(200).json(record)
        } else {
            res.status(404).json({msg: "record not found"})
        }
    }).catch(error => {
        res.status(500).json({msg: "unable to perform operation"})
    })
}

const updateFleetDataPoint = async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    db('fleet').where({id}).update(data)
    .then(record => {
        if (record) {
            res.status(200).json(record)
            // return getFleetDataPoint(id)
        } else {
            res.status(404).json({msg: "record not found"})
        }
    }).catch(error => {
        res.status(500).json({msg: "Error updating record"})
    })
}

const deleteFleetDataPoint = async (res, req) => {
    const {id} = req.params;
    db('fleet').where({id:id}).del()
    .then(count => {
        if (count > 0) {
            res.status(200).json({msg: "record(s) deleted successfull"})
        } else {
            res.status(404).json({msg: 'record(s) not found'})
        }
    }).catch(error => {
        res.status(500).json({msg: "unable to perfom action"})
    })
}


module.exports = {
    createFleetData,
    getFleetData,
    getFleetDataPoint,
    updateFleetDataPoint,
    deleteFleetDataPoint
}