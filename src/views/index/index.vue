/*
 * @Author: JinYuRin 
 * @Date: 2021-07-09 22:12:04 
 * @Last Modified by: JinYuRin
 * @Last Modified time: 2021-07-09 22:17:33
 */
<template>
  <!-- bs自带的p-3的标准是rem -->
  <!-- <div>后台首页</div> -->
  <div>
    <!-- 上层的数据统计 利用栅格系统 -->
    <el-row :gutter="20">
      <el-col v-for="(i, index) in counts" :key="index" :span="6">
        <el-card shadow="hover">
          <div class="d-flex align-items-center">
            <!-- 小技巧，使用style的几种属性，不需要使用flex布局也可以轻松实现这里的居中 -->
            <i
              :class="[i.icon, i.color]"
              class="h4 m-0 text-white mr-3"
              style="
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
              "
            ></i>
            <div>
              <h4 class="mb-1">{{ i.num }}</h4>
              <!-- 使用small和h4之类的原生标签 -->
              <small class="text-muted text-truncate">{{ i.desc }}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 中间层，右边是统计图 -->
    <el-row :gutter="20" class="mt-3">
      <!--中间层左侧的col  -->
      <el-col
        :span="12"
        class="d-flex flex-column justify-content-between"
        style="height: 360px"
      >
        <el-card
          v-for="(board, index) in boards"
          :key="index"
          class="box-card"
          shadow="never"
        >
          <div slot="header" class="d-flex">
            <span class="mr-auto">{{ board.title }}</span>
            <el-button style="padding: 3px 0" type="text">{{
              board.tip
            }}</el-button>
          </div>
          <div class="row">
            <!-- bs中，一行12列 -->
            <div
              v-for="(button, index) in board.buttons"
              :key="index"
              :class="`col-${12 / board.buttons.length}`"
            >
              <!-- 晕死，还是用了原生按钮 -->
              <button class="btn btn-light w-100">
                <div
                  class="
                    d-flex
                    flex-column
                    justify-content-center
                    align-items-center
                  "
                >
                  <h4>{{ button.num }}</h4>
                  <small class="text-muted">{{ button.desc }}</small>
                </div>
              </button>
            </div>
          </div>
          <!-- 可能el-row内不能使用重复嵌套el-row吗，那就使用bootstrap -->
          <!-- <el-row :gutter="20">
            <el-col>1</el-col>
          </el-row> -->
        </el-card>
      </el-col>
      <!--中间层右侧的col(统计图)  -->
      <el-col :span="12" style="height: 360px">
        <el-card class="box-card" style="height: 100%">
          <div slot="header" class="d-flex">
            <span class="mr-auto">订单总数统计</span>
            <small>订单数量</small>
          </div>
          <div id="main" style="width: 100%; height: 270px"></div>
        </el-card>
      </el-col>
    </el-row>
    <!--下层的数据统计  -->
    <el-row :gutter="20" class="mt-3">
      <!-- 下层左侧的数据 -->
      <el-col :span="12" style="height: 360px">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="d-flex">
            <span class="mr-auto">销售情况统计</span>
            <el-button style="padding: 3px 0" type="text"
              >按周期统计商家店铺的订单量和订单金额</el-button
            >
          </div>
          <div class="px-2">
            <div class="row mb-3">
              <div class="media align-items-center border w-100">
                <span class="border-right py-4 px-3 bg-light">昨日销量</span>
                <div class="media-body">
                  <div class="border-bottom p-2">
                    <span>订单金额(元)</span>12
                  </div>
                  <div class="p-2"><span>订单量(件)</span>12</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="media align-items-center border w-100">
                <span class="border-right py-4 px-3 bg-light">本月销量</span>
                <div class="media-body">
                  <div class="border-bottom p-2"><span>订单量(件)</span>12</div>
                  <div class="p-2"><span>订单量(件)</span>12</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 可能el-row内不能使用重复嵌套el-row吗，那就使用bootstrap -->
          <!-- <el-row :gutter="20">
            <el-col>1</el-col>
          </el-row> -->
        </el-card>
      </el-col>
      <!-- 下层右侧的数据 -->
      <el-col :span="12" style="height: 360px">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="d-flex">
            <span class="mr-auto">单品销售排名</span>
            <el-button style="padding: 3px 0" type="text"
              >按周期统计商家店铺的订单量和订单金额</el-button
            >
          </div>
          <div class="row">
            <el-table :data="tableData" height="180" border style="width: 100%">
              <el-table-column prop="index" label="#" width="50">
              </el-table-column>
              <el-table-column prop="sku" label="商品信息"> </el-table-column>
              <el-table-column prop="sales" label="销量" width="50">
              </el-table-column>
            </el-table>
          </div>
          <!-- 可能el-row内不能使用重复嵌套el-row吗，那就使用bootstrap -->
          <!-- <el-row :gutter="20">
            <el-col>1</el-col>
          </el-row> -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import echarts from "echarts";
// console.log(echarts);
export default {
  created() {},
  data() {
    return {
      tableData: [
        {
          index: "1",
          sku: "小天鹅（LittleSwan）滚筒洗衣机...",
          sales: 9,
        },
        {
          index: "1",
          sku: "小天鹅（LittleSwan）滚筒洗衣机...",
          sales: 9,
        },
        {
          index: "1",
          sku: "小天鹅（LittleSwan）滚筒洗衣机...",
          sales: 9,
        },
        {
          index: "1",
          sku: "小天鹅（LittleSwan）滚筒洗衣机...",
          sales: 9,
        },
        {
          index: "1",
          sku: "小天鹅（LittleSwan）滚筒洗衣机...",
          sales: 9,
        },
        {
          index: "1",
          sku: "小天鹅（LittleSwan）滚筒洗衣机...",
          sales: 9,
        },
        {
          index: "1",
          sku: "小天鹅（LittleSwan）滚筒洗衣机...",
          sales: 9,
        },
      ],
      boards: [
        {
          title: "店铺及商品提示",
          tip: "需要关注的店铺信息及待处理事项",
          buttons: [
            { num: 64, desc: "出售中" },
            { num: 10, desc: "待回复" },
            { num: 0, desc: "库存预警" },
            { num: 3, desc: "仓库中" },
          ],
        },
        {
          title: "交易提示",
          tip: "需要立即处理的交易订单",
          buttons: [
            { num: 0, desc: "待付款" },
            { num: 10, desc: "待发货" },
            { num: 0, desc: "已发货" },
            { num: 3, desc: "已收货" },
            { num: 3, desc: "退款中" },
            { num: 3, desc: "待售后" },
          ],
        },
      ],
      counts: [
        {
          icon: "el-icon-user-solid",
          desc: "关注人数(个)",
          num: "30",
          color: "bg-primary",
        },
        {
          icon: "el-icon-s-finance",
          desc: "订单总数(笔)",
          num: "120",
          color: "bg-success",
        },
        {
          icon: "el-icon-s-order",
          desc: "今日订单总金额(元)",
          num: "4183.80",
          color: "bg-danger",
        },
        {
          icon: "el-icon-s-data",
          desc: "本月销量(笔)",
          num: "100",
          color: "bg-warning",
        },
      ],
    };
  },
  // 路由切换后也会触发挂载mounted
  mounted() {
    this.drawLine();
  },

  components: {},

  computed: {},

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
        title: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>
<style scoped>
</style>