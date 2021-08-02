<template>
  <div id="BlogList">
    <div class="userPhoto">
      <img class="photo" src="./images/模拟头像.jpg" alt="" />
    </div>
    <div class="blog">
      <h4 class="nickname">这是昵称啊</h4>
      <p class="time">2021-7-28 16:44</p>
      <p class="blogText">
        青春，是一个多么美好而又富有诗意的字眼!有人把她比作初
        生的太阳;有人把她比作带露的鲜花;有人则把她比作世界上最
        有魅力的东西——黄金!所以人们就说：青春年少是人生是黄金时代。
      </p>

      <div class="blogImg">
        <img class="blogImg-item" src="./images/测试1.png" alt="" />
        <img class="blogImg-item" src="./images/测试1.png" alt="" />
        <img class="blogImg-item" src="./images/测试1.png" alt="" />
        <img class="blogImg-item" src="./images/测试1.png" alt="" />
        <img class="blogImg-item" src="./images/测试1.png" alt="" />
        <img class="blogImg-item" src="./images/测试1.png" alt="" />
        <img class="blogImg-item" src="./images/测试1.png" alt="" />
        <img class="blogImg-item" src="./images/测试1.png" alt="" />
        <img class="blogImg-item" src="./images/测试1.png" alt="" />
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
      justify-content: space-between;
      flex-wrap: wrap;
      .blogImg-item {
        width: 142px;
        height: 142px;
        margin-top: 10px;
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
        .tyh-icon {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
