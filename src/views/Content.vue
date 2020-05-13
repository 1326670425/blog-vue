<!--  -->
<template>
  <div>
    <div v-show="isLogin">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 5}"
        placeholder="记录此刻心情"
        v-model="textarea"
      ></el-input>
      <el-button type="primary" style="float:right" @click="addMessage">发布</el-button>
    </div>
    <div style="margin: 30px 0;"></div>
    <div v-for="message in dataList">
      <el-row :gutter="20">
        <el-col :span="1"><el-avatar :size="50" :src="message.avatar" style="float:left" ></el-avatar></el-col>
        <el-col :span="4">
          <el-link :href="message.userId" target="_blank" style="font-size: 20px">{{message.username}}</el-link>
          <br>
          <span style="font-size: 12px">{{format(message.createTime)}}</span>
        </el-col>
      </el-row>
<div style="margin: 10px 0;"></div>
      <el-row>
        <div style="text-align:center">
          <span>{{message.content}}</span>
        </div>
      </el-row>
<div style="margin: 10px 0;"></div>
      <el-row>

         <el-button type="info" icon="el-icon-message" size="mini">{{message.commentNum}}</el-button> 
      </el-row>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import { dateFormatter } from "@/utils/format";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Content",
  components: {},
  data() {
    //这里存放数据
    return {
      textarea: "",
      dataList: []
    };
  },
  //监听属性 类似于data概念
  computed: {
    isLogin: {
      get() {
        //return false;
        return this.$store.getters.user == null ? false : true;
      },
      set(newVal) {}
    }
  },
  //监控data中的数据变化
  watch: {
    $route: {
      handler: function(route) {
        var query = this.$route.query;
        if (query.key) this.getDateList(query.key);
      }
    }
  },
  //方法集合
  methods: {
    addMessage() {
      this.$axios.post('/message/add', {
        content: this.textarea
      }).then(resp => {
        if (resp.status == 200) {
          let {avatar, id, username} = this.$store.getters.user
          this.dataList.unshift({
            avatar,
            'userId': id,
            username,
            'content':this.textarea,
            'createTime': Date.now()
          }
          )
        }
      })
    },
    // 后续添加根据输入参数来指定搜索
    getDateList(key) {
      this.$axios.get("/common/message").then(resp => {
        this.dataList = resp.data.records;
      });
    },
    format(time) {
      return dateFormatter(time);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getDateList("");
  },
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