<template>
  <div>
    <el-button type="success" plain @click="showAddDialog">添加分类</el-button>
    <el-table :data="catList" style="width: 100%">
      <el-table-tree-column
        prop="cat_name"
        label="分类名称"
        width="220"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        :indentSize="30"
      ></el-table-tree-column>
      <el-table-column label="是否有效" width="180">
        <template slot-scope="scope">{{ scope.row.cat_deleted? '否':'是' }}</template>
      </el-table-column>
      <el-table-column prop="address" label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level==0">一级</span>
          <span v-if="scope.row.cat_level==1">二级</span>
          <span v-if="scope.row.cat_level==2">三级</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="isShowAddDialog">
      <el-form :model="addCategoriesForm" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="addCategoriesForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader
            :options="options"
            change-on-select
            :props="defaultPropss"
            v-model="addCategoriesForm.cat_pid_arr"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="addDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      catList: [],
      isShowAddDialog: false,
      addCategoriesForm: {
        cat_name: '',
        cat_pid_arr: []
      },
      options: [
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      defaultPropss: {
        label: 'cat_name',
        value: 'cat_id'
      }
    }
  },
  created () {
    this.getCatList()
    this.getCatList2()
  },
  methods: {
    async getCatList () {
      let res = await this.$axios.get('categories', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 4,
          type: 3
        }
      })
      //   console.log(res)
      this.catList = res.data.data.result
    },
    // 展示添加分类对话框
    showAddDialog () {
      this.isShowAddDialog = true
    },
    // 获取二层分类数据
    async getCatList2 () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      //   console.log(res)
      this.options = res.data.data
    },
    // 点击确定添加分类
    async addDialog () {
      /* eslint-disable */
      let { cat_name, cat_pid_arr } = this.addCategoriesForm;
      //   console.log(cat_name, cat_pid_arr)
      let res = await this.$axios.post("categories", {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1],
        cat_name: cat_name,
        cat_level: cat_pid_arr.length
      });
      console.log(res);
      if (res.data.meta.status === 201) {
        this.$message({
          message: res.data.meta.msg,
          type: "success",
          duration: 800
        });
        this.isShowAddDialog = false;
        this.getCatList();
      }
    }
  }
};
</script>

<style>
</style>
