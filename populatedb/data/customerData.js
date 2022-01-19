const moment = require('moment');

let tableData = [];
const firstNames = ["张", "李", "王", "刘"];
const secondNames = ["浩", "梓", "雨", "俊"];
const finallyNames = ["杰", "桐", "轩", "宇"];


const addresses = ["北京", "上海", "广州", "深圳"];

for (let i = 0; i < 60; i++) {
    const name = firstNames[Math.floor(i / 16) % 4] + secondNames[Math.floor(i / 4) % 4] + finallyNames[i % 4];

    const address = addresses[(Math.floor(Math.random() * 4))];

    let phone = '1';
    for (let i = 1; i < 11; i++) {
        const numbers = [3, 4, 5, 7, 8];
        if (i === 1) {
            phone += numbers[(Math.floor(Math.random() * 5))].toString();
            continue;
        }
        phone += (Math.floor(Math.random() * 10)).toString();
    }


    const tableItem = {
        name,
        phone,
        address
    };
    tableData.push(tableItem);
}

module.exports = tableData;