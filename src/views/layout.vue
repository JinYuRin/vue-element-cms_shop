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
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">商品</el-menu-item>
            <el-menu-item index="3">订单</el-menu-item>
            <el-menu-item index="4">会员</el-menu-item>
            <el-menu-item index="5">设置</el-menu-item>
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
                Tencent
              </template>
              <el-menu-item index="100-1">修改</el-menu-item>
              <el-menu-item index="100-2">退出</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
      <el-container style="height: 100%; padding-bottom: 60px">
        <!-- 这个el-container的高度本来已经是父元素的百分百了，但是由于还存在另一个60px
             导致这个元素还有60px在底下隐藏了看不到，所以加上padding-bottom: 60px -->
        <el-aside width="200px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">后台首页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">相册管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">商品列表</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">商品规格</span>
            </el-menu-item>
          </el-menu>
          <!-- 高度太高，而且已经使用了hidden，所以隐藏看不到 -->
          <!-- <li v-for="i in 100" :key="i">{{ i }}</li> -->
        </el-aside>
        <el-main>
          <!-- <div>主布局</div> -->
          <router-view></router-view>
          <!-- <li v-for="i in 100" :key="i">{{ i }}</li> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex2: "1",
    };
  },

  components: {},

  computed: {},

  // mounted: {},

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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