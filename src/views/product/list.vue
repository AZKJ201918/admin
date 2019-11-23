<template>
  <div class="app-container">
    <el-input placeholder="请输入商品名称搜索" v-model="productSearchName" @keyup.enter.native="fetchData">
      <el-button slot="append" icon="el-icon-search" @click="fetchData"></el-button>
    </el-input>
    <el-table
      ref="table"
      :data="productList"
      style="width: 100%"
      v-loading="productListLoading"
      border
    >
      <el-table-column label="商品id" width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="预览图片" width="80">
        <template slot-scope="scope">
          <el-image class="thumbnail-img" :src="scope.row.url" fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
      <el-table-column label="原价" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.repertory}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 不处于标记状态，或选中不是此行时显示此按钮 -->
          <el-button
            type="primary"
            @click="edit(scope.row)"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllProducts } from "@/api/product";
export default {
  data() {
    return {
      productSearchName: "",
      productList: null,
      productListLoading: false,
      saleSettingShow: false,
      retailSettingShow: false,
      editing: false,
      currentProduct: null
    };
  },
  created() {
    this.fetchData();
  },
  computed: {},
  methods: {
    /**
     *
     * 获取参数
     */
    fetchData() {
      this.productListLoading = true;
      getAllProducts(this.productSearchName)
        .then(({ data }) => {
          this.productList = data.list;
        })
        .finally(() => {
          this.productListLoading = false;
        });
    },
    edit(row) {
      this.editing = true;
      this.$router.push({
        name: 'productInfo',
        params: {
          product: row
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.thumbnail-img {
  width: 50px;
  height: 50px;
}
</style>