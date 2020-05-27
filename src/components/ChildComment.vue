<!--  -->
<template>
  <div>
    <el-divider></el-divider>
    <div v-for="comment in commentList" :key="comment.id">
      <el-avatar :size="30" :src="comment.avatar" style="float:left"></el-avatar>
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
          </span>
        </el-row>
        <el-divider></el-divider>
      </div>
    </div>
    <el-pagination
      hide-on-single-page
      layout="prev, pager, next"
      @current-change="changePage"
      :total="page.total"
      :page-size="page.size"
      :current-page.sync="page.current"
    ></el-pagination>
  </div>
</template>

<script>
/* eslint-disable */
// 这里导入文件
import { dateFormatter } from "@/utils/format";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      commentList: [],
      parentId: 0,
      page: {
        current: 1,
        pages: 1,
        size: 1,
        total: 0
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    init(parentId) {
      this.commentList = [];
      this.parentId = parentId;
      this.getCommentList(this.parentId, 1);
    },

    reply(comment) {
      this.$emit("replyChild", comment);
    },
    changePage(cur) {
      this.getCommentList(this.parentId, cur, this.page.size);
    },
    getCommentList(parentId, page, size, order = "create_time") {
      this.$axios
        .get("/common/childComment", {
          params: {
            parentId,
            page,
            size,
            order
          }
        })
        .then(resp => {
          this.commentList = resp.data.records;
          let { current, pages, size, total } = resp.data;
          Object.assign(this.page, { current, pages, size, total });
        });
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