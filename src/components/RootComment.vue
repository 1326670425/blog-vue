<!--  -->
<template>
  <div>
    <el-divider></el-divider>
    <div v-for="comment in commentList" style="margin-left:50px">
      <el-avatar :size="40" :src="comment.avatar" style="float:left"></el-avatar>
      <div style="text-align:left">
        <el-row>
          <el-link
            :href="'/user/'+comment.userId"
            target="_blank"
            style="font-size: 20px"
          >{{comment.username}}</el-link>:
          <span>{{comment.content}}</span>
          <span style="float:right;">这里是点赞{{comment.likeNum}}</span>
          <el-button type="text" size="mini" style="float:right;" @click="reply(comment)">回复</el-button>
          <br />
          <span style="font-size: 12px">
            <span>{{format(comment.createTime)}}</span>
            <el-button
              v-show="comment.childrenNum > 0"
              type="text"
              size="mini"
              style="float:right"
              @click="getReply(comment)"
            >共{{comment.childrenNum}}条回复</el-button>
          </span>
        </el-row>
        <el-row>
          <el-col :offset="2" :span="22">
        <child-comment v-show="comment.showChild" :ref="'ChildComment'+comment.id" @replyChild="reply"></child-comment>
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </div>
    </div>
    <message :placeholder="placeholder" @submit="addComment"></message>
  </div>
</template>

<script>
/* eslint-disable */
// 这里导入文件
import { dateFormatter } from "@/utils/format";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Message: () => import("@/components/Message"),
    ChildComment: () => import("@/components/ChildComment")
  },
  data() {
    //这里存放数据
    return {
      placeholder: "",
      commentType: "root",
      commentList: [],
      type: 0,
      hostId: 0,
      parentId: 0
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    init(hostId, type) {
      this.commentList = [];
      this.placeholder = "发表一个友善的评论";
      console.log("start init comment");
      this.hostId = hostId;
      this.type = type;
      this.getCommentList(hostId, type, 1);
    },
    addComment(text) {
      let info;
      if (this.commentType == "child") {
        info = { content: text, parentId: this.parentId };
      } else {
        info = { content: text, hostId: this.hostId, type: this.type };
      }
      console.log(this.parentId);
      this.$axios
        .post("/comment/" + this.commentType + "/add", info)
        .then(resp => {
          console.log(resp.data);
        })
        .catch();
    },
    reply(comment) {
      this.commentType = "child";
      this.placeholder = "回复@" + comment.username;
      this.parentId = comment.id;
    },
    getCommentList(hostId, type, page, order = "create_time") {
      this.$axios
        .get("/common/rootComment", {
          params: {
            hostId,
            type,
            page,
            order
          }
        })
        .then(resp => {
          resp.data.records.map((item, index) => {
            this.commentList.push(
              Object.assign({}, item, { showChild: false })
            );
          });
          console.log(this.commentList);
        });
    },
    getReply(comment) {
      comment.showChild = !comment.showChild;
      if (comment.showChild)
        this.$refs["ChildComment" + comment.id][0].init(comment.id);
    },
    format(time) {
      return dateFormatter(time);
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