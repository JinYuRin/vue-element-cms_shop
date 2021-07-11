/*
 * @Author: JinYuRin 
 * @Date: 2021-07-01 21:03:56 
 * @Last Modified by: JinYuRin
 * @Last Modified time: 2021-07-10 21:36:50
 */
export default {
    logo: 'UNI-ADMIN',
    // 这个结构还需要重新组织，不仅要记录顶部导航的激活index还必须带有每个左侧导航的激活index
    // 数据层级过于复杂，需要使用computed属性进行getset操作
    Menus: {
        activeHeader: 0,
        headerMenus: [{
                activeAside: 0,
                name: "首页",
                asideMenus: [{
                    title: "后台首页",
                    name: 'index'
                }, {
                    title: "相册管理",
                    name: 'album'
                }],
            },
            {
                activeAside: 0,
                name: "商品",
                asideMenus: [{
                    title: "商品列表",
                    name: 'shop_goods_list'
                }, {
                    title: "分类列表",
                    name: 'shop_goods_list'
                }, {
                    title: "商品规格",
                    name: 'shop_goods_list'
                }, {
                    title: "商品类型",
                    name: 'shop_goods_list'
                }, {
                    title: "商品评论",
                    name: 'shop_goods_list'
                }, {
                    title: "优惠券管理",
                    name: 'shop_goods_list'
                }],
            },
            {
                activeAside: 0,
                name: "订单",
                asideMenus: [{
                    title: "订单管理",
                    name: 'shop_goods_list'
                }, {
                    title: "发票管理",
                    name: 'shop_goods_list'
                }],
            },
            {
                activeAside: 0,
                name: "会员",
                asideMenus: [{
                    title: "会员列表",
                    name: 'shop_goods_list'
                }, {
                    title: "会员等级",
                    name: 'shop_goods_list'
                }],
            },
            {
                activeAside: 0,
                name: "设置",
                asideMenus: [{
                    title: "基础设置",
                    name: 'shop_goods_list'
                }, {
                    title: "物流设置",
                    name: 'shop_goods_list'
                }, {
                    title: "管理员管理",
                    name: 'shop_goods_list'
                }, {
                    title: "交易设置",
                    name: 'shop_goods_list'
                }, {
                    title: "公告管理",
                    name: 'shop_goods_list'
                }, {
                    title: "app首页设置",
                    name: 'shop_goods_list'
                }],
            },
        ],
    },
}