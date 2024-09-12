/*
 * @Author       : conghui li conghui.li@shengyc.com
 * @Date         : 2022-09-29 14:48:14
 * @LastEditors  : conghui li conghui.li@shengyc.com
 * @LastEditTime : 2022-09-29 15:14:50
 */

/**
 * 获取缓存用户信息
 * @param {string | null} key 用户信息键
 * @returns string | object
 */
export const getUserInfo = (key) => {
    let userinfo = {}
    if (!JSON.parse(sessionStorage.getItem('userInfo1'))) {
        userinfo = JSON.parse(
            sessionStorage.getItem('sightseerInfo1')
        );
    } else {
        userinfo = JSON.parse(
            sessionStorage.getItem('userInfo1')
        );
    }
    if (typeof key === 'string') {
        return userinfo[key]
    } else {
        return userinfo
    }
}