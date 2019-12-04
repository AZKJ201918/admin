<template>
  <el-form ref="form" :model="value" label-width="80px">
    <el-form-item label="商品ID">
      <el-input v-model="value.id" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="商品名称">
      <el-input v-model="value.name"></el-input>
    </el-form-item>
    <el-form-item label="副标题">
      <el-input v-model="value.subname"></el-input>
    </el-form-item>
    <el-form-item label="商品原价">
      <el-input v-model="value.price"></el-input>
    </el-form-item>
    <el-form-item label="限购选项">
      <div class="integral">
        <el-checkbox v-model="isLimit">开启限购</el-checkbox>
        <div v-if="isLimit" style="display: flex">
          <div style="width: 110px">每个id限购份数</div>
          <el-input v-model.number="value.buy"></el-input>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="积分选项">
      <div class="integral">
        <el-checkbox v-model="value.isintegral">此商品为积分商品</el-checkbox>
        <div v-if="value.isintegral" style="display: flex">
          <div style="width: 80px">需要积分</div>
          <el-input v-model="rIntegral"></el-input>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="分销设置">
      <el-checkbox v-model="value.beretail">购买此商品可以成为分销商</el-checkbox>
    </el-form-item>
    <el-form-item label="缩略图">
      <drawable-upload :limit="1" :list.sync="rUrl"></drawable-upload>
    </el-form-item>
    <el-form-item label="商品轮播">
      <drawable-upload :limit="10" :list.sync="rBanner"></drawable-upload>
    </el-form-item>
  </el-form>
</template>

<script>
import DrawableUpload from "@/components/DrawableUpload";

export default {
  components: { DrawableUpload },
  props: ["value", "url", "banner", "integral"],
  data() {
    return {
      rUrl: this.url,
      rBanner: this.banner,
      rIntegral: this.integral,
      isLimit: false
    };
  },
  created() {
    this.isLimit = !!this.value.buy;
  },
  watch: {
    rUrl: {
      deep: true,
      handler(val) {
        this.$emit("update:url", val);
      }
    },
    rBanner: {
      deep: true,
      handler(val) {
        this.$emit("update:banner", val);
      }
    },
    rIntegral(val) {
      this.$emit("update:integral", val);
    },
    isLimit() {
      this.value.num = null;
    }
  }
};
</script>

<style>
</style>