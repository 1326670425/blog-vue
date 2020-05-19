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
    <el-select v-model="option" placeholder="请选择消息类型" @change="changeOption" size="mini">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <div v-for="message in dataList">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-avatar :size="50" :src="message.avatar" style="float:left"></el-avatar>
        </el-col>
        <el-col :span="4">
          <el-link
            :href="'/user/' + message.userId"
            target="_blank"
            style="font-size: 20px"
          >{{message.username}}</el-link>
          <br />
          <span style="font-size: 12px">{{format(message.createTime)}}</span>
        </el-col>
      </el-row>
      <div style="margin: 10px 0;"></div>
      <el-row>
        <el-col :offset="2">
          <span v-show="option == 'message'">{{message.content}}</span>
          <div v-show="option == 'article'">发表了文章：
            <el-link :href="'/article/'+message.id" style="font-size:20px" type="primary">{{message.title}}<i class="el-icon-view el-icon--right"></i></el-link><br>
            <span>{{message.description}}</span>
          </div>
          
        </el-col>
      </el-row>
      <div style="margin: 10px 0"></div>
      <el-row type="flex" justify="center">
        <el-button
          type="info"
          icon="el-icon-message"
          size="mini"
          @click="getComment(message)"
        >{{message.commentNum}}</el-button>
      </el-row>
      <el-row>
        <comment :ref="message.id" v-show="message.showComment"></comment>
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
  components: { Comment: () => import("@/components/Comment") },
  data() {
    //这里存放数据
    return {
      options: [
        {
          label: "微博",
          value: "message"
        },
        {
          label: "文章",
          value: "article"
        }
      ],
      option: "message",
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
    changeOption(value) {
      this.dataList = []
      this.getDateList("")
    },
    addMessage() {
      this.$axios
        .post("/message/add", {
          content: this.textarea
        })
        .then(resp => {
          if (resp.status == 200) {
            let { avatar, id, username } = this.$store.getters.user;
            this.dataList.unshift({
              avatar,
              userId: id,
              username,
              content: this.textarea,
              createTime: Date.now()
            });
          }
        });
    },
    // 后续添加根据输入参数来指定搜索
    getDateList(key) {
      this.$axios.get("/common/"+ this.option).then(resp => {
        resp.data.records.map((item, index) => {
          this.dataList.push(Object.assign({}, item, { showComment: false }));
        });
      });
      console.log(this.dataList);
    },
    format(time) {
      return dateFormatter(time);
    },
    getComment(message) {
      message.showComment = !message.showComment;
      if (message.showComment) this.$refs[message.id][0].init(message.id);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getDateList("");
  },
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