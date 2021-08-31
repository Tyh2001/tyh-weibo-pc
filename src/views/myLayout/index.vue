<template>
  <div id="myIndex">
    <div id="myBlogList">
      <!-- 左侧 -->
      <div id="content_left">
        <div class="content_left_size">
          <h2 class="title">个人主页</h2>

          <ul class="list_content">
            <!-- 首页 -->
            <li @click="$router.push('/')">
              <i class="el-icon-position" />返回首页
            </li>

            <!-- 我的主页 -->
            <li @click="$router.push('/my/' + userInfo.id)">
              <i class="el-icon-collection-tag" />我的主页
            </li>

            <!-- 我的关注 -->
            <li @click="goMyFollow"><i class="el-icon-user" />我的关注</li>

            <!-- 我的粉丝 -->
            <li @click="goMyFans"><i class="el-icon-orange" />我的粉丝</li>

            <!-- 我的赞 -->
            <li><i class="el-icon-star-off" />赞了我的</li>

            <!-- 设置 -->
            <li @click="$router.push('/setting')">
              <i class="el-icon-setting" />编辑资料
            </li>
          </ul>
        </div>
      </div>

      <!-- 右侧 -->
      <div id="content_right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'myIndex',
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
    // 去我的关注页面
    goMyFollow () {
      this.$router.push(`/myfollow/${this.userInfo.id}`)
    },
    // 去我的粉丝页面
    goMyFans () {
      this.$router.push(`/fans/${this.userInfo.id}`)
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
      margin-top: 80px;
    }
  }
}
</style>
