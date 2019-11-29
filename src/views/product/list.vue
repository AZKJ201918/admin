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
      <el-table-column label="销量" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.sales}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :disabled="!!scope.row.status"
            type="text"
            @click="putaway(scope.row)"
          >上架</el-button>
          <el-button
            size="mini"
            :disabled="!scope.row.status"
            type="text"
            @click="soldOut(scope.row)"
          >下架</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="showDiscuss(scope.row.id)">查看评论</el-button>
          <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      hide-on-single-page
      :current-page.sync="currentPage"
      :page-count="totalPage"
      @current-change="fetchData"
    ></el-pagination>
  </div>
</template>

<script>
import { getAllProducts, deleteProduct, updateProduct } from "@/api/product";
export default {
  data() {
    return {
      productSearchName: "",
      productList: null,
      productListLoading: false,
      saleSettingShow: false,
      retailSettingShow: false,
      editing: false,
      currentProduct: null,
      currentPage: 1,
      totalPage: 1
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route() {
      console.log("路由信息改变");
    }
  },
  computed: {},
  methods: {
    /**
     *
     * 获取参数
     */
    fetchData() {
      this.productListLoading = true;
      getAllProducts(this.productSearchName, this.currentPage)
        .then(({ data }) => {
          this.productList = data.list;
          this.currentPage = data.pageNum;
          this.totalPage = data.pages;
        })
        .finally(() => {
          this.productListLoading = false;
        });
    },
    edit(row) {
      this.editing = true;
      this.$router.push({
        name: "productInfo",
        params: {
          product: row
        }
      });
    },
    /**
     * 下架商品
     */
    soldOut(row) {
      let obj = JSON.parse(JSON.stringify(row));
      obj.status = 0;
      updateProduct(obj).then(_ => {
        this.fetchData();
      });
    },
    /**
     * 上架商品
     */
    putaway(row) {
      let obj = JSON.parse(JSON.stringify(row));
      obj.status = 1;
      updateProduct(obj).then(_ => {
        this.fetchData();
      });
    },
    showDiscuss(id) {
      this.$router.push({name: 'discuss',query: {id: id}})
    },
    deleteHandle(id) {
      this.$confirm("此操作将永久删除此商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteProduct(id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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