/**
  充分定制路由配置的规则,一律在getRoutes的时候再补充上去
  1.所有类似 * / index 结尾的将path和name一律去除结尾的index
  1.5.存在  * / index/index怎么办????
  2.不以* / index 结尾的将path和name变成*_*,用正则替换吧
*/
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
            // path: '/index',
            // name: 'index',
            // 在这里配置了路由的meta元信息，还需要在router.beforeEach中动态设置title
            meta: {
                title: '后台首页',
                // keepAlive:false
                // <keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
            },
            // component: () => import("../../views/index/index.vue")
            component: () => "index/index"
        }, {
            meta: {
                title: '相册管理',
            },
            component: () => "album/index"
        }, {
            // path: '/shop/goods/list',
            // name: 'shop_goods_list',
            meta: {
                title: '商品列表',
            },
            component: () => "shop/goods/list"
        }]
    },
    {
        // path: '/login',
        // name: 'login',
        meta: {
            title: '登录页面'
        },
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
            // 直接执行下行代码会引起递归调用栈的爆炸
            // item.component = () => import(`../../views/${item.component()}.vue`)
            let component = item.component()
            let val = withoutIndex(component)
            console.log(val);
            // 自动配置路由的name和path
            //g匹配全局，由于采用全局正则，不需要用repalceAll了
            // 部分情况下||优于三元
            item.name = item.name || val.replace(/\//g, '_')
            item.path = item.path || `/${val}`
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
// 去除末尾的index
function withoutIndex(str) {
    let index = str.lastIndexOf('/')
    // 关于substring的应用问题：非零参数
    // 参数自动排序
    // 只有第一参数就截取到最后
    // 第二参数为-1则截取前几位,从0计算
    let val = str.substring(index + 1, str.length)
    // 发现以index结尾
    if (val === 'index') {
        return str.substring(index, -1)
    }
    return str
}

export default getRoutes()