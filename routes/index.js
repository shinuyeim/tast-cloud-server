var express = require('express');
var router = express.Router();

var v1Router = require("./v1/index");

router.use("/v1", v1Router);
// router.use("/v2", v2Router);
// router.use("/v3", v3Router);


module.exports = router;