/**
 * 博客相关
 */

import require from '@/utils/require'

/**
 * 上传发布博客的图片文件
 * @param { FormData } data 图片文件
 * @param { string } userId 用户 id
 * @returns
 */
// export const onReleaseBlogImg = (data, userId) => {
//   return require({
//     method: 'POST',
//     url: 'index/Blog/releaseBlogImg',
//     data,
//     params: userId
//   })
// }
export const onReleaseBlogImg = (data, userId) => {
  return require({
    method: 'POST',
    url: 'index/Blog/releaseBlogImg',
    data,
    params: userId
  })
}

/**
 * 上传用户发布的文字内容
 * @param { object } data 文字内容
 * @param { string } userId 用户id
 * @returns
 */
export const onReleaseBlogText = (data, userId) => {
  return require({
    method: 'POST',
    url: 'index/Blog/releaseBlogText',
    data,
    params: userId
  })
}
// releaseBlog

/**
 * 上传用户发布的文字内容
 * @param { object } data 文字内容
 * @param { string } userId 用户id
 * @returns
 */
export const onReleaseBlog = (data, params) => {
  return require({
    method: 'POST',
    url: 'index/Blog/releaseBlog',
    data,
    params
  })
}
