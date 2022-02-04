var express = require('express');
var router = express.Router();

// Require our controllers.
var user_controller = require('../../controllers/userController');

router.put('/:id',user_controller.user_update);


module.exports = router;