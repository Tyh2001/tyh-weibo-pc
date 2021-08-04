<template>
  <div id="registerIndex">
    <div id="registerBox">
      <h1 class="title">注册账号</h1>

      <el-form :model="registerForm" :rules="registerRules" ref="registerForm">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            clearable
            placeholder="请输入账号"
          />
        </el-form-item>

        <!-- 第一遍密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <!-- 第二遍密码 -->
        <el-form-item prop="password2">
          <el-input
            v-model="registerForm.password2"
            placeholder="请输入再次密码"
            show-password
          />
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item prop="mail">
          <el-input
            v-model="registerForm.mail"
            clearable
            placeholder="请输入邮箱"
          />
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="captcha">
          <div id="captcha_form_item">
            <el-input
              class="captcha_input"
              v-model="registerForm.captcha"
              clearable
              placeholder="请输入验证码"
            />
            <img
              class="captcha_img"
              :src="captchaImgURL"
              alt=""
              @click="changeCaptchaImg"
            />
          </div>
        </el-form-item>
      </el-form>
      <Tyh-button
        type="warning"
        round
        :prohibit="registerBtnProhibit"
        @click="onSubmitRegister"
        >立即注册</Tyh-button
      >
      <p class="changeLogin">
        <router-link to="/user/login">
          返回登录
          <Tyh-icon icon="tyh-ui-right-02" />
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { onRegister } from '@/api/user'
import { randomNum } from '@/utils/randomNum'
export default {
  name: 'registerIndex',
  components: {},
  props: {},
  data () {
    return {
      captchaCode: '', // 验证码随机数
      registerBtnProhibit: false, // 注册按钮禁用状态
      // 注册表单
      registerForm: {
        username: '',
        password: '',
        password2: '',
        mail: '', // 邮箱
        captcha: '' // 验证码
      },
      // 注册表单验证
      registerRules: {
        // 用户名
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, max: 12, message: '账号长度需在 6 到 12 个字符', trigger: 'blur' }
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
          },
          { min: 8, max: 20, message: '密码长度需在 8 到 20 个字符', trigger: 'blur' }
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
        // 邮箱
        mail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        // 验证码
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 2, max: 2, message: '请输入正确验证码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // 返回随机验证码
    captchaImgURL () {
      return require(`./images/captcha_${this.captchaCode}.png`)
    }
  },
  watch: {},
  created () {
    this.captchaCode = randomNum(15, 1)
  },
  mounted () { },
  methods: {
    // 注册
    onSubmitRegister () {
      this.registerBtnProhibit = true // 禁用按钮
      this.$refs.registerForm.validate(async (valid) => {
        // 表单验证不通过直接返回
        if (!valid) {
          this.registerBtnProhibit = false // 禁用按钮
          return
        }
        const { data } = await onRegister(this.$qs.stringify(
          {
            username: this.registerForm.username,
            password: this.registerForm.password,
            mail: this.registerForm.mail,
            captcha: this.registerForm.captcha, // 验证码
            captchaCode: this.captchaCode // 验证码随机数
          }
        ))
        console.log(data)
        this.registerBtnProhibit = false

        // 根据后端返回数据判断用户登录
        if (data.code !== 201) {
          this.$message({
            message: data.msg,
            type: 'warning',
            iconClass: 'tyh-ui-warning-01'
          })
          // 如果验证码错误则重新加载一个新的验证码图片
          if (data.msg === '验证码错误') {
            this.captchaCode = randomNum(15, 1)
          }
          return
        }
        this.$message({
          message: '注册成功',
          type: 'danger',
          iconClass: 'tyh-ui-success-01'
        })
        this.$router.push('/user/login')
      })
    },
    // 点击切换验证码图片
    changeCaptchaImg () {
      this.captchaCode = randomNum(15, 1)
    }
  }
}
</script>

<style lang='less' scoped>
#registerIndex {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../login/images/login.jpg") no-repeat center;
  background-size: cover;
  #registerBox {
    background: #fff;
    width: 520px;
    height: 540px;
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
      margin-top: 10px;
    }
    .title {
      font-weight: 500;
      color: #333333;
      margin-bottom: 20px;
    }
    // 验证码文本框
    #captcha_form_item {
      display: flex;
      height: 60px;
      align-items: center;
      justify-content: space-between;
      .captcha_input {
        width: 240px;
      }
      .captcha_img {
        width: 200px;
        cursor: pointer;
      }
    }
    .changeLogin {
      margin-top: 20px;
      text-align: center;
      a {
        text-decoration: none;
        color: #333;
      }
    }
  }
}
</style>
