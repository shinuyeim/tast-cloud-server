const PurchaseOrderItem = require('../models/purchaseOrderItem');

// const Merchandise = require('../models/merchandise');
// const Wholesaler = require('../models/wholesaler');

const validator = require('express-validator');
var async = require('async');

// const merchandise_controller = require('./merchandiseController');
// const wholesaler_controller = require('./wholesalerController');

exports.purchaseOrderItem_create = [
    // Validate fields.
    validator.body('purchaseOrder').not().isEmpty().trim().withMessage('purchaseOrder is empty').escape(),
    validator.body('merchandises').not().isEmpty().trim().withMessage('merchandises is empty').escape(),
   
    (req, res, next) => {
        // Extract the validation errors from a request.

        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            return res.status(422).send(errors);
        }
        else {
            // Data is valid. Update the record.

            const purchaseOrderItem =  new PurchaseOrderItem({
                purchaseOrder: req.body.purchaseOrder,
                merchandises: req.body.merchandises
            });
            // { "omitUndefined": true } 忽略未定义的属性
            purchaseOrderItem.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new admin record.
                res.status(201).send();
            });
        }
    }
];


exports.purchaseOrderItem_update = [
    // Validate fields.
    //validator.body('wholesaler').not().exists().withMessage('Can not update wholesaler'),
    //validator.body('merchandises').not().exists().withMessage('Can not add merchandises'),
    validator.body('amounts').if((value, { req }) => req.body.totalamounts).isFloat({ min: 0 }).trim().withMessage('amounts must be a number greater 0.').trim().escape(),
    validator.body('price').if((value, { req }) => req.body.price).isFloat({ min: 0 }).trim().withMessage('prices must be a number greater 0.').trim().escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.

        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            return res.status(422).send(errors); 0
        }
        else {
            // Data is valid. Update the record.

            const purchaseOrderItem = {
                merchandises: req.body.merchandises,
                amounts: req.body.amounts,
                price: req.body.price
            }
            // { "omitUndefined": true } 忽略未定义的属性
            PurchaseOrderItem.findByIdAndUpdate(req.params.id, purchaseOrderItem, { "omitUndefined": true }, function (err) {
                if (err) {
                    return next(err);
                }
                // Successful 
                res.status(200).send();
            });
        }
    }
];

// exports.purchaseOrderItem_list = function (req, res, next) {
//     const { limit = 20, offset = 0 } = req.query;

//     async.parallel({
//         total_count: function (callback) {
//             PurchaseOrder.countDocuments().exec(callback)
//         },
//         list_PurchaseOrders: function (callback) {
//             PurchaseOrder.find()
//                 .sort({ 'name': 'descending' })
//                 .skip(Number(offset))
//                 .limit(Number(limit))
//                 .exec(callback)
//         }
//     }, function (err, result) {
//         if (err) { return next(err); }
//         res.status(200).json({
//             metadata: {
//                 Total: result.total_count,
//                 Limit: Number(limit),
//                 LimitOffset: Number(offset),
//                 ReturnedRows: result.list_PurchaseOrders.length
//             },
//             data: result.list_PurchaseOrders
//         })
//     }
//     )

// };

// exports.purchaseOrderItem_info = function (req, res, next) {

//     PurchaseOrder.findById(req.params.id).exec((err, existedPurchaseOrder) => {
//         if (err) { return next(err) }

//         if (!existedPurchaseOrder) {
//             return res.status(422).send({
//                 message: "PurchaseOrder not found!"
//             })
//         }

//         const resData = {
//             // "name": existedPurchaseOrder.merchandise.name,
//             // "price": existedPurchaseOrder.merchandise.price,
//             // "specs": existedPurchaseOrder.merchandise.specs,
//             // "productionDate": existedPurchaseOrder.merchandise.productionDate,
//             // "shelfLife": existedPurchaseOrder.merchandise.shelfLife,
//             // "manufacturer": existedPurchaseOrder.merchandise.manufacturer,
//             "date": existedPurchaseOrder.date,
//             "totalamounts": existedPurchaseOrder.totalamounts,
//             "totalprices": existedPurchaseOrder.totalprices,
//             // TODO: name冲突
//             // "name":existedPurchaseOrder.wholesaler.name,
//             // "phone": existedPurchaseOrder.wholesaler.phone,
//             // "address": existedPurchaseOrder.wholesaler.address

//         }
//         return res.status(200).send(resData);
//     });
// };

exports.purchaseOrderItem_delete = function (req, res, next) {

    PurchaseOrderItem.findByIdAndRemove(req.params.id, function (err) {
        if (err) { return next(err); }
        // Successful 
        res.status(204).send();
    });
};