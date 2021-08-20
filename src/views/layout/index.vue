<template>
  <div id="layoutIndex">
    <div id="menu-box">
      <div id="menu">
        <router-link to="/">
          <Tyh-icon icon="tyh-ui-home-01" color="#333" size="20" />
        </router-link>
        <router-link to="/setting">
          <Tyh-icon icon="tyh-ui-setting-01" color="#333" size="20" />
        </router-link>
        <router-link :to="/my/ + userInfo.id">
          <el-image class="userInfo_photo" :src="userPhotoAvatar" fit="cover" />
        </router-link>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
import Bus from '@/utils/bus'
export default {
  name: 'layoutIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {}
    }
  },
  computed: {
    ...mapState(['userInfo']),
    userPhotoAvatar () {
      return `https://tianyuhao.icu/backstage/virgo_tyh_php/public/userPhoto/${this.user.avatar}`
    }
  },
  watch: {},
  created () {
    // 获取用户资料
    if (this.userInfo) {
      this.loadgetUserInfo()
    }
    // 更新昵称
    Bus.$on('updataNickname', (data) => {
      this.user.nickname = data.nickname
    })
    // 更新头像
    Bus.$on('updataPhoto', (data) => {
      this.user.avatar = data
    })
  },
  mounted () { },
  methods: {
    // 获取用户信息
    async loadgetUserInfo () {
      const { data } = await getUserInfo(this.userInfo.id)
      this.user = data.data
    }
  }
}
</script>

<style lang='less' scoped>
#layoutIndex {
  #menu-box {
    position: fixed;
    top: 0px;
    right: 0px;
    left: 0px;
    height: 60px;
    z-index: 300;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    #menu {
      width: 800px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        text-decoration: none;
        width: 60px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          background: #eee;
        }
        .userInfo_photo {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          margin-right: 7px;
        }
      }
    }
  }
}
</style>
