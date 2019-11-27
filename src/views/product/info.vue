<template>
  <div ref="app">
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="onTabClick">
        <el-tab-pane label="基本信息" name="base"></el-tab-pane>
        <el-tab-pane label="规格库存" name="repertory"></el-tab-pane>
        <el-tab-pane label="营销活动" name="sale"></el-tab-pane>
        <el-tab-pane label="代理设置" name="agency"></el-tab-pane>
        <el-tab-pane label="商品详情" name="detail"></el-tab-pane>
        <el-tab-pane label="运费设置" name="freight"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="app-container">
      <el-card class="card-box" ref="base">
        <base-setting
          v-model="currentProduct"
          :url.sync="uploadList.url"
          :banner.sync="uploadList.banner"
          :integral.sync="currentProduct.integralCommodity.integral"
        ></base-setting>
      </el-card>
      <el-card class="card-box" ref="repertory">
        <el-form ref="form" :model="currentProduct" label-width="80px">
          <el-form-item label="商品库存">
            <span>当前库存{{currentProduct.repertory}}</span>
            <el-button type="primary" @click="repertoryDialogVisible = true">增加库存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="card-box" ref="sale">
        <sale-setting v-model="currentProduct.commercial"></sale-setting>
      </el-card>
      <el-card class="card-box" ref="agency">
        <retail-setting
          :ready.sync="ready"
          :retail.sync="currentProduct.retail"
          :retailTable.sync="currentProduct.retailTable"
        ></retail-setting>
      </el-card>
      <el-card class="card-box" ref="detail">
        <el-form ref="form" :model="currentProduct" label-width="80px">
          <el-form-item label="商品详情">
            <drawable-upload :limit="3" :list.sync="uploadList.detail"></drawable-upload>
          </el-form-item>
          <el-form-item label="规格详情">
            <drawable-upload :limit="3" :list.sync="uploadList.specs"></drawable-upload>
          </el-form-item>

          <el-form-item label="售后详情">
            <drawable-upload :limit="3" :list.sync="uploadList.sale"></drawable-upload>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="card-box" ref="freight">
        <el-form ref="form" :model="currentProduct" label-width="80px">
          <el-form-item label="邮费">
            <el-input v-model="currentProduct.postage"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <div class="bottom-button">
        <el-button type="primary" :loading="uploading" @click="save">保存商品配置</el-button>
      </div>
    </div>
    <el-dialog title="增加库存" :visible.sync="repertoryDialogVisible" width="30%" center>
      <el-input-number v-model="addRepertory" :min="1" :step="1" step-strictly></el-input-number>
      <span slot="footer" class="dialog-footer">
        <el-button @click="repertoryDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRepertoryHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import baseSetting from "@/components/product/baseSetting";
import saleSetting from "@/components/product/saleSetting";
import retailSetting from "@/components/product/retailSetting";
import DrawableUpload from "@/components/DrawableUpload";
import {
  updateProduct,
  deleteDetailBanner,
  insertProduct,
  deleteProduct
} from "@/api/product";
import { setTimeout } from "timers";
import { type } from "os";
const names = ["base", "repertory", "sale", "agency", "detail", "freight"];
function createProductObj(cid) {
  return {
    beretail: false,
    commercial: {
      aid: "",
      cid,
      discount: null,
      endtime: new Date(),
      fulld: null,
      fulldiscount: null,
      fulls: null,
      fullsubtract: null,
      postage: null,
      starttime: new Date(),
      subtract: null
    },
    deatilBannerList: [],
    detailurl: "[]",
    isintegral: false,
    name: null,
    price: null,
    repertory: null,
    retail: false,
    retailTable: {
      cid,
      grand: 0,
      grandtype: 9,
      outtime: new Date(),
      parent: 0,
      parenttype: 0
    },
    saleurl: "[]",
    specsurl: "[]",
    status: 1,
    subname: null,
    type: 1,
    url: null,
    addRepertory: 0,
    integralCommodity: {
      cid,
      integral: 0,
      num: 1
    }
  };
}
export default {
  components: { saleSetting, retailSetting, baseSetting, DrawableUpload },
  data() {
    return {
      ready: true,
      interval: null,
      currentProduct: null,
      activeName: "base",
      height: {
        base: 0,
        repertory: 0,
        sale: 0,
        agency: 0,
        detail: 0,
        freight: 0
      },
      bottomHeight: 0,
      uploadList: {
        detail: [],
        sale: [],
        specs: [],
        banner: [],
        url: []
      },
      detail: [],
      uploading: false,
      repertoryDialogVisible: false,
      addRepertory: 0,
      originalRepertory: 0
    };
  },
  watch: {},
  created() {
    this.$nextTick(_ => {
      this.reloadCardScrollTop();
      window.addEventListener("scroll", this.watchScroll);
    });
    let product = null;
    if ("product" in this.$route.params) {
      product = this.$route.params.product;
    } else {
      product = createProductObj(null);
    }
    this.currentProduct = product;
    this.currentProduct.addRepertory = 0;
    this.originalRepertory = this.currentProduct.repertory;
    // 积分属性的的初始化
    this.currentProduct.isintegral = !!this.currentProduct.isintegral;
    if (!this.currentProduct.isintegral) {
      this.currentProduct.integralCommodity = {
        cid: this.currentProduct.id,
        integral: 0,
        num: 1
      };
    }
    if (!("commercial" in this.currentProduct)) {
      //活动属性初始化
      this.currentProduct.commercial = {
        aid: "",
        cid: this.currentProduct.id,
        discount: null,
        endtime: new Date(),
        fulld: null,
        fulldiscount: null,
        fulls: null,
        fullsubtract: null,
        postage: null,
        starttime: new Date(),
        subtract: null
      };
    }

    //分销属性的初始化
    this.currentProduct.beretail = !!this.currentProduct.beretail;
    this.currentProduct.retail = !!this.currentProduct.retail;
    if (!("retailTable" in this.currentProduct)) {
      this.currentProduct.retailTable = {
        cid: this.currentProduct.id,
        grand: 0,
        grandtype: 0,
        parent: 0,
        parenttype: 0,
        outtime: new Date()
      };
    }
    JSON.parse(product.detailurl).forEach(element => {
      this.uploadList.detail.push(element);
    });
    JSON.parse(product.saleurl).forEach(element => {
      this.uploadList.sale.push(element);
    });
    JSON.parse(product.specsurl).forEach(element => {
      this.uploadList.specs.push(element);
    });
    product.deatilBannerList.forEach(element => {
      this.uploadList.banner.push(element.detailurl);
    });
    if (product.url) {
      this.uploadList.url.push(product.url);
    }
  },

  methods: {
    /**
     * 增加库存
     */
    addRepertoryHandle() {
      if (typeof this.addRepertory === "number" && this.addRepertory > 0)
        this.currentProduct.repertory += this.addRepertory;
      this.repertoryDialogVisible = false;
      this.addRepertory = 0;
    },
    /**
     * 重载元素滚动高度
     */
    reloadCardScrollTop() {
      this.interval = setInterval(_ => {
        for (let i = 0; i < names.length; i++) {
          this.height[names[i]] = this.$refs[names[i]].$el.offsetTop - 110;
        }
      }, 100);
    },
    /**
     * 监听tab点击事件
     */
    onTabClick(tab) {
      this.changeActiveName(tab.name);
    },
    /**
     * 改变tab name
     */
    changeActiveName(val) {
      let s = (this.height[val] - document.documentElement.scrollTop) / 40;
      let count = 0;

      const interval = setInterval(_ => {
        document.documentElement.scrollTop += s;
        count++;
        if (count == 39) {
          clearInterval(interval);
          document.documentElement.scrollTop = this.height[val];
        }
      }, 1);
    },
    /**
     * 监听页面滚动事件
     */
    watchScroll() {
      let scroll = document.documentElement.scrollTop;
      for (let i = 0; i < names.length; i++) {
        if (
          scroll >= this.height[names[i]] &&
          (names.length - 1 === i || scroll < this.height[names[i + 1]])
        ) {
          if (this.activeName !== names[i]) {
            this.activeName = names[i];
          }
          break;
        }
      }
    },
    async save() {
      if (this.ready) {
        const product = JSON.parse(JSON.stringify(this.currentProduct));
        //对库存进行操作
        if (this.originalRepertory === product.repertory) {
          product.repertory = 0;
        } else {
          product.repertory = product.repertory - this.originalRepertory;
        }
        //详情图
        product.detailurl = JSON.stringify(this.uploadList.detail);
        product.saleurl = JSON.stringify(this.uploadList.sale);
        product.specsurl = JSON.stringify(this.uploadList.specs);
        //缩略图
        product.url = this.uploadList.url[0];
        //轮播图
        product.deatilBannerList = [];
        this.uploadList.banner.forEach((element, index) => {
          product.deatilBannerList[index] = {
            cid: product.id,
            detailurl: element,
            sort: index + 1
          };
        });
        try {
          this.uploading = true;
          if ("id" in product) {
            //更新操作，先删除轮播图
            await deleteDetailBanner(product.id);
            await updateProduct(product);
          } else {
            //新增
            await insertProduct(product);
          }
          // 回退页面
          this.$router.push({ name: "productList" });
        } catch (e) {
          this.$message({ message: "操作失败:" + e.message, type: "error" });
        } finally {
          this.uploading = false;
        }
      } else {
        this.$message({ message: "参数不合法" });
      }
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.watchScroll, false);
    clearInterval(this.interval);
  }
};
</script>
<style lang="scss" scoped>
.card-box {
  margin-top: 40px;
}
.tabs {
  position: fixed;
  transform: translateZ(0);
  top: 50px;
  width: 100%;
  background-color: #ffffff;
  z-index: 2;
  padding-left: 20px;
}
.integral {
  display: flex;
  flex-direction: row;
  width: 600px;
}
.agency-form {
  width: 400px;
}
.bottom-button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 59vh;
}
</style>