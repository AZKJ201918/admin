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
      <el-table-column label="状态" width="80" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">未处理</span>
          <span v-else>已处理</span>
        </template>
      </el-table-column>
      <el-table-column prop="bankid" label="银行卡号" width="200" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" width="160" align="center"></el-table-column>
      <el-table-column prop="cash" label="提现金额" width="80" align="center"></el-table-column>
      <el-table-column label="申请时间" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createtime | timeFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 0" @click="deliver(scope.row)">确认转账</el-button>
          <el-button v-if="scope.row.status === 0" @click="modifyRemark(scope.row)">修改备注</el-button>
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
    <el-dialog title="备注" :visible.sync="dialogVisible">
      <el-form ref="form" label-width="80px">
        <el-input v-model="remark"></el-input>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCashRequest, disposeCashRequest, updateRemark } from "@/api/cash";
export default {
  data() {
    return {
      searchObj: {
        status: 0
      },
      tableData: null,
      typeArray: ["未处理", "已处理"],
      currentPage: 1,
      totalPage: 0,
      dialogVisible: false,
      loading: false,
      remark: "",
      currentId: 0
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
          this.tableData = data.list[0];
          this.currentPage = data.pageNum;
          this.totalPage = data.pages;
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    /**
     * 修改备注
     */
    modifyRemark({ id, remark }) {
      this.remark = remark;
      this.currentId = id;
      this.dialogVisible = true;
    },
    /**
     * 提交修改
     */
    save() {
      updateRemark(this.currentId, this.remark).then(_ => {
        this.dialogVisible = false;
        this.fetchData();
      });
    },
    deliver(row) {
      this.$confirm("确认已将钱款转账给会员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          disposeCashRequest(row.uuid).then(_ => {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  font-size: 13px;
}
</style>