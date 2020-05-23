<!--  -->
<template>
  <div style="text-align:center;margin-left:30%;margin-right: 40%;">
    <h1>注册账户</h1>
    <el-form label-width="100px" :model="form" status-icon :rules="rules" ref="registerForm">
      <el-form-item label="账号" prop="username">
        <el-input
          v-model="form.username"
          placeholder="用户名或邮箱"
          prefix-icon="el-icon-user-solid"
          clearable
          autosize
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password1">
        <el-input
          v-model="form.password1"
          placeholder="密码"
          show-password
          prefix-icon="el-icon-s-goods"
        ></el-input>
      </el-form-item>
            <el-form-item label="确认密码" prop="password2">
        <el-input
          v-model="form.password2"
          placeholder="确认密码"
          show-password
          prefix-icon="el-icon-s-goods"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="float: left;" type="primary" @click="register">注册</el-button>
        <el-button style="float: right;" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Register",
  components: {},
  data() {
    //这里存放数据
    var validateUsername = (rule, value, callback) => {
      if (!value)
        callback(new Error('用户名不能为空'))
      if (value.length < 6)
        callback(new Error('用户名不能少于6位'))
      callback();
      
    };
    var checkPassword = (rule, value, callback) => {
      if (!value)
        callback(new Error('请确认密码'))
      if (value !== this.form.password1)
        callback(new Error('两次密码不一致'))
      callback()
    };
    return {
      form: {
        username: "",
        password1: "",
        password2: ""
      },
      rules:{
          username: [{validator: validateUsername, trigger: 'blur'}],
          password1: [{required: true, message: "请输入密码", trigger: "blur"},
          {min: 3, max: 6, message: '长度在3-6个字符', trigger: 'blur'}],
          password2: [{validator: checkPassword, trigger: "blur"}]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    register() {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            this.$axios.post('/common/register', {
              username: this.form.username,
              password: this.form.password
            })
            .then(resp => {
              if (resp.status == 200)
                this.$router.push({path: '/login'})
            })
            .catch()
          } else {
            alert('表单校验失败，请重新输入')
          }
        })
    },
    reset() {
        this.$refs.registerForm.resetFields()
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
  beforeDestroy() {
    
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
</style>