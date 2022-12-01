const express = require('express')
const router = express.Router({ mergeParams: true })
const { protect } = require('../middleWare/authMiddleware')

const { getNotes } = require('../controllers/noteController')

router.route('/').get(protect, getNotes)

module.exports = router
