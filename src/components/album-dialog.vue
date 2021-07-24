    <!-- 相册编辑Or新增模态框组件 -->
<template>
  <!--el-dialog并不限定父元素，会自动地定位  -->
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogFormVisible"
    @close="$emit('onClose')"
  >
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
      <el-button @click="$emit('onCancel')">取 消</el-button>
      <el-button type="primary" @click="$emit('onComfirm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["dialogTitle", "dialogFormVisible", "form"],
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