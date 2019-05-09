<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <!-- 展开列表 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 第一层 -->
          <el-row v-for="item1 in scope.row.children" :key="item1.id" class="row1">
            <el-col :span="4">
              <el-tag closable type="primary">{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <!-- 第二层 -->
              <el-row v-for="item2 in item1.children" :key="item2.id" class="row2">
                <el-col :span="4">
                  <el-tag closable type="success">{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <!-- 第三层 -->
                  <el-tag
                    class="tag"
                    closable
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.id"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 索引列表 -->
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="描述" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" :plain="true" type="primary" icon="el-icon-edit"></el-button>
          <el-button size="mini" :plain="true" type="danger" icon="el-icon-delete"></el-button>
          <el-button
            size="mini"
            :plain="true"
            type="success"
            icon="el-icon-check"
            @click="isShowAssignRightsDialog(scope.row)"
          >分配权限</el-button>
          <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 第一个对话框：展示权限信息 -->
    <el-dialog title="角色授权" :visible.sync="dialogShowRightsVisible">
      <el-tree
        :data="treeRightData"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="[5]"
        :props="defaultProps"
        ref="tree"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShowRightsVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          roleName: '2016-05-02',
          roleDesc: '王小虎'
        }
      ],
      // 展示权限信息
      dialogShowRightsVisible: false,
      treeRightData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleId: 0
    }
  },
  created () {
    this.loadRolesData()
    this.loadTreeRightsData()
  },
  methods: {
    indexMethod (index) {
      return index
    },
    // 获取角色列表数据
    async loadRolesData () {
      let res = await this.$axios.get(`roles`)
      console.log(res)
      this.tableData = res.data.data
    },
    // 点击分配权限展示角色授权对话框
    async loadTreeRightsData () {
      let res = await this.$axios.get(`rights/tree`)
      console.log(res)
      this.treeRightData = res.data.data
    },
    isShowAssignRightsDialog (row) {
      // 角色id
      this.roleId = row.id
      this.dialogShowRightsVisible = true
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            // console.log(item3)
            keys.push(item3.id)
          })
        })
      })
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    // 点击确定修改角色授权对话框
    async assignRoles () {
      let keys1 = this.$refs.tree.getCheckedKeys()
      let keys2 = this.$refs.tree.getHalfCheckedKeys()
      let keys = [...keys1, ...keys2]
      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.dialogShowRightsVisible = false
        this.$message({
          message: '角色授权成功',
          type: 'success',
          duration: 800
        })
        this.loadRolesData()
      }
    }
  }
}
</script>

<style scoped lang='less'>
.row1 {
  margin-top: 10px;
  border-bottom: 1px dashed #ccc;
  &:last-child {
    border: none;
  }
}
.row2 {
  margin-bottom: 10px;
}
.tag {
  margin: 3px;
}
</style>
