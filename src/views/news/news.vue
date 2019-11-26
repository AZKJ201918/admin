<template>
  <div class="app-container">
    <el-button style="float: right;" type="primary" @click="showCreate">新增</el-button>
    <el-table v-loading="tableLoading" :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="showEdit(scope.row)">修改</el-button>
          <el-button type="danger" @click="deleteNew(scope.row)">删除</el-button>
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
    <el-dialog title="文章信息" :visible.sync="dialogVisible">
      <el-form ref="form" :model="currentNew" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="currentNew.title"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="currentNew.author"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="currentNew.articleurl"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <drawable-upload :limit="1" :list.sync="fileList"></drawable-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllNews, insertNew, deleteNew, updateNew } from "@/api/news";
import DrawableUpload from "@/components/DrawableUpload";

export default {
  components: { DrawableUpload },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      totalPage: 0,
      dialogVisible: false,
      tableLoading: false,
      currentNew: {},
      fileList: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.tableLoading = true;
      getAllNews({}, this.currentPage)
        .then(({ data }) => {
          this.tableData = data.list;
          this.currentPage = data.pageNum;
          this.totalPage = data.pages;
        })
        .finally(_ => {
          this.tableLoading = false;
        });
    },
    showEdit(row) {
      this.dialogVisible = true;
      this.currentNew = row;
      this.fileList = [row.pictrue];
    },
    showCreate() {
      this.dialogVisible = true;
      this.fileList = [];
      this.currentNew = {
        articleurl: "",
        author: "",
        pictrue: "",
        title: ""
      };
    },
    save() {
      this.currentNew.pictrue = this.fileList[0];
      if ("id" in this.currentNew) {
        updateNew(this.currentNew).then(_ => {
          this.$message({
            type: "success",
            message: "成功"
          });
          this.fetchData();
          this.dialogVisible = false;
        });
      } else {
        insertNew(this.currentNew).then(_ => {
          this.$message({
            type: "success",
            message: "成功"
          });
          this.fetchData();
          this.dialogVisible = false;
        });
      }
    },
    deleteNew(row) {
      this.$confirm("此操作将永久删除此文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteNew({id: row.id, uid: row.uid}).then(() => {
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
</style>