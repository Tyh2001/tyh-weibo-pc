<template>
  <div id="myIndex">
    <div id="myBlogList">
      <!-- 左侧 -->
      <div id="content_left">
        <div class="content_left_size"></div>
      </div>

      <!-- 右侧 -->
      <div id="content_right">
        <!-- 头部 -->
        <div id="header">
          <div class="user_photo_box">
            <img class="user_photo" :src="userForm.avatar" />
          </div>
          <h3 class="user_nickname">{{ userForm.nickname }}</h3>
          <p class="autograph">{{ userForm.autograph }}</p>
        </div>

        <div id="content">
          <!-- 用户发布的内容 -->
          <div v-if="userBlogList.length">
            <BlogList
              v-for="(blogItem, index) in userBlogList"
              :key="index"
              :blogItem="blogItem"
            />
          </div>

          <div class="userBlogListNoLength" v-else>
            <p>你还没有发布过内容哦</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { getUserBlogList } from '@/api/blog'
import { mapState } from 'vuex'
import BlogList from '@/components/BlogList'
export default {
  name: 'myIndex',
  components: {
    BlogList
  },
  props: {},
  data () {
    return {
      userBlogList: [], // 用户发布的内容
      userForm: {} // 个人信息
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {},
  created () {
    this.loadgetUserInfo() // 获取用户资料
    this.loadgetUserBlogList() // 获取指定用户的博客内容
  },
  mounted () { },
  methods: {
    // 获取用户信息
    async loadgetUserInfo () {
      const { data } = await getUserInfo(this.userInfo.id)
      this.userForm = data.data
    },
    // 获取指定用户的博客内容
    async loadgetUserBlogList () {
      const { data } = await getUserBlogList(this.userInfo.id)
      this.userBlogList = data.data
    }
  }
}
</script>

<style lang='less' scoped>
#myIndex {
  background: rgb(245, 245, 245);
  height: 100%;
  #myBlogList {
    width: 800px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    #content_left {
      width: 200px;
      .content_left_size {
        position: fixed;
        width: 200px;
        top: 60px;
        bottom: 0;
        background: #fff;
      }
    }
    #content_right {
      width: 585px;
      #header {
        width: 585px;
        height: 240px;
        margin-top: 30px;
        background: url("./images/img.png") no-repeat center;
        background-size: cover;
        border-radius: 5px;
        .user_photo_box {
          width: 100px;
          margin: auto;
          .user_photo {
            margin-top: 40px;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            border: 5px solid rgba(255, 255, 255, 0.4);
          }
        }
        // 昵称
        .user_nickname {
          text-align: center;
          color: #333;
        }
        // 个性签名
        .autograph {
          text-align: center;
          color: #333;
          font-size: 15px;
          margin-top: 10px;
        }
      }
      #content {
        width: 100%;
        // 没有发布动态
        .userBlogListNoLength {
          margin-top: 160px;
          user-select: none;
          p {
            font-size: 16px;
            color: #333;
            text-align: center;
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>
