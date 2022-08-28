const knex = require('knex');
const config = require('../knexfile')
const db = knex(config.development)


const createZones = async (req, res) => {
    const data = req.body
    const zones_data = []
    data.forEach(zone => {
        zoneObject = {}
        zoneObject["location"] = zone
        zoneObject["group_id"] = 1
        zones_data.push(zoneObject)
    })

    const [id] = await db('zones').insert(zones_data).onConflict('location').ignore()
        .then(record => {
            res.status(201).json(record)
            return [id]
        }).catch(error => {
            res.status(500).json({msg: error})
        })
}

const getZones = async (req, res) => {
    db('zones')
    .then(items => {
        res.status(200).json(items)
    }).catch(error => {
        res.status(500).json({msg: error})
    })
}

const getZone = async (req, res) => {
    const {id} = req.params;
    db('zones').where({id:id}).first()
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

const updateZone = async (req, res) => {
    const {id} = req.params
    const body = req.body
    await db('zones').where({id}).update(body)
    .then( record => {
        if (record) {
            res.status(200).json(record)
            // return getZone(id)
        } else {
            res.status(404).json({msg: "record not found"})
        }
    }).catch (error => {
        res.status(500).json({msg: 'Failed to update record'})
    })
}

const deleteZone = async (req, res) => {
    const {id} = req.params;
    await db('zones').where({id}).del()
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
    createZones,
    getZones,
    getZone,
    updateZone,
    deleteZone
}