#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith("mongodb")) {
    console.log(
        "ERROR: You need to specify a valid mongodb URL as the first argument"
    );
    return;
}

var async = require("async");

var Customer = require("../models/customer.js");

const customerData = require("./data/customerData.js");


var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.set("useCreateIndex", true);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.dropDatabase();


async.series(
    // [createAdmin, createMerchant],
    [ createCustomer],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log("FINAL ERR: " + err);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    }
);

function customerCreate(name, phone, address, cb) {
    customerdetail = { name, phone, address };

    var customer = new Customer(customerdetail);

    customer.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log("New Customer: " + customer);
        cb(null, customer);
    });
}

function createCustomer(cb) {
    async.eachLimit(
        customerData,
        10,
        function (item, callback) {
            customerCreate(
                item.name,
                item.phone,
                item.address,
                callback
            );
        },
        cb
    );

    // async.series([
    //     // function (callback) {
    //     //     adminCreate('张三', '123456', '2019-06-06', "上海", 0, callback);
    //     // },
    //     // function (callback) {
    //     //     adminCreate('BenBova', 'Zimu_123', '2019-11-08', "北京", 1, callback);
    //     // }
    // ],
    //     // optional callback
    //     cb);
}

