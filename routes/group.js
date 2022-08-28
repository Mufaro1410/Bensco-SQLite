const express = require('express')
const group = require('../controller/group')

const router = express.Router()

const {createGroup, getGroups, getGroup, updateGroup, deleteGroup} = require('../controller/group')

router.route('/').post(createGroup).get(getGroups)
router.route('/:id').get(getGroup).patch(updateGroup).delete(deleteGroup)

module.exports = router