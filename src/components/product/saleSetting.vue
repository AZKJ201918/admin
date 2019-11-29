<template>
  <div>
    <h3>营销活动设置(折扣为小数，例如9折请填写0.9)</h3>
    <div>
      <el-checkbox v-model="checked[1]" label="包邮"></el-checkbox>
    </div>
    <div class="choose">
      <el-checkbox v-model="checked[2]" label="满减"></el-checkbox>
      <transition name="el-fade-in">
        <el-form
          v-show="checked[2]"
          :inline="true"
          :model="value"
          class="demo-form-inline"
          label-width="80px"
        >
          <el-form-item label="满">
            <el-input v-model="value.fulls" placeholder="请输入金额"></el-input>
          </el-form-item>
          <el-form-item label="优惠金额">
            <el-input v-model="value.fullsubtract" placeholder="请输入金额"></el-input>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <div class="choose">
      <el-checkbox :disabled="checked[3]" v-model="checked[0]" label="立减"></el-checkbox>
      <transition name="el-fade-in">
        <el-form
          v-show="checked[0]"
          :inline="true"
          :model="value"
          class="demo-form-inline"
          label-width="80px"
        >
          <el-form-item label="优惠金额">
            <el-input v-model="value.subtract" placeholder="请输入数字"></el-input>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <div class="choose">
      <el-checkbox v-model="checked[4]" label="满折"></el-checkbox>
      <transition name="el-fade-in">
        <el-form
          v-show="checked[4]"
          :inline="true"
          :model="value"
          class="demo-form-inline"
          label-width="80px"
        >
          <el-form-item label="满">
            <el-input v-model="value.fulls" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="折扣">
            <el-input v-model="value.fulldiscount" placeholder="请输入数字"></el-input>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <div class="choose">
      <el-checkbox :disabled="checked[0]" v-model="checked[3]" label="立折"></el-checkbox>
      <transition name="el-fade-in">
        <el-form
          v-show="checked[3]"
          :inline="true"
          :model="value"
          class="demo-form-inline"
          label-width="80px"
        >
          <el-form-item label="折扣">
            <el-input v-model="value.discount" placeholder="请输入数字"></el-input>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <div>
      活动起止时间：
      <el-date-picker
        v-model="time"
        type="datetimerange"
        align="center"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="onChange"
      ></el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      checked: [false, false, false, false, false],
      time: null,
      full: true
    };
  },
  watch: {
    checked: {
      handler() {
        this.value.aid = "";
        for (let i = 0; i < 5; i++) {
          if (this.checked[i]) {
            this.value.aid += (i + 1).toString() + ",";
          }
        }
        this.value.aid = this.value.aid.substring(0, this.value.aid.length - 1);
      },
      deep: true
    }
  },
  methods: {
    onChange() {
      this.value.starttime = this.time[0];
      this.value.endtime = this.time[1];
    }
  },
  created() {
    this.time = [new Date(this.value.starttime), new Date(this.value.endtime)];
    const array = this.value.aid.split(",");
    for (let i = 0; i < 5; i++) {
      if (array.includes((i + 1).toString())) {
        this.checked[i] = true;
      }
    }
  }
};
</script>
 
<style lang="scss" scoped>
.choose {
  display: flex;
  align-items: center;
  height: 40px;
}
.demo-form-inline {
  height: 40px;
}
</style>