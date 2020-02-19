<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <template v-for="(item, index) in tabs">
        <el-tab-pane :label="item.name +'('+ item.count + ')'" :key="index">
          <el-table v-loading="item.tableLoading" :data="item.tableData" border style="width: 100%">
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
          <el-pagination
            layout="prev, pager, next"
            hide-on-single-page
            :current-page.sync="item.currentPage"
            :page-count="item.totalPage"
            @current-change="fetchData"
          ></el-pagination>
        </el-tab-pane>
      </template>
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
        {
          name: "好评",
          currentPage: 1,
          count: 0,
          totalPage: 0,
          tableData: [],
          tableLoading: false
        },
        {
          name: "中评",
          currentPage: 1,
          count: 0,
          totalPage: 0,
          tableData: [],
          tableLoading: false
        },
        {
          name: "差评",
          currentPage: 1,
          count: 0,
          totalPage: 0,
          tableData: [],
          tableLoading: false
        }
      ],
      typeArray: [],
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
      for (let i = 0; i < 3; i++) {
        this.tabs[i].tableLoading = true;
        getDiscuss(this.id, this.tabs[i].currentPage, i + 1)
          .then(({ data }) => {
            this.tabs[i].tableData = data.discusses;
            this.tabs[i].count = data.count;
            this.tabs[i].totalPage = Math.ceil(data.count / 10);
          })
          .finally(_ => {
            this.tabs[i].tableLoading = false;
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>