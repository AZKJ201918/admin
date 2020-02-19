<template>
  <div>
    <div v-for="(item,index) in fileList" :key="index">
      <text>{{item}}</text>
      <br />
    </div>
    <el-upload
      class="upload-demo"
      drag
      :action="baseURL+'/slideShowImg'"
      :headers="{'X-token': getToken()}"
      :on-success="onSuccess"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { baseURL } from "@/utils/request";
export default {
  data() {
    return {
      getToken,
      baseURL,
      fileList: []
    };
  },
  methods: {
    onSuccess(res, file, fileList) {
      this.$alert(res.data, "cdn链接", {
        confirmButtonText: "确定"
      });
    }
  }
};
</script>

<style>
</style>