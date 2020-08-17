module.exports = {
    router: {
        // 自定义路由表规范
        extendRoutes(routes, resolve) {
            routes.splice(0) // 清空路由默认规则
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'layout/index.vue'),
                    children: [
                        {
                            path: '', // 默认子路由
                            name: 'home',
                            component: resolve(__dirname, 'pages/home/index.vue')
                        },
                        {
                            path: '/login',
                            name: 'login',
                            component: resolve(__dirname, 'pages/login/index.vue')
                        },
                        {
                            path: '/register',
                            name: 'register',
                            component: resolve(__dirname, 'pages/login/index.vue')
                        },
                        {
                            path: '/profile/:username',
                            name: 'profile',
                            component: resolve(__dirname, 'pages/profile/index.vue'),
                            redirect: { name: 'myActicle'},
                            children: [
                                {
                                    path: '',
                                    name: 'myActicle',
                                    component: resolve(__dirname, 'pages/profile/ActicleList.vue')
                                },
                                {
                                    path: 'favorites',
                                    name: 'favoriteActicle',
                                    component: resolve(__dirname, 'pages/profile/ActicleList.vue')
                                }
                            ]
                        },
                        {
                            path: '/settings',
                            name: 'settings',
                            component: resolve(__dirname, 'pages/settings/index.vue')
                        },
                        {
                            path: '/editor', 
                            name: 'editor',
                            component: resolve(__dirname, 'pages/editor/index.vue')
                        },
                        {
                            path: '/editor/:slug', // 如何设置slug可以为空
                            name: 'updateEditor',
                            component: resolve(__dirname, 'pages/editor/index.vue')
                        },
                        {
                            path: '/article/:slug',
                            name: 'article',
                            component: resolve(__dirname, 'pages/article/index.vue')
                        }
                    ]
                }
            ])
        }
    },
    plugins: [
        '~/plugins/request.js',
        '~/plugins/filters.js'
    ],
    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000
    }
}