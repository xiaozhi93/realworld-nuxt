// 路由配置之前执行的中间件
export default function authenticated({ store, redirect}) {
    if (!store.state.user) {
        return redirect('/login')
    }
}