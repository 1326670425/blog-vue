<!--  -->
<template>
  <div>
    <div v-show="isLogin">
      <message :placeholder="placeholder" @submit="addMessage"></message>
    </div>
    <div style="margin: 30px 0;"></div>
    <el-select v-model="option" placeholder="请选择消息类型" @change="changeOption" size="mini">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <div v-for="message in dataList">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-avatar :size="50" :src="message.avatar"></el-avatar>
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
        <el-col :offset="2" :span="22">
          <span v-show="option == 'message'">{{message.content}}</span>
          <div v-show="option == 'article'">
            发表了文章：
            <el-link :href="'/article/'+message.id" style="font-size:20px" type="primary">
              {{message.title}}
              <i class="el-icon-view el-icon--right"></i>
            </el-link>
            <br />
            <span style="font-size:15px">{{message.description}}</span>
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
        <el-col>
        <root-comment :ref="'RootComment'+message.id" v-show="message.showComment" ></root-comment>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </div>
    <el-pagination
      background
      hide-on-single-page
      layout="total, prev, pager, next"
      @current-change="changePage"
      :total="page.total"
      :page-size="page.size"
      :current-page.sync="page.current"
    ></el-pagination>
  </div>
</template>

<script>
/* eslint-disable */

import { dateFormatter } from "@/utils/format";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Content",
  components: {
    RootComment: () => import("@/components/RootComment"),
    Message: () => import("@/components/Message")
  },
  data() {
    //这里存放数据
    return {
      placeholder: "记录一下",
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
      dataList: [],
      page: {
        current: 1,
        pages: 1,
        size: 2,
        total: 0
      }
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
      this.getDateList("");
    },
    addMessage(text) {
      this.$axios
        .post("/message/add", {
          content: text
        })
        .then(resp => {
          if (resp.status == 200) {
            let { avatar, id, username } = this.$store.getters.user;
            this.dataList.unshift({
              avatar,
              userId: id,
              username,
              content: text,
              createTime: Date.now()
            });
          }
        });
    },
    // 后续添加根据输入参数来指定搜索
    getDateList(key, currentPage = 1, size = 2) {
      this.dataList = [];
      this.$axios.get("/common/" + this.option, {params: {page: currentPage, size: size}}).then(resp => {
        resp.data.records.map((item, index) => {
          this.dataList.push(Object.assign({}, item, { showComment: false }));
        });
        let {current, pages, size, total} = resp.data
        Object.assign(this.page, {current, pages, size, total})
      });
    },
    changePage(cur) {
      this.getDateList("", cur)
    },
    format(time) {
      return dateFormatter(time);
    },
    getComment(message) {
      message.showComment = !message.showComment;
      var type = this.option == "article" ? 1 : 0;
      if (message.showComment) this.$refs['RootComment' + message.id][0].init(message.id, type);
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