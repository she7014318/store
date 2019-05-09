<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">
          <span v-if="scope.row.level == 0">一级</span>
          <span v-if="scope.row.level == 1">二级</span>
          <span v-if="scope.row.level == 2">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          authName: '商品管理',
          path: 'goods',
          level: '一级'
        }
      ]
    }
  },
  created () {
    this.loadRightsData()
  },
  methods: {
    indexMethod (index) {
      return index
    },
    async loadRightsData () {
      let res = await this.$axios.get(`rights/list`)
      console.log(res)
      this.tableData = res.data.data
    }
  }
}
</script>

<style scoped >
.bread {
  height: 40px;
  line-height: 40px;
  padding-left: 30px;
  background-color: #d4dae0;
}
</style>
