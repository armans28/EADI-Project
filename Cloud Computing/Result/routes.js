const express = require('express')
const bodyParser = require('body-parser')
const { PostResultHandler, getAllResultHandler, GetResultIDHandler } = require('./result-app-api/handler')

const router = express.Router()

router.post ('/result', PostResultHandler)
router.get('/result', getAllResultHandler)
router.get('/result/:result_id', GetResultIDHandler)

module.exports = router