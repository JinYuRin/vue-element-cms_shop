let routes = [{
        path: '/',
        name: 'layout',
        redirect: {
            name:'index'//默认重定向到name为index的路由去
        },
        component: () => import("../../views/layout.vue"),
        // ./是查找与本文件同级目录的文件或者子文件夹
        //  /是查找本文件所在文件夹的文件或者子文件夹
        // ../../向上寻找两级必须是两个.
        children: [{
            path: '/index',
            name: 'index',
            component: () => import("../../views/index/index.vue")
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("../../views/login/index.vue")
    }
]
export default routes