<template>
  <div id="layoutIndex">
    <div id="menu-box">
      <Tyh-Menu>
        <div class="urlItem">
          <div>
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
          <div class="userInfo">
            <router-link class="onLogin" to="/user/login">登录</router-link>
          </div>
        </div>
      </Tyh-Menu>
    </div>

    <router-view />
  </div>
</template>

<script>
// 注册 登录
import { mapState } from 'vuex'
export default {
  name: 'layoutIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 退出账号
    // ExitAccount () {
    //   this.$confirm('确定要退出账号吗？', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     // 直接交个 vuex 处理
    //     this.$store.commit('outLogin')
    //     this.$message({
    //       message: '已成功退出账号',
    //       type: 'primary',
    //       iconClass: 'tyh-ui-primary-01'
    //     })
    //   }).catch(() => { })
    // }
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
      width: 1000px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      .userInfo {
        .onLogin {
          color: #fff;
          cursor: pointer;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
