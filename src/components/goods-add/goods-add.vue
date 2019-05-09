<template>
  <div>
    <!-- 步骤条 -->
    <el-steps :active="activeIndex" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <el-tabs tab-position="left" v-model="activeIdx" @tab-click="clickTabs">
      <el-tab-pane label="基本信息">
        <el-form :model="addGoodsForm" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="addGoodsForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="addGoodsForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="addGoodsForm.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="addGoodsForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              :options="options"
              change-on-select
              v-model="addGoodsForm.goods_cat"
              :props="defaultProps"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio v-model="radio" label="true">是</el-radio>
            <el-radio v-model="radio" label="false">否</el-radio>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="next">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="商品图片">
        <el-upload
          action="http://localhost:8888/api/private/v1/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="imgUploadSuccess"
          :headers="header"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
        <el-button type="primary" @click="next">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="商品内容" class="fa2">
        <quill-editor
          v-model="addGoodsForm.goods_introduce"
          ref="myQuillEditor"
          :options="editorOption"
        ></quill-editor>
        <el-button type="primary" @click="addGoods">确定</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/* eslint-disable */
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      // 控制步骤条高亮
      activeIndex: 1,
      // 控制标签页高亮
      activeIdx: "",
      // 基本信息内容
      addGoodsForm: {
        goods_name: "",
        goods_cat: [],
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: []
      },
      radio: "false",
      options: [
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      defaultProps: {
        value: "cat_id",
        label: "cat_name"
      },
      // 图片
      dialogImageUrl: "",
      dialogVisible: false,
      header: {
        Authorization: localStorage.getItem("token")
      },
      // 富文本
      editorOption: {
        placeholder: "请输入内容"
      }
    };
  },
  created() {
    this.getCategoriesType();
  },
  methods: {
    // 点击标签页
    clickTabs() {
      this.activeIndex = +this.activeIdx + 1;
    },
    // 点击下一步
    next() {
      this.activeIndex += 1;
      this.activeIdx = +this.activeIdx + 1 + "";
    },
    // 获取商品分类数据
    async getCategoriesType() {
      let res = await this.$axios.get("categories", {
        params: {
          type: 3
        }
      });
      console.log(res);
      this.options = res.data.data;
    },
    // 图片部分
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    imgUploadSuccess(res) {
      console.log(res);
      this.addGoodsForm.pics.push({
        pic: "/" + res.data.tmp_path
      });
    },
    // 点击确定添加商品
    async addGoods() {
      let {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics
      } = this.addGoodsForm;
      let res = await this.$axios.post("goods", {
        goods_name,
        goods_cat: goods_cat.join(","),
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics
      });
      console.log(res);
      if (res.data.meta.status == 201) {
        this.$message({
          message: res.data.meta.msg,
          type: "success",
          duration: 800
        });
        this.$router.replace("goods");
      }
    }
  }
};
</script>

<style scoped lang='less'>
.fa2 /deep/ .ql-container {
  height: 400px;
  background-color: skyblue;
}
</style>

