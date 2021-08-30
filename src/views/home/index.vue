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
            <div class="upImageBox" v-if="imagesList.length">
              <!-- 展示图片的盒子 -->
              <div
                class="item_img_change_box"
                v-for="(url, index) in imagesList"
                :key="index"
              >
                <!-- 移除上传图片的按钮 -->
                <Tyh-icon icon="tyh-ui-close-01" @click="removeImage(index)" />
                <el-image :src="url" fit="cover" />
              </div>
              <!-- 上传文件的方框 -->
              <div class="item_img_add" @click="clickFileAddImg">
                <Tyh-icon
                  size="26"
                  :icon="
                    imagesList.length < 9
                      ? 'tyh-ui-jihao-01'
                      : 'tyh-ui-success-01'
                  "
                />
              </div>
            </div>

            <!-- 操作栏 -->
            <div class="utils-box">
              <!-- 这里可以加入表情和图片插入按钮 -->
              <div>
                <Tyh-icon
                  size="20"
                  icon="tyh-ui-zhaopian-01"
                  @click="$refs.imgfile.click()"
                />
                <input
                  ref="imgfile"
                  style="display: none"
                  type="file"
                  accept="image/*"
                  multiple="multiple"
                  name="image"
                  @change="upImageFileInputChange($event)"
                />
              </div>
              <Tyh-button type="warning" round @click="publishContent">
                发布
              </Tyh-button>
            </div>
          </div>

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
        <div v-if="userInfo" class="user_list">
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

        <!-- 未登录 -->
        <div v-else class="user_list">
          <div class="my_pohto">
            <img
              class="my_pohto_img"
              src="./images/outLogin.jpg"
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
// 发布博客 - 获取所有博客
import { onReleaseBlog, getAllBlogList } from '@/api/blog'
import url from '@/utils/url'
export default {
  name: 'homeIndex',
  components: {
    BlogList
  },
  props: {},
  data () {
    return {
      fullscreenLoading: false, // 页面加载状态展示
      blogList: [], // 博客内容
      imagesList: [], // 需要展示的的图片
      upLoadImagesFileArray: [], // 需要上传文件的数组
      user: {}, // 用户信息
      blogText: '' // 发布的文字内容
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
    // 获取用户信息
    if (this.userInfo) {
      this.loadgetUserInfo()
    }
    this.loadgetAllBlogList() // 获取所有博客内容
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
    // 当上传文件被改变时
    upImageFileInputChange (e) {
      const filesArr = Array.from(e.target.files) // 将获取到的 files 对象转换为数组形式

      // 将每一项添加到全局数组中
      for (let i = 0; i < filesArr.length; i++) {
        if (this.upLoadImagesFileArray.length < 9) {
          this.upLoadImagesFileArray.push(filesArr[i])
        } else {
          break
        }
      }

      // 获取到选择文件的长度（数量）
      const fileLength = this.$refs.imgfile.files.length

      // 如果需要上传的文件数量小于9才执行循环
      if (this.imagesList.length < 9) {
        for (let i = 0; i < fileLength; i++) {
          // 进入循环之后还需要判定如果数组长度不小于9则继续添加 否则跳出循环体
          if (this.imagesList.length < 9) {
            this.imagesList.push(URL.createObjectURL(this.$refs.imgfile.files[i]))
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
      return this.imagesList.length < 9
        ? this.$refs.imgfile.click()
        : this.$message({
          message: '最多只能上传9张图片',
          type: 'warning',
          iconClass: 'tyh-ui-warning-01'
        })
    },
    // 点击移除照片
    removeImage (index) {
      this.imagesList.splice(index, 1) // 移除需要展示的数组中的图片
      this.upLoadImagesFileArray.splice(index, 1) // 移除需要上传数组中的图片
    },
    // 点击发布的按钮
    async publishContent () {
      // 如果内容为空不能发布
      if (this.blogText === '') {
        return this.$message({
          message: '内容为空不能发布',
          type: 'warning',
          iconClass: 'tyh-ui-warning-01'
        })
      }
      // 新建一个 FormData
      const formData = new FormData()

      // 循环每一个选择的文件 将其添加 append
      this.upLoadImagesFileArray.forEach(item => {
        // 给每一项命名为 blogImages 后面的 [] 必须加
        formData.append('blogImages[]', item, '.jpg')
      })

      const { data } = await onReleaseBlog(formData, {
        userId: this.userInfo.id,
        blogText: this.blogText
      })

      if (data.code === 201) {
        this.$message({
          message: data.msg,
          type: 'danger',
          iconClass: 'tyh-ui-success-01'
        })

        // 清空显示的图片和需要上传的数组
        this.imagesList = []
        this.upLoadImagesFileArray = []
        this.blogText = ''

        this.loadgetAllBlogList()
      }
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
#homeIndex {
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
      // 发布框
      .blog_list {
        width: 585px;
        .release {
          width: 100%;
          min-height: 140px;
          background: #fff;
          box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
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
              margin-top: 3px;
              display: flex;
              justify-content: center;
              align-items: center;
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
              height: 30px;
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
        #blogListLoading {
          width: 585px;
          height: 300px;
        }
      }
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
