import testRequest from '@/utils/testRequest'
import request from '@/utils/request'

/**
 * 获取分销设置
 */
export function getRetailSetting() {
    return testRequest({
        url: '/wholeRetail',
        method: 'get',
    })
}
/**
 *  更改分销设置
 */
export function updateRetailSetting(data) {
    return testRequest({
        url: '/updateWholeRetail',
        method: 'post',
        params: data
    })
}
/**
 * 获取积分设置信息
 */
export function getIntegralSetting() {
    return testRequest({
        url: '/loadIntegral',
        method: 'get'
    })
}

/**
 *  更改积分设置
 */
export function updateIntegralSetting(integral) {
    return testRequest({
        url: '/updateIntegral',
        method: 'post',
        params: {integral}
    })
}
