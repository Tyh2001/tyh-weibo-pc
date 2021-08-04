## 微博全栈开发
## 用户

### 接口地址

基础地址：http://localhost/Virgo_Tyh_PHP/public/index.php/



### 注册账号

#### 基本信息

**Path：** index/User/Register

**Method：** POST

**线上地址：** http://localhost/Virgo_Tyh_PHP/public/index.php/index/User/Register

#### 返回HTTP状态码

1. 201 注册成功
2. 401 用户名已存在
3. 402 用户名信息不存在

#### 请求参数

**Body**

| 名称        | 类型   | 是否必须 | 默认值 | 备注         |
| ----------- | ------ | -------- | ------ | ------------ |
| username    | string | 必须     |        | 用户名       |
| password    | string | 必须     |        | 密码         |
| mail        | string | 必须     |        | 邮箱         |
| captcha     | string | 必须     |        | 验证码       |
| captchaCode | string | 必须     |        | 验证码随机数 |

#### 返回数据

| 名称 | 类型   | 是否必须 | 默认值 | 备注     |
| ---- | ------ | -------- | ------ | -------- |
| code | number | 必须     |        | 状态码   |
| msg  | string | 必须     |        | 提示信息 |



### 登录

#### 基本信息

**Path：** index/User/Login

**Method：** POST

**线上地址：** http://localhost/Virgo_Tyh_PHP/public/index.php/index/User/Login

#### 返回HTTP状态码

1. 201 登录成功
2. 401 用户信息不完善
3. 402 账号或密码错误

#### 请求参数

**Body**

| 名称     | 类型   | 是否必须 | 默认值 | 备注   |
| -------- | ------ | -------- | ------ | ------ |
| username | string | 必须     |        | 用户名 |
| password | string | 必须     |        | 密码   |

#### 返回数据

| 名称        | 类型   | 是否必须 | 默认值 | 备注     |
| ----------- | ------ | -------- | ------ | -------- |
| code        | number | 必须     |        | 状态码   |
| msg         | string | 必须     |        | 提示信息 |
| data        | object | 非必须   |        | 返回数据 |
| ├─ id       | number | 非必须   |        | 用户id   |
| ├─ nickname | string | 非必须   |        | 用户昵称 |
| ├─ photo    | string | 非必须   |        | 用户头像 |



### 获取用户资料

#### 基本信息

**Path：** index/User/getUserInfo

**Method：** GET

**线上地址：** http://localhost/Virgo_Tyh_PHP/public/index.php/index/User/getUserInfo

#### 返回HTTP状态码

1. 201 OK
2. 401 缺少参数

#### 请求参数

**Body**

| 名称 | 类型   | 是否必须 | 默认值 | 备注    |
| ---- | ------ | -------- | ------ | ------- |
| id   | number | 必须     |        | 用户 id |

#### 返回数据

| 名称         | 类型   | 是否必须 | 默认值 | 备注     |
| ------------ | ------ | -------- | ------ | -------- |
| code         | number | 必须     |        | 状态码   |
| msg          | string | 必须     |        | 提示信息 |
| data         | object | 非必须   |        | 返回数据 |
| ├─ avatar    | number | 非必须   |        | 用户id   |
| ├─ nickname  | string | 非必须   |        | 用户昵称 |
| ├─ autograph | string | 非必须   |        | 个性签名 |
| ├─ gender    | string | 非必须   |        | 性别     |
| ├─ feeling   | string | 非必须   |        | 感情状况 |
| ├─ work      | string | 非必须   |        | 职业     |
| ├─ city      | string | 非必须   |        | 城市     |
| ├─ birthday  | string | 非必须   |        | 生日     |
| ├─ mail      | string | 非必须   |        | 邮箱     |



### 更新用户资料

#### 基本信息

**Path：** index/User/changeUserInfo

**Method：** POST

**线上地址：** http://localhost/Virgo_Tyh_PHP/public/index.php/index/User/changeUserInfo

#### 返回HTTP状态码

1. 201 更新用户信息成功
2. 401 信息不完善

#### 请求参数

**Body**

| 名称      | 类型   | 是否必须 | 默认值 | 备注     |
| --------- | ------ | -------- | ------ | -------- |
| nickname  | string | 必须     |        | 昵称     |
| autograph | string | 非必须   |        | 个性签名 |
| gender    | string | 非必须   |        | 性别     |
| feeling   | string | 非必须   |        | 感情状况 |
| work      | string | 非必须   |        | 职业     |
| birthday  | string | 非必须   |        | 生日     |
| mail      | string | 必须     |        | 邮箱     |
| id        | string | 必须     |        | 用户 id  |

#### 返回数据

| 名称 | 类型   | 是否必须 | 默认值 | 备注     |
| ---- | ------ | -------- | ------ | -------- |
| code | number | 必须     |        | 状态码   |
| msg  | string | 必须     |        | 提示信息 |



### 更新用户密码

#### 基本信息

**Path：** index/User/changeUserPass

**Method：** POST

**线上地址：** http://localhost/Virgo_Tyh_PHP/public/index.php/index/User/changeUserPass

#### 返回HTTP状态码

1. 201 更新密码成功
2. 401 原始密码错误
3. 402 参数不完善

#### 请求参数

**Body**

| 名称    | 类型   | 是否必须 | 默认值 | 备注     |
| ------- | ------ | -------- | ------ | -------- |
| oldPass | string | 必须     |        | 原始密码 |
| newPass | string | 必须     |        | 新密码   |
| id      | string | 必须     |        | 用户 id  |

#### 返回数据

| 名称 | 类型   | 是否必须 | 默认值 | 备注     |
| ---- | ------ | -------- | ------ | -------- |
| code | number | 必须     |        | 状态码   |
| msg  | string | 必须     |        | 提示信息 |
