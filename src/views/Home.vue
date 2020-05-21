<template>
<div>
  <el-container>
    <el-aside>
      <SideMenu></SideMenu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
        <el-aside>
          <el-calendar v-model="value">
</el-calendar>
    </el-aside>
  </el-container>
</div>
</template>
<script>
import SideMenu from '@/components/SideMenu'
export default {
    name: 'Home',
    components: {SideMenu},
    data() {
      return {
        value: new Date()
      }
    },
    methods: {

    }
}
</script>