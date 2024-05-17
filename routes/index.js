const express = require('express');
const router = express.Router();
const jobRouter = require('./jobRouter')
const mediaRouter = require('./mediaRouter')

router.use('/job', jobRouter)
router.use('/media', mediaRouter)

module.exports = router