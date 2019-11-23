import request from '@/utils/testRequest'
// import request from '@/utils/request'

/**
 * 获取轮播图
 */
export function getBanners(pageNum, pageSize) {
    return request({
        url: '/slideShow',
        method: 'get',
        params: {
            page: pageNum || 1,
            limit: pageSize || 10
        }
    })
}
/**
 *更新轮播图
 */
export function updateBanner(data) {
    return request({
        url: '/updateSlideShow',
        method: 'post',
        data
    })
}

/**
 *新增轮播图
 */
export function insertBanner(data) {
    return request({
        url: '/insertSlideShow',
        method: 'post',
        data
    })
}
/**
 *删除轮播图
 */
export function deleteBanner(id) {
    return request({
        url: '/deleteSlideShow',
        method: 'post',
        params: { id }
    })
}

/**
 * 获取小程序页面
 */
export function getInternalLink() {
    return request({
        url: '/selectLink',
        method: 'get'
    })
}




/**
 * 获取首页按钮
 */
export function getAllButtons(pageNum, pageSize) {
    return request({
        url: '/allOption',
        method: 'get',
        params: {
            page: pageNum || 1,
            limit: pageSize || 10
        }
    })
}
/**
 *更新首页按钮
 */
export function updateButton(data) {
    return request({
        url: '/updateOption',
        method: 'post',
        data
    })
}

/**
 *新增首页按钮
 */
export function insertButton(data) {
    return request({
        url: '/insertSlideShow',
        method: 'post',
        data
    })
}
/**
 *删除首页按钮
 */
export function deleteButton(id) {
    return request({
        url: '/deleteSlideShow',
        method: 'post',
        params: { id }
    })
}

