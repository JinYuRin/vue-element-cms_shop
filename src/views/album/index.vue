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
              style="width: 350px"
              size="medium"
              v-model="value"
              placeholder="请选择"
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
              size="medium"
              v-model="input"
              placeholder="输入图片名称"
            ></el-input>
            <el-button type="success" size="medium">搜索</el-button></el-col
          >
          <el-col :span="3" class="d-flex justify-content-end">
            <el-button type="success" size="medium">创建相册</el-button>
            <el-button type="warning" size="medium">上传图片</el-button></el-col
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
          style="position: absolute; left: 0; top: 60px; bottom: 60px"
          width="200px"
        >
          <div style="height: 1000px"></div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      value: "选项1",
      input: "",
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