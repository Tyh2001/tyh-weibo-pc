<template>
  <div id="settingIndex">
    <Tyh-card shadow="always" simple>
      <h3 class="title">
        {{ changeUserInfoBloon ? "修改资料" : "账号信息设置" }}
      </h3>
      <div class="user_photo_box">
        <img
          class="user_photo"
          :src="userInfo.photo"
          alt="用户头像"
          @click="upFilePhoto"
        />
        <input ref="file_input" class="up_user_photo" type="file" />
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
  </div>
</template>

<script>
import { getUserInfo, changeUserInfo, changeUserPass } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'settingIndex',
  components: {},
  props: {},
  data () {
    return {
      changeUserInfoBloon: false, // 展示用户信息和编辑信息的切换状态
      changeUserInfoBtnProhibit: false, // 更新用户信息的按钮禁用状态
      changeUserPassBtnProhibit: false, // 更改密码的按钮禁用状态
      feelingList: ['单身', '已婚', '订婚', '暧昧中', '求交往', '暗恋中', '分居', '离异', '保密'], // 感觉状况
      workList: ['计算机/互联网/通信', '生产/工艺/制造', '金融/银行/投资/保险', '商业/服务业/个体经营', '文化/广告/传媒', '娱乐/艺术/表演', '律师/法务', '教育/培训', '公务员/行政/事业单位', '演员/歌手', '自由职业', '模特', '空姐', '学生', '其他'], // 工作列表
      userForm: {
        nickname: '', // 昵称
        autograph: '', // 个性签名
        gender: '', // 性别
        feeling: '', // 感情状况
        work: '', // 职业
        birthday: '', // 生日
        mail: '' // 邮箱
      },
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
    ...mapState(['userInfo'])
  },
  watch: {},
  created () {
    this.loadgetUserInfo()
  },
  mounted () { },
  methods: {
    // 获取用户信息
    async loadgetUserInfo () {
      const { data } = await getUserInfo(this.userInfo.id)
      this.userForm = data.data
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
    // 点击头像上传文件
    upFilePhoto () {
      const fileInput = this.$refs.file_input
      fileInput.click()
    },
    // 保存用户资料
    SaveData () {
      this.changeUserInfoBtnProhibit = true
      this.$refs.userForm.validate(async (valid) => {
        if (!valid) {
          this.changeUserInfoBtnProhibit = false
          return
        }
        const newObj = {}
        newObj.id = this.userInfo.id
        for (const key in this.userForm) {
          newObj[key] = this.userForm[key]
        }
        const { data } = await changeUserInfo(this.$qs.stringify(newObj))
        // 改变展示状态和按钮禁用状态
        this.changeUserInfoBloon = false
        this.changeUserInfoBtnProhibit = false
        this.$message({
          message: '更新用户信息成功',
          type: 'danger',
          iconClass: 'tyh-ui-success-01'
        })
        console.log(data)
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
        const newObj = {}
        newObj.id = this.userInfo.id
        newObj.oldPass = this.changePass.oldPass
        newObj.newPass = this.changePass.newPass2
        const { data } = await changeUserPass(this.$qs.stringify(newObj))
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
    }
  }
}
</script>

<style lang='less' scoped>
#settingIndex {
  padding-bottom: 60px;
  .tyh-card {
    width: 650px;
    margin: auto;
    .title {
      font-weight: 500;
      margin-bottom: 30px;
    }
    .user_photo_box {
      width: 100px;
      margin: auto;
      .user_photo {
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
}
</style>
