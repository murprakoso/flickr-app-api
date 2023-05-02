const express = require('express');

const router = express.Router();

const photos = require('./photos');

router.use('/api', photos);

module.exports = router;
