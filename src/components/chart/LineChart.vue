<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons");
export default {
  props: {
    xData: {
      type: Array
    },
    yData: {
      type: Array
    },
    yName: {
      type: String
    },
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    }
  },
  data() {
    return {
      chartData: {}
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  watch: {
    xData: {
      deep: true,
      handler(val) {
        this.$nextTick(_ => {
          this.setOptions()
        })
      }
    },
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions();
    },
    setOptions() {
      this.chart.setOption({
        tooltip: {
          show: true,
          trigger: "axis"
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: this.xData
        },
        yAxis: {
          name: this.yName,
          type: "value"
        },
        legend: {
          data: ["expected", "actual"]
        },
        series: [
          {
            data: this.yData,
            type: "line",
            smooth: false,
            name: this.yName,
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2
                }
              }
            },
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          }
        ]
      });
    }
  }
};
</script>

<style>
</style>