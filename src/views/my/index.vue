<template>
  <div id="myIndex">
    <div id="myBlogList">
      <!-- 左侧 -->
      <div id="content_left">
        <div class="content_left_size">
          <h2 class="title">个人主页</h2>

          <ul class="list_content">
            <li @click="$router.push('/')">
              <i class="el-icon-position" />首页
            </li>
            <li><i class="el-icon-user" />我的关注</li>
            <li><i class="el-icon-orange" />我的粉丝</li>
            <li><i class="el-icon-star-off" />我的赞</li>
            <li @click="$router.push('/setting')">
              <i class="el-icon-setting" />设置
            </li>
          </ul>
        </div>
      </div>

      <!-- 右侧 -->
      <div id="content_right">
        <!-- 头部 -->
        <div id="header">
          <div class="user_photo_box">
            <img class="user_photo" :src="userPhotoAvatar" />
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
              @loadBlogList="loadgetUserBlogList"
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
    ...mapState(['userInfo']),
    userPhotoAvatar () {
      return `https://tianyuhao.icu/backstage/virgo_tyh_php/public/userPhoto/${this.userForm.avatar}`
    }
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
      // const { data } = await getUserInfo(this.userInfo.id)
      const { data } = await getUserInfo(this.$route.params.id)
      this.userForm = data.data
    },
    // 获取指定用户的博客内容
    async loadgetUserBlogList () {
      const { data } = await getUserBlogList(this.$route.params.id)
      this.userBlogList = data.data
    }
  }
}
</script>

<style lang='less' scoped>
#myIndex {
  min-height: 100%;
  background: rgb(245, 245, 245);
  #myBlogList {
    margin-top: 85px;
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
        padding-top: 30px;
        box-sizing: border-box;
        user-select: none;
        .title {
          color: #333;
          font-size: 26px;
          font-weight: 500;
          margin-left: 20px;
        }
        .list_content {
          margin-top: 30px;
          li {
            line-height: 40px;
            color: #333;
            text-decoration: none;
            list-style: none;
            font-size: 18px;
            user-select: none;
            padding-left: 20px;
            &:hover {
              background: rgb(243, 243, 243);
              cursor: pointer;
            }
          }
        }
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
        margin-top: 80px;
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
