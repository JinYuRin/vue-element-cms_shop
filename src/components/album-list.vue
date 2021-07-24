<template>
  <div>
    <div class="list-group">
      <!-- 暂时采用内联方法来激活他的被选中状态 由于不是element组件-js逻辑需要自定义 -->
      <!-- cursor: pointer可以直接变成手型光标 -->
      <!-- !子组件接收数组,数组更新子组件却不刷新,因为key必须绑定一个唯一的的确定的值,最好就是数组中的对象自带id -->
      <button
        @click="$emit('changeFolder', index)"
        v-for="(i, index) in albumList"
        :key="i.id"
        :class="{ selectedFolder: currentFolder === index }"
        type="button"
        class="
          list-group-item list-group-item-action
          d-flex
          align-items-center
          justify-content-between
        "
        aria-current="true"
      >
        <div>{{ i.title }}</div>
        <el-dropdown>
          <!-- <span class="btn btn-light btn-sm border">
                    bs直接把某块元素设置成了btn
                     -->
          <span class="btn btn-light btn-sm border">
            1<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.stop.native="$emit('updateAlbum', index)"
              >修改</el-dropdown-item
            >
            <!--@click.stop.native 该自定义组件不存在@click事件，所以需要使用原生事件且阻止冒泡-->
            <el-dropdown-item @click.stop.native="$emit('delAlbum', index)"
              >删除</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  // !子组件接收数组,数组更新子组件却不刷新,因为key必须绑定一个唯一的的确定的值,最好就是数组中的对象自带id
  props: ["albumList", "currentFolder"],
};
</script>

<style scoped>
/* 选中相册的样式 */
.selectedFolder {
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
  color: #67c23a !important;
}
</style>