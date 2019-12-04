import request from '@/utils/request'
/**
 * 模糊查询商品列表(只有名称和图像)
 */
export function getProductByNameLike(name, page, limit) {
  return request({
    url: '/likeCommodity',
    method: 'post',
    params: {
      name,
      page: page || 1,
      limit: limit || 10
    }
  })
}

/**
 * 模糊查询商品列表
 */
export function getAllProducts(name, page, limit) {
  return request({
    url: '/allCommodity',
    method: 'post',
    params: {
      name,
      page: page || 1,
      limit: limit || 8
    }
  })
}

/**
 * 更新商品
 */
export function updateProduct(data) {
  return request({
    url: '/updateCommodity',
    method: 'post',
    data
  })
}

/**
 * 新增商品
 */
export function insertProduct(data) {
  return request({
    url: '/insertCommodity',
    method: 'post',
    data
  })
}

/**
 * 删除商品
 */
export function deleteProduct(id) {
  return request({
    url: '/deleteCommodity',
    method: 'post',
    params: { id }
  })
}

/**
 * 删除商品轮播图
 */
export function deleteDetailBanner(id) {
  return request({
    url: '/deleteDetailBanner',
    method: 'post',
    params: { id }
  })
}
