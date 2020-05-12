<!--  -->
<template>
  <div style="text-align:center;margin-left:30%;margin-right: 40%;">
    <h1>账号登录</h1>
    <el-form label-width="100px" :inline="false" v-model="loginForm">
      <el-form-item>
        <el-input
          v-model="loginForm.username"
          placeholder="用户名或邮箱"
          prefix-icon="el-icon-user-solid"
          clearable
          autosize
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="loginForm.password"
          placeholder="密码"
          show-password
          prefix-icon="el-icon-s-goods"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox style="float: left;" v-model="loginForm.rememberMe" name="remember-me">记住密码</el-checkbox>
        <el-link style="float: right;" type="primary">忘记密码？</el-link>
      </el-form-item>
      <el-form-item>
        <el-button style="float: left;" type="primary" @click="login">登录</el-button>
        <el-button style="float: right;">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Login",
  components: {},
  data() {
    //这里存放数据
    return {
      loginForm: {
        username: "",
        password: "",
        rememberMe: false
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    login() {
      let params = new URLSearchParams();
      params.append("username", this.loginForm.username);
      params.append("password", this.loginForm.password);
      params.append("remember-me", this.loginForm.rememberMe);
      this.$axios.post("/auth/login", params).then(resp => {
        if (resp.status === 200) {
          let user = resp.data.data;
          
          this.$router.push({
            path: "/"
          });

        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
</style>