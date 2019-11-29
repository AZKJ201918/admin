<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="好评">
        <el-table v-loading="tableLoading" :data="tableData" border style="width: 100%">
          <el-table-column label="评论人">
            <template slot-scope="scope">
              <el-image fit="fill" style="height: 20px; width: 20px" :src="scope.row.wximg"></el-image>
              <span>{{scope.row.wxname}}</span>
            </template>
          </el-table-column>
          <el-table-column label="评论类型">
            <template slot-scope="scope">
              <span v-if="scope.row.evaluate === 1">好评</span>
              <span v-else-if="scope.row.evaluate === 2">中评</span>
              <span v-else>差评</span>
            </template>
          </el-table-column>
          <el-table-column prop="details" label="评论内容"></el-table-column>
          <el-table-column prop="plusDetails" label="追加内容"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="中评">
        <el-table v-loading="tableLoading" :data="tableData" border style="width: 100%">
          <el-table-column label="评论人">
            <template slot-scope="scope">
              <el-image fit="fill" style="height: 20px; width: 20px" :src="scope.row.wximg"></el-image>
              <span>{{scope.row.wxname}}</span>
            </template>
          </el-table-column>
          <el-table-column label="评论类型">
            <template slot-scope="scope">
              <span v-if="scope.row.evaluate === 1">好评</span>
              <span v-else-if="scope.row.evaluate === 2">中评</span>
              <span v-else>差评</span>
            </template>
          </el-table-column>
          <el-table-column prop="details" label="评论内容"></el-table-column>
          <el-table-column prop="plusDetails" label="追加内容"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="差评">
        <el-table v-loading="tableLoading" :data="tableData" border style="width: 100%">
          <el-table-column label="评论人">
            <template slot-scope="scope">
              <el-image fit="fill" style="height: 20px; width: 20px" :src="scope.row.wximg"></el-image>
              <span>{{scope.row.wxname}}</span>
            </template>
          </el-table-column>
          <el-table-column label="评论类型">
            <template slot-scope="scope">
              <span v-if="scope.row.evaluate === 1">好评</span>
              <span v-else-if="scope.row.evaluate === 2">中评</span>
              <span v-else>差评</span>
            </template>
          </el-table-column>
          <el-table-column prop="details" label="评论内容"></el-table-column>
          <el-table-column prop="plusDetails" label="追加内容"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getDiscuss } from "@/api/discuss";
export default {
  data() {
    return {
      id: null,
      tabs: [
        { name: "好评", tableData: [], tableLoading: false },
        { name: "中评", tableData: [], tableLoading: false },
        { name: "差评", tableData: [], tableLoading: false }
      ],
      typeArray: [],
      tableData: null,
      tableLoading: false,
      currentPage: 1,
      totalPage: 0,
      type: null,
      typeArray: ["好评", "中评", "差评"]
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.tableLoading = true;
      getDiscuss(this.currentPage, this.id, this.type)
        .then(({ data }) => {
          this.tableData = data.discusses;
          this.totalPage = Math.ceil(data.count / 10);
        })
        .finally(_ => {
          this.tableLoading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>