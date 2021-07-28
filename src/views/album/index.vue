<template>
  <div>
    <!-- 记住了，如何让一个元素快速铺满父元素的界面，可以position realvtive -->
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
            <el-button type="warning" size="mini" @click="uploadPhoto"
              >上传图片</el-button
            ></el-col
          >
        </el-row>
      </el-header>
      <el-container>
        <el-aside
          class="border-right"
          style="position: absolute; left: 0; top: 60px; bottom: 60px"
          width="200px"
        >
          <album-list
            :currentFolder="currentFolder"
            :albumList="asideList"
            @changeFolder="changeFolder"
            @updateAlbum="createOrUpdateAlbum"
            @delAlbum="delAlbum"
          />
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
            <!-- 总共24，span是默认，lg是大屏，md中屏,当他总数超过了24的时候就会换行了 -->
            <el-row :gutter="15">
              <el-col
                v-for="img in asideList[currentFolder].imgList"
                :key="img.id"
                class="mb-4"
                :span="24"
                :xs="8"
                :sm="6"
                :md="6"
                :lg="4"
                :xl="4"
              >
                <el-card body-style="padding:0 0" shadow="hover">
                  <div class="position-relative">
                    <el-image
                      style="width: auto; height: 100px"
                      :src="img.src"
                      :preview-src-list="[img.src]"
                    >
                    </el-image>
                    <div
                      class="w-100 text-center text-white position-absolute"
                      style="background-color: rgba(0, 0, 0, 0.2); bottom: 5px"
                    >
                      {{ img.title }}
                    </div>
                  </div>
                  <div
                    class="d-flex justify-content-center align-items-center p-2"
                  >
                    <el-button
                      size="mini"
                      icon="el-icon-edit"
                      plain
                      @click="ediImg(img.id)"
                    ></el-button>
                    <el-button
                      size="mini"
                      icon="el-icon-delete"
                      plain
                      @click="delImg(img.id)"
                    ></el-button>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
    <!-- 编辑相册Or新增模态框组件 -->
    <album-dialog
      :dialogTitle="dialogTitle"
      :dialogFormVisible="dialogFormVisible"
      :form="form"
      @onClose="dialogFormVisible = false"
      @onCancel="dialogFormVisible = false"
      @onComfirm="submitChange"
    />
    <!-- 图片上传模态框组件 -->
    <album-upload-dialog
      dialogTitle="上传图片"
      :dialogUploadVisible="dialogUploadVisible"
      @onClose="dialogUploadVisible = false"
    ></album-upload-dialog>
  </div>
</template>

<script>
import albumList from "../../components/album-list";
import albumDialog from "../../components/album-dialog.vue";
import albumUploadDialog from "../../components/album-upload-dialog.vue";
export default {
  components: { albumList, albumDialog, albumUploadDialog },
  methods: {
    // 编辑相片操作
    ediImg(id) {
      this.$prompt("请输入新名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          // find可以直接找到元素引用的地址
          let img = this.imgList.find((img) => img.id === id);
          img.title = value;
          this.$message({
            type: "success",
            message: "该相片已改名为: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "放弃修改",
          });
        });
    },
    // 删除相片操作
    delImg(id) {
      let index = this.imgList.findIndex((img) => img.id === id);
      this.imgList.splice(index, 1);
    },
    // 打开相片上传的模态框
    uploadPhoto() {
      console.log(`正在对${this.asideList[this.currentFolder].title}上传图片`);
      this.dialogUploadVisible = true;
    },
    // 切换相册
    changeFolder(index) {
      this.currentFolder = index;
    },
    // 统一一个创建或编辑接口
    createOrUpdateAlbum(index) {
      // ?tmd 数字0被认为是false
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
      this.form.name = this.asideList[this.editingFolder].title;
    },
    // 提交相册的修改
    submitChange() {
      switch (this.dialogTitle) {
        case "编辑相册":
          this.dialogFormVisible = false;
          // console.log(this.form.name);
          this.asideList[this.editingFolder].title = this.form.name;
          console.log(this.asideList);
          this.$message({
            type: "warning",
            message: `已将该相册名改为${this.form.name}`,
          });
          break;
        case "创建相册":
          this.dialogFormVisible = false;
          // console.log("正在创建相册");
          this.asideList.push({
            title: this.form.name,
            id: this.asideList[this.asideList.length],
          });
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
      // 展示上传相片的模态框
      dialogUploadVisible: false,
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
      asideList: [
        {
          title: "瑾瑜林",
          id: 0,
          imgList: [
            {
              id: 0,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner2.jpg",
            },
            {
              id: 1,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner1.jpg",
            },
            {
              id: 2,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner3.jpg",
            },
          ],
        },
        {
          title: "林瑾瑜",
          id: 1,
          imgList: [
            {
              id: 0,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner2.jpg",
            },
            {
              id: 1,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner1.jpg",
            },
            {
              id: 2,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner3.jpg",
            },
            {
              id: 3,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner4.jpg",
            },
            {
              id: 4,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner5.jpg",
            },
            {
              id: 5,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner2.jpg",
            },
          ],
        },
        {
          title: "金鳞鱼",
          id: 2,
          imgList: [
            {
              id: 0,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner2.jpg",
            },
            {
              id: 1,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner1.jpg",
            },
            {
              id: 2,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner3.jpg",
            },
            {
              id: 3,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner4.jpg",
            },
            {
              id: 4,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner5.jpg",
            },
            {
              id: 5,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner2.jpg",
            },
            {
              id: 6,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner1.jpg",
            },
            {
              id: 7,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner3.jpg",
            },
            {
              id: 8,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner4.jpg",
            },
            {
              id: 9,
              title: "女装大牌汇聚",
              src: "http://lencent.top/public/wanxiang/home/banner5.jpg",
            },
          ],
        },
      ],
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