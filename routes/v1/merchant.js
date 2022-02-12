var express = require('express');
var router = express.Router();

// Require our controllers.
var merchant_controller = require('../../controllers/merchantController');

// GET request for list of all Merchant.
router.get('/', merchant_controller.merchant_list);

router.get('/:id',merchant_controller.merchant_info);

router.delete('/:id',merchant_controller.merchant_delete);

router.put('/:id', merchant_controller.merchant_update);

module.exports = router;