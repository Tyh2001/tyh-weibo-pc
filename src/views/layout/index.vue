<template>
  <div id="layoutIndex">
    <div id="menu-box">
      <Tyh-Menu>
        <img src="./images/logo.png" alt="" />
        <div class="urlItem">
          <Tyh-Menu-Item url="/">
            <Tyh-icon icon="tyh-ui-home-01" color="#fff" />
            首页
          </Tyh-Menu-Item>
          <Tyh-Menu-Item url="/">
            <Tyh-icon icon="tyh-ui-PaperPlane-01" color="#fff" />
            内容
          </Tyh-Menu-Item>
          <Tyh-Menu-Item url="/setting">
            <Tyh-icon icon="tyh-ui-setting-01" color="#fff" />
            设置
          </Tyh-Menu-Item>
        </div>

        <!-- 登录的弹出框 -->
        <el-popover
          placement="top"
          width="160"
          v-model="visible"
          trigger="hover"
        >
          <img slot="reference" src="./images/我的头像.jpg" alt="" />
          <p>登录后可享受更多功能</p>
          <hr />
          <p>发布内容</p>
          <p>关注他人</p>
          <div>
            <Tyh-button type="warning" @click="dialogVisible = true">
              登录
            </Tyh-button>
            <Tyh-button
              @click="(dialogVisible = true), (activeName = 'register')"
            >
              注册
            </Tyh-button>
          </div>
        </el-popover>
      </Tyh-Menu>
    </div>

    <router-view />

    <!-- 登录的对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="520px" top="35vh">
      <el-tabs v-model="activeName">
        <!-- 登录 -->
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm">
            <el-form-item>
              <el-input
                v-model="loginForm.username"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="loginForm.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-form>
          <Tyh-button type="success" round @click="onSubmitLogin"
            >登录</Tyh-button
          >
          <div class="changeLogin" @click="activeName = 'register'">
            快速注册
            <Tyh-icon icon="tyh-ui-right-02" />
          </div>
        </el-tab-pane>

        <!-- 注册 -->
        <el-tab-pane label="注册" name="register">
          <el-form
            :model="registerForm"
            :rules="registerRules"
            ref="registerForm"
          >
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input
                v-model="registerForm.username"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>

            <!-- 第一遍密码 -->
            <el-form-item prop="password">
              <el-input
                v-model="registerForm.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>

            <!-- 第二遍密码 -->
            <el-form-item prop="password2">
              <el-input
                v-model="registerForm.password2"
                placeholder="请输入再次密码"
              ></el-input>
            </el-form-item>
          </el-form>
          <Tyh-button type="warning" round @click="onSubmitRegister"
            >立即注册</Tyh-button
          >
          <div class="changeLogin" @click="activeName = 'login'">
            返回登录
            <Tyh-icon icon="tyh-ui-right-02" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
// 注册 登录
import { onRegister, onUserLogin } from '@/api/user'
export default {
  name: 'layoutIndex',
  components: {},
  props: {},
  data () {
    return {
      // 注册
      registerForm: {
        username: '1',
        password: '111',
        password2: '111'
      },
      // 登录
      loginForm: {
        username: '',
        password: ''
      },
      visible: false, // 导航栏上面鼠标移入的对话框
      dialogVisible: true, // 登录对话框
      activeName: 'register', // 选项卡
      // 注册表单验证
      registerRules: {
        // 用户名
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 第一遍密码
        password: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'))
              } else {
                if (this.registerForm.password !== '') {
                  this.$refs.registerForm.validateField('password2')
                }
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        // 第二遍密码
        password2: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        users: {
          username: 'dadada',
          password: '121212'
        }
      }
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 注册
    onSubmitRegister () {
      this.$refs.registerForm.validate(async (valid) => {
        if (!valid) {
          console.log('不能注册')
          return
        }
        const { data } = await onRegister(this.$qs.stringify(
          {
            username: this.registerForm.username,
            password: this.registerForm.password
          }
        ))
        console.log(data)
      })
    },
    // 登录
    async onSubmitLogin () {
      const { data } = await onUserLogin({
        username: this.loginForm.username,
        password: this.loginForm.password
      })
      console.log(data)
    }
  }
}
</script>

<style lang='less' scoped>
#menu-box {
  height: 60px;
  .tyh-menu {
    position: fixed;
    top: 0px;
    right: 0px;
    left: 0px;
    height: 60px;
    z-index: 300;
    display: flex;
    justify-content: space-between;
    .urlItem {
      width: 520px;
      display: flex;
      justify-content: space-between;
    }
    img {
      width: 40px;
      height: 40px;
    }
  }
}
.el-dialog {
  .tyh-button {
    width: 100%;
  }
  .changeLogin {
    width: 80px;
    margin: auto;
    margin-top: 30px;
    user-select: none;
    cursor: pointer;
  }
}
/deep/.el-input__inner {
  border: none;
  outline: none;
}
.el-input {
  border-bottom: 1px solid #dcdfe6;
}
</style>
