<template>
  <div id="fansIndex">
    <Tyh-crumbs>
      <Tyh-crumbs-item :to="'/my/' + userInfo.id">个人主页</Tyh-crumbs-item>
      <Tyh-crumbs-item>我的粉丝</Tyh-crumbs-item>
    </Tyh-crumbs>

    <template v-if="myFansList.length">
      <UserList
        v-for="(myFansListItem, index) in myFansList"
        :key="index"
        :isFans="true"
        :item="myFansListItem"
      />
    </template>

    <div v-else class="noFans">你还没有粉丝哦～</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserList from '@/components/UserList'
import { getFansUserList } from '@/api/follow'
export default {
  name: 'fansIndex',
  components: {
    UserList
  },
  props: {},
  data () {
    return {
      myFansList: [] // 我的粉丝列表
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {},
  created () {
    this.loadgetFansUserList() // 获取我的粉丝列表
  },
  mounted () { },
  methods: {
    async loadgetFansUserList () {
      const { data } = await getFansUserList(this.$qs.stringify({ user_id: this.userInfo.id }))
      this.myFansList = data.data
    }
  }
}
</script>

<style lang='less' scoped>
#fansIndex {
  background: #fff;
  padding: 15px;
  box-sizing: border-box;
  .tyh-crumbs {
    padding-bottom: 20px;
  }
  .noFans {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    user-select: none;
  }
}
</style>
