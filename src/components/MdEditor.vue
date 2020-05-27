<!--  -->
<template>
  <div>
    <mavon-editor ref="md" v-model="value" @save="save" @change="change" @imgAdd="imgAdd" placeholder="开始你的创作"/>
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
      html:'',
      value: this.content
    };
  },
  props: ["content"],
  //监听属性 类似于data概念
  computed: {
  },
  //监控data中的数据变化
  watch: {
    content(val) {
      return val
    }
  },
  //方法集合
  methods: {
    change(value, render) {
      this.html = render
    },
    save(value, render){
      this.$emit('save')
    },
    imgAdd(pos, file) {
      var formData = new FormData()
      formData.append('file', file)

      this.$axios.post('/user/uploadAvatar', formData)
      .then(resp => {
        this.$refs.md.$img2Url(pos, resp.data.msg);
      })
      
    },
    getContent() {
      return this.value
    },
    getHTML() {
      return this.html
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