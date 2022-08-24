const express = require('express')
const group = require('../controller/group')

const router = express.Router()

const {createItem, readItems, readItem, deleteItem, updateItem,} = require('../controller/group')

router.route('/').post((req, res) => {
    group.createItem(req.body)
        .then(item => {
            res.status(201).json(item)
        }).catch(error => {
            res.status(500).json({msg: error})
        })
})

router.route('/').get((req, res) => {
    group.readItems()
        .then(items => {
            res.status(200).json(items)
        }).catch(error => {
            res.status(500).json({msg: error})
        })
})

router.route('/:id').get((req, res) => {
    const {id} = req.params;
    group.readItem(id)
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
    group.updateItem(id, req.body)
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
    group.deleteItem(id)
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