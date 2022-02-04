var express = require('express');
var router = express.Router();

var Admin = require('../../models/admin');

// Require our controllers.
var admin_controller = require('../../controllers/adminController');

// 中间件，拦截非管理员
router.use((req, res, next) => {
    if (req.auth.role !== 0) {
        return res.status(403).send();
    }
    next();
})

// GET request for list of all Admin.
router.get('/', admin_controller.admin_list);

router.get('/profile',admin_controller.admin_profile);

router.delete('/:id', admin_controller.admin_delete);

router.put('/:id', admin_controller.admin_update);

router.get('/:id', admin_controller.admin_detail);



module.exports = router;
