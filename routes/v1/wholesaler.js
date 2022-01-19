var express = require('express');
var router = express.Router();

// Require our controllers.
var wholesaler_controller = require('../../controllers/wholesalerController');

// GET request for list of all wholesaler.
router.post('/', wholesaler_controller.wholesaler_create);

router.put('/:id', wholesaler_controller.wholesaler_update);

router.get('/:id', wholesaler_controller.wholesaler_info);

router.get('/', wholesaler_controller.wholesaler_list);

router.delete('/:id', wholesaler_controller.wholesaler_delete);

module.exports = router;