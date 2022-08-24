const express = require('express')
const fleet = require('../controller/fleet')
// const filteredData = require('../utils/sqlite_data')

const router = express.Router()

const {createItem, readItems, readItem, deleteItem, updateItem,} = require('../controller/fleet')

router.route('/').post((req, res) => {
    // data.forEach((row) => {
    //     const [id] = db('fleet').insert(row)
    //     return [id]
    // })
    fleet.createItem(req.body)
        .then(item => {
            res.status(201).json(item)
        }).catch(error => {
            console.log(error);
            res.status(500).json({msg: error})
        })
})

router.route('/').get((req, res) => {
    fleet.readItems()
        .then(items => {
            res.status(200).json(items)
        }).catch(error => {
            res.status(500).json({msg: "couldn't retrieve records"})
        })
})

router.route('/:id').get((req, res) => {
    const {id} = req.params;
    fleet.readItem(id)
        .then(record => {
            if (record) {
                res.status(200).json(record)
            } else {
                res.status(404).json({msg: "record not found"})
            }
        }).catch(error => {
            res.status(500).json({msg: "unable to perform operation"})
        })
})

router.route('/:id').patch((req, res) => {
    const {id} = req.params;
    fleet.updateItem(id, req.body)
        .then(record => {
            if (record) {
                res.status(200).json(record)
            } else {
                res.status(404).json({msg: "record not found"})
            }
        }).catch(error => {
            res.status(500).json({msg: "Error updating record"})
        })
})

router.route('/:id').delete((req, res) => {
    const {id} = req.params;
    fleet.deleteItem(id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({msg: "record(s) deleted successfull"})
            } else {
                res.status(404).json({msg: 'record(s) not found'})
            }
        }).catch(error => {
            res.status(500).json({msg: "unable to perfom action"})
        })
})

module.exports = router