<template>
  <div>
    <el-dialog title="独立分销设置" :visible.sync="show" :before-close="handleClose">
      <span slot="footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["show"],
  data() {
    return {};
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    close() {
      this.$emit("update:show", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.choose {
  margin-top: 15px;
}
</style>