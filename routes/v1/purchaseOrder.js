var express = require('express');
var router = express.Router();

// Require our controllers.
var purchaseOrder_controller = require('../../controllers/purchaseOrderController');

// GET request for list of all purchaseOrder.
router.post('/', purchaseOrder_controller.purchaseOrder_create);

router.put('/:id', purchaseOrder_controller.purchaseOrder_update);

router.get('/:id', purchaseOrder_controller.purchaseOrder_info);

router.get('/', purchaseOrder_controller.purchaseOrder_list);

router.delete('/:id', purchaseOrder_controller.purchaseOrder_delete);

module.exports = router;                                                          