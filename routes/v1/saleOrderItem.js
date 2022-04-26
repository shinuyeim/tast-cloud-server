var express = require('express');
var router = express.Router();

// Require our controllers.
var saleOrderItem_controller = require('../../controllers/saleOrderItemController');

// GET request for list of all purchaseOrder.
router.post('/', saleOrderItem_controller.saleOrderItem_create);

router.put('/:id', saleOrderItem_controller.saleOrderItem_update);

// 这个尾巴上的id是进货单id，不是itemid
router.get('/saleOrder/:saleOrderid',saleOrderItem_controller.saleOrderItem_merchandiselist);

router.delete('/:id', saleOrderItem_controller.saleOrderItem_delete);

module.exports = router;