<!--  -->
<template>
  <div>
    <!-- 晕，除了class还能style的吗
        小秘诀，直接absolute四方为0就能占满整个屏幕 -->
    <el-container
      style="
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
      "
    >
      <el-header style="background-color: #545c64">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="text-white m-0">UNI-ADMIN</h3>
          <el-menu
            :default-active="activeHeader"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item
              v-for="(menu, index) in headerMenu"
              :key="index"
              :index="index"
              >{{ menu }}</el-menu-item
            >
            <el-submenu index="100">
              <template slot="title">
                <el-avatar
                  class="mr-1"
                  :size="30"
                  src="https://empty"
                  @error="errorHandler"
                >
                  <img
                    src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                  />
                </el-avatar>
                {{ userMenu.name }}
              </template>
              <el-menu-item
                v-for="(menu, index) in userMenu.subMenu"
                :key="index"
                :index="menu.index"
                >{{ menu.title }}</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
      <el-container style="height: 100%; padding-bottom: 60px">
        <!-- 这个el-container的高度本来已经是父元素的百分百了，但是由于还存在另一个60px
             导致这个元素还有60px在底下隐藏了看不到，所以加上padding-bottom: 60px -->
        <el-aside width="200px">
          <el-menu
            :default-active="activeAside"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item
              v-for="(menu, index) in asideMenu[activeHeader]"
              :key="index"
              :index="index"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">{{ menu }}</span>
            </el-menu-item>
          </el-menu>
          <!-- 高度太高，而且已经使用了hidden，所以隐藏看不到 -->
          <!-- <li v-for="i in 100" :key="i">{{ i }}</li> -->
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  // 引入一个vue混入组件，可以查文档
  // mixins:[],
  data() {
    return {
      // 这个结构还需要重新组织，不仅要记录顶部导航的激活index还必须带有每个左侧导航的激活index
      activeHeader: 0,
      headerMenu: ["首页", "商品", "订单", "会员", "设置"],
      activeAside: 0,
      asideMenu: [
        ["后台首页", "相册管理"],
        [
          "商品列表",
          "分类列表",
          "商品规格",
          "商品类型",
          "商品评论",
          "优惠券管理",
        ],
        ["订单管理", "发票管理"],
        ["会员列表", "会员等级"],
        [
          "基础设置",
          "物流设置",
          "管理员管理",
          "交易设置",
          "公告管理",
          "app首页设置",
        ],
      ],
      userMenu: {
        name: "Tencent",
        subMenu: [
          { title: "修改", index: "100-1" },
          { title: "退出", index: "100-2" },
        ],
      },
    };
  },

  components: {},

  computed: {},

  // mounted: {},

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeHeader = key;
    },
  },
};
</script>
<style>
/* .el-header {
  padding: 0 !important;
  background-color: #b3c0d1;
  color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
} */
</style>