<template>
  <dir class="app-container">
    <div class="buttons-container">
      <h3>效果预览：</h3>
      <div class="buttons">
        <div
          class="button isChoose"
          @click="buttonChangeHandle(index)"
          v-for="(item, index) in buttonList"
          :key="index"
        >
          <el-image class="preview-img" :src="item.imgurl" fit="fill">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <div>{{item.name}}</div>
        </div>
      </div>
    </div>
    <el-card class="box-card" shadow="hover" v-if="button">
      <div slot="header" class="card-header">
        <span>按钮{{button.index + 1}}</span>
      </div>
      <div class="content">
        <el-form :model="button" label-width="100px">
          <el-image class="preview-img" :src="button.imgurl" fit="fill">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <el-form-item label="上传图片">
            <el-upload
              class="upload"
              ref="upload"
              :action="baseURL+'/slideShowImg'"
              :headers="{'X-token': getToken()}"
              :file-list="fileList"
              :limit="1"
              :on-exceed="handleExceed"
              :on-success="onUploadSuccess"
              :auto-upload="false"
              accept="image/png, image/jpeg, image/jpg"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUploadFile"
              >上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,注意尺寸为100*100</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-form label-width="90px" :inline="true" :model="button">
          <!-- <el-form-item label="优先级">
            <el-select v-model="options.priority.value" placeholder="请选择">
              <el-option
                v-for="item in options.priority.array"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            <el-popover
              placement="top-start"
              title="提示"
              width="200"
              trigger="hover"
              content="轮播图中的展示顺序依据优先级绝对（数字越大优先级越低）"
            >
              <i class="el-icon-question" slot="reference"></i>
            </el-popover>
          </el-form-item>-->
          <el-form-item label="按钮名称">
            <el-input v-model="button.name" placeholder="请输入按钮名称"></el-input>
          </el-form-item>
          <el-form-item label="点击后行为">
            <el-select v-model="options.linkType.value" placeholder="请选择">
              <el-option
                v-for="item in options.linkType.array"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="options.linkType.value===2" label="外链地址">
            <el-input v-model="button.linkurl" placeholder="请输入外链地址"></el-input>
          </el-form-item>
          <el-form-item v-show="options.linkType.value===1" label="小程序页面">
            <el-select
              v-model="options.miniProgram.value"
              :loading="!options.miniProgram.array"
              placeholder="请选择"
              @change="onOptionsMiniProgramChange"
            >
              <el-option
                v-for="item in options.miniProgram.array"
                :key="item.id"
                :label="item.name"
                :value="item.url"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="options.miniProgram.value === '/pages/product/product'"
            label="商品id"
          >
            <el-input :disabled="true" v-model="button.linkid">
              <el-button slot="append" @click="dialogProductVisible = true">选择</el-button>
            </el-input>
          </el-form-item>
        </el-form>
        <el-button @click="save" class="save-button" type="primary">保存</el-button>
      </div>
    </el-card>
    <el-dialog
      title="请选择跳转商品"
      :visible.sync="dialogProductVisible"
      width="375px"
      @closed="onDialogClose"
    >
      <el-input placeholder="请输入商品名称搜索" v-model="productSearchName">
        <el-button slot="append" icon="el-icon-search" @click="searchProduct"></el-button>
      </el-input>
      <el-table
        ref="singleTable"
        :data="productTable"
        v-loading="productTableLoading"
        highlight-current-row
        @current-change="handleCurrentProductChangeval"
        style="width: 100%"
      >
        <el-table-column label="id" property="id" width="60"></el-table-column>
        <el-table-column label="预览图片" width="60">
          <template slot-scope="scope">
            <el-image class="thumbnail-img" :src="scope.row.url" fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" property="name"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogProductVisible = false">取 消</el-button>
        <el-button type="primary" @click="chooseProduct">确 定</el-button>
      </span>
    </el-dialog>
  </dir>
</template>

<script>
import { getToken } from "@/utils/auth";
import { baseURL } from "@/utils/request";
import {
  getAllButtons,
  getInternalLink,
  updateButton,
  insertButton,
  deleteButton
} from "@/api/home";
import { getProductByNameLike } from "@/api/product";
export default {
  data() {
    return {
      baseURL,
      buttonList: null,
      button: null,
      fileList: [],
      dialogProductVisible: false,
      productSearchName: "",
      productTable: null,
      productTableLoading: false,
      currentProduct: null,
      options: {
        linkType: {
          value: null,
          array: [
            {
              value: 0,
              label: "无"
            },
            {
              value: 1,
              label: "跳转到小程序内部"
            },
            {
              value: 2,
              label: "跳转外部链接"
            }
          ]
        },
        miniProgram: {
          value: null,
          array: null
        },
        priority: {
          value: null,
          array: null
        }
      }
    };
  },
  created() {
    this.reloadButtons();
    getInternalLink().then(({ data }) => {
      this.options.miniProgram.array = data;
    });
  },
  methods: {
    getToken,
    /**
     * 上传图片
     */
    submitUploadFile() {
      this.$refs.upload.submit();
    },
    /**
     * 上传成功后事件
     */
    onUploadSuccess({ data }) {
      this.button.imgurl = data;
    },
    /**
     * 监听内链选择事件
     */
    onOptionsMiniProgramChange(value) {
      if ("/pages/product/product" === value && !this.button.linkid) {
        this.dialogProductVisible = true;
      }
    },
    /**
     * 监听用户选择商品事件
     */
    handleCurrentProductChangeval(val) {
      this.currentProduct = val;
    },
    /**
     * 监听选择商品窗口关闭方法
     */
    onDialogClose() {
      if (!this.currentProduct && !this.button.linkid) {
        // 如果离开时没有选择 ， 清空选择内链
        this.options.miniProgram.value = null;
      }
    },
    /**
     * 搜索商品
     */
    searchProduct() {
      this.productTableLoading = true;
      getProductByNameLike()
        .then(({ data }) => {
          this.productTable = data.list;
        })
        .finally(() => {
          this.productTableLoading = false;
        });
    },
    /**
     * 选择商品
     */
    chooseProduct() {
      const linkid = "id=" + this.currentProduct.id;
      this.button.linkid = linkid;
      this.dialogProductVisible = false;
    },
    /**
     * 重置表单
     */
    reloadForm(data, index) {
      this.fileList = [];
      this.buttonList = data;
      this.options.linkType.value = data[index || 0].linktype;
      this.options.priority.value = data[index || 0].sort;
      this.options.miniProgram.value = data[index || 0].linkurl;
      this.button = Object.assign({ index: index || 0 }, data[index || 0]);
    },
    /**
     * 新建表单
     */
    newForm() {
      this.options.linkType.value = 0;
      this.options.priority.value = this.buttonList.length + 1;
      if (!this.options.priority.array.includes(this.buttonList.length + 1)) {
        this.options.priority.array.push(this.buttonList.length + 1);
      }
      this.options.miniProgram.value = null;
      this.button = {
        index: this.buttonList.length,
        linktype: null,
        linkurl: null,
        sort: null,
        imgurl: null
      };
    },
    deleteButton() {
      deleteButton(this.button.id).then(() => {
        this.$message({
          message: "成功",
          type: "success",
          onClose: () => {
            location.reload();
          }
        });
      });
    },
    /**
     * 刷新轮播图内容
     */
    reloadButtons() {
      getAllButtons(1).then(({ data }) => {
        this.reloadForm(data);
        const priorityArray = [];
        for (let i = 0; i < data.length; i++) {
          priorityArray.push(i + 1);
        }
        this.options.priority.array = priorityArray;
      });
    },
    /**
     * 文件选择超限的提示
     */
    handleExceed(files, fileList) {
      this.$message.warning("只能选择一个文件");
    },
    buttonChangeHandle(index) {
      this.reloadForm(this.buttonList, index);
    },
    save() {
      this.button.linktype = this.options.linkType.value;
      if (this.button.linktype === 1) {
        // 内链的情况
        this.button.linkurl = this.options.miniProgram.value;
      }
      this.button.sort = this.options.priority.value;
      if (this.button.id) {
        updateButton(this.button).then(({ data }) => {
          this.reloadButtons();
          this.$message({
            message: "成功",
            type: "success"
          });
        });
      } else {
        insertButton(this.button).then(({ data }) => {
          this.reloadButtons();
          this.$message({
            message: "成功",
            type: "success"
          });
        });
      }
    }
  }
};
</script>

<style lang="scss"  scoped>
.buttons-container {
  display: flex;
  flex-direction: column;
  .buttons {
    align-self: center;
    width: 375px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      font-size: 12px;
      height: 70px;
    }
  }
}
.preview-img {
  width: 50px;
  height: 50px;
}
.thumbnail-img {
  width: 50px;
  height: 50px;
}
.box-card {
  .card-header {
    color: #a5a5a5;
    .button {
      float: right;
      padding: 3px 0;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    .upload {
      width: 400px;
    }
    .save-button {
      align-self: center;
    }
  }
  .isChoose {
    box-shadow: 5px 10px 15px 2px rgba(0, 0, 0, 0.1);
  }
}
</style>