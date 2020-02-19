<template>
  <div class="app-container">
    <el-form :inline="true" size="mini" :model="searchObj" class="search-form">
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
      <el-form-item label="用户昵称">
        <el-input class="short" v-model="searchObj.nickname" placeholder="用户昵称"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input class="short" v-model="searchObj.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input class="short" v-model="searchObj.phone" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="上级id">
        <el-input class="short" v-model="searchObj.superiorid" placeholder="上级id"></el-input>
      </el-form-item>
      <el-button size="mini" @click="fetchData">搜索</el-button>
    </el-form>
    <el-table ref="table" :data="table" style="width: 100%" v-loading="loading" border>
      <el-table-column style="font-size: 10px" prop="uuid" label="id" width="80" align="center"></el-table-column>
      <el-table-column label="头像" width="80" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.headimgurl" style="width: 50px;height: 50px" />
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="100" align="center"></el-table-column>
      <el-table-column label="会员等级" width="80" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.member === 0? (scope.row.isretail === 1 ? '代言人': (scope.row.idcard?'普通会员':'无') ): scope.row.member === 1? 'vip代言人' :'金牌代言人'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="100" align="center"></el-table-column>
      <el-table-column prop="idcard" label="身份证号" width="120" align="center"></el-table-column>
      <el-table-column prop="bankid" label="银行卡号" width="120" align="center"></el-table-column>
      <el-table-column prop="retailmoney" label="拥有佣金" width="70" align="center"></el-table-column>
      <el-table-column prop="createtime" label="最后登录时间" width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createtime | dateFormate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="beforetime" label="上上次登录时间" width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.beforetime | dateFormate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="累计登录次数" width="70" align="center"></el-table-column>
      <el-table-column prop="createtime" label="操作" width="140" align="center">
        <template slot-scope="scope">
          <el-button @click="searchNext(scope.row.uuid)">查看下级</el-button>
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
  </div>
</template>

<script>
import { getWxUser } from "@/api/wxUser";
export default {
  filters: {
    dateFormate(dateStr) {
      if (!dateStr) return '无'
      var dt = new Date(dateStr);

      // yyyy-mm-dd
      var y = dt.getFullYear();
      var m = (dt.getMonth() + 1).toString().padStart(2, "0");
      var d = dt
        .getDate()
        .toString()
        .padStart(2, "0");

      var hh = dt.getHours();
      var mm = dt
        .getMinutes()
        .toString()
        .padStart(2, "0");
      var ss = dt
        .getSeconds()
        .toString()
        .padStart(2, "0");
      // return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
      return `${y}-${m}-${d}`;
    }
  },
  data() {
    return {
      table: [],
      loading: false,
      searchObj: {
        nickname: null,
        name: null,
        endtime: null,
        starttime: null,
        superiorid: null,
        phone: null
      },
      searchTime: [],
      currentPage: 0,
      totalPage: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近三天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit("pick", [start, end]);
            }
          },
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
  methods: {
    fetchData() {
      this.loading = true;
      const searchObj = {};
      for (let key in this.searchObj) {
        if (this.searchObj[key]) {
          searchObj[key] = this.searchObj[key];
        }
      }
      getWxUser(searchObj, this.currentPage)
        .then(({ data }) => {
          this.table = data.list;
          this.currentPage = data.pageNum;
          this.totalPage = data.pages;
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    /**
     * 查看下级
     */
    searchNext(id) {
      this.searchObj = {
        superiorid: id
      };
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.search-form {
  .short {
    width: 95px;
  }
}
div {
  font-size: 13px;
}
</style>