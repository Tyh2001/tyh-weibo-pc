<template>
  <div id="BlogList">
    <div class="userPhoto">
      <img class="photo" :src="userPhotoAvatar" @click="pushItemMy" />
    </div>
    <div class="blog">
      <div class="blog_info_change">
        <div class="info_box">
          <h4 class="nickname">{{ blogItem.nickname }}</h4>
          <p class="time">{{ releaseTime() }}</p>
        </div>

        <!-- 下拉菜单 -->
        <el-dropdown v-if="userInfo" trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- 关注 -->
            <el-dropdown-item
              v-if="followShow"
              :disabled="upFollowDisabled"
              @click.native="onFollowTa"
            >
              关注 Ta
            </el-dropdown-item>

            <!-- 取消关注 -->
            <el-dropdown-item
              v-if="followShow"
              :disabled="delFollowDisabled"
              @click.native="deleteFollowTa"
            >
              取消关注 Ta
            </el-dropdown-item>
            <el-dropdown-item v-if="changeDelete" @click.native="deleteBlog">
              删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <p class="blogText">{{ blogItem.text }}</p>

      <div class="blogImg">
        <el-image
          class="blogImg-item"
          v-for="(blogItemImg, index) in blogItem.image"
          :key="index"
          :preview-src-list="showImagesList"
          :src="blogItemImgURL(blogItemImg)"
        />
      </div>

      <!-- 点赞框 -->
      <div class="fabulous">
        <div class="say">
          <Tyh-icon size="19" icon="tyh-ui-pinglun-01" />
          评论
        </div>
        <div class="good">
          <Tyh-icon size="21" icon="tyh-ui-dianzan-01" />
          点赞
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { deleteMyBlogList } from '@/api/blog'
// 关注用户 - 取消关注用户
import { onFollowUser, deleteFollowUser } from '@/api/follow'
import { toDates } from '@/utils/changeTime'
import url from '@/utils/url'
export default {
  name: 'BlogList',
  components: {},
  props: {
    // 博客内容
    blogItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      upFollowDisabled: false, // 关注按钮的禁用状态
      delFollowDisabled: false, // 取消关注按钮的禁用状态
      showImagesList: [] // 点击展示图片的数组
    }
  },
  computed: {
    ...mapState(['userInfo']),
    // 是否显示关注和取消关注的按钮展示
    followShow () {
      return this.blogItem.user_id !== this.userInfo.id
    },
    // 是否显示删除按钮
    changeDelete () {
      return this.blogItem.user_id === this.userInfo.id
    },
    // 用户头像地址
    userPhotoAvatar () {
      return `${url}/userPhoto/${this.blogItem.avatar}`
    }
  },
  watch: {},
  created () {
    this.changeShowImg()
  },
  mounted () { },
  methods: {
    // 图片地址
    blogItemImgURL (urlsuffix) {
      return `${url}/blogImg/${urlsuffix}`
    },
    // 删除指定博客内容
    deleteBlog () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteMyBlogList(this.blogItem.blogId)

        // 给父组件发送自定义事件
        this.$emit('loadBlogList')
      }).catch(() => { })
    },
    // 点击图片跳转对应的用户的页面
    pushItemMy () {
      this.$router.push(`/my/${this.blogItem.user_id}`)
    },
    // 关注用户
    async onFollowTa () {
      this.upFollowDisabled = true
      const { data } = await onFollowUser(this.$qs.stringify(
        {
          user_id: this.userInfo.id,
          follower_id: this.blogItem.user_id
        }
      ))
      // 操作不成功时
      if (data.code !== 201) {
        this.$message({
          message: data.msg,
          type: 'warning',
          iconClass: 'tyh-ui-warning-01'
        })
        this.upFollowDisabled = false
        return
      }
      // 操作成功
      this.$message({
        message: data.msg,
        type: 'danger',
        iconClass: 'tyh-ui-success-01'
      })
      this.upFollowDisabled = false
    },
    // 取消关注用户
    async deleteFollowTa () {
      this.delFollowDisabled = true
      const { data } = await deleteFollowUser(this.$qs.stringify(
        {
          user_id: this.userInfo.id,
          follower_id: this.blogItem.user_id
        }
      ))
      // 操作不成功时
      if (data.code !== 201) {
        this.$message({
          message: data.msg,
          type: 'warning',
          iconClass: 'tyh-ui-warning-01'
        })
        this.delFollowDisabled = false
        return
      }
      // 操作成功
      this.$message({
        message: data.msg,
        type: 'danger',
        iconClass: 'tyh-ui-success-01'
      })
      this.delFollowDisabled = false
      this.$emit('loadBlogList')
    },
    // 博客发布时间
    releaseTime () {
      return toDates(this.blogItem.release_time)
    },
    // 处理数组中所有图片地址的格式
    changeShowImg () {
      const arr = []
      this.blogItem.image.forEach(item => {
        const res = `${url}/blogImg/${item}`
        arr.push(res)
      })
      this.showImagesList = arr
    }
  }
}
</script>

<style lang='less' scoped>
#BlogList {
  display: flex;
  background: #fff;
  margin-top: 15px;
  width: 585px;
  padding: 40px 40px 10px 40px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  .userPhoto {
    width: 73px;
    .photo {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .blog {
    width: 100%;
    .blog_info_change {
      display: flex;
      justify-content: space-between;
      .nickname {
        line-height: 30px;
        color: #333;
        font-size: 18px;
      }
      .time {
        font-size: 12px;
        color: #5e5e5e;
      }
    }

    .blogText {
      color: #252525;
      font-size: 15px;
      line-height: 24px;
    }
    .blogImg {
      display: flex;
      flex-wrap: wrap;
      .blogImg-item {
        width: 142px;
        height: 142px;
        margin-top: 10px;
        margin-left: 5px;
      }
    }
    .fabulous {
      margin-top: 20px;
      display: flex;
      height: 35px;
      .good,
      .say {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 14px;
        user-select: none;
        .tyh-icon {
          margin-right: 5px;
        }
      }
    }
  }
  .el-dropdown-link {
    cursor: pointer;
  }
}
</style>
