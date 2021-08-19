<template>
  <div id="settingIndex">
    <Tyh-card shadow="always" simple>
      <h3 class="title">
        {{ changeUserInfoBloon ? "修改资料" : "账号信息设置" }}
      </h3>
      <div class="user_photo_box">
        <img
          class="user_photo"
          :src="userPhotoAvatar"
          alt="用户头像"
          @click="upFilePhoto"
        />
        <input
          ref="file_input"
          class="up_user_photo"
          type="file"
          @change="onChangeFileInp"
        />
      </div>

      <el-form
        :model="userForm"
        ref="userForm"
        label-width="80px"
        :rules="userFormRules"
      >
        <!-- 昵称 -->
        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-if="changeUserInfoBloon"
            v-model="userForm.nickname"
            clearable
            placeholder="编辑昵称"
          />
          <p v-else class="form_item_text">{{ userForm.nickname }}</p>
          <el-skeleton
            variant="p"
            :rows="1"
            animated
            :loading="keletonLoading"
          />
        </el-form-item>

        <!-- 个性签名 -->
        <el-form-item label="个性签名">
          <el-input
            v-if="changeUserInfoBloon"
            v-model="userForm.autograph"
            clearable
            placeholder="选择个性签名"
          />
          <p v-else class="form_item_text">{{ userForm.autograph }}</p>
          <el-skeleton
            variant="p"
            :rows="1"
            animated
            :loading="keletonLoading"
          />
        </el-form-item>

        <!-- 性别 -->
        <el-form-item label="性别">
          <el-select
            v-if="changeUserInfoBloon"
            v-model="userForm.gender"
            placeholder="请选择性别"
          >
            <el-option value="男" />
            <el-option value="女" />
            <el-option value="保密" />
          </el-select>
          <p v-else class="form_item_text">{{ userForm.gender }}</p>
          <el-skeleton
            variant="p"
            :rows="1"
            animated
            :loading="keletonLoading"
          />
        </el-form-item>

        <!-- 感情状况 -->
        <el-form-item label="感情状况">
          <el-select
            v-if="changeUserInfoBloon"
            v-model="userForm.feeling"
            placeholder="感情状况"
          >
            <el-option
              v-for="(feelingItem, index) in feelingList"
              :key="index"
              :value="feelingItem"
            />
          </el-select>
          <p v-else class="form_item_text">{{ userForm.feeling }}</p>
          <el-skeleton
            variant="p"
            :rows="1"
            animated
            :loading="keletonLoading"
          />
        </el-form-item>

        <!-- 职业 -->
        <el-form-item label="职业">
          <el-select
            v-if="changeUserInfoBloon"
            v-model="userForm.work"
            placeholder="选择职业"
          >
            <el-option
              v-for="(workItem, index) in workList"
              :key="index"
              :value="workItem"
            />
          </el-select>
          <p v-else class="form_item_text">{{ userForm.work }}</p>
          <el-skeleton
            variant="p"
            :rows="1"
            animated
            :loading="keletonLoading"
          />
        </el-form-item>

        <!-- 生日 -->
        <el-form-item label="生日">
          <el-date-picker
            v-if="changeUserInfoBloon"
            v-model="userForm.birthday"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
          />
          <p v-else class="form_item_text">{{ userForm.birthday }}</p>
          <el-skeleton
            variant="p"
            :rows="1"
            animated
            :loading="keletonLoading"
          />
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="mail">
          <el-input
            v-if="changeUserInfoBloon"
            v-model="userForm.mail"
            clearable
            placeholder="选择邮箱"
          />
          <p v-else class="form_item_text">{{ userForm.mail }}</p>
          <el-skeleton
            variant="p"
            :rows="1"
            animated
            :loading="keletonLoading"
          />
        </el-form-item>
      </el-form>

      <Tyh-button
        :type="changeUserInfoBloon ? 'success' : 'primary'"
        :prohibit="changeUserInfoBtnProhibit"
        @click="changeUserInfoBloon ? SaveData() : (changeUserInfoBloon = true)"
        >{{ changeUserInfoBloon ? "保存资料" : "修改资料" }}</Tyh-button
      >
    </Tyh-card>

    <Tyh-card shadow="always" simple>
      <h3 class="title">修改密码</h3>
      <el-form
        :model="changePass"
        ref="userPassForm"
        :rules="userPassForm"
        label-width="80px"
      >
        <!-- 原始密码 -->
        <el-form-item label="原始密码" prop="oldPass">
          <el-input
            v-model="changePass.oldPass"
            placeholder="请输入原始密码"
            show-password
          />
        </el-form-item>

        <!-- 新密码 -->
        <el-form-item label="新密码" prop="newPass1">
          <el-input
            v-model="changePass.newPass1"
            placeholder="请输入新密码"
            show-password
          />
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="newPass2">
          <el-input
            v-model="changePass.newPass2"
            placeholder="确认新密码"
            show-password
          />
        </el-form-item>
      </el-form>

      <Tyh-button
        type="success"
        :prohibit="changeUserPassBtnProhibit"
        @click="SaveDataNewPass"
        >修改密码</Tyh-button
      >
    </Tyh-card>

    <Tyh-card shadow="always" simple>
      <h3 class="title">其他设置</h3>
      <Tyh-button class="outLogin" type="danger" @click="outLogin"
        >退出登录</Tyh-button
      >
    </Tyh-card>

    <!-- 执行头像裁切的对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="CropperImgDialog"
      width="600px"
      @opened="dialogOpened"
      @closed="dialogClosed"
    >
      <div>
        <img
          class="cropper_img"
          ref="cropper_img"
          :src="UploadfileImgUrl"
          alt=""
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CropperImgDialog = false">取 消</el-button>
        <el-button type="primary" @click="ToUploadPhoto">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 获取用户信息 - 修改用户资料 - 修改密码 - 上传头像
import { getUserInfo, changeUserInfo, changeUserPass, uploadUserPhoto } from '@/api/user'
import { mapState } from 'vuex'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import Bus from '@/utils/bus'
export default {
  name: 'settingIndex',
  components: {},
  props: {},
  data () {
    return {
      keletonLoading: true, // 加载骨架的 loading
      cropper: null, // 头像裁切器实例
      UploadfileImgUrl: '', // 头像裁切器中图片地址
      CropperImgDialog: false, // 执行头像裁切的对话框
      changeUserInfoBloon: false, // 展示用户信息和编辑信息的切换状态
      changeUserInfoBtnProhibit: false, // 更新用户信息的按钮禁用状态
      changeUserPassBtnProhibit: false, // 更改密码的按钮禁用状态
      feelingList: ['单身', '已婚', '订婚', '暧昧中', '求交往', '暗恋中', '分居', '离异', '保密'], // 感情状况
      workList: ['计算机/互联网/通信', '生产/工艺/制造', '金融/银行/投资/保险', '商业/服务业/个体经营', '文化/广告/传媒', '娱乐/艺术/表演', '律师/法务', '教育/培训', '公务员/行政/事业单位', '演员/歌手', '自由职业', '模特', '空姐', '学生', '其他'], // 工作列表
      userForm: {}, // 个人信息
      // 修改密码
      changePass: {
        oldPass: '',
        newPass1: '',
        newPass2: ''
      },
      // 用户资料的表单验证
      userFormRules: {
        // 昵称
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        // 邮箱
        mail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '邮箱格式不正确', trigger: 'blur' }
        ]
      },
      // 更改密码的表单验证
      userPassForm: {
        oldPass: [
          { required: true, message: '请输入原始密码', trigger: 'blur' },
          { min: 8, max: 20, message: '密码长度需在 8 到 20 个字符', trigger: 'blur' }
        ],
        // 第一遍密码
        newPass1: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'))
              } else {
                if (this.changePass.newPass1 !== '') {
                  this.$refs.userPassForm.validateField('newPass2')
                }
                callback()
              }
            },
            trigger: 'blur'
          },
          { min: 8, max: 20, message: '密码长度需在 8 到 20 个字符', trigger: 'blur' }
        ],
        // 第二遍密码
        newPass2: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.changePass.newPass1) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    userPhotoAvatar () {
      return `https://tianyuhao.icu/backstage/virgo_tyh_php/public/userPhoto/${this.userForm.avatar}`
    }
  },
  watch: {},
  created () {
    this.loadgetUserInfo() // 获取用户资料
  },
  mounted () { },
  methods: {
    // 获取用户信息
    async loadgetUserInfo () {
      const { data } = await getUserInfo(this.userInfo.id)
      this.userForm = data.data
      this.keletonLoading = false // 隐藏加载骨架
    },
    // 退出登录
    outLogin () {
      this.$confirm('确定要退出账号吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 直接交个 vuex 处理
        this.$store.commit('outLogin')
        this.$message({
          message: '已成功退出账号',
          type: 'primary',
          iconClass: 'tyh-ui-primary-01'
        })
        this.$router.push('/')
      }).catch(() => { })
    },
    // 保存用户资料
    SaveData () {
      this.changeUserInfoBtnProhibit = true
      this.$refs.userForm.validate(async (valid) => {
        if (!valid) {
          this.changeUserInfoBtnProhibit = false
          return
        }
        const { data } = await changeUserInfo(this.$qs.stringify(this.userForm), this.userInfo.id)

        // 提交给导航栏更新用户昵称
        Bus.$emit('updataNickname', this.userForm)

        // 如果 code 不是 201 那么直接返回错误信息
        if (data.code !== 201) {
          this.$message({
            message: data.msg,
            type: 'warning',
            iconClass: 'tyh-ui-warning-01'
          })
          return
        }
        // 改变展示状态和按钮禁用状态
        this.changeUserInfoBloon = false
        this.changeUserInfoBtnProhibit = false
        this.$message({
          message: '更新用户信息成功',
          type: 'danger',
          iconClass: 'tyh-ui-success-01'
        })
      })
    },
    // 修改密码
    SaveDataNewPass () {
      this.changeUserPassBtnProhibit = true
      this.$refs.userPassForm.validate(async (valid) => {
        if (!valid) {
          this.changeUserPassBtnProhibit = false
          return
        }
        const { data } = await changeUserPass(this.$qs.stringify(
          {
            oldPass: this.changePass.oldPass,
            newPass: this.changePass.newPass2
          }
        ), this.userInfo.id)
        // 更新失败
        if (data.code !== 201) {
          this.$message({
            message: data.msg,
            type: 'warning',
            iconClass: 'tyh-ui-warning-01'
          })
          this.changeUserPassBtnProhibit = false
          return
        }
        // 更新成功
        this.$message({
          message: data.msg + '，请退出重新登录',
          type: 'danger',
          iconClass: 'tyh-ui-success-01',
          times: 2700
        })
        this.changeUserPassBtnProhibit = false
        this.$store.commit('outLogin')
        this.$router.push('/')
      })
    },
    // 点击头像上传文件
    upFilePhoto () {
      const fileInput = this.$refs.file_input
      fileInput.click()
    },
    // 当上传文件被改变时候 获取图片路径 展示裁切器对话框
    onChangeFileInp () {
      // 获取到上传图片的路径
      this.UploadfileImgUrl = URL.createObjectURL(this.$refs.file_input.files[0])
      this.CropperImgDialog = true // 展示对话框
    },
    // 当头像裁切器对话框完全展示时候的回调 获取对话框中的 img 标签 并初始化裁切器
    dialogOpened () {
      const image = this.$refs.cropper_img // 获取到对话框中的 img 标签
      this.cropper = new Cropper(image, {
        aspectRatio: 1 / 1, // 裁切框的比例
        viewMode: 1, // 裁切框不能移出图片范围
        dragMode: 'none' // 背景画布禁止移动
      })
    },
    // 当头像裁切器对话框完全关闭的时候 销毁裁切器
    dialogClosed () {
      // 销毁裁切器
      this.cropper.destroy()
      this.$refs.file_input.value = ''
    },
    // 点击确定上传图片
    ToUploadPhoto () {
      // blob 为裁切的结果图片
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()

        // 这里第三个参数为图片后缀名
        formData.append('photo', blob, '.jpg')

        uploadUserPhoto(formData, this.userInfo.id).then(res => {
          this.userForm.avatar = res.data.data.url // 更新头像
          this.CropperImgDialog = false // 关于对话框
          Bus.$emit('updataPhoto', res.data.data.url) // 将新的头像地址传递给导航栏组件
          this.$message({
            message: '上传头像成功',
            type: 'danger',
            iconClass: 'tyh-ui-success-01'
          })
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
#settingIndex {
  padding: 60px 0 60px 0;
  background: rgb(245, 245, 245);
  // height: 100%;
  .tyh-card {
    width: 650px;
    margin: auto;
    background: #fff;
    .title {
      font-weight: 500;
      margin-bottom: 30px;
    }
    .user_photo_box {
      width: 100px;
      margin: auto;
      .user_photo {
        display: block;
        max-width: 100%;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        cursor: pointer;
      }
      .up_user_photo {
        display: none;
      }
    }
    .el-form {
      margin-top: 25px;
      .form_item_text {
        color: #333;
        margin-left: 13px;
      }
    }
    .el-select,
    .el-date-editor--date {
      width: 100%;
    }
    .tyh-button {
      width: 530px;
      margin-left: 80px;
      margin-bottom: 16px;
    }
  }
  .tyh-card:nth-child(1) {
    margin-top: 50px;
  }
  .tyh-card:nth-child(2) {
    margin-top: 20px;
  }
  .tyh-card:nth-child(3) {
    margin-top: 20px;
  }
  .cropper_img {
    max-height: 450px;
  }
}
</style>
