<template>
  <div id="BlogList">
    <div class="userPhoto">
      <img class="photo" :src="blogItem.avatar" alt="" />
    </div>
    <div class="blog">
      <h4 class="nickname">{{ blogItem.nickname }}</h4>
      <p class="time">{{ blogItem.release_time }}</p>
      <p class="blogText">{{ blogItem.text }}</p>

      <div class="blogImg">
        <img
          class="blogImg-item"
          v-for="(blogItemImg, index) in blogItem.image"
          :key="index"
          :src="blogItemImgURL(blogItemImg)"
          alt="博客图片"
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
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    blogItemImgURL (url) {
      return `http://localhost/Virgo_Tyh_PHP/public/blogImg/${url}`
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
  border-radius: 5px;
  .userPhoto {
    width: 73px;
    .photo {
      width: 55px;
      height: 55px;
      border-radius: 50%;
    }
  }
  .blog {
    width: 100%;
    .nickname {
      line-height: 30px;
      color: #333;
      font-size: 18px;
    }
    .time {
      font-size: 12px;
      color: #5e5e5e;
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
}
</style>
