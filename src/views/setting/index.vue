<template>
  <div id="settingIndex">
    <Tyh-card shadow="always" simple>
      <h3 class="title">账号信息设置</h3>
      <div class="user_photo_box">
        <img class="user_photo" :src="userInfo.photo" alt="" />
      </div>

      <el-form :model="userForm" ref="userForm" label-width="70px">
        <!-- 昵称 -->
        <el-form-item label="昵称">
          <el-input
            v-model="userForm.nickname"
            clearable
            placeholder="编辑昵称"
          />
        </el-form-item>

        <!-- 个性签名 -->
        <el-form-item label="个性签名">
          <el-input
            v-model="userForm.autograph"
            clearable
            placeholder="选择个性签名"
          />
        </el-form-item>

        <!-- 性别 -->
        <el-form-item label="性别">
          <el-select v-model="userForm.gender" placeholder="请选择性别">
            <el-option label="男" value="1" />
            <el-option label="女" value="2" />
            <el-option label="保密" value="3" />
          </el-select>
        </el-form-item>

        <!-- 感情状况 -->
        <el-form-item label="感情状况">
          <el-select v-model="userForm.feeling" placeholder="感情状况">
            <el-option
              v-for="(feelingItem, index) in feelingList"
              :key="index"
              :label="feelingItem"
              :value="index"
            />
          </el-select>
        </el-form-item>

        <!-- 职业 -->
        <el-form-item label="职业">
          <el-select v-model="userForm.work" placeholder="选择职业">
            <el-option
              v-for="(workItem, index) in workList"
              :key="index"
              :label="workItem"
              :value="index"
            />
          </el-select>
        </el-form-item>

        <!-- 生日 -->
        <el-form-item label="生日">
          <el-date-picker
            v-model="userForm.birthday"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item label="邮箱">
          <el-input v-model="userForm.mail" clearable placeholder="选择邮箱" />
        </el-form-item>
      </el-form>

      <Tyh-button type="success">保存资料</Tyh-button>
    </Tyh-card>

    <Tyh-card shadow="always" simple>
      <h3 class="title">修改密码</h3>
      <el-form :model="changePass" ref="changePass" label-width="70px">
        <!-- 原始密码 -->
        <el-form-item label="原始密码">
          <el-input
            v-model="userForm.oldPass"
            placeholder="请输入原始密码"
            show-password
          />
        </el-form-item>

        <!-- 新密码 -->
        <el-form-item label="新密码">
          <el-input
            v-model="userForm.newPass1"
            placeholder="请输入新密码"
            show-password
          />
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item label="确认密码">
          <el-input
            v-model="userForm.newPass2"
            placeholder="确认新密码"
            show-password
          />
        </el-form-item>
      </el-form>

      <Tyh-button type="success">修改密码</Tyh-button>
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
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'settingIndex',
  components: {},
  props: {},
  data () {
    return {
      feelingList: ['单身', '已婚', '订婚', '暧昧中', '求交往', '暗恋中', '分居', '离异', '保密'], // 感觉状况
      workList: ['计算机/互联网/通信', '生产/工艺/制造', '金融/银行/投资/保险', '商业/服务业/个体经营', '文化/广告/传媒', '娱乐/艺术/表演', '律师/法务', '教育/培训', '公务员/行政/事业单位', '演员/歌手', '模特', '空姐', '学生', '自由职业', '其他'], // 工作列表
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
      this.userForm = data
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
    }
    .el-form {
      margin-top: 25px;
    }
    .el-select,
    .el-date-editor--date {
      width: 100%;
    }
    .tyh-button {
      width: 540px;
      margin-left: 70px;
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
