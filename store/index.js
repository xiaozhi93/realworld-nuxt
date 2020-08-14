const cookieparser = process.server ? require('cookieparser') : undefined

// state在函数中
// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把state定义成一个函数
export const state = () => {
    return {
        // 登录用户登录状态
        user: null
    }
}
export const mutations = {
    setUser(state, user) {
        state.user = user
    }
}

export const actions = {
    // 初始化容器以及需要传递给客户端的数据
    // 只会在服务端渲染期间运行
    nuxtServerInit({ commit }, { req }) {
        let user = null
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user) // 捕获不是json的错误
            } catch (err) {

            }
        }
        commit('setUser', user)
    }
}