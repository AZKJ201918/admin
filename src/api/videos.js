
import request from '@/utils/request'
/**
 * 查看所有视频
 */
export function getAllVideo(page, limit) {
  return request({
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
  return request({
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
  return request({
    url: '/insertVideo',
    method: 'post',
    data
  })
}

/**
 * 修改视频
 */
export function updateVideo(data) {
  return request({
    url: '/updateVideo',
    method: 'post',
    data
  })
}
