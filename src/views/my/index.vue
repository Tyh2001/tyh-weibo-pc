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
            <!-- <el-image class="user_photo" :src="userPhotoAvatar" /> -->
            <img class="user_photo" :src="userPhotoAvatar" />
          </div>
          <h3 class="user_nickname">{{ userForm.nickname }}</h3>
          <p class="autograph">{{ userForm.autograph }}</p>
          <p class="follow">
            <Tyh-button v-if="showFollowBtn" type="primary">
              关注 TA
            </Tyh-button>
          </p>
        </div>
        <!-- 用户资料卡 -->
        <div id="header_info">
          <p v-if="userForm.birthday">
            生日：<el-tag size="mini">{{ userForm.birthday }}</el-tag>
          </p>
          <p v-if="userForm.feeling">
            感情状况：
            <el-tag size="mini" type="success">
              {{ userForm.feeling }}
            </el-tag>
          </p>
          <p v-if="userForm.work">
            工作：<el-tag size="mini" type="info">{{ userForm.work }}</el-tag>
          </p>
          <p v-if="userForm.mail">
            邮箱：
            <el-tag size="mini" type="warning">
              {{ userForm.mail }}
            </el-tag>
          </p>
          <p>
            注册时间：
            <el-tag size="mini" type="danger">
              {{ toDates(parseInt(userForm.regis_time)) }}
            </el-tag>
          </p>
        </div>

        <!-- 博客列表内容 -->
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
      // return `https://tianyuhao.icu/backstage/virgo_tyh_php/public/userPhoto/${this.userForm.avatar}`
      return `http://localhost/Virgo_Tyh_PHP/public/userPhoto/${this.userForm.avatar}`
    },
    // 关注展示状态
    showFollowBtn () {
      return this.userInfo.id.toString() !== this.$route.params.id.toString()
    }
  },
  watch: {
    // 监视路由的变化，如果发生变化就重新加载内容
    // 因为这里防止进入其他人的主页时候 再点击自己的博客不发生变化的问题
    '$route' (to, from) {
      if (this.$route.params.id) {
        this.loadgetUserInfo()
        this.loadgetUserBlogList()
      }
    }
  },
  created () {
    this.loadgetUserInfo() // 获取用户资料
    this.loadgetUserBlogList() // 获取指定用户的博客内容
  },
  mounted () { },
  methods: {
    // 获取用户信息
    async loadgetUserInfo () {
      const { data } = await getUserInfo(this.$route.params.id)
      // console.log(data)
      this.userForm = data.data
    },
    // 获取指定用户的博客内容
    async loadgetUserBlogList () {
      const { data } = await getUserBlogList(this.$route.params.id)
      this.userBlogList = data.data
    },
    // 将时间戳转换为正常的时间对象格式
    toDates (times) {
      const date = new Date(times)
      const Y = date.getFullYear()
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      const H = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const dateTime = `${Y}年${M}月${D}日${H}时`
      return dateTime
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
        min-height: 220px;
        padding-bottom: 12px;
        background: url("./images/img.png") no-repeat center;
        background-size: cover;
        border-radius: 5px;
        margin-top: 80px;
        padding: 24px;
        box-sizing: border-box;
        .user_photo_box {
          width: 100px;
          margin: auto;
          .user_photo {
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
        // 关注
        .follow {
          margin-top: 10px;
          text-align: center;
          .tyh-button {
            height: 30px;
          }
        }
      }
      #header_info {
        width: 585px;
        background: #fff;
        padding: 10px 40px;
        box-sizing: border-box;
        p {
          color: #515a6e;
          font-size: 14px;
          line-height: 30px;
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
