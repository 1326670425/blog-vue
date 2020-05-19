<!--  -->
<template>
  <div>
    <div id="editor"></div>
  </div>
</template>

<script>
/* eslint-disable */
// 这里导入文件
import E from 'wangeditor'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      editor: null,
      value: this.content
    };
  },
  props: ['content'],
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    content(val) {
      return val
    }
  },
  //方法集合
  methods: {
    setEditor() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.value)
    },
    getContent() {
      return this.editor.txt.html();
    },
    setContent(content) {

    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {this.setEditor();},
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