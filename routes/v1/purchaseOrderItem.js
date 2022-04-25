var express = require('express');
var router = express.Router();

// Require our controllers.
var purchaseOrderItem_controller = require('../../controllers/purchaseOrderItemController');

// GET request for list of all purchaseOrder.
router.post('/', purchaseOrderItem_controller.purchaseOrderItem_create);

router.put('/:id', purchaseOrderItem_controller.purchaseOrderItem_update);

router.get('/purchaseOrder',purchaseOrderItem_controller.purchaseOrderItem_merchandiselist);

// router.get('/purchaseOrder/:id',purchaseOrderItem_controller.purchaseOrderItem_merchandiseListInfo);

router.delete('/:id', purchaseOrderItem_controller.purchaseOrderItem_delete);

module.exports = router;                                                          