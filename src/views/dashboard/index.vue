<template>
  <div class="dashboard-container">
    <el-tabs class="chart-wrapper" activeName="register" @tab-click="handleClick">
      <el-tab-pane name="register" label="新用户"></el-tab-pane>
      <el-tab-pane name="visit" label="访问量"></el-tab-pane>
      <el-tab-pane name="sales" label="成交量"></el-tab-pane>
      <el-tab-pane name="money" label="销售额"></el-tab-pane>
    </el-tabs>
    <line-chart :xData="xData" :yData="yData" :yName="yName" class="chart-wrapper" />
  </div>
</template>

<script>
import LineChart from "@/components/chart/LineChart";
import { mapGetters } from "vuex";
import { getCensus, getVisitAndRegister } from "@/api/chart";
export default {
  name: "Dashboard",
  components: { LineChart },
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      xData: null,
      yData: null,
      yName: null,
      chartData: {
        register: {
          xData: [],
          yData: [],
          yName: "新用户"
        },
        visit: {
          xData: [],
          yData: [],
          yName: "访问量"
        },
        sales: {
          xData: [],
          yData: [],
          yName: "销售量(件)"
        },
        money: {
          xData: [],
          yData: [],
          yName: "销售额(元)"
        }
      }
    };
  },
  created() {
    getCensus().then(({ data }) => {
      //先对查询结果排序
      data.sort((a, b) => {
        return a.click_date - b.click_date;
      });
      data.forEach(({ money, num, click_date }) => {
        //销售量
        const dateStr = this.dateFomate(click_date);
        this.dataPushtoChart("sales", dateStr, num);
        //销售额
        this.dataPushtoChart("money", dateStr, money);
      });
    });
    getVisitAndRegister().then(({ data }) => {
      //先对查询结果排序
      data.sort((a, b) => {
        return a.click_date - b.click_date;
      });
      data.forEach(({ visit, register, click_date }) => {
        const dateStr = this.dateFomate(click_date);
        //访问量
        this.dataPushtoChart("visit", dateStr, visit);
        //注册量
        this.dataPushtoChart("register", dateStr, register);
      });
    });
    this.xData = this.chartData.register.xData;
    this.yData = this.chartData.register.yData;
    this.yName = this.chartData.register.yName;
  },
  methods: {
    fetchData() {},
    /*
     将单条数据push进入数组
     */
    dataPushtoChart(name, xData, yData) {
      this.chartData[name].xData.push(xData);
      this.chartData[name].yData.push(yData);
    },
    dateFomate(click_date) {
      console.log(click_date);
      const date = new Date(click_date);
      console.log(date.getTime());
      console.log(date);
      let dateStr =
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1) +
        "月" +
        date.getDate() +
        "日";
      return dateStr;
    },
    handleClick(tab, event) {
      const { name } = tab;
      this.xData = this.chartData[name].xData;
      this.yData = this.chartData[name].yData;
      this.yName = this.chartData[name].yName;
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    padding: 30px;
    background-color: rgb(240, 242, 245);
    position: relative;
    min-height: 100vh;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
}
</style>
