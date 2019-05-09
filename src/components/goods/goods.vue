<template>
  <div>
    <el-button type="success" plain @click="go2GoodsAdd">添加商品</el-button>
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="goods_price" label="商品价值" width="180"></el-table-column>
      <el-table-column prop="goods_number" label="商品数量"></el-table-column>
      <el-table-column prop="upd_time" label="创建时间"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsList: []
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      let res = await this.$axios.get('goods', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 4
        }
      })
      console.log(res)
      this.goodsList = res.data.data.goods
    },
    go2GoodsAdd () {
      this.$router.push('/goods-add')
    }
  }
}
</script>

<style>
</style>
