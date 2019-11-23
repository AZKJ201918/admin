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
        <el-form ref="form" :model="currentProduct" label-width="80px">
          <el-form-item label="商品ID">
            <el-input v-model="currentProduct.id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="currentProduct.name"></el-input>
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="currentProduct.subname"></el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input v-model="currentProduct.price"></el-input>
          </el-form-item>
          <el-form-item label="积分选项">
            <div class="integral">
              <el-checkbox v-model="currentProduct.isintegral">此商品为积分商品</el-checkbox>
              <div v-if="currentProduct.isintegral" style="display: flex">
                <div style="width: 80px">需要积分</div>
                <el-input v-model="currentProduct.integralCommodity.integral"></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="商品轮播">
            <drawable-upload :limit="3" :list.sync="uploadList.banner"></drawable-upload>
          </el-form-item>
        </el-form>
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
        <el-form class="agency-form" ref="form" :model="currentProduct" label-width="120px">
          <el-form-item label="独立分销">
            <el-checkbox v-model="currentProduct.retail">是否为此商品开启独立分销</el-checkbox>
          </el-form-item>
          <el-collapse-transition>
            <div v-show="currentProduct.retail">
              <el-form-item label="第一级分销模式">
                <el-radio v-model="currentProduct.retailTable.parenttype" :label="0">比例分销</el-radio>
                <el-radio v-model="currentProduct.retailTable.parenttype" :label="1">固定金额</el-radio>
              </el-form-item>
              <el-form-item
                :label="currentProduct.retailTable.parenttype === 0? '第一级分销比例':'第一级分销金额' "
              >
                <el-input v-model="currentProduct.retailTable.parent"></el-input>
              </el-form-item>
              <el-form-item label="第二级分销模式">
                <el-radio v-model="currentProduct.retailTable.grandtype" :label="0">比例分销</el-radio>
                <el-radio v-model="currentProduct.retailTable.grandtype" :label="1">固定金额</el-radio>
              </el-form-item>
              <el-form-item
                :label="currentProduct.retailTable.grandtype === 0? '第一级分销比例':'第一级分销金额'"
              >
                <el-input v-model="currentProduct.retailTable.grand"></el-input>
              </el-form-item>
              <div style="font-size: 14px;color: #606266;">
                独立分销结束时间
                <el-date-picker v-model="currentProduct.retailTable.outtime" type="datetime"></el-date-picker>
              </div>
            </div>
          </el-collapse-transition>
        </el-form>
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
          <el-form-item label="商品库存"></el-form-item>
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
import saleSetting from "@/components/product/sale-setting";
import retailSetting from "@/components/product/retail-setting";
import DrawableUpload from "@/components/DrawableUpload";
import { updateProduct } from "@/api/product";
const names = ["base", "repertory", "sale", "agency", "detail", "freight"];
export default {
  components: { saleSetting, DrawableUpload },
  data() {
    return {
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
        banner: []
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
    const product = this.$route.params.product;
    this.currentProduct = this.$route.params.product;
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
    //分销属性的初始化
    this.currentProduct.retail = !!this.currentProduct.retail;
    if (!this.currentProduct.retail) {
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
     * 监听页面滚动时间
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
    save() {
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
      product.deatilBannerList.splice(
      this.uploadList.banner.length,
        product.deatilBannerList.length - this.uploadList.banner.length
      );
      this.uploadList.banner.forEach((element, index) => {
        if (index < product.deatilBannerList.length) {
          product.deatilBannerList[index].detailurl = element;
          product.deatilBannerList[index].sort = index + 1;
        } else {
          product.deatilBannerList[index] = {
            cid: product.id,
            detailurl: element,
            sort: index + 1
          };
        }
      });
      //上传
      updateProduct(product).then(_ => {
        this.$router.back(-1);
      });
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
  top: 50px;
  width: 100%;
  background-color: #ffffff;
  z-index: 1;
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