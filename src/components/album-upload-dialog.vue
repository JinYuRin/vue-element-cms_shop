    <!-- 图片上传模态框组件 -->
<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogUploadVisible"
    @close="$emit('onClose')"
  >
    <!-- 为什么一个text-center就能将整个元素居中呢 -->
    <div class="text-center">
      <el-upload
        class="w-100"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["dialogTitle", "dialogUploadVisible"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  methods: {},
};
</script>
<style scoped>
</style>