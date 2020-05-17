<!--  -->
<template>
  <div>
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input
          type="text"
          v-model="form.title"
          maxlength="100"
          show-word-limit
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
            <el-form-item>
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.description"
          maxlength="256"
          show-word-limit
          placeholder="请输入摘要（选填）"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <mavon-editor v-model="form.content" @save="submit(0)" placeholder="开始你的创作"/>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="primary" @click="submit(1)">发布文章</el-button>

        <el-button @click="submit(0)">保存草稿</el-button>
        <el-button @click="exit" type="danger">直接退出</el-button>
      </el-form-item>
    </el-form>
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
      form: {
        title: "",
        description: '',
        content: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submit(status) {
      console.log(this.form)
    },
    exit() {
      this.$confirm(
        "检测到未保存的内容，是否在离开页面前保存修改？",
        "确认信息",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "保存",
          cancelButtonText: "放弃修改"
        }
      )
        .then(() => {
          this.submit(0);
          this.back()
        })
        .catch(action => {
          if (action == "cancel") 
            this.back()
        });
    },
    back() {
        if (window.history.length > 1)
            this.$router.back(-1);
        else
            this.$router.push({path: '/'})
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