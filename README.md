# tast-cloud-server
[README in English](README_EN.md)

tast-cloud-server是```可溯源农资销售终端```(Traceable Agricultural Sales Terminal, TAST)的一个远程服务端程序，相关API参见 [API.md](API.md)。

该项目管理系统（前端），参见 [tast-web-sales-terminal](https://github.com/shinuyeim/tast-web-sales-terminal)。

该项目微信小程序系统，参见[WeChatMiniProgram](https://github.com/shinuyeim/WeChatMiniProgram)。

## 启动

### 本地服务器
------------
安装
* 安装 [node.js](http://nodejs.org/)
* 安装依赖包，在本项目根目录，运行 `yarn install`

启动命令:
* `yarn start` - 启动服务器
* `yarn run devstart` - 使用nodemon启动服务器
* `DEBUG=tast-cloud-server:* npm run devstart` - 在debug模式启动服务器。

## 功能特性
- [x] 用户登录 -- 已完成
- [x] 管理员注册 -- 已完成
- [x] 顾客接口 -- 已完成
- [x] 商品接口 -- 已完成
- [x] 商家接口 -- 已完成
- [x] 批发商接口 -- 已完成
- [x] 进货单接口 -- 改进中


<!-- ## 参与贡献

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us. -->

## 文件说明
* [/bin/www](/bin/www) - 应用入口
* [app.js](app.js) - 创建Express应用
* [package.json](package.json) - 依赖的包
* [API.md](API.md) - RESTful API 说明

## 致谢
* [Express](https://expressjs.com/) - The server framework used
* [Mongoose](https://mongoosejs.com/) - mongodb object modeling for node.js