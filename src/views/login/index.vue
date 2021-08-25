<template>
  <div id="loginIndex">
    <div id="loginBox">
      <h1 class="title">用户登录</h1>

      <el-form :model="loginForm" @keyup.enter.native="onSubmitLogin()">
        <!-- 账号 -->
        <el-form-item>
          <el-input
            v-model="loginForm.username"
            clearable
            placeholder="请输入账号"
          />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <Tyh-button
        type="success"
        :prohibit="loginDialog"
        round
        @click="onSubmitLogin"
      >
        登录
      </Tyh-button>
      <p class="changeRegister">
        <router-link to="/user/register">
          立即注册
          <Tyh-icon icon="tyh-ui-right-02" />
        </router-link>
      </p>

      <Tyh-button class="goHomeBtn" @click="$router.push('/')">
        返回首页
      </Tyh-button>
    </div>
  </div>
</template>

<script>
import { onUserLogin } from '@/api/user'
export default {
  name: 'loginIndex',
  components: {},
  props: {},
  data () {
    return {
      loginDialog: false, // 按钮禁用状态
      // 登录表单
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 登录
    async onSubmitLogin () {
      // 减少发送请求 如果账号和密码格式不正确则不能发送请求直接返回
      if (
        this.loginForm.username === '' ||
        this.loginForm.password === '' ||
        this.loginForm.username.length < 6 ||
        this.loginForm.password.length < 8
      ) {
        this.$message({
          message: '请输入正确账号和密码',
          type: 'warning',
          iconClass: 'tyh-ui-warning-01'
        })
        return
      }
      this.loginDialog = true
      const { data } = await onUserLogin(this.$qs.stringify(
        {
          username: this.loginForm.username,
          password: this.loginForm.password
        }
      ))
      // 登录成功的操作
      if (data.code === 201) {
        this.$message({
          message: '登录成功',
          type: 'danger',
          iconClass: 'tyh-ui-success-01'
        })
        this.$store.commit('changeUser', data.data)
        this.loginDialog = false
        this.$router.push('/')
        return
      }
      this.loginDialog = false
      this.$message({
        message: '账号或密码错误',
        type: 'warning',
        iconClass: 'tyh-ui-warning-01'
      })
    }
  }
}
</script>

<style lang='less' scoped>
#loginIndex {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("./images/login.jpg") no-repeat center;
  background-size: cover;
  #loginBox {
    background: #fff;
    width: 520px;
    height: 400px;
    padding: 30px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    box-shadow: 0 12px 20px 0px rgba(0, 0, 0, 0.2);
    border-radius: 7px;
    .tyh-button {
      width: 100%;
    }
    .title {
      font-weight: 500;
      color: #333333;
      margin-bottom: 20px;
    }
    .changeRegister {
      margin-top: 20px;
      text-align: center;
      a {
        text-decoration: none;
        color: #333;
      }
    }
    .goHomeBtn {
      margin-top: 45px;
    }
  }
}
</style>
