<!--  -->
<template>
  <div>
    <el-container
      style="position: absolute; left: 0; right: 0; top: 46.86px; bottom: 0"
    >
      <el-header
        ><el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="审核中" name="first"></el-tab-pane>
          <el-tab-pane label="出售中" name="second"></el-tab-pane>
          <el-tab-pane label="已下架" name="third"></el-tab-pane>
          <el-tab-pane label="库存预警" name="fourth"></el-tab-pane>
          <el-tab-pane label="回收站" name="fifth"></el-tab-pane>
        </el-tabs></el-header
      >
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return { activeName: "second" };
  },

  components: {},

  computed: {},

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style scoped>
.el-header,
.el-footer {
  /* background-color: #b3c0d1; */
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /* background-color: #d3dce6; */
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>