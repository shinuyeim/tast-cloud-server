const moment = require('moment');

let tableData = [];
const firstNames = ["张", "李", "王", "刘"];
const secondNames = ["浩", "梓", "雨", "俊"];
const finallyNames = ["杰", "桐", "轩", "宇"];
// const dates = ["2018-07-25", "2019-09-01", "2020-02-02", "2018-09-04"];

const dateNow = new Date();

const addresses = ["北京", "上海", "广州", "深圳"];
// const privileges = ["超级管理员", "管理员"];

for (let i = 0; i < 60; i++) {
  const name = firstNames[Math.floor(i/16)%4] + secondNames[Math.floor(i/4)%4] + finallyNames[i%4];
  const password = generatePassword();
  const date = moment(dateNow).subtract((Math.floor(Math.random() * 900) + 10), 'days');
  const address = addresses[(Math.floor(Math.random() * 4))];
  let privilege = {};
  if (i === 0) {
    privilege = 0;
  } else {
    privilege = 1;
  }

  const tableItem = {
    name,
    password,
    date: date.format('YYYY-MM-DD'),
    address: address,
    privilege: privilege
  };
  tableData.push(tableItem);
}

function generatePassword() {
  let password = '';
  const n = Math.floor(Math.random() * 10) + 6;
  for (let i = 0; i < n; i++) {
    const num = Math.floor(Math.random() * 43) + 48;
    password += String.fromCharCode(num);
  }

  return password;
}

module.exports = tableData;