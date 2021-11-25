<!-- -->
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
        <el-table
          border
          class="mt-3"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="商品" width="350"> </el-table-column>
          <el-table-column prop="name" label="实际销量" width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="商品状态"
            width="80"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column prop="name" label="审核状态" width="120">
          </el-table-column
          ><el-table-column prop="name" label="总库存" width="120">
          </el-table-column
          ><el-table-column prop="name" label="价格(元)" width="120">
          </el-table-column
          ><el-table-column prop="address" label="操作" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection([tableData[1], tableData[2]])"
            >切换第二、第三行的选中状态</el-button
          >
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
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
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: [],
    };
  },

  components: {},

  computed: {},

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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