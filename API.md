# elm-server RESTful API

## 设计指南

- URL 定位资源，method 定义动作
- 使用名词复数形式来描述资源
- 不要嵌套资源
- 在响应中返回错误详情

```
GET：用于检索资源。
POST：用于创建资源。
PUT：用于替换资源或集合。
PATCH：用于通过部分JSON数据更新资源。
DELETE：用于删除资源。
```

参考 [GitHub REST API v3](https://developer.github.com/v3/)

---

## 接口目录：

[注册商品信息](#注册商品信息)</br>
[更新商品信息](#更新商品信息)</br>
[获取商品信息](#获取商品信息)</br>
[获取商品信息列表](#获取商品信息列表)</br>
[删除商品信息](#删除商品信息)</br>

[新增批发商信息](#新增批发商信息)</br>
[更新批发商信息](#更新批发商信息)</br>
[获取批发商信息](#获取批发商信息)</br>
[获取批发商信息列表](#获取批发商信息列表)</br>
[删除批发商信息](#删除批发商信息)</br>

[新增顾客信息](#新增顾客信息)</br>
[更新顾客信息](#更新顾客信息)</br>
[获取顾客信息](#获取顾客信息)</br>
[获取顾客信息列表](#获取顾客信息列表)</br>
[删除顾客信息](#删除顾客信息)</br>

[新增售货单](#新增售货单)</br>
[更新售货单](#更新售货单)</br>
[获取售货单信息](#获取售货单信息)</br>
[获取售货单列表](#获取售货单列表)</br>
[删除售货单信息](#删除售货单信息)</br>

[新增进货单](#新增进货单)</br>
[更新进货单](#更新进货单)</br>
[获取进货单信息](#获取进货单信息)</br>
[获取进货单列表](#获取进货单列表)</br>
[删除进货单信息](#删除进货单信息)</br>

---

## 接口：

### 公共变量

```
baseUrl: http://localhost:3000/api
```

## 商品

### 新增商品信息

#### 请求 URL：

```
<baseUrl>/merchandises
```

#### 请求方式：

```
POST
```

#### 参数类型：body

| 参数     | 是否必选 | 类型   | 说明     |
| :------- | :------: | :----- | :------- |
| name     |    Y     | String | 商品名称 |
| price    |    Y     | String | 商品价格 |

#### 请求示例：

```
POST {{baseUrl}}/merchandises

{
  "name": "攻击",
  "price": 20
}
```

#### 返回示例：

```
201 Created
```

---

### 更新商品信息

#### 请求 URL：

```
<baseUrl>/merchandises/:id
```

#### 请求方式：

```
PUT
```

#### 参数类型：param

| 参数   | 是否必选 | 类型     | 说明    |
| :----- | :------: | :------- | :------ |
| id     |    Y     | objectID | 商品 id |

参数类型：body

| 参数           | 是否必选 | 类型   | 说明         |
| :------------- | :------: | :----- | :----------- |
| name           |    N     | String | 商品信息名称 |
| price          |    N     | String | 商品价格     |
| specs          |    N     | String | 商品信息简介 |
| productionDate |    N     | String | 商品信息地址 |
| shelfLife      |    N     | String | 配送价       |
| manufacturer   |    N     | String | 最低起送价   |

#### 请求示例：

```
PUT  {{baseUrl}}/merchandises/5ea6e4a260e3ac01005f6b41
Content-Type: application/json

{
  "name": "稻杰",
  "price": 20,
  "specs": "瓶",
  "productionDate": "2020-5-24",
  "shelfLife": 2,
  "manufacturer": "昆明制药厂"
}
```

#### 返回示例：

```
200 OK
```

---

### 获取商品信息

#### 请求 URL：

```
<baseUrl>/merchandises/:id
```

#### 请求方式：

```
GET
```

#### 参数类型：param

| 参数 | 是否必选 | 类型     | 说明        |
| :--- | :------: | :------- | :---------- |
| id   |   Y      | objectID | 商品信息 id |

#### 请求示例：

```
GET {{baseUrl}}/merchandises/5e9bd936f0161441ac9da486
{{authorization}}
```

#### 返回示例：

```json
{
  "name": "攻击",
  "price": 20,
  "shelfLife": 2
}
```

---

### 获取商品信息列表

#### 请求 URL：

```
<baseUrl>/merchandises
```

#### 请求方式：

```
GET
```

#### 参数类型：query

| 参数   | 是否必选 | 类型     | 说明                  |
| :----- | :------: | :------- | :-------------------- |
| limit  |   N      | 非负整数 | 获取数据数量，默认 20 |
| offset |   N      | 非负整数 | 跳过数据条数 默认 0   |

#### 请求示例：

```
GET {{baseUrl}}/merchandises?offset=0&limit=3
```

#### 返回示例：

```json
{
  "metadata": {
    "Total": 1,
    "Limit": 3,
    "LimitOffset": 0,
    "ReturnedRows": 1
  },
  "data": [
    {
      "shelfLife": 2,
      "_id": "5ed4a0a0b475e230dc791283",
      "name": "攻击",
      "price": 20,
      "__v": 0
    }
  ]
}
```

---

### 删除商品信息

#### 请求 URL：

```
<baseUrl>/merchandises/:id
```

#### 请求方式：

```
DELETE
```

#### 参数类型：param

| 参数   | 是否必选 | 类型     | 说明        |
| :----- | :------: | :------- | :---------- |
| id     | Y        | objectID | 商品信息 id |

#### 请求示例：

```
DELETE {{baseUrl}}/merchandises/5e9bd936f0161441ac9da486
```

#### 返回示例：

```
204 No Content
```

---

## 批发商

### 新增批发商信息

#### 请求 URL:

```
<baseUrl>/wholesalers
```

#### 请求方式

```
POST
```

#### 参数类型：body

| 参数 | 是否必选 | 类型   | 说明       |
| :--- | :------- | :----- | :--------- |
| name | Y        | String | 批发商名称 |

#### 请求示例：

```
POST {{baseUrl}}/wholesalers

{
  "name": "瑞丰农资"
}
```

#### 返回示例：

```
201 Created
```

---

### 更新批发商信息

#### 请求 URL：

```
<baseUrl>/wholesalers/:id
```

#### 请求方式：

```
PUT
```

#### 参数类型：param

| 参数   | 是否必选 | 类型     | 说明    |
| :----- | :------: | :------- | :------ |
| id     |    Y     | objectID | 商品 id |

参数类型：body

| 参数     | 是否必选 | 类型   | 说明       |
| :------- | :------: | :----- | :--------- |
| name     |    N     | String | 批发商名称 |
| phone    |    N     | String | 联系方式   |
| address  |    N     | String | 批发商地址 |

#### 请求示例：

```
PUT  {{baseUrl}}/wholesalers/5ea6e4a260e3ac01005f6b41
Content-Type: application/json

{
  "name": "瑞丰农资",
  "phone": 18596523214,
  "address": "云南省曲靖市沾益区东风西路123号"
}
```

#### 返回示例：

```
200 OK
```

---

### 获取批发商信息

#### 请求 URL：

```
<baseUrl>/wholesalers/:id
```

#### 请求方式：

```
GET
```

#### 参数类型：param

| 参数 | 是否必选 | 类型     | 说明        |
| :--- | :------: | :------- | :---------- |
| id   |   Y      | objectID | 商品信息 id |

#### 请求示例：

```
GET {{baseUrl}}/wholesalers/5e9bd936f0161441ac9da486
```

#### 返回示例：

```json
{
  "name": "瑞丰农资",
  "phone": "18596523214",
  "address": "云南省曲靖市沾益区东风西路123号"
}
```

---

### 获取批发商信息列表

#### 请求 URL：

```
<baseUrl>/wholesalers
```

#### 请求方式：

```
GET
```

#### 参数类型：query

| 参数   | 是否必选 | 类型     | 说明                  |
| :----- | :------: | :------- | :-------------------- |
| limit  |   N      | 非负整数 | 获取数据数量，默认 20 |
| offset |   N      | 非负整数 | 跳过数据条数 默认 0   |

#### 请求示例：

```
GET {{baseUrl}}/wholesalers?offset=0&limit=1
```

#### 返回示例：

```json
{
  "metadata": {
    "Total": 1,
    "Limit": 1,
    "LimitOffset": 0,
    "ReturnedRows": 1
  },
  "data": [
    {
      "_id": "5ed5085ae7c5e6270cd5b38a",
      "name": "瑞丰农资",
      "__v": 0,
      "address": "云南省曲靖市沾益区东风西路123号",
      "phone": "18596523214"
    }
  ]
}
```

---

### 删除批发商信息

#### 请求 URL：

```
<baseUrl>/merchandises/:id
```

#### 请求方式：

```
DELETE
```

#### 参数类型：param

| 参数   | 是否必选 | 类型     | 说明        |
| :----- | :------: | :------- | :---------- |
| id     | Y        | objectID | 商品信息 id |

#### 请求示例：

```
DELETE {{baseUrl}}/merchandises/5e9bd936f0161441ac9da486
```

#### 返回示例：

```
204 No Content
```

---



## 顾客

### 新增顾客信息

#### 请求 URL:

```
<baseUrl>/customers
```

#### 请求方式

```
POST
```

#### 参数类型:body
| 参数 | 是否必选 | 类型 | 说明 |
|:---  | :------|:------|:-------|
|name  | Y  |String|顾客名称|

#### 请求示例:

```
POST {{baseUrl}}/customers

{
  "name":"shinuye"
}
```
#### 返回示例：

```
201 Creted
```

---

### 更新顾客信息

#### 请求 URL：

```
<baseUrl>/customers/:id
```

#### 请求方式：

```
PUT
```

#### 参数类型：param

| 参数   | 是否必选 | 类型     | 说明    |
| :----- | :------: | :------- | :------ |
| id     |    Y     | objectID | 商品 id |

参数类型：body

| 参数     | 是否必选 | 类型   | 说明       |
| :------- | :------: | :----- | :--------- |
| name     |    N     | String | 批发商名称 |

#### 请求示例：

```
PUT  {{baseUrl}}/customers/5ea6e4a260e3ac01005f6b41
Content-Type: application/json

{
  "name": "瑞丰农资"
}
```

#### 返回示例：

```
200 OK
```

---

### 获取顾客信息

#### 请求 URL：

```
<baseUrl>/customers/:id
```

#### 请求方式：

```
GET
```

#### 参数类型：param

| 参数 | 是否必选 | 类型     | 说明        |
| :--- | :------: | :------- | :---------- |
| id   |   Y      | objectID | 商品信息 id |

#### 请求示例：

```
GET {{baseUrl}}/customers/5e9bd936f0161441ac9da486
```

#### 返回示例：

```json
{
  "name": "shinuye"
}
```

---


### 获取顾客信息列表

#### 请求 URL：

```
<baseUrl>/customers
```

#### 请求方式：

```
GET
```

#### 参数类型：query

| 参数   | 是否必选 | 类型     | 说明                  |
| :----- | :------: | :------- | :-------------------- |
| limit  |   N      | 非负整数 | 获取数据数量，默认 20 |
| offset |   N      | 非负整数 | 跳过数据条数 默认 0   |

#### 请求示例：

```
GET {{baseUrl}}/customers?offset=0&limit=1
```

#### 返回示例：

```json
{
  "metadata": {
    "Total": 3,
    "Limit": 1,
    "LimitOffset": 0,
    "ReturnedRows": 1
  },
  "data": [
    {
      "_id": "5f12ee36a9b2dc258cac0772",
      "name": "shinyhbg",
      "__v": 0
    }
  ]
}
```

---

### 删除顾客信息

#### 请求 URL：

```
<baseUrl>/customers/:id
```

#### 请求方式：

```
DELETE
```

#### 参数类型：param

| 参数   | 是否必选 | 类型     | 说明        |
| :----- | :------: | :------- | :---------- |
| id     | Y        | objectID | 商品信息 id |

#### 请求示例：

```
DELETE {{baseUrl}}/customers/5e9bd936f0161441ac9da486
```

#### 返回示例：

```
204 No Content
```

---

## 售货单

### 新增售货单

#### 请求 URL:

```
<baseUrl>/saleOrders
```

#### 请求方式

```
POST
```

#### 请求示例:

```
POST {{baseUrl}}/saleOrders

```
#### 返回示例：

```
201 Creted
```

---


### 更新售货单

#### 请求 URL：

```
<baseUrl>/saleOrders/:id
```

#### 请求方式：

```
PUT
```

#### 参数类型：param

| 参数   | 是否必选 | 类型     | 说明    |
| :----- | :------: | :------- | :------ |
| id     |    Y     | objectID | 商品 id |

参数类型：body

| 参数     | 是否必选 | 类型   | 说明       |
| :------- | :------: | :----- | :--------- |
| amount   |    Y     | Number |    数量   |
| prices   |    Y     | Number |    价格    |
#### 请求示例：

```
PUT  {{baseUrl}}/saleOrders/5ea6e4a260e3ac01005f6b41
Content-Type: application/json

{
  "amounts":5,
  "prices":20
}
```

#### 返回示例：

```
200 OK
```

---

### 获取售货单信息

#### 请求 URL：

```
<baseUrl>/saleorders/:id
```

#### 请求方式：

```
GET
```

#### 参数类型：param

| 参数 | 是否必选 | 类型     | 说明        |
| :--- | :------: | :------- | :---------- |
| id   |   Y      | objectID | 商品信息 id |

#### 请求示例：

```
GET {{baseUrl}}/saleorders/5f13a6e53055ab24f0d7a1af
```

#### 返回示例：

```json
{
  "date":"2020-07-19T01:49:56.011Z",
  "amounts":5,
  "prices":20
}
```

---

### 获取售货单列表

#### 请求 URL：

```
<baseUrl>/saleorders
```

#### 请求方式：

```
GET
```

#### 参数类型：query

| 参数   | 是否必选 | 类型     | 说明                  |
| :----- | :------: | :------- | :-------------------- |
| limit  |   N      | 非负整数 | 获取数据数量，默认 20 |
| offset |   N      | 非负整数 | 跳过数据条数 默认 0   |

#### 请求示例：

```
GET {{baseUrl}}/saleorders?offset=0&limit=1
```

#### 返回示例：

```json
{
  "metadata": {
    "Total": 3,
    "Limit": 1,
    "LimitOffset": 0,
    "ReturnedRows": 1
  },
  "data": [
    {
      "date": "2020-07-18T09:52:10.775Z",
      "amounts": 5,
      "prices": 20,
      "_id": "5f12ea2fa9b2dc258cac0770",
      "__v": 0
    }
  ]
}
```

---

### 删除售货单信息

#### 请求 URL：

```
<baseUrl>/saleorders/:id
```

#### 请求方式：

```
DELETE
```

#### 参数类型：param

| 参数   | 是否必选 | 类型     | 说明        |
| :----- | :------: | :------- | :---------- |
| id     | Y        | objectID | 商品信息 id |

#### 请求示例：

```
DELETE {{baseUrl}}/saleorders/5e9bd936f0161441ac9da486
```

#### 返回示例：

```
204 No Content
```

---



## 进货单

### 新增进货单

#### 请求 URL:

```
<baseUrl>/purchaseOrders
```

#### 请求方式

```
POST
```

#### 请求示例:

```
POST {{baseUrl}}/purchaseOrders

```
#### 返回示例：

```
201 Creted
```

---

### 更新进货单

#### 请求 URL：

```
<baseUrl>/purchaseOrders/:id
```

#### 请求方式：

```
PUT
```

#### 参数类型：param

| 参数   | 是否必选 | 类型     | 说明    |
| :----- | :------: | :------- | :------ |
| id     |    Y     | objectID | 商品 id |

参数类型：body

| 参数     | 是否必选 | 类型   | 说明       |
| :------- | :------: | :----- | :--------- |
| amount   |    Y     | Number |    数量   |
| prices   |    Y     | Number |    价格    |
#### 请求示例：

```
PUT  {{baseUrl}}/purchaseOrders/5ea6e4a260e3ac01005f6b41
Content-Type: application/json

{
  "amounts":5,
  "prices":20
}
```

#### 返回示例：

```
200 OK
```

---

### 获进售货单信息

#### 请求 URL：

```
<baseUrl>/purchaseOrders/:id
```

#### 请求方式：

```
GET
```

#### 参数类型：param

| 参数 | 是否必选 | 类型     | 说明        |
| :--- | :------: | :------- | :---------- |
| id   |   Y      | objectID | 商品信息 id |

#### 请求示例：

```
GET {{baseUrl}}/purchaseOrders/5f13a6e53055ab24f0d7a1af
```

#### 返回示例：

```json
{
  "date":"2020-07-24T06:18:27.776Z",
  "amounts":5,
  "prices":20
}
```

---

### 获进货单列表

#### 请求 URL：

```
<baseUrl>/purchaseOrders
```

#### 请求方式：

```
GET
```

#### 参数类型：query

| 参数   | 是否必选 | 类型     | 说明                  |
| :----- | :------: | :------- | :-------------------- |
| limit  |   N      | 非负整数 | 获取数据数量，默认 20 |
| offset |   N      | 非负整数 | 跳过数据条数 默认 0   |

#### 请求示例：

```
GET {{baseUrl}}/purchaseOrders?offset=0&limit=1
```

#### 返回示例：

```json
{
  "metadata": {
    "Total": 2,
    "Limit": 1,
    "LimitOffset": 0,
    "ReturnedRows": 1
  },
  "data": [
    {
      "date": "2020-07-24T06:18:27.776Z",
      "amounts": 5,
      "prices": 20,
      "_id": "5f1a7d46ef409b0b98cc99a0",
      "__v": 0
    }
  ]
}
```

---

### 删除售货单信息

#### 请求 URL：

```
<baseUrl>/purchaseOrders/:id
```

#### 请求方式：

```
DELETE
```

#### 参数类型：param

| 参数   | 是否必选 | 类型     | 说明        |
| :----- | :------: | :------- | :---------- |
| id     | Y        | objectID | 商品信息 id |

#### 请求示例：

```
DELETE {{baseUrl}}/purchaseOrders/5e9bd936f0161441ac9da486
```

#### 返回示例：

```
204 No Content
```

---