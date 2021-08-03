import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      // 首页
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      // 设置
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/setting')
      },
      // 登录
      {
        path: '/user/login',
        name: 'login',
        component: () => import('@/views/login')
      },
      // 注册
      {
        path: '/user/register',
        name: 'register',
        component: () => import('@/views/register')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 解决路由冗余导航报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
