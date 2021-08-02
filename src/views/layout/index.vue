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
          v-if="!userInfo"
          placement="top"
          width="160"
          v-model="NotloggedinPopover"
          trigger="hover"
        >
          <!-- 用户头像昵称 -->
          <div id="userInfo" slot="reference">
            <img class="userPhoto" src="./images/未登录.jpg" alt="" />
            <span class="nickname">这是昵称</span>
          </div>
          <p class="popover_title">登录后可享受更多功能</p>
          <p class="popover_title_bottom">发布内容</p>
          <p class="popover_title_bottom">关注他人</p>
          <div class="change_log_reg">
            <Tyh-button type="warning" @click="loginDialog = true">
              登录
            </Tyh-button>
            <Tyh-button
              @click="(loginDialog = true), (activeName = 'register')"
            >
              注册
            </Tyh-button>
          </div>
        </el-popover>

        <el-popover
          placement="top"
          width="160"
          v-model="NotloggedinPopover"
          trigger="hover"
          v-else
        >
          <div id="userInfo" slot="reference">
            <img class="userPhoto" :src="userInfo.photo" alt="" />
            <span class="nickname">{{ userInfo.nickname }}</span>
          </div>
          <Tyh-button type="danger" @click="ExitAccount">退出登录</Tyh-button>
        </el-popover>
      </Tyh-Menu>
    </div>

    <router-view />

    <!-- 登录的对话框 -->
    <el-dialog :visible.sync="loginDialog" width="520px" top="35vh">
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
          <Tyh-button
            type="warning"
            round
            :prohibit="registerBtnProhibit"
            @click="onSubmitRegister"
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
import { mapState } from 'vuex'
export default {
  name: 'layoutIndex',
  components: {},
  props: {},
  data () {
    return {
      registerBtnProhibit: false, // 注册按钮禁用状态
      // 注册表单
      registerForm: {
        username: '',
        password: '',
        password2: ''
      },
      // 登录表单
      loginForm: {
        username: '',
        password: ''
      },
      NotloggedinPopover: false, // 导航栏上面没有登录状态时鼠标移入昵称的对话框
      OnloggedinPopover: false, // 导航栏上面已登录状态时鼠标移入昵称的对话框
      loginDialog: false, // 登录注册对话框
      activeName: 'login', // 选项卡
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
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {},
  created () { },
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
            password: this.registerForm.password
          }
        ))
        this.registerBtnProhibit = false

        // 根据后端返回数据判断用户登录
        if (data.code !== 201) {
          this.$message({
            message: data.msg,
            type: 'warning',
            iconClass: 'tyh-ui-warning-01'
          })
          return
        }
        this.$message({
          message: '注册成功',
          type: 'danger',
          iconClass: 'tyh-ui-success-01'
        })
        this.activeName = 'login' // 选项卡切换为登录页面
      })
    },
    // 登录
    async onSubmitLogin () {
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
        this.$store.commit('changeUser', data)
        this.loginDialog = false
        return
      }
      this.$message({
        message: '账号或密码错误',
        type: 'warning',
        iconClass: 'tyh-ui-warning-01'
      })
    },
    // 退出账号
    ExitAccount () {
      this.$confirm('确定要退出账号吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 直接交个 vuex 处理
        this.$store.commit('outLogin')
        this.$message({
          message: '已成功退出账号',
          type: 'primary',
          iconClass: 'tyh-ui-primary-01'
        })
      }).catch(() => { })
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
    // 右侧用户信息弹出框
    .el-popover__reference-wrapper {
      #userInfo {
        margin-right: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .userPhoto {
          width: 43px;
          height: 43px;
          border-radius: 50%;
        }
        .nickname {
          color: #fff;
          margin-left: 10px;
          font-size: 15px;
        }
      }
    }
    img {
      width: 45px;
      height: 45px;
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
// 登录弹出框
.popover_title {
  font-size: 14px;
  color: #515a6e;
  line-height: 30px;
  border-bottom: 1px solid rgb(223, 223, 223);
}
.popover_title_bottom {
  font-size: 13px;
  color: #616161;
  margin-top: 5px;
}
.change_log_reg {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  .tyh-button {
    height: 30px;
  }
}
</style>
