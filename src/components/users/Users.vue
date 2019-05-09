
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="querytext" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button @click="showaddusers">添加用户</el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="changestatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            @click="editUser(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            @click="delUser(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            @click="assignRoleDialog(scope.row)"
          >分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalnum"
      :page-size="2"
      :current-page.sync="pagenum"
      @current-change="changepage"
    ></el-pagination>
    <!-- 添加对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogAddUserVisible" @close="closeAddUser">
      <el-form :model="addUserForm" :rules="rules" ref="addUserRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="收货地址" :visible.sync="dialogEditUserVisible">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="用户名">
          <el-tag type="info">{{editForm.username}}</el-tag>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserTrue">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogAssignRoleVisible">
      <!-- 表单 -->
      <el-form :model="assignRoleForm" label-width="80px">
        <el-form-item label="用户名">
          <el-tag>{{ assignRoleForm.username}}</el-tag>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-select v-model="assignRoleForm.rid" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.value"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAssignRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
// import Axios from "axios";
export default {
  data() {
    return {
      tableData: [
        {
          username: "王小虎",
          email: "20160502@qq.com",
          mobile: "121321412332",
          mg_state: true
        }
      ],
      querytext: "",
      totalnum: 0,
      pagenum: 1,
      // 添加对话框
      dialogAddUserVisible: false,
      addUserForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 编辑对话框
      dialogEditUserVisible: false,
      editForm: {
        id: "",
        username: "张三",
        email: "",
        mobile: ""
      },
      //  分配角色对话框
      dialogAssignRoleVisible: false,
      assignRoleForm: {
        username: "",
        rid: "",
        id: ""
      },
      rolesList: [],
      value: "",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, max: 9, message: "长度在 4 到 9 个字符", trigger: "blur" }
        ],
        email: [
          {
            pattern: /^\w+@[a-z0-9]+\.[a-z]{2,4}$/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    // curPath 页面保持用
    let curPath = this.$route.params.page;
    this.getuserdate(curPath);
  },
  methods: {
    async getuserdate(pagenum = 1, query = "") {
      let res = await this.$axios.get("users", {
        params: {
          query: this.querytext,
          pagenum: pagenum,
          pagesize: 2
        }
      });
      // console.log(res);
      this.totalnum = res.data.data.total;
      this.tableData = res.data.data.users;
      this.pagenum = res.data.data.pagenum;
    },
    changepage(currentpage) {
      this.getuserdate(currentpage);
      // 编程式导航页面保持用
      this.$router.push(`/users/${currentpage}`);
    },
    query() {
      this.getuserdate(1, this.querytext);
    },
    async changestatus(row) {
      console.log("qiehuan", row);
      const { id, mg_state: mgState } = row;
      let res = await this.$axios.put(`users/${id}/state/${mgState}`);
      console.log(res);
      if (res.data.meta.status === 200) {
        this.$message({
          message: "状态设置成功",
          type: "success",
          duration: 800
        });
      }
    },
    // 展示添加用户对话框
    showaddusers() {
      console.log((this.dialogAddUserVisible = true));
    },
    // 添加用户
    addUser() {
      // console.log(this.addUserForm);
      this.$axios.post("users", this.addUserForm).then(res => {
        console.log(res);
        this.dialogAddUserVisible = false;
        this.getuserdate();
      });
    },
    // 监听对话框关闭
    closeAddUser() {
      console.log("关闭了");
      this.$refs.addUserRef.resetFields();
    },
    // 删除用户
    async delUser(a) {
      try {
        await this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        console.log(a);
        this.$axios.delete(`users/${a.id}`).then(res => {
          console.log(res);
          this.getuserdate();
        });
        this.$message({
          type: "success",
          duration: 800,
          message: "删除成功!"
        });
      } catch (error) {
        this.$message({
          type: "info",
          duration: 800,
          message: "已取消删除"
        });
      }
    },
    // 展示编辑对话框
    editUser(row) {
      console.log("编辑", row);
      this.dialogEditUserVisible = true;
      this.editForm.username = row.username;
      this.editForm.mobile = row.mobile;
      this.editForm.email = row.email;
      this.editForm.id = row.id;
    },
    // 编辑对话框
    async editUserTrue() {
      const { id, email, mobile } = this.editForm;
      let res = await this.$axios.put(`users/${id}`, {
        email,
        mobile
      });
      console.log(res);
      this.dialogEditUserVisible = false;
      this.$message({
        message: "更新用户成功",
        type: "success",
        duration: 800
      });
      this.getuserdate(this.pagenum);
    },
    // 分配角色按钮
    async assignRoleDialog(row) {
      // 获取角色列表
      let res = await this.$axios.get("roles");
      this.rolesList = res.data.data;
      // 展示对话框
      this.dialogAssignRoleVisible = true;
      // console.log(row);
      let { username, id } = row;
      this.assignRoleForm.username = username;
      this.assignRoleForm.id = id;
      // 根据id查询用户信息
      let res2 = await this.$axios.get(`users/${id}`);
      // console.log(res2);
      let rid = res2.data.data.rid;
      this.assignRoleForm.rid = rid == -1 ? "" : rid;
    },
    // 分配角色下的确定按钮
    async assignRole() {
      const { id, rid } = this.assignRoleForm;
      let res = await this.$axios.put(`users/${id}/role`, {
        rid
      });
      this.dialogAssignRoleVisible = false;
      this.getuserdate(this.pagenum);
      console.log(res);
      if (res.data.meta.status == 200) {
        this.$message({
          message: res.data.meta.msg,
          type: "success",
          duration: 800
        });
      }
    }
  }
};
</script>

<style scoped lang='less'>
.el-breadcrumb {
  height: 40px;
  line-height: 40px;
  background-color: #d4dae0;
  padding-left: 30px;
}
</style>