var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");

// Models
var User = require("../../models/user");
var Admin = require("../../models/admin");
var Customer = require("../../models/customer");
var Merchant = require("../../models/merchant");
//var merchandise = require("../../models/merchandise");

// Require Router
const userRouter = require("./user");
const adminRouter = require("./admin");
const customerRouter = require("./customer");
const merchantRouter = require("./merchant");
const merchandiseRouter = require("./merchandise");
const wholesalerRouter = require("./wholesaler");
const purchaseOrderRouter = require("./purchaseOrder");
const saleOrderRouter = require("./saleOrder");
const purchaseOrderItemRouter = require("./purchaseOrderItem");


// Require controllers.
var user_controller = require("../../controllers/userController");
var admin_controller = require("../../controllers/adminController");
var customer_controller = require("../../controllers/customerController");
var merchant_controller = require("../../controllers/merchantController");
//var merchandise_controller=require("../../controllers/merchandiseController");

// Router login and register
router.post("/login", user_controller.user_login);

router.post("/register/admin", admin_controller.admin_create);
router.post("/register/customer", customer_controller.customer_create);
router.post("/register/merchant", merchant_controller.merchant_create);

/*
/ 路由鉴权，Token解析
/ 1,解析出user._id
/ 2,查询User，将其id和role和写入req.auth
*/
const SECRET = process.env.SECRET;
router.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: "Authorization not exist!",
        });
    }

    const raw = String(req.headers.authorization.split(" ").pop());
    const { id } = jwt.verify(raw, SECRET);

    User.findById(id, (err, existedUser) => {
        if (err) {
            return next(err);
        }

        if (!existedUser) {
            return res.status(401).send({
                message: "Login user not exist!",
            });
        }
        //Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象
        Object.assign(req, {
            auth: {
                userid: existedUser._id,
                role: existedUser.role
            },
        });
        next();
    });
});

// Routers
router.use("/users", userRouter);

/*
/ 中间件
/ 1,根据req.auth的userid和role在查找出roleid
/ 2,将其写入req.auth.roleid
/ 3,删除req.auth内的userid
*/
router.use((req, res, next) => {
    switch (req.auth.role) {
        case 0:
            Admin.findOne({ user: req.auth.userid }).then((existedAdmin) => {
                if (!existedAdmin) {
                    return res.status(500).send();
                }
                req.auth.adminid = existedAdmin._id;
                req.auth.privilege = existedAdmin.privilege;
                delete req.auth.userid;
                next();
            });
            break;
        case 1:
            Merchant.findOne({ user: req.auth.userid }).then((existedMerchant) => {
                if (!existedMerchant) {
                    return res.status(500).send();
                }
                req.auth.merchantid = existedMerchant._id;
                delete req.auth.userid;
                next();
            });
            break;
        case 2:
            Customer.findOne({ user: req.auth.userid }).then((existedCustomer) => {
                if (!existedCustomer) {
                    return res.status(500).send();
                }
                req.auth.customerid = existedCustomer._id;
                delete req.auth.userid;
                next();
            });
            break;
        default:
            return res.status(500).send({
                message: "role type not find!"
            })
    }
})

router.use("/admins", adminRouter);
router.use("/customers", customerRouter);
router.use("/merchants", merchantRouter);
router.use("/merchandises", merchandiseRouter);
router.use("/wholesalers", wholesalerRouter);
router.use("/purchaseOrders", purchaseOrderRouter);
router.use("/saleOrders", saleOrderRouter);
router.use("/purchaseOrdersItem", purchaseOrderItemRouter);

module.exports = router;