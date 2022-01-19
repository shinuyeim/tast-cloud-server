var express = require('express');
var router = express.Router();

// Require Router

const merchandiseRouter = require("./merchandise");
const wholesalerRouter = require("./wholesaler");
const purchaseOrderRouter = require("./purchaseOrder");
const customerRouter = require("./customer");
const saleOrderRouter = require("./saleOrder");

router.use("/merchandises", merchandiseRouter);
router.use("/wholesalers", wholesalerRouter);
router.use("/purchaseOrders", purchaseOrderRouter);
router.use("/customers", customerRouter);
router.use("/saleOrders", saleOrderRouter);

module.exports = router;