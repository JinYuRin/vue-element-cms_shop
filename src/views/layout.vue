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
          <!-- 因为$config.logo也是Vue对象里的属性，可以用this直接指向的 -->
          <h3 class="text-white m-0">{{ $config.logo }}</h3>
          <el-menu
            :default-active="activeHeader.toString()"
            mode="horizontal"
            @select="selectHeaderMenus"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item
              v-for="(menu, index) in $config.Menus.headerMenus"
              :key="index"
              :index="index.toString()"
              >{{ menu.name }}</el-menu-item
            >
            <!--除了这个个人信息之外，index都是实际存在的，也就是说，当需要判断index=100
            的时候，就是点到了个人信息的时候，回调函数需要特制
              -->
            <el-submenu index="100">
              <template slot="title">
                <el-avatar class="mr-1" :size="30" src="https://empty">
                  <img
                    src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                  />
                </el-avatar>
                {{ userMenu.name }}
              </template>
              <el-menu-item
                v-for="(menu, index) in userMenu.subMenus"
                :key="index"
                :index="menu.index"
                >{{ menu.title }}</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
      <el-container style="height: 100%">
        <!-- 这个el-container的高度本来已经是父元素的百分百了，但是由于还存在另一个60px
             导致这个元素还有60px在底下隐藏了看不到，所以加上padding-bottom: 60px -->
        <el-aside width="200px" style="height: 100%">
          <el-menu
            style="height: 100%"
            :default-active="activeAside.toString()"
            @select="selectAsideMenus"
          >
            <el-menu-item
              v-for="(menu, index) in asideMenus"
              :key="index"
              :index="index.toString()"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">{{ menu.title }}</span>
            </el-menu-item>
          </el-menu>
          <!-- 高度太高，而且已经使用了hidden，所以隐藏看不到 -->
          <!-- <li v-for="i in 100" :key="i">{{ i }}</li> -->
        </el-aside>
        <el-main class="bg-light" style="position: relative">
          <!--  style="position: relative" -->
          <!-- 考虑使用面包屑还是使用tabs标签 -->
          <div
            v-if="$route.name !== 'index'"
            class="border-bottom p-3 mb-2 bg-white"
            style="margin: -20px"
          >
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item
                v-for="(bran, index) in routerBran"
                :key="index"
                :to="{ path: bran.path }"
                >{{ bran.title }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
          <router-view></router-view>
          <el-backtop target=".el-main" :bottom="100">
            <div
              style="
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
              "
            >
              UP
            </div>
          </el-backtop>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    // 初始化一下Menus
    this.Menus = this.$config.Menus;
    // 在created得到routerBran，但是还需要另一个时机:变换路由
    this.getRouterBran();
    // 从缓存中获取记录的导航激活信息
    this.getActiveMenu();
  },
  // 引入一个vue混入组件，可以查文档
  // mixins:[],
  data() {
    return {
      // logo: this.$config.logo,
      Menus: {},
      userMenu: {
        name: "Tencent",
        subMenus: [
          { title: "修改", index: "100-1" },
          { title: "退出", index: "100-2" },
        ],
      },
      routerBran: [],
    };
  },

  components: {},

  watch: {
    $route(to, from) {
      console.log(to, from, this.$route.matched);
      // 应该在路由发生变化的时候重新获取面包屑
      this.getRouterBran();
      // !可以解决刷新的时候的导航选择状态的问题，但是路由切换却无法设定导航选择状态
      // !问题的关键是，如何通过路由状态找到对应的导航
      localStorage.setItem(
        "activeMenu",
        JSON.stringify({
          top: this.activeHeader,
          left: this.activeAside,
        })
      );
    },
  },

  computed: {
    // 利用计算属性解决层级过多的问题
    activeHeader: {
      // 获取activeHeader
      get() {
        return this.Menus.activeHeader;
      },
      // set进一个值然后丢给activeHeader
      set(val) {
        this.Menus.activeHeader = val;
      },
    },
    // 同时使用getset
    // 计算属性之间不能直接用this使用啊
    activeAside: {
      // 获取activeAside
      get() {
        return this.Menus.headerMenus[this.Menus.activeHeader].activeAside;
      },
      // set进一个值然后丢给activeAside
      set(val) {
        this.Menus.headerMenus[this.Menus.activeHeader].activeAside = val;
      },
    },
    // 获取当前的的左侧导航
    asideMenus() {
      return this.Menus.headerMenus[this.Menus.activeHeader].asideMenus;
    },
  },

  // mounted: {},

  methods: {
    // 获取导航选择状态
    getActiveMenu() {
      let activeMenu = JSON.parse(localStorage.getItem("activeMenu"));
      console.log(activeMenu);
      if (activeMenu) {
        this.activeHeader = activeMenu.top;
        this.activeAside = activeMenu.left;
      }
    },
    // 获取面包屑导航，那就先根据当前路由获取，那就必须先配置每个导航的路由了吧
    getRouterBran() {
      let routerBran = [];
      // 这个应该是得到当前路由层级所含的路由及其子路由
      let b = this.$route.matched.filter((v) => v.name);
      // filter函数能过滤掉一些内容然后返回去
      // console.log(b);
      b.forEach((v) => {
        if (v.name === "index" || v.name === "layout") {
          return;
        }
        routerBran.push({ name: v.name, path: v.path, title: v.meta.title });
      });
      // console.log(routerBran);
      this.routerBran = routerBran;
    },
    // 选中顶部导航的逻辑
    selectHeaderMenus(key, keyPath) {
      console.log(key, keyPath);
      // console.log(key.startsWith("100"));
      // 当点击个人信息时候需要额外处理
      if (keyPath[0] === "100") {
        return console.log("正在点击个人信息");
      }
      this.$config.Menus.activeHeader = key;
      // *默认进入该asideMenus下的activeAside路由
      if (this.$route.name !== this.asideMenus[this.activeAside].name) {
        this.$router.push({ name: this.asideMenus[this.activeAside].name });
      }
    },
    // 选中左侧导航的逻辑
    selectAsideMenus(key, keyPath) {
      console.log(key, keyPath);
      this.activeAside = key;
      // console.log(this.asideMenus[this.activeAside].name);
      // console.log(this.$route.name);
      // console.log(this.asideMenus[this.activeAside].title);
      if (this.$route.name !== this.asideMenus[this.activeAside].name) {
        // *进入所选中的activeAside路由
        this.$router.push({ name: this.asideMenus[this.activeAside].name });
      }
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