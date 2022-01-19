var express = require('express');
var router = express.Router();

// Require our controllers.
var merchandise_controller = require('../../controllers/merchandiseController');

// GET request for list of all merchandise.
router.post('/',merchandise_controller.merchandise_create);

router.put('/:id', merchandise_controller.merchandise_update);

router.get('/:id',merchandise_controller.merchandise_info);

router.get('/',merchandise_controller.merchandise_list);

router.delete('/:id',merchandise_controller.merchandise_delete);

module.exports = router;