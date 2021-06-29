<template>
  <div>
    <router-view></router-view>
    <!-- <el-button>123</el-button> -->
    <!-- <div>
      <div class="card">
        <div class="card-header">头部</div>
        <div class="card-body">身体</div>
        <div class="card-footer">底部啊沃日的沃日</div>
      </div>
      <div class="alert alert-primary p-2" role="alert">
        A simple primary alert—check it out!
      </div> -->
    <!-- 同时使用同一个事件回调函数和model -->
    <!-- <el-radio @change="change" v-model="radio" label="1">备选项</el-radio>
      <el-radio @change="change" v-model="radio" label="2">备选项</el-radio> -->

    <!-- 或者使用el-radio-group -->
    <!-- <el-radio-group v-model="radio" @change="change" size="mini">
        <el-radio-button border label="1">备选项1</el-radio-button>
        <el-radio-button border label="2">备选项2</el-radio-button>
      </el-radio-group>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      // radio: "2", //单选选项的label值，会自动查找并得到选中状态，但是同套单选必须绑定同个v-model
    };
  },
  methods: {
    // change() {
    //   console.log("当前选择的lable是", this.radio);
    // },
  },
};
</script>

<style>
/* 需要在webkit中设置scrollbar的样式 */
::-webkit-scrollbar-track
{
  background: rgba(0,0,0,.1);
  border-radius: 0;
}

::-webkit-scrollbar
{
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb
{
    cursor: pointer;
    border-radius: 5px;
    background: rgba(0,0,0,.25);
    transition: color .2s ease;
}
</style>
