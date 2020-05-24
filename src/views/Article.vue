<!--  -->
<template>
  <div>
    <div>
      <el-avatar :size="50" :src="info.avatar"></el-avatar>
    </div>
    <h1>{{info.title}}</h1>
    <mavon-editor v-if="info.type==0" defaultOpen="preview" :toolbarsFlag="false" :subfield="false" v-model="info.content"></mavon-editor>
    <div id="richeditor" v-html="info.content" v-else></div>
  </div>
</template>

<script>
/* eslint-disable */
// 这里导入文件
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { mavonEditor },
  data() {
    //这里存放数据
    return {
      info: {
        userId: '',
        username: '',
        avatar: '',
        id: '',
        title: '',
        content: '',
        likeNum: '',
        createTime: '',
        type: '',
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
  },
  //方法集合
  methods: {
    getDetail(id) {

      this.$axios.get('/common/article/'+id)
      .then(resp => {
        Object.assign(this.info, resp.data)
      }).catch()

    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getDetail(this.$route.params.id)
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