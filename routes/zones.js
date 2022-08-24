const express = require('express')
const zones = require('../controller/zones')

const router = express.Router()

const {createItem, readItems, readItem, deleteItem, updateItem,} = require('../controller/zones')

router.route('/').post((req, res) => {
    // const {id} = req.params;
    const zones_data = req.body;
    
    zones_data.forEach(zone => {
        if (!zone.group_id) {
            zone["group_id"] = 1
        }
    })

    zones.createItem(zones_data)
        .then(record => {
            res.status(201).json(record)
        }).catch(error => {
            console.log(error);
            res.status(500).json({msg: error})
        })
})

router.route('/').get((req, res) => {
    zones.readItems()
        .then(items => {
            res.status(200).json(items)
        }).catch(error => {
            res.status(500).json({msg: error})
        })
})

router.route('/:id').get((req, res) => {
    const {id} = req.params;
    zones.readItem(id)
        .then(record => {
            if (record) {
                res.status(200).json(record)
            } else {
                res.status(404).json({msg: "record not found"})
            }
        }).catch(error => {
            res.status(500).json({msg: error})
        })
})

router.route('/:id').patch((req, res) => {
    const {id} = req.params;
    zones.updateItem(id, req.body)
        .then(record => {
            if (record) {
                res.status(200).json(record)
            } else {
                res.status(404).json({msg: "record not found"})
            }
        }).catch(error => {
            res.status(500).json({msg: error})
        })
})

router.route('/:id').delete((req, res) => {
    const {id} = req.params;
    zones.deleteItem(id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({msg: "record(s) deleted successfull"})
            } else {
                res.status(404).json({msg: 'record(s) not found'})
            }
        }).catch(error => {
            res.status(500).json({msg: error})
        })
})


module.exports = router