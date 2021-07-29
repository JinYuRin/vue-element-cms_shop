<!--  -->
<template>
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
        <div class="d-flex justify-content-center align-items-center p-2">
          <el-button
            size="mini"
            icon="el-icon-edit"
            plain
            @click="$emit('ediImg', img.id)"
          ></el-button>
          <el-button
            size="mini"
            icon="el-icon-delete"
            plain
            @click="$emit('delImg', img.id)"
          ></el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ["asideList", "currentFolder"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  //   mounted: {},

  methods: {},
};
</script>
<style scoped>
</style>