<template>
  <div id="layoutIndex">
    <div id="menu-box">
      <div id="menu">
        <!-- 首页 -->
        <router-link to="/">
          <Tyh-icon icon="tyh-ui-home-01" color="#333" size="20" />
        </router-link>

        <!-- 我的关注 -->
        <router-link to="/follow">
          <Tyh-icon icon="tyh-ui-xingxing-01" color="#333" size="20" />
        </router-link>

        <!-- 设置 -->
        <router-link to="/setting">
          <Tyh-icon icon="tyh-ui-setting-01" color="#333" size="20" />
        </router-link>

        <!-- 我的 -->
        <span @click="toMyBlogList">
          <img class="userInfo_photo" :src="userPhotoAvatar" />
        </span>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
import Bus from '@/utils/bus'
import url from '@/utils/url'
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
      if (this.user.avatar && this.userInfo) {
        return `${url}/userPhoto/${this.user.avatar}`
      }
      return `${url}/userPhoto/notLogin.jpg`
    }
  },
  watch: {},
  created () {
    // 获取用户资料
    if (this.userInfo) {
      this.loadgetUserInfo()
    }
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
      // console.log(data)
      this.user = data.data
    },
    // 跳转到我的页面
    toMyBlogList () {
      if (this.userInfo) {
        this.$router.push(`/my/${this.userInfo.id}`)
        return
      }
      this.$router.push('/user/login')
      this.$message({
        message: '请登录后再试',
        type: 'success',
        iconClass: 'tyh-ui-danger-01'
      })
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
      a,
      span {
        text-decoration: none;
        width: 60px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
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
