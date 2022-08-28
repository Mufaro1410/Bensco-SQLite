const express = require('express')

const router = express.Router()

const {createFleetData, getFleetData, getFleetDataPoint, updateFleetDataPoint, deleteFleetDataPoint} = require('../controller/fleet')

router.route('/').post(createFleetData).get(getFleetData)
router.route('/:id').get(getFleetDataPoint).patch(updateFleetDataPoint).delete(deleteFleetDataPoint)

module.exports = router