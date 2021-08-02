## 微博全栈开发

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

| 名称     | 类型   | 是否必须 | 默认值 | 备注   |
| -------- | ------ | -------- | ------ | ------ |
| username | string | 必须     |        | 用户名 |
| password | string | 必须     |        | 密码   |

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

| 名称     | 类型   | 是否必须 | 默认值 | 备注     |
| -------- | ------ | -------- | ------ | -------- |
| code     | number | 必须     |        | 状态码   |
| msg      | string | 必须     |        | 提示信息 |
| id       | number | 非必须   |        | 用户id   |
| nickname | string | 非必须   |        | 用户昵称 |
| photo    | string | 非必须   |        | 用户头像 |