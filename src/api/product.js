import testRequest from '@/utils/testRequest'
import request from '@/utils/request'

/**
 * 模糊查询商品列表(只有名称和图像)
 */
export function getProductByNameLike(name, page, limit) {
    return testRequest({
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
    return testRequest({
        url: '/allCommodity',
        method: 'post',
        params: {
            name,
            page: page || 1,
            limit: limit || 10
        }
    })
}

/**
 * 更新商品
 */
export function updateProduct(data) {
    return testRequest({
        url: '/updateCommodity',
        method: 'post',
        data
    })
}

/**
 * 删除商品轮播图
 */
export function deleteDetailBanner(id) {
    return testRequest({
        url: '/deleteDetailBanner',
        method: 'post',
        params: {id}
    })
}