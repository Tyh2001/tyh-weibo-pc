<template>
  <div>
    <div id="header">
      <div class="user_photo_box">
        <img class="user_photo" :src="userPhotoAvatar" />
      </div>
      <h3 class="user_nickname">{{ userForm.nickname }}</h3>
      <p class="autograph">{{ userForm.autograph }}</p>
      <p class="followBtn">
        <Tyh-button
          v-if="showFollowBtn"
          :prohibit="followBtnprohibit"
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
        <!-- 粉丝 -->
        <p class="onfans" @click="goFansWebList">
          粉丝：
          <el-tag size="mini" type="danger">
            {{ userForm.fans_list }}
          </el-tag>
        </p>

        <!-- 关注 -->
        <p class="onFollow" @click="goFollowsWebList">
          关注：
          <el-tag size="mini" type="danger">
            {{ userForm.follow_list }}
          </el-tag>
        </p>
      </div>

      <!-- 生日 -->
      <p v-if="userForm.birthday">
        生日：<el-tag size="mini">{{ userForm.birthday }}</el-tag>
      </p>

      <!-- 感情状况 -->
      <p v-if="userForm.feeling">
        感情状况：
        <el-tag size="mini" type="success">
          {{ userForm.feeling }}
        </el-tag>
      </p>

      <!-- 工作 -->
      <p v-if="userForm.work">
        工作：<el-tag size="mini" type="info">{{ userForm.work }}</el-tag>
      </p>

      <!-- 邮箱 -->
      <p v-if="userForm.mail">
        邮箱：
        <el-tag size="mini" type="warning">
          {{ userForm.mail }}
        </el-tag>
      </p>

      <!-- 注册时间 -->
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
</template>

<script>
import { getUserInfo } from '@/api/user'
import { getUserBlogList } from '@/api/blog'
import { mapState } from 'vuex'
// 关注用户 - 获取我的关注列表 - 获取我的粉丝列表 - 取消关注用户
import { onFollowUser, getFollowUserList, deleteFollowUser } from '@/api/follow'
import { toDates } from '@/utils/changeTime'
import url from '@/utils/url'
import BlogList from '@/components/BlogList'
export default {
  name: '',
  components: {
    BlogList
  },
  props: {},
  data () {
    return {
      followBtnprohibit: false, // 关注取关按钮禁用状态
      onFollowChange: false, // 是否关注
      userBlogList: [], // 用户发布的内容
      userForm: {} // 个人信息
    }
  },
  computed: {
    ...mapState(['userInfo']),
    userPhotoAvatar () {
      if (this.userForm.avatar) {
        return `${url}/userPhoto/${this.userForm.avatar}`
      }
      return ''
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
  },
  mounted () { },
  methods: {
    // 去粉丝页面
    goFansWebList () {
      if (this.userInfo.id.toString() === this.$route.params.id.toString()) {
        this.$router.push('/fans/' + this.userInfo.id)
        return
      }
      this.$message({
        message: '不能查看他人粉丝列表',
        type: 'warning',
        iconClass: 'tyh-ui-warning-01'
      })
    },
    // 去关注页面
    goFollowsWebList () {
      if (this.userInfo.id.toString() === this.$route.params.id.toString()) {
        this.$router.push('/myfollow/' + this.userInfo.id)
        return
      }
      this.$message({
        message: '不能查看他人关注列表',
        type: 'warning',
        iconClass: 'tyh-ui-warning-01'
      })
    },
    // 将时间戳转换为正常的时间对象格式
    registerTime () {
      return toDates(this.userForm.regis_time)
    },
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
    // 关注
    async changeFollowTa () {
      this.followBtnprohibit = true
      const { data } = await onFollowUser(this.$qs.stringify(
        {
          user_id: this.userInfo.id,
          follower_id: this.$route.params.id
        }
      ))
      // 操作不成功时
      if (data.code !== 201) {
        this.$message({
          message: data.msg,
          type: 'warning',
          iconClass: 'tyh-ui-warning-01'
        })
        this.followBtnprohibit = false
        return
      }
      // 操作成功
      this.$message({
        message: data.msg,
        type: 'danger',
        iconClass: 'tyh-ui-success-01'
      })
      this.loadgetUserInfo()
      this.loadgetFollowUserList()
      this.onFollowChange = true
      this.followBtnprohibit = false
    },
    // 取消关注
    async deleteFollowTa () {
      this.followBtnprohibit = true
      const { data } = await deleteFollowUser(this.$qs.stringify(
        {
          user_id: this.userInfo.id,
          follower_id: this.$route.params.id
        }
      ))
      // 操作不成功时
      if (data.code !== 201) {
        this.$message({
          message: data.msg,
          type: 'warning',
          iconClass: 'tyh-ui-warning-01'
        })
        this.followBtnprohibit = false
        return
      }
      // 操作成功
      this.$message({
        message: data.msg,
        type: 'danger',
        iconClass: 'tyh-ui-success-01'
      })
      this.loadgetUserInfo() // 获取用户资料
      this.loadgetFollowUserList() // 获取我的关注列表
      this.onFollowChange = false
      this.followBtnprohibit = false
    },
    // 获取我的关注列表
    async loadgetFollowUserList () {
      const { data } = await getFollowUserList(this.$qs.stringify({ user_id: this.userInfo.id }))

      // 判断如果关注列表中的已关注的用户 id === 路由参数中的 id 那么就是已经关注的用户
      data.data.forEach(item => {
        if (item.follower_id.toString() === this.$route.params.id.toString()) {
          this.onFollowChange = true
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
#header {
  width: 585px;
  min-height: 220px;
  padding-bottom: 12px;
  background: url("./images/img.png") no-repeat center;
  background-size: cover;
  border-radius: 5px;
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
</style>
