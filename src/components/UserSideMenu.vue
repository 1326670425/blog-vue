<!--  -->
<template>
  <div>
    <el-menu
      router
      :default-active="$router.path"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
    >

      <el-menu-item index="/personal/profile">
        <i class="el-icon-menu"></i>
        <span slot="title">个人资料</span>
      </el-menu-item>
      <el-menu-item index="/personal/article">
        <i class="el-icon-document"></i>
        <span slot="title">我的博客</span>
      </el-menu-item>
      <el-menu-item index="/personal/message">
        <i class="el-icon-setting"></i>
        <span slot="title">我的微博</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'SideMenu',
  components: {},
  data() {
    //这里存放数据
    return {
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key)
      console.log(keyPath)
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

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>