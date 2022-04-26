var express = require('express');
var router = express.Router();

// Require our controllers.
var purchaseOrderItem_controller = require('../../controllers/purchaseOrderItemController');

// GET request for list of all purchaseOrder.
router.post('/', purchaseOrderItem_controller.purchaseOrderItem_create);

router.put('/:id', purchaseOrderItem_controller.purchaseOrderItem_update);

// 这个尾巴上的id是进货单id，不是itemid
router.get('/purchaseOrder/:purchaseOrderid',purchaseOrderItem_controller.purchaseOrderItem_merchandiselist);

router.delete('/:id', purchaseOrderItem_controller.purchaseOrderItem_delete);

module.exports = router;