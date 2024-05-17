const express = require('express');
const router = express.Router();
const {getJobs} = require('../services/jobService')

router.get('/', getJobs);

module.exports = router;
