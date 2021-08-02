import require from '@/utils/require'

/**
 * 注册账号
 * @param { object } params 用户注册信息
 * @returns
 */
export const onRegister = data => {
  return require({
    method: 'POST',
    url: 'index/User/Register',
    data
  })
}

/**
 * 登录
 * @param { object } data 用户名和密码的对象
 * @returns
 */
export const onUserLogin = data => {
  return require({
    method: 'POST',
    url: 'index/User/Login',
    data
  })
}
