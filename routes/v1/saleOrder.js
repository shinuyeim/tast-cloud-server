var express = require('express');
var router = express.Router();

// Require our controllers.
var saleOrder_controller = require('../../controllers/saleOrderController');

// GET request for list of all saleOrder.
router.post('/', saleOrder_controller.saleOrder_create);

router.put('/:id', saleOrder_controller.saleOrder_update);

router.get('/:id', saleOrder_controller.saleOrder_info);

router.get('/', saleOrder_controller.saleOrder_list);

router.delete('/:id', saleOrder_controller.saleOrder_delete);

module.exports = router;                                                          