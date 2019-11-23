<template>
  <div class="app-container" v-loading="loading">
    <el-card class="card-box">
      <el-form :model="retail" label-width="120px">
        <el-form-item label="第一级分销模式">
          <el-radio v-model="retail.parenttype" :label="0">比例分销</el-radio>
          <el-radio v-model="retail.parenttype" :label="1">固定金额</el-radio>
        </el-form-item>
        <el-form-item :label="retail.parenttype === 0? '第一级分销比例':'第一级分销金额' ">
          <el-input v-model="retail.wholeparent"></el-input>
        </el-form-item>
        <el-form-item label="第二级分销模式">
          <el-radio v-model="retail.grandtype" :label="0">比例分销</el-radio>
          <el-radio v-model="retail.grandtype" :label="1">固定金额</el-radio>
        </el-form-item>
        <el-form-item :label="retail.grandtype === 0? '第一级分销比例':'第一级分销金额'">
          <el-input v-model="retail.wholegrand"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="card-box">
      <el-form label-width="140px">
        <el-form-item label="每日签到可获得积分">
          <el-input v-model="integral"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="bottom-button">
      <el-button type="primary" :loading="uploading" @click="save">保存商品配置</el-button>
    </div>
  </div>
</template>

<script>
import {
  getRetailSetting,
  updateRetailSetting,
  getIntegralSetting,
  updateIntegralSetting
} from "@/api/retail";
export default {
  data() {
    return {
      loading: false,
      integral: null,
      uploading: false,
      retail: {}
    };
  },
  async created() {
    this.loading = true;
    await getRetailSetting().then(({ data }) => {
      this.retail = data;
    });
    await getIntegralSetting().then(({ data }) => {
      this.integral = data;
    });
    this.loading = false;
  },
  methods: {
    async save() {
      this.uploading = true;
      await updateRetailSetting(this.retail);
      await updateIntegralSetting(this.integral);
      this.uploading = false;
      location.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom-button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 59vh;
}

.card-box {
  margin-bottom: 10px
}
</style>