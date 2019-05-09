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
            <a href="javascript:;" @click="loginout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :router="true"
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu :index="item1.id+''" v-for="item1 in menus" :key="item1.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item
              :index="'/'+item2.path"
              v-for="item2 in item1.children"
              :key="item2.id"
            >{{item2.authName}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadLeftRight()
  },
  methods: {
    // 退出
    async loginout () {
      try {
        await this.$confirm('此操作将退出该账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: '800'
        })
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消退出',
          duration: '800'
        })
      }
    },
    // 加载左侧
    async loadLeftRight () {
      let res = await this.$axios.get(`menus`)
      this.menus = res.data.data
    }
  }
}
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
