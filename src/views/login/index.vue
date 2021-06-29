<!--  -->
<template>
  <!-- 栅格系统是PC里用得最多的概念，移动端倒是比较少使用到 -->
  <!--container使用了自动外边距  -->
  <div class="container">
    <!-- row是指行，flex布局，具体指的是父元素的row
     col被分成12列，且能@media来响应式的变换宽度(flex实现) -->
    <div class="row">
      <!-- m-auto可以实现自动居中 -->
      <div class="col-12 col-sm-9 col-md-7 col-lg-5 m-auto pt-5">
        <!-- <div>登录页面</div> -->
        <div class="card text-center mt-5">
          <h3 class="card-header text-secondary">UNI-ADMIN</h3>
          <div class="card-body">
            <el-form ref="loginForm" status-icon :rules="rules" :model="form">
              <!-- rules验证规则添加后还要 prop="username"-->
              <el-form-item prop="username">
                <el-input
                  type="text"
                  v-model="form.username"
                  size="medium"
                  placeholder="请输入账号"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="form.password"
                  size="medium"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <!-- 同uni-ui一样，多半是内置了class属性来接收外界的样式类 -->
                <el-button
                  class="w-100"
                  type="primary"
                  size="medium"
                  @click="submitForm('loginForm')"
                  >立即登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      // 传入form表单可使用的rules或者自定义的rules
      rules: {
        username: [
          // 太丰富了这个校验规则，一辈子学前端都够了
          { required: true, message: "请输入用户名", trigger: "blur" },
          // trigger: "blur"填写完失去焦点后才触发
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "change",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "change",
          },
        ],
      },
    };
  },

  components: {},

  computed: {},

  // 空函数mounted引起警报
  // mounted: {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          // 这种跳转路由的方法最简单快捷不用记什么
          this.$router.push({ name: "index" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
</style>