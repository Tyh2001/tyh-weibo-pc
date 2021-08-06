/**
 * 博客相关
 */

import require from '@/utils/require'

/**
 * 发布博客
 * @param { object } data 发布内容
 * @param { string } userID 用户id
 * @returns
 */
export const onReleaseBlog = (data, userID) => {
  return require({
    method: 'POST',
    url: 'index/Blog/releaseBlog',
    data,
    params: {
      id: userID
    }
  })
}
