<template>
  <div class="app-container">
    <el-form :inline="true" size="mini" :model="searchObj" class="demo-form-inline">
      <el-date-picker
        v-model="searchTime"
        type="datetimerange"
        size="mini"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-form-item label="订单状态">
        <el-select v-model="searchObj.status" placeholder="请选择">
          <el-option v-for="(item, index) in typeArray" :key="index" :label="item" :value="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单号">
        <el-input v-model="searchObj.orderid" placeholder="订单号"></el-input>
      </el-form-item>
      <el-button size="mini" @click="fetchData">搜索</el-button>
    </el-form>
    <el-table ref="table" :data="orderTable" style="width: 100%" v-loading="loading" border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div>
            <el-form label-position="left" inline>
              <el-form-item
                :label="'购买商品' + (index+1)"
                v-for="(item,index) in scope.row.cidAndNum"
                :key="index"
              >
                <el-image style="width: 30px; height: 30px" :src="item.commodity.url" :fit="'fill'"></el-image>
                <span>{{ item.commodity.name }}&nbsp;&nbsp;</span>X
                <span>&nbsp;&nbsp;{{ item.num }}</span>
              </el-form-item>
            </el-form>
            <el-form label-position="left" inline>
              <el-form-item label="收货人">{{scope.row.address.name}}</el-form-item>
              <el-form-item label="联系电话">{{scope.row.address.phone}}</el-form-item>
              <el-form-item
                label="收获地址"
              >{{scope.row.address.province}}{{scope.row.address.city}}{{scope.row.address.area}}{{scope.row.address.detail}}</el-form-item>
            </el-form>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="orderid" label="订单号" width="160" align="center"></el-table-column>
      <el-table-column prop="createtime" label="下单时间" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createtime | timeFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="finalprice" label="支付价格" width="160" align="center"></el-table-column>
      <el-table-column label="订单状态" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.status | status}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 2" @click="deliver(scope.row)">发货</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      hide-on-single-page
      :current-page.sync="currentPage"
      :page-count="totalPage"
      @current-change="fetchData"
    ></el-pagination>
    <el-dialog :visible.sync="showSendForm">
      <el-form ref="form" :model="sendForm" label-width="80px">
        <el-form-item label="物流公司">
          <el-select v-model="sendForm.company" placeholder="请选择">
            <el-option v-for="(item) in companyArray" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号">
          <el-input v-model="sendForm.courier"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSendForm = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllOrder, updateOrder } from "@/api/order";
export default {
  data() {
    return {
      orderTable: [],
      loading: false,
      searchObj: {
        orderid: null,
        status: null,
        endtime: null,
        starttime: null
      },
      searchTime: [],
      typeArray: ["已取消", "待付款", "待发货", "待收货", "待评价", "可追评"],
      companyArray: [
        "顺丰",
        "圆通",
        "中通",
        "韵达",
        "申通",
        "百世汇通",
        "天天",
        "德邦"
      ],
      currentPage: 1,
      totalPage: 0,
      showSendForm: false,
      sendForm: { company: "", courier: "" },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  watch: {
    searchTime: {
      handler(newVal) {
        this.searchObj.starttime = newVal[0];
        this.searchObj.endtime = newVal[1];
      },
      deep: true
    }
  },
  filters: {
    status(val) {
      const typeArray = [
        "已取消",
        "待付款",
        "待发货",
        "待收货",
        "待评价",
        "可追评"
      ];
      return typeArray[val];
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    deliver(row) {
      this.showSendForm = true;
      this.sendForm.id = row.id;
      this.sendForm.orderid = row.orderid;
    },
    fetchData() {
      this.loading = true;
      getAllOrder(this.searchObj, this.currentPage)
        .then(({ data }) => {
          this.orderTable = data.list;
          this.currentPage = data.pageNum;
          this.totalPage = data.pages;
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    save() {
      this.sendForm.status = 3;
      updateOrder(this.sendForm).then(({ data }) => {
        this.$message({
          type: "success",
          message: "成功"
        });
        this.fetchData();
        this.showSendForm = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>