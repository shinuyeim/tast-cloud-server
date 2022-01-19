const moment = require('moment');

let tableData = [];
const names = ["同福客栈", "和平饭店", "永和大王", "盒马"];

const dateNow = new Date();

const address1 = ["浦东南路", "北艾路", "长寿路", "虹桥路"];
const address2 = ["星宝购物中心B1层", "星空广场B1层", "189弄购物中心", "上海湾广场B1层"];

const introductiones = ["“同福客栈”是电视剧《武林外传》中的客栈名称，是本电视剧故事发生的主要地点。",
  "和平饭店是上海市地标性建筑，位于上海黄浦区南京东路20号，是上海近代建筑史上第一幢现代派建筑，拥有最具特色的九国式特色套房及众多别具特色的餐厅、宴会厅、多功能厅、酒吧、屋顶观光花园等。",
  "永和大王是全国连锁快餐企业，所经营的品均是符合中国人的口味的豆浆、油条、各种稀饭以及中式的小点心。",
  "盒马是阿里巴巴集团旗下，以数据和技术驱动的新零售平台。盒马希望为消费者打造社区化的一站式新零售体验中心，用科技和人情味带给人们“鲜美生活”。"
];

for (let i = 0; i < 55; i++) {
  const name = names[(Math.floor(Math.random() * 4))];
  const date = moment(dateNow).subtract((Math.floor(Math.random() * 900) + 10), 'days');
  const address = address1[(Math.floor(Math.random() * 4))] + address2[(Math.floor(Math.random() * 4))] + (Math.floor(Math.random() * 900) + 100) + "号";
  let introduction = {};
  if (name === "同福客栈") {
    introduction = introductiones[0];
  } else if (name === "和平饭店") {
    introduction = introductiones[1];
  } else if (name === "永和大王") {
    introduction = introductiones[2];
  } else if (name === "盒马") {
    introduction = introductiones[3];
  }
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
    date: date.format('YYYY-MM-DD'),
    address: address,
    phone: phone,
    introduction: introduction
  };
  tableData.push(tableItem);
}

module.exports = tableData;;