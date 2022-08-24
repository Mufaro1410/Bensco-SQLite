const express = require('express')
const trips = require('../controller/trips')
// const filteredData = require('../utils/sqlite_data')

const router = express.Router()

const {createItem, getTripsByHoseName, getTripById, deleteTrip, updateTrip} = require('../controller/trips')

router.route('/').post((req, res) => {
    trips.createTripsData(req.body)
        .then(item => {
            res.status(201).json(item)
        }).catch(error => {
            console.log(error);
            res.status(500).json({msg: error})
        })
})

router.route('/').get((req, res) => {
    trips.getAllTrips()
        .then(items => {
            res.status(200).json(items)
        }).catch(error => {
            console.log(error);
            res.status(500).json({msg: error})
        })
})

router.route('/:hoseName').get((req, res) => {
    trips.getTripsByHoseName()
        .then(items => {
            res.status(200).json(items)
        }).catch(error => {
            res.status(500).json({msg: "couldn't retrieve records"})
        })
})

router.route('/:id').get((req, res) => {
    const {id} = req.params;
    trips.getTripById(id)
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
    trips.updateTrip(id, req.body)
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
    trips.deleteTrip(id)
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