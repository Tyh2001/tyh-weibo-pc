<template>
  <div id="followIndex">
    <div id="blog_box">
      <div id="content">
        <!-- 博客内内容 -->
        <div class="blog_list">
          <BlogList
            v-for="(blogItem, index) in blogList"
            :key="index"
            :blogItem="blogItem"
            @loadBlogList="loadgetAllBlogList"
          />

          <!-- 开始 loading 加载显示 -->
          <el-table
            v-if="fullscreenLoading"
            id="blogListLoading"
            v-loading="fullscreenLoading"
          />
        </div>

        <!-- 用户内容 -->
        <div class="user_list">
          <div class="my_pohto">
            <img
              class="my_pohto_img"
              :src="userPhotoAvatar"
              @click="$router.push('/my/' + userInfo.id)"
            />
          </div>
          <h4 class="nickname">{{ user.nickname }}</h4>
          <p class="autograph">{{ user.autograph }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogList from '@/components/BlogList'
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
// 获取所有博客
import { getAllBlogList } from '@/api/blog'
import url from '@/utils/url'
export default {
  name: 'followIndex',
  components: {
    BlogList
  },
  props: {},
  data () {
    return {
      fullscreenLoading: false, // 页面加载状态展示
      blogList: [], // 博客内容
      user: {} // 用户信息
    }
  },
  computed: {
    ...mapState(['userInfo']),
    userPhotoAvatar () {
      return `${url}/userPhoto/${this.user.avatar}`
    }
  },
  watch: {},
  created () {
    this.loadgetUserInfo() // 获取用户信息
    this.loadgetAllBlogList() // 获取所有博客内容
  },
  mounted () { },
  methods: {
    // 获取用户信息
    async loadgetUserInfo () {
      const { data } = await getUserInfo(this.userInfo.id)
      this.user = data.data
    },
    // 获取所有博客的内容
    async loadgetAllBlogList () {
      this.fullscreenLoading = true
      const { data } = await getAllBlogList()
      this.blogList = data.data
      this.fullscreenLoading = false
    }
  }
}
</script>

<style lang='less' scoped>
#followIndex {
  min-height: 100%;
  padding-top: 85px;
  box-sizing: border-box;
  background: rgb(245, 245, 245);
  #blog_box {
    width: 1000px;
    margin: auto;
    #content {
      width: 100%;
      box-sizing: border-box;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      .user_list {
        border-radius: 8px;
        width: 370px;
        padding: 0 20px;
        box-sizing: border-box;
        height: 300px;
        background: #fff;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
        margin-top: 60px;
        .my_pohto {
          width: 90px;
          margin: auto;
          margin-top: -60px;
          cursor: pointer;
          .my_pohto_img {
            width: 90px;
            height: 90px;
            border-radius: 50%;
          }
        }
        .nickname {
          line-height: 30px;
          color: #333;
          font-size: 18px;
          text-align: center;
          cursor: pointer;
        }
        .autograph {
          font-size: 14px;
          color: #161616;
          text-align: center;
          margin-top: 6px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
