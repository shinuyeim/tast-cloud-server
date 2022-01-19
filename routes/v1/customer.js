var express = require('express');
var router = express.Router();

// Require our controllers.
var customer_controller = require('../../controllers/customerController');

// GET request for list of all customer.
router.post('/', customer_controller.customer_create);

router.put('/:id', customer_controller.customer_update);

router.get('/:id', customer_controller.customer_info);

router.get('/', customer_controller.customer_list);

router.delete('/:id', customer_controller.customer_delete);

module.exports = router;