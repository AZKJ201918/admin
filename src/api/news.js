// import testRequest from '@/utils/testRequest'
import request from '@/utils/request'
/**
 * 查看商品
 */
export function getAllNews(data, page, limit) {
  return request({
    url: '/loadArticle',
    method: 'post',
    data,
    params: {
      page: page || 1,
      limit: 5
    }
  })
}
/**
 * 增加商品
 */
export function insertNew(data) {
  return request({
    url: '/insertArticle',
    method: 'post',
    data
  })
}
/**
 * 删除商品
 */
export function deleteNew(id) {
  return request({
    url: '/deleteArticle',
    method: 'post',
    params: {
      id
    }
  })
}
/**
 * 修改商品
 */
export function updateNew(data) {
  return request({
    url: '/updateArticle',
    method: 'post',
    data
  })
}
