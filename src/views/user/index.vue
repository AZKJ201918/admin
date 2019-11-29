<template>
  <div class="app-container">
    <el-button style="float: right;" type="primary" @click="showCreate">新增</el-button>
    <el-table ref="table" :data="userTable" style="width: 100%" v-loading="loading" border>
      <el-table-column label="账户id" width="80" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账户名" width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.rname}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope" :visible.sync="dialogVisible">
          <el-button type="warning" @click="showEidt(scope.row)">修改</el-button>
          <el-button type="danger" @click="showDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible">
      <el-form ref="form" :model="currentRow" :rules="rules" label-width="80px">
        <el-form-item label="账户名" prop="name">
          <el-input v-model="currentRow.name"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="currentRow.password"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="currentRow.rid" placeholder="请选择">
            <el-option
              v-for="role in roleArray"
              :key="role.rid"
              :label="role.rname"
              :value="role.rid"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllUser,
  insertUser,
  userExsits,
  deleteUser,
  updateUser,
  getAllRole
} from "@/api/user";
export default {
  data() {
    const validateName = async (rule, value, callback) => {
      if (!value) {
        callback(new Error("不能为空"));
      } else {
        if (this.originalName != value) {
          await userExsits(value).then(({ data }) => {
            if (data) {
              callback(new Error("用户名重复"));
            } else {
              callback();
            }
          });
        } else {
          callback();
        }
      }
    };
    return {
      userTable: null,
      loading: false,
      dialogVisible: false,
      currentRow: {},
      roleArray: [],
      rules: {
        name: [{ validator: validateName, trigger: "blur" }]
      },
      originalName: ""
    };
  },
  created() {
    this.fetchData();
    getAllRole().then(({ data }) => {
      this.roleArray = data;
    });
  },
  methods: {
    fetchData() {
      this.loading = true;
      getAllUser()
        .then(({ data }) => {
          this.userTable = data.list;
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    showEidt(row) {
      this.dialogVisible = true;
      row.password = "";
      this.currentRow = row;
      this.originalName = row.name;
      this.rid = "";
    },
    showCreate() {
      this.dialogVisible = true;
      this.currentRow = {
        name: "",
        password: "",
        rname: "",
        rid: ""
      };
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if ("id" in this.currentRow) {
            updateUser(this.currentRow).then(_ => {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              this.dialogVisible = false;
              this.fetchData();
            });
          } else {
            insertUser(this.currentRow).then(_ => {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              this.dialogVisible = false;
              this.fetchData();
            });
          }
        }
      });
    },
    showDelete(row) {
      this.$confirm("此操作将永久删除此用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser({ id: row.id, uid: row.uid }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>