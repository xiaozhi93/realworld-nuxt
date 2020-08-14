// 路由配置之前执行的中间件
// 服务端和前端都会拦截
export default function ({store, redirect}) {
    if(store.state.user) {
        return redirect('/')
    }
}