<!--  -->
<template>
  <div>
    <el-radio-group v-model="type" size="mini">
      <el-radio-button label="0">Markdown编辑器</el-radio-button>
      <el-radio-button label="1">富文本编辑器</el-radio-button>
    </el-radio-group>
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
        <md-editor v-if="type == 0" ref="md" @save="submit(0)" :content="form.content"></md-editor>
        <rich-editor v-else-if="type==1" ref="rich" :content="form.content"></rich-editor>
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

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    MdEditor: () => import("@/components/MdEditor"),
    RichEditor: () => import("@/components/RichEditor")
  },
  data() {
    //这里存放数据
    return {
      form: {
        id: null,
        title: "",
        content: ""
      },
      type: 0
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submit(status) {
      var html = "";
      if (this.type == 0) {
        this.form.content = this.$refs.md.getContent();
        html = this.$refs.md.getHTML();
      } else {
        this.form.content = this.$refs.rich.getContent();
        html = this.form.content;
      }
      // 截取正文作为摘要
      // 提取规则：纯文本，删去空格和回车换行，截取文本中的前256个字符
      let description = html.replace(/<\/?[^>]*>/g, "").replace(/\ +/g,"").replace(/[\r\n]/g,"").substring(0, 255);

      this.$axios
        .post("/article/add", {
          id: this.form.id,
          title: this.form.title,
          description: description,
          content: this.form.content,
          type: this.type,
          status: status
        })
        .then(resp => {
          if (resp.status == 200) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
          }
        })
        .catch(error => {
          this.$message({
            message: error,
            type: "error"
          });
        });
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
          this.back();
        })
        .catch(action => {
          if (action == "cancel") this.back();
        });
    },
    back() {
      if (window.history.length > 1) this.$router.back(-1);
      else this.$router.push({ path: "/" });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let params = this.$route.params;
    if (params)
      Object.assign(this.form, params)
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