/* 基于axios封装请求模块 */
import axios from 'axios'

const request = axios.create({
    baseURL: 'https://conduit.productionready.io/api'
})

// 请求拦截器， 请求中间件
request.interceptors.request.use(function(config) {
    // config.headers.Authorization = `Token ${}`
    return config
}, function(error) {
    return Promise.reject(error)
})

export default request