import testRequest from '@/utils/testRequest'
import request from '@/utils/request'
/**
 * 查看所有视频
 */
export function getAllVideo(page, limit) {
    return testRequest({
        url: '/allVideo',
        method: 'get',
        params: {
            page: page || 1,
            limit: 5
        }
    })
}

/**
 * 删除视频
 */
export function deleteVideo(id) {
    return testRequest({
        url: '/deleteVideo',
        method: 'post',
        params: {
            id
        }
    })
}

/**
 * 新增视频
 */
export function insertVideo(data) {
    return testRequest({
        url: '/insertVideo',
        method: 'post',
        data
    })
}

/**
 * 修改视频
 */
export function updateVideo(data) {
    return testRequest({
        url: '/updateVideo',
        method: 'post',
        data
    })
}
