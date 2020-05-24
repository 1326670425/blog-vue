<template>
  <div>
    <el-container>
      <el-aside>
        <SideMenu></SideMenu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
      <el-aside></el-aside>
    </el-container>
  </div>
</template>
<script>
import SideMenu from "@/components/SideMenu";
export default {
  name: "Home",
  components: { SideMenu },
  data() {
    return {};
  },
  methods: {}
};
</script>