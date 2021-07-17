<template>
  <div>
    <!-- 记住了，如何让一个元素快速铺满父元素的界面，可以position -->
    <el-container
      style="position: absolute; left: 0; right: 0; top: 46.86px; bottom: 0"
    >
      <el-header class="border-bottom d-flex align-items-center">
        <!-- d-flex justify-content-between 清除掉el-header的这些属性就可以了  -->
        <el-row
          type="flex"
          class="row-bg w-100 align-items-center"
          justify="space-between"
        >
          <el-col
            :span="6"
            class="d-flex justify-content-center align-items-center"
            ><el-select
              style="width: 500px"
              size="mini"
              v-model="value"
              placeholder="请选择图片排序方式"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              class="mx-2"
              size="mini"
              v-model="input"
              placeholder="输入相册名称"
            ></el-input>
            <el-button type="success" size="mini">搜索</el-button></el-col
          >
          <el-col :span="3" class="d-flex justify-content-end">
            <el-button type="success" size="mini" @click="createOrUpdateAlbum"
              >创建相册</el-button
            >
            <el-button type="warning" size="mini">上传图片</el-button></el-col
          >
        </el-row>
        <!-- <div class="d-flex">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input v-model="input" placeholder="输入图片名称"></el-input>
          <el-button type="success" size="small">搜索</el-button>
        </div>
        <div class="d-flex">
          <el-button type="success">创建相册</el-button>
          <el-button type="warning">上传图片</el-button>
        </div> -->
      </el-header>
      <el-container>
        <el-aside
          class="border-right"
          style="position: absolute; left: 0; top: 60px; bottom: 60px"
          width="200px"
        >
          <div>
            <div class="list-group">
              <!-- 暂时采用内联方法来激活他的被选中状态 由于不是element组件-js逻辑需要自定义 -->
              <!-- cursor: pointer可以直接变成手型光标 -->
              <button
                @click="changeFolder(index)"
                v-for="(i, index) in asideList"
                :key="index"
                :style="
                  currentFolder === index
                    ? 'background-color: #f0f9eb !important;border-color: #c2e7b0 !important;color: #67c23a !important;'
                    : ''
                "
                type="button"
                class="
                  list-group-item list-group-item-action
                  d-flex
                  align-items-center
                  justify-content-between
                "
                aria-current="true"
              >
                <div>{{ i }}</div>
                <el-dropdown>
                  <!-- <span class="btn btn-light btn-sm border">
                    bs直接把某块元素设置成了btn
                     -->
                  <span class="btn btn-light btn-sm border">
                    1<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.stop.native="createOrUpdateAlbum(index)"
                      >修改</el-dropdown-item
                    >
                    <!--@click.stop.native 该自定义组件不存在@click事件，所以需要使用原生事件且阻止冒泡-->
                    <el-dropdown-item @click.stop.native="delAlbum(index)"
                      >删除</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </button>
            </div>
          </div>
        </el-aside>
        <el-container>
          <el-main
            style="
              position: absolute;
              left: 200px;
              right: 0;
              top: 60px;
              bottom: 60px;
            "
          >
            <div style="height: 1000px"></div>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
    <!--el-dialog并不限定父元素，会自动地定位  -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="right" label-width="80px">
        <el-form-item label="相册名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="相册排序" label-width="80px">
          <el-input-number
            size="medium"
            v-model="form.count"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitChange">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    // 切换相册
    changeFolder(index) {
      this.currentFolder = index;
    },
    // 统一一个创建或编辑接口
    createOrUpdateAlbum(index) {
      // tmd 数字0被认为是false
      console.log(index);
      typeof index === "number" ? this.updateAlbum(index) : this.createAlbum();
    },
    // 创建相册
    createAlbum() {
      this.dialogTitle = "创建相册";
      this.form = { name: "", num: 1 };
      this.dialogFormVisible = true;
    },
    // 编辑相册弹出框，此处应该是一个模态框，消息框太小了
    // Dialog 弹出一个对话框，适合需要定制性更大的场景。
    updateAlbum(index) {
      this.dialogTitle = "编辑相册";
      this.dialogFormVisible = true;
      this.editingFolder = index;
      // console.log("当前相册是", this.editingFolder);
      this.form.name = this.asideList[this.editingFolder];
    },
    // 提交相册的修改
    submitChange() {
      switch (this.dialogTitle) {
        case "编辑相册":
          this.dialogFormVisible = false;
          // console.log(this.form.name);
          this.asideList[this.editingFolder] = this.form.name;
          this.$message({
            type: "warning",
            message: `已将该相册名改为${this.form.name}`,
          });
          break;
        case "创建相册":
          this.dialogFormVisible = false;
          // console.log("正在创建相册");
          this.asideList.push(this.form.name);
          this.$message({
            type: "success",
            message: `已创建名为${this.form.name}的相册`,
          });
          break;
      }
    },
    // 删除相册弹出框，这个消息框只适合小的应用场景
    delAlbum(index) {
      console.log(index);
      this.$confirm("此操作将删除该相册, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.asideList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  data() {
    return {
      // 模态框标题
      dialogTitle: "",
      // 展示编辑相册的模态框
      dialogFormVisible: false,
      // 编辑相册的模态框的数据
      form: {
        name: "",
        count: 1,
      },
      // 图片排列方式的下拉选项
      options: [
        {
          value: "选项1",
          label: "降序",
        },
        {
          value: "选项2",
          label: "升序",
        },
      ],
      // 当前图片排列方式
      value: "",
      // 相册操作
      options2: [
        {
          value: "选项1",
          label: "编辑",
        },
        {
          value: "选项2",
          label: "修改",
        },
      ],
      // 当前相册操作
      value2: "选项1",
      // 输入相册名字搜索
      input: "",
      // 相册列表
      asideList: ["瑾瑜林", "林瑾瑜", "金鳞鱼"],
      // 当前相册
      currentFolder: 0,
      // 正在修改或者删除的相册
      editingFolder: -1,
    };
  },
};
</script>

<style>
/* 什么玩意啊，样式莫名其妙的出问题 */
/* .el-header,
.el-footer {
  background-color: #b3c0d1;
}

.el-aside {
  background-color: #d3dce6;
}

.el-main {
  background-color: #e9eef3;
} */
</style>