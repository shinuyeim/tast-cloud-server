# sale-terminal-server
[README in Chinese](README.md)

tast-cloud-server是```可溯源农资销售终端```(Traceable Agricultural Sales Terminal, TAST)的一个远程服务端程序，相关API参见 [API.md](API.md)。

该项目管理系统（前端），参见 [elm-manage-vue2](https://github.com/shinuyeim/elm-manage-vue2)。

## 启动

### 本地服务器
------------

This app comes with a simple server ([`server.js`](./server.js)), but can be served through any means.

To use the packaged server:

* Install [node.js](http://nodejs.org/)
* From the root directory, run `yarn install`

Pupulate MongoDB database
```
node populatedb/populatedb.js mongodb://localhost:27017/elm_server
```

Available scripts:
* `yarn start` - Start server
* `yarn run devstart` - Start server with nodemon
* `DEBUG=tast-cloud-server:* npm run devstart` - Start server with debug mode

## 功能特性
- [x] 用户登录 -- 已完成
- [x] 管理员注册 -- 已完成
- [x] 顾客接口 -- 已完成
- [ ] 商品接口 -- 未开始
- [ ] 进货单接口 -- 未开始
- [ ] 批发商接口 -- 未开始


## 参与贡献

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## 文件说明
* [/bin/www](/bin/www) - the entry point of the application
* [app.js](app.js) - This file creates an express application object.
* [package.json](package.json) - Dependencies for the node.js server.
* [API.md](API.md) - RESTful API of this application.

## 致谢
* [Express](https://expressjs.com/) - The web framework used
* [Mongoose](https://mongoosejs.com/) - mongodb object modeling for node.js