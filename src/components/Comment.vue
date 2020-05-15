<!--  -->
<template>
  <div >
    <el-divider></el-divider>
        <div v-for="comment in commentList" style="margin-left:50px">
            <el-avatar :size="40" :src="comment.avatar" style="float:left" ></el-avatar>
            <div style="text-align:left">
      <el-row>
          <el-link :href="comment.userId" target="_blank" style="font-size: 20px">{{comment.username}}</el-link>:
<span>{{comment.content}}</span>
          <br>
          <span style="font-size: 12px">
              <span>{{format(comment.createTime)}}</span>
               <span style="float:right;">这里是点赞{{comment.likeNum}}</span>
              <el-button type="text" size="mini" style="float:right;">回复</el-button>
          </span>
      </el-row>
          <el-link type="primary" style="float:right">共{{comment.childrenNum}}条回复</el-link>
      <el-divider></el-divider>
            </div>
    </div>
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
      commentList: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      init(hostId) {
          this.commentList = []
          console.log('start init comment')
        this.getCommentList(hostId, 1)

      },
    getCommentList(hostId, page, order="create_time") {
      this.$axios.get("/common/rootComment", {
          params: {
              hostId,
              type: 0,
              page,
              order
          }
      }).then(resp => {
        resp.data.records.map((item, index) => {
          this.commentList.push(Object.assign({}, item, { showChild: false }));
        });
        console.log(this.commentList)
      });
    },
        format(time) {
      return dateFormatter(time);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
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