let routes = [{
        path: '/',
        name: 'layout',
        redirect: {
            name: 'index' //默认重定向到name为index的路由去
        },
        // component: () => import("../../views/layout.vue"),
        component: () => "layout",
        // ./是查找与本文件同级目录的文件或者子文件夹
        //  /是查找本文件所在文件夹的文件或者子文件夹
        // ../../向上寻找两级必须是两个.
        children: [{
            path: '/index',
            name: 'index',
            // component: () => import("../../views/index/index.vue")
            component: () => "index/index"
        }]
    },
    {
        path: '/login',
        name: 'login',
        // component: () => import("../../views/login/index.vue")
        component: () => "login/index"
    },
    {
        path: '*',
        redirect: {
            name: 'index'
            //会有路由优先匹配规则,不符合以上的路由全部进到这里的重定向
        },
    }
]
// 定义函数以下三种方法,只要记住一种都可以使用
// 1.let getRoutes = function () {}
// 2.let getRoutes = function getRoutes() {}
// 3.function getRoutes() {}
// 获取路由
let getRoutes = function () {
    let newRoutes = createRoute(routes)
    console.log(newRoutes);
    return newRoutes
}
// 递归创建路由
function createRoute(arr) {
    arr.forEach(item => {
        // component: () => import("../../views/layout.vue"),
        // component: () => "layout",
        // 对routes每个元素的component进行替换,注意最后一个重定向的元素是没有component属性的
        // 得注意可能不存在component但存在children的情况????
        if (!item.component) {
            return
        } else {
            // 直接执行以下方法会引起递归调用栈的爆炸
            // item.component = () => import(`../../views/${item.component()}.vue`)
            let component = item.component()
            // console.log("替换前的component函数返回值", component);
            // console.log("替换后的component函数参数", `../../views/${component}.vue`);
            item.component = () => import(`../../views/${component}.vue`)
        }
        // 如果还有子路由数组，继续递归调用createRoute(arr),由于目录是有限的，自然会停止递归
        if (!item.children || item.children.length === 0) {
            return
        } else {
            createRoute(item.children)
        }
    })
    // 最终要返回去
    return arr
}


export default getRoutes()