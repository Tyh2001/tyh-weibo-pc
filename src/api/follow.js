/**
 * 关注相关
 */

import require from '@/utils/require'

/**
 * 关注用户
 * @param { object } data 用户 id 和被关注用户的 id
 * @returns 提示信息 状态码
 */
export const onFollowUser = data => {
  return require({
    method: 'POST',
    url: 'index/Follow/onFollowUser',
    data
  })
}

/**
 * 获取我的关注列表
 * @param { object } data 用户 id
 * @returns 关注列表
 */
export const getFollowUserList = data => {
  return require({
    method: 'POST',
    url: 'index/Follow/getFollowUserList',
    data
  })
}

export const getFansUserList = data => {
  return require({
    method: 'POST',
    url: 'index/Follow/getFansUserList',
    data
  })
}
