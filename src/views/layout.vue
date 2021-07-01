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
      <el-container style="height: 100%; padding-bottom: 60px">
        <!-- 这个el-container的高度本来已经是父元素的百分百了，但是由于还存在另一个60px
             导致这个元素还有60px在底下隐藏了看不到，所以加上padding-bottom: 60px -->
        <el-aside width="200px">
          <el-menu
            :default-active="activeAside.toString()"
            @select="selectAsideMenus"
          >
            <el-menu-item
              v-for="(menu, index) in asideMenus"
              :key="index"
              :index="index.toString()"
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
  created() {
    // 初始化一下Menus
    this.Menus = this.$config.Menus;
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
    };
  },

  components: {},

  computed: {
    // 利用计算属性解决层级过多的问题
    activeHeader() {
      // 获取activeHeader
      return this.Menus.activeHeader;
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
    selectHeaderMenus(key, keyPath) {
      console.log(key, keyPath);
      this.$config.Menus.activeHeader = key;
    },
    selectAsideMenus(key, keyPath) {
      console.log(key, keyPath);
      this.activeAside = key;
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