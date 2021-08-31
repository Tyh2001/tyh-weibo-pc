<template>
  <div id="myfollow">
    <Tyh-crumbs>
      <Tyh-crumbs-item :to="'/my/' + userInfo.id">个人主页</Tyh-crumbs-item>
      <Tyh-crumbs-item>我的关注</Tyh-crumbs-item>
    </Tyh-crumbs>

    <UserList
      v-for="(myFollowUserItem, index) in myFollowUser"
      :key="index"
      :item="myFollowUserItem"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserList from '@/components/UserList'
import { getFollowUserList } from '@/api/follow'
export default {
  name: 'myFollow',
  components: {
    UserList
  },
  props: {},
  data () {
    return {
      myFollowUser: [] // 我的关注列表
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {},
  created () {
    this.loadgetFollowUserList() // 获取我关注列表
  },
  mounted () { },
  methods: {
    // 获取我的关注列表
    async loadgetFollowUserList () {
      const { data } = await getFollowUserList(this.$qs.stringify({ user_id: this.userInfo.id }))
      this.myFollowUser = data.data
    }
  }
}
</script>

<style lang='less' scoped>
#myfollow {
  background: #fff;
  padding: 15px;
  box-sizing: border-box;
  .tyh-crumbs {
    padding-bottom: 20px;
  }
}
</style>
