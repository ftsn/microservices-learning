const express = require('express');
const router = express.Router();

const gatewayController = require('./gatewayController');

router.get('/', gatewayController.gatewayTest1);
router.get('/trustederror', gatewayController.gatewayTest2);
router.get('/untrustederror', gatewayController.gatewayTest3);

module.exports = router;