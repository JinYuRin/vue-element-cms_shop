/*
 * @Author: JinYuRin 
 * @Date: 2021-07-01 21:03:56 
 * @Last Modified by: JinYuRin
 * @Last Modified time: 2021-07-01 21:09:45
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
                asideMenus: ["后台首页", "相册管理"],
            },
            {
                activeAside: 0,
                name: "商品",
                asideMenus: [
                    "商品列表",
                    "分类列表",
                    "商品规格",
                    "商品类型",
                    "商品评论",
                    "优惠券管理",
                ],
            },
            {
                activeAside: 0,
                name: "订单",
                asideMenus: ["订单管理", "发票管理"],
            },
            {
                activeAside: 0,
                name: "会员",
                asideMenus: ["会员列表", "会员等级"],
            },
            {
                activeAside: 0,
                name: "设置",
                asideMenus: [
                    "基础设置",
                    "物流设置",
                    "管理员管理",
                    "交易设置",
                    "公告管理",
                    "app首页设置",
                ],
            },
        ],
    },
}