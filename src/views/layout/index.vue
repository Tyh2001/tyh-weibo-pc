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

          <div class="userInfo" v-if="!userInfo">
            <router-link class="onLogin" to="/user/login">登录</router-link>
          </div>

          <div class="userInfo" v-else>
            <img class="userInfo_photo" :src="userInfo.photo" alt="" />
            <span class="userInfo_nickname">{{ userInfo.nickname }}</span>
          </div>
        </div>
      </Tyh-Menu>
    </div>

    <router-view />
  </div>
</template>

<script>
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
  methods: {}
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
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .userInfo_photo {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          margin-right: 7px;
        }
        .userInfo_nickname {
          color: #fff;
        }
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
