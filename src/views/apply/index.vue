<template>
  <div class="app-container">
    <el-form :inline="true" size="mini" class="demo-form-inline">
      <el-form-item label="申请状态">
        <el-select v-model="searchObj.status" placeholder="请选择">
          <el-option v-for="(item, index) in typeArray" :key="index" :label="item" :value="index"></el-option>
        </el-select>
      </el-form-item>
      <el-button size="mini" @click="fetchData">搜索</el-button>
    </el-form>
    <el-table ref="table" :data="tableData" style="width: 100%" v-loading="loading" border>
      <el-table-column prop="createtime" label="下单时间" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createtime | timeFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="finalprice" label="支付价格" width="160" align="center"></el-table-column>
      <el-table-column label="订单状态" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.status | status}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 2" @click="deliver(scope.row)">发货</el-button>
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
import { getCashRequest, disposeCashRequest } from "@/api/cash";
export default {
  data() {
    return {
      searchObj: {
        status: 0
      },
      tableData: null,
      typeArray: ["未完成", "已完成"],
      currentPage: 1,
      totalPage: 0,
      loading: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      getCashRequest(this.searchObj.status, this.currentPage)
        .then(({ data }) => {
          console.log(data);
          this.tableData = data.list;
          this.currentPage = data.pageNum;
          this.totalPage = data.pages;
        })
        .finally(_ => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>