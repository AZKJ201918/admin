<template>
  <div>
    <el-form
      class="agency-form"
      :model="rRetailTable"
      :rules="rules"
      ref="form"
      label-width="120px"
    >
      <el-form-item label="独立分销">
        <el-checkbox v-model="rRetail">是否为此商品开启独立分销</el-checkbox>
      </el-form-item>
      <el-collapse-transition>
        <div v-show="retail">
          <el-form-item label="第一级分销模式">
            <el-radio v-model="rRetailTable.parenttype" :label="0">比例分销</el-radio>
            <el-radio v-model="rRetailTable.parenttype" :label="1">固定金额</el-radio>
          </el-form-item>
          <el-form-item :label="rRetailTable.parenttype === 0? '第一级分销比例':'第一级分销金额' " prop="parent">
            <el-input v-model.number="rRetailTable.parent"></el-input>
          </el-form-item>
          <el-form-item label="第二级分销模式">
            <el-radio v-model="rRetailTable.grandtype" :label="0">比例分销</el-radio>
            <el-radio v-model="rRetailTable.grandtype" :label="1">固定金额</el-radio>
          </el-form-item>
          <el-form-item :label="rRetailTable.grandtype === 0? '第二级分销比例':'第一级分销金额'" prop="grand">
            <el-input v-model.number="rRetailTable.grand"></el-input>
          </el-form-item>
          <div style="font-size: 14px;color: #606266;">
            独立分销结束时间
            <el-date-picker v-model="rRetailTable.outtime" type="datetime"></el-date-picker>
          </div>
        </div>
      </el-collapse-transition>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["retail", "retailTable", "ready"],
  data() {
    const validateParent = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (this.retailTable.parenttype === 0 && value > 1) {
          callback(new Error("不能超过1"));
        } else {
          callback();
        }
      }
    };
    const validateGrand = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (this.retailTable.grandtype === 0 && value > 1) {
          callback(new Error("不能超过1"));
        } else {
          callback();
        }
      }
    };
    return {
      rRetail: this.retail,
      rRetailTable: this.retailTable,
      rules: {
        parent: [{ validator: validateParent, trigger: "blur" }],
        grand: [{ validator: validateGrand, trigger: "blur" }]
      }
    };
  },
  watch: {
    ready: {
      handler(val) {}
    },

    retail: {
      deep: true,
      handler(val) {
        this.rRetail = val;
      }
    },

    retailTable: {
      deep: true,
      handler(val) {
        this.rRetailTable = val;
      }
    },
    rRetail: {
      deep: true,
      handler(val) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$emit("update:retail", val);
            this.$emit("update:ready", true);
          } else {
            this.$emit("update:ready", false);
          }
        });
      }
    },
    rRetailTable: {
      deep: true,
      handler(val) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$emit("update:retailTable", val);
            this.$emit("update:ready", true);
          } else {
            this.$emit("update:ready", false);
          }
        });
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.choose {
  margin-top: 15px;
}
</style>