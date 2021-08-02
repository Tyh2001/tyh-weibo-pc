<template>
  <div id="homeIndex">
    <div id="blog_box">
      <div id="content">
        <!-- 博客内内容 -->
        <div class="blog_list">
          <div class="release">
            <textarea id="textarea"></textarea>
            <!-- 操作栏 -->
            <div class="utils-box">
              <!-- 这里可以加入表情和图片插入按钮 -->
              <div></div>
              <Tyh-button type="primary">发布</Tyh-button>
            </div>
          </div>
          <BlogList />
          <BlogList />
          <BlogList />
          <BlogList />
          <BlogList />
          <BlogList />
          <BlogList />
        </div>

        <!-- 用户内容 -->
        <div class="user_list">
          <div class="my_pohto">
            <img src="./images/我的头像.jpg" alt="" />
          </div>
          <h4 class="nickname">这是昵称啊</h4>
          <p class="autograph">这是我的个性签名，这是我的个性签名</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogList from '@/components/BlogList'
export default {
  name: 'homeIndex',
  components: {
    BlogList
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style lang='less' scoped>
#homeIndex {
  background: url("./images/home.jpg") no-repeat center;
  background-size: cover;
  background-attachment: fixed;
  #blog_box {
    width: 1000px;
    margin: auto;
    padding-top: 300px;
    #content {
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.2);
      width: 100%;
      box-sizing: border-box;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      .blog_list {
        width: 585px;
        .release {
          width: 100%;
          min-height: 160px;
          background: #fff;
          padding: 22px 45px;
          box-sizing: border-box;
          border-radius: 5px;
          #textarea {
            width: 100%;
            height: 75px;
          }
          .utils-box {
            width: 100%;
            display: flex;
            height: 25px;
            margin-top: 10px;
            justify-content: space-between;
            align-items: center;
            .tyh-button {
              width: 70px;
              height: 25px;
            }
          }
        }
      }
      .user_list {
        width: 370px;
        padding: 0 20px;
        box-sizing: border-box;
        height: 300px;
        background: #fff;
        margin-top: 60px;
        .my_pohto {
          width: 90px;
          margin: auto;
          margin-top: -60px;
          img {
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
        }
        .autograph {
          font-size: 14px;
          color: #161616;
          text-align: center;
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
