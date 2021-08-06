<template>
  <div id="homeIndex">
    <div id="blog_box">
      <div id="content">
        <!-- 博客内内容 -->
        <div class="blog_list">
          <div class="release">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="blogText"
              :autosize="{ minRows: 2, maxRows: 7 }"
            />

            <!-- 需要上传的图片展示框 -->
            <div class="upImageBox" v-if="fileList.length">
              <!-- 展示图片的盒子 -->
              <div
                class="item_img_change_box"
                v-for="(url, index) in fileList"
                :key="index"
              >
                <!-- 移除上传图片的按钮 -->
                <Tyh-icon icon="tyh-ui-close-01" @click="removeImage(index)" />
                <el-image :src="url" fit="cover" />
              </div>
              <!-- 上传文件的方框 -->
              <div class="item_img_add" @click="clickFileAddImg">
                <Tyh-icon v-if="fileList.length < 9" icon="tyh-ui-add-01" />
                <Tyh-icon v-else icon="tyh-ui-success-01" />
              </div>
            </div>

            <!-- 操作栏 -->
            <div class="utils-box">
              <!-- 这里可以加入表情和图片插入按钮 -->
              <div>
                <Tyh-icon
                  icon="tyh-ui-wenjian-02"
                  @click="$refs.imgfile.click()"
                />
                <input
                  ref="imgfile"
                  style="display: none"
                  type="file"
                  accept="image/*"
                  multiple="multiple"
                  @change="upImageFileInputChange"
                />
              </div>
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
        <div v-if="userInfo" class="user_list">
          <div class="my_pohto">
            <img :src="user.avatar" alt="用户头像" />
          </div>
          <h4 class="nickname">{{ user.nickname }}</h4>
          <p class="autograph">{{ user.autograph }}</p>
        </div>

        <!-- 未登录 -->
        <div v-else class="user_list">
          <div class="my_pohto">
            <img
              src="./images/outLogin.jpg"
              alt="未登录用户"
              @click="goLogonPage"
            />
          </div>
          <h4 class="nickname" @click="goLogonPage">未登录用户</h4>
          <p class="autograph" @click="goLogonPage">点击登录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogList from '@/components/BlogList'
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'homeIndex',
  components: {
    BlogList
  },
  props: {},
  data () {
    return {
      fileList: [], // 需要上传的图片
      user: {}, // 用户信息
      blogText: '' // 发布的文字内容
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {},
  created () {
    // 获取用户信息
    if (this.userInfo) {
      this.loadgetUserInfo()
    }
  },
  mounted () { },
  methods: {
    // 获取用户信息
    async loadgetUserInfo () {
      const { data } = await getUserInfo(this.userInfo.id)
      this.user = data.data
    },
    // 去登录页面
    goLogonPage () {
      this.$router.push('/user/login')
    },
    // 当上传文件的文本框被改变时
    upImageFileInputChange () {
      // 获取到选择文件的长度（数量）
      const fileLength = this.$refs.imgfile.files.length

      // 如果需要上传的文件数量小于9才执行循环
      if (this.fileList.length < 9) {
        for (let i = 0; i < fileLength; i++) {
          // 进入循环之后还需要判定如果数组长度不小于9则继续添加 否则跳出循环体
          if (this.fileList.length < 9) {
            this.fileList.push(URL.createObjectURL(this.$refs.imgfile.files[i]))
          } else {
            break
          }
        }
        // 清空文本框 防止上传相同内容不触发
        this.$refs.imgfile.value = ''
        return
      }
      // 长度到达上限之后提示框展示
      this.$message({
        message: '最多只能上传9张图片',
        type: 'warning',
        iconClass: 'tyh-ui-warning-01'
      })
    },
    // 点击上传文件的方形框位置
    clickFileAddImg () {
      // 跟随在后面的添加按钮
      // 如果选择图片的场地小于9，则点击可以继续上传
      // 否则点击没有效果
      return this.fileList.length < 9
        ? this.$refs.imgfile.click()
        : this.$message({
          message: '最多只能上传9张图片',
          type: 'warning',
          iconClass: 'tyh-ui-warning-01'
        })
    },
    // 点击移除照片
    removeImage (index) {
      this.fileList.splice(index, 1)
    }
  }
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
      // 发布框
      .blog_list {
        width: 585px;
        .release {
          width: 100%;
          min-height: 140px;
          background: #fff;
          padding: 22px 45px;
          box-sizing: border-box;
          border-radius: 5px;
          // 预览上传图片
          .upImageBox {
            margin-top: 5px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            // 展示长传的每个图片的盒子
            .item_img_change_box {
              width: 95px;
              height: 95px;
              display: inline-block;
              margin-right: 3px;
              margin-top: 3px;
              position: relative;
              z-index: 20;
              .el-image {
                width: 100%;
                height: 100%;
                border-radius: 3px;
              }
              // 选中上传图片上的移除按钮
              .tyh-icon {
                position: absolute;
                right: 5px;
                top: 5px;
                cursor: pointer;
                z-index: 30;
              }
            }
            // 跟随在后面的添加图标内容
            .item_img_add {
              width: 93px;
              height: 93px;
              border: 1px solid #333;
              border-radius: 3px;
              display: inline-block;
              user-select: none;
              cursor: pointer;
              font-size: 30px;
              line-height: 85px;
              text-align: center;
              margin-top: 3px;
            }
          }
          // 操作栏
          .utils-box {
            width: 100%;
            display: flex;
            margin-top: 5px;
            justify-content: space-between;
            align-items: center;
            .tyh-button {
              width: 70px;
              height: 25px;
            }
            .tyh-icon {
              cursor: pointer;
            }
          }
          // 文本框
          /deep/ .el-textarea__inner {
            height: 50px;
            font-family: "微软雅黑";
            border-radius: 10px;
            resize: none;
            padding: 10px;
            box-sizing: border-box;
            font-size: 15px;
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
          cursor: pointer;
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
