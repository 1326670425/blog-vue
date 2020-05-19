<template>
  <div style="background-color:#ffffff">
    <el-row :gutter="40">
      <el-col :span="4">
        <el-link href="/">首页</el-link>
      </el-col>
      <el-col :span="10">
        <el-input class="input-with-select" placeholder="请输入内容" v-model="keywords">
          <el-button slot="append" icon="el-icon-search" @click="publish"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-edit" @click="edit">写文章</el-button>
      </el-col>
      <el-col :span="6">
        <div v-if="isLogin">
          <el-avatar :size="40" :src="user.avatar"></el-avatar>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">{{user.username}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else>
          <el-button type="text" @click="login">登录</el-button>&nbsp;|&nbsp;<el-button type="text" @click="register">注册</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "NavMenu",
  data() {
    return {
      keywords: ""
    };
  },
  methods: {
    edit() {
      const form = {
        title: 'test',
        description: 'des',
        content: 'con'
      }
      this.$router.push({path: '/edit'})
    },
    handleCommand(command) {
      this[command]();
    },
    register() {
      this.$router.push({name:'Register'})
    },
    login() {
      this.$router.push({name:'Login'})
    },
    logout() {
      this.$axios
        .post("/auth/logout")
        .then(resp => {
          if (resp.status === 200) {
            this.$store.commit("logout");
            this.isLogin = false;
            this.$router.replace({ path: "/" });
          }
        })
        .catch(failResponse => {
          alert("logout error");
        });
    },
    publish() {
      this.$router.push({name: 'Content', query:{key:this.keywords}});
    }
  },
  computed: {
    isLogin: {
      get() {
        //return false;
        return this.$store.getters.user == null ? false : true;
      },
      set(newVal) {}
    },
    user() {
      //return {};
      return this.$store.getters.user;
    }
  }
};
</script>
<style>
  .el-dropdown-link {
    cursor: pointer;
  }
</style>