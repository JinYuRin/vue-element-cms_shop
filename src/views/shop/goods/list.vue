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
          <el-tab-pane label="全部" name="sixth"></el-tab-pane> </el-tabs
      ></el-header>
      <el-main>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="8">
            <el-button size="mini" type="success">发布商品</el-button>
            <el-button size="mini" type="danger">批量删除</el-button>
            <el-button size="mini">上架</el-button>
            <el-button size="mini">下架</el-button>
          </el-col>
          <el-col :span="6">
            <el-input
              size="medium"
              style="width: 45%; margin-right: 10px"
              v-model="input"
              placeholder="要搜索的商品名称"
            ></el-input>
            <el-button size="mini" type="info">搜索</el-button>
            <el-button size="mini">高级搜索</el-button>
          </el-col>
        </el-row>
        <el-table class="mt-3" :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="商品" width="180">
          </el-table-column>
          <el-table-column prop="name" label="实际销量" width="180">
          </el-table-column
          ><el-table-column prop="name" label="商品状态" width="180">
          </el-table-column
          ><el-table-column prop="name" label="审核状态" width="180">
          </el-table-column
          ><el-table-column prop="name" label="总库存" width="180">
          </el-table-column
          ><el-table-column prop="name" label="价格(元)" width="180">
          </el-table-column>
          <el-table-column prop="address" label="操作"> </el-table-column>
        </el-table>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "second",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
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
  /* text-align: center; */
  /* line-height: 160px; */
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