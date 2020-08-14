import { request } from '@/plugins/request'

// 登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/users/login',
        data
    })
}

// 注册

export const register = data => {
    return request({
        method: 'POST',
        url: '/users',
        data
    })
}

export const getUser = () => {
    return request({
        method: 'GET',
        url: '/user',
    })
}

export const updateUser = (data) => {
    return request({
        method: 'PUT',
        url: '/user',
        data
    })
}

export const getProfileFormUser = (username) => {
    return request({
        method: 'GET',
        url: `/profiles/${username}`,
    })
}

// 关注
export const setFollowToUser = username => {
    return request({
        method: 'POST',
        url: `/profiles/${username}/follow`
    })
}

export const deleteFollowToUser = username => {
    return request({
        method: 'DELETE',
        url: `/profiles/${username}/follow`
    })
}