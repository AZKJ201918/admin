<template>
  <div class="app-container">
    <el-button style="float: right;" type="primary" @click="showCreate">新增</el-button>
    <el-table v-loading="tableLoading" :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="videourl" label="视频"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="showEdit(scope.row)">修改</el-button>
          <el-button type="danger" @click="deleteVideo(scope.row.id)">删除</el-button>
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
    <el-dialog title="视频" :visible.sync="dialogVisible">
      <el-form ref="form" :model="currentVideo" label-width="80px">
        <video :src="currentVideo.videourl" controls />
        <el-input v-model="currentVideo.videourl"></el-input>
        <el-upload
          :action="baseURL+'/uploadVideo'"
          :limit="1"
          :on-success="handleChange"
          :headers="{'X-token': getToken()}"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { baseURL } from "@/utils/request";

import {
  getAllVideo,
  deleteVideo,
  insertVideo,
  updateVideo
} from "@/api/videos";
export default {
  data() {
    return {
      baseURL,
      tableData: [],
      currentVideo: {},
      tableLoading: false,
      currentPage: 1,
      totalPage: 1,
      dialogVisible: false,
      fileList: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    getToken,
    fetchData() {
      this.tableLoading = true;
      getAllVideo(this.currentPage)
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
      this.currentVideo = row;
    },
    showCreate() {
      this.dialogVisible = true;
      this.currentVideo = {
        videourl: ""
      };
    },
    handleChange({ data }) {
      this.currentVideo.videourl = data;
    },
    save() {
      if ("id" in this.currentVideo) {
        updateVideo(this.currentVideo).then(_ => {
          this.$message({
            type: "success",
            message: "成功"
          });
          this.fetchData();
          this.dialogVisible = false;
        });
      } else {
        insertVideo(this.currentVideo).then(_ => {
          this.$message({
            type: "success",
            message: "成功"
          });
          this.fetchData();
          this.dialogVisible = false;
        });
      }
    },
    deleteVideo(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteVideo(id).then(() => {
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

<style>
</style>