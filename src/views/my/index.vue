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
          <p class="followBtn">
            <Tyh-button
              v-if="showFollowBtn"
              :type="onFollowChange ? 'danger' : 'primary'"
              @click="onFollowChange ? deleteFollowTa() : changeFollowTa()"
            >
              {{ onFollowChange ? "取消关注 TA" : "关注 TA" }}
            </Tyh-button>
          </p>
        </div>
        <!-- 用户资料卡 -->
        <div id="header_info">
          <div id="followList">
            <p class="onfans">
              粉丝：
              <el-tag size="mini" type="danger">
                {{ userForm.fans_list }}
              </el-tag>
            </p>
            <p class="onFollow">
              关注：
              <el-tag size="mini" type="danger">
                {{ userForm.follow_list }}
              </el-tag>
            </p>
          </div>
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
              {{ registerTime() }}
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
// 关注用户 - 获取我的关注列表 - 获取我的粉丝列表 - 取消关注用户
import { onFollowUser, getFollowUserList, getFansUserList, deleteFollowUser } from '@/api/follow'
import { toDates } from '@/utils/changeTime'
import url from '@/utils/url'
export default {
  name: 'myIndex',
  components: {
    BlogList
  },
  props: {},
  data () {
    return {
      onFollowChange: false, // 是否关注
      userBlogList: [], // 用户发布的内容
      userForm: {} // 个人信息
    }
  },
  computed: {
    ...mapState(['userInfo']),
    userPhotoAvatar () {
      return `${url}/userPhoto/${this.userForm.avatar}`
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
    this.loadgetFollowUserList() // 获取我的关注列表
    this.loadgetFansUserList() // 获取我的粉丝列表
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
    registerTime () {
      return toDates(this.userForm.regis_time)
    },
    // 点击关注按钮
    async changeFollowTa () {
      const { data } = await onFollowUser(this.$qs.stringify(
        {
          user_id: this.userInfo.id,
          follower_id: this.$route.params.id
        }
      ))
      console.log(data)
      this.loadgetFollowUserList()
      this.loadgetUserInfo()
      this.onFollowChange = true
    },
    // 取消关注用户
    async deleteFollowTa () {
      const { data } = await deleteFollowUser(this.$qs.stringify(
        {
          user_id: this.userInfo.id,
          follower_id: this.$route.params.id
        }
      ))
      this.onFollowChange = false
      console.log(data)
      this.loadgetFollowUserList()
      this.loadgetUserInfo()
    },
    // 获取我的关注列表
    async loadgetFollowUserList () {
      const { data } = await getFollowUserList(this.$qs.stringify(
        {
          user_id: this.userInfo.id
        }
      ))
      console.log('我的关注列表', data)
      // 判断如果关注列表中的已关注的用户 id === 路由参数中的 id 那么就是已经关注的用户
      data.forEach(item => {
        if (item.follower_id.toString() === this.$route.params.id.toString()) {
          console.log(item.follower_id.toString(), this.$route.params.id.toString())
          this.onFollowChange = true
        }
        // this.onFollowChange = false
      })
    },
    // 获取粉丝列表
    async loadgetFansUserList () {
      await getFansUserList(this.$qs.stringify(
        {
          user_id: this.userInfo.id
        }
      ))
      // console.log('我的粉丝列表', data)
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
        .followBtn {
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
        // 关注和粉丝列表
        #followList {
          display: flex;
          .onfans,
          .onFollow {
            color: #333;
            font-size: 14px;
            cursor: pointer;
          }
          .onFollow {
            margin-left: 40px;
          }
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
