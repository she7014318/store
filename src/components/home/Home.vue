<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <img src="../../assets/images/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <h1>电商后台管理系统</h1>
          </div>
        </el-col>
        <el-col :span="8" class="right_col">
          <div class="grid-content bg-purple">
            恭喜上海前端36期月薪2W
            <a href="#">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style scoped>
.el-container {
  height: 100%;
}
/* 头 */
.el-header {
  background: #b3c1cd;
  padding: 0;
}
h1 {
  color: #fff;
  font-size: 26px;
  text-align: center;
  line-height: 60px;
}
.right_col {
  line-height: 60px;
  text-align: right;
  padding-right: 30px;
}
a {
  color: #daa520;
}
/* 侧栏 */
.el-aside {
  background-color: #545c64;
}
/* 主体 */
.el-main {
  background-color: #eaeef1;
}
</style>
