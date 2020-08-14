/* 基于axios封装请求模块 */
import axios from 'axios'

export const request = axios.create({
    baseURL: 'https://conduit.productionready.io/api'
})


// 通过插件
export default ({ store }) => {
    // 请求拦截器， 请求中间件
    request.interceptors.request.use(function (config) {
        const user = store.state.user
        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }
        return config
    }, function (error) {
        return Promise.reject(error)
    })
}