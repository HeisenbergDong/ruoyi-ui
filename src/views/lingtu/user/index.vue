<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="姓名" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="电话号" prop="phonenumber">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="请输入电话号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <!-- <el-form-item label="身份证号" prop="idCard">
        <el-input
          v-model="queryParams.idCard"
          placeholder="请输入身份证号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="推荐人手机号" prop="refereePhone">
        <el-input
          v-model="queryParams.refereePhone"
          placeholder="请输入推荐人手机号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="注册时间" prop="registerTime">
        <el-date-picker clearable
          v-model="queryParams.registerTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择注册时间">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:user:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:user:edit']"
        >修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="dongjieUser"
          >冻结选中用户</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="jiedongUser"
          >解冻选中用户</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:user:export']"
        >导出</el-button> 
      </el-col>-->
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="userList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="编号" align="center" prop="id" /> -->
      <!-- <el-table-column label="头像" align="center" prop="image" width="100">
        <template slot-scope="scope">
          <img
            :src="'data:image/png;base64,' + scope.row.avatar"
            :width="50"
            :height="50"
          />
        </template>
      </el-table-column> -->

      <el-table-column label="姓名" align="center" prop="nickName" />
      <el-table-column label="手机号" align="center" prop="phonenumber" />
      <el-table-column label="身份证号" align="center" prop="userCard" />

      <el-table-column label="账号余额" align="center" prop="accBalance" />
      <el-table-column label="积分" align="center" prop="scoreBalance" />
      <el-table-column label="推荐人手机号" align="center" prop="recommend" />

      <el-table-column
        label="注册时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="头像url" align="center" prop="headerImage" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.headerImage" :width="50" :height="50"/>
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="推荐人手机号" align="center" prop="refereePhone" /> -->
      <!-- <el-table-column label="状态" align="center" prop="status" /> -->

      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">正常</span>
          <span v-if="scope.row.status == 1">冻结</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            v-if="scope.row.status == 0"
            @click="dongjie_jiedong(scope.row, '1')"
            v-hasPermi="['system:user:edit']"
            >冻结</el-button
          >

          <el-button
            size="mini"
            type="text"
            v-if="scope.row.status == 1"
            @click="dongjie_jiedong(scope.row, '0')"
            v-hasPermi="['system:user:edit']"
            >解冻</el-button
          >

          <el-button
            size="mini"
            type="text"
            @click="mygoods(scope.row)"
            v-hasPermi="['system:user:edit']"
            >藏品</el-button
          >

          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:user:remove']"
          >删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改APP登录用户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="电话号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话号" />
        </el-form-item>
        <el-form-item label="头像url">
          <image-upload v-model="form.headerImage" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="推荐人手机号" prop="refereePhone">
          <el-input
            v-model="form.refereePhone"
            placeholder="请输入推荐人手机号"
          />
        </el-form-item>
        <el-form-item label="注册时间" prop="registerTime">
          <el-date-picker
            clearable
            v-model="form.registerTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择注册时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" v-show="editStatus"
          >确 定</el-button
        >
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog
      title="藏品"
      :visible.sync="myGoods"
      width="1200px"
      append-to-body
    >
      <el-table
        v-loading="loading"
        :data="goodsList"
        
      >
        <el-table-column type="selection" width="55" align="center" />
        <!-- <el-table-column label="${comment}" align="center" prop="id" /> -->
        <!-- <el-table-column label="商品编码" align="center" prop="skuId" /> -->
        <el-table-column label="商品名称" align="center" prop="name" />

        <el-table-column
          label="商品主图"
          align="center"
          prop="image"
          width="100"
        >
          <template slot-scope="scope">
            <image-preview :src="scope.row.image" :width="50" :height="50" />
          </template>
        </el-table-column>

        <el-table-column label="商品分类" align="center" prop="goodsType">
          <template slot-scope="scope">
            <span>{{ converGoodsType(scope.row.goodsType) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="是否预售" align="center" prop="status">
          <template slot-scope="scope">
            <span v-if="scope.row.isPre == 0">否</span>
            <span v-if="scope.row.isPre == 1">是</span>
            <!-- <span v-if="scope.row.status == 2">未售</span>
              <span v-if="scope.row.status == 3">部分回收</span>
              <span v-if="scope.row.status == 4">全部回收</span> -->
          </template>
        </el-table-column>


        <el-table-column label="价格" align="center" prop="salePrice" />
        <el-table-column label="数量" align="center" prop="num" />


        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="huishouClick(scope.row)"
              >回收</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 回收dia -->
    <el-dialog
      title="藏品"
      :visible.sync="huishouDia"
      width="500px"
      append-to-body
    >

      <el-form ref="form" :model="form" :rules="rulesAdd" label-width="240px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="回收数量">
              <el-input v-model="huishouParam.goodsNum" placeholder="请输入" maxlength="8" oninput ="value=value.replace(/[^0-9]/g,'')" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="补偿金额（默认平台发售价）">
              <el-input v-model="huishouParam.goodsPrice" placeholder="请输入" maxlength="5" oninput ="value=value.replace(/[^\d]/g,'')"/>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="huishou">确认回收</el-button>
        <el-button @click="cancelHs">取 消</el-button>
      </div>

    </el-dialog>


  </div>
</template>

<script>
// import { listUser, getUser, delUser, addUser, updateUser } from "@/api/lingtu/user";
import {
  appUserslist,
  getUser,
  delUser,
  addUser,
  updateUser,
  resetUserPwd,
  changeUserStatus,
  dongjieUser,
  jiedongUser,
  huishou
} from "@/api/system/user";
import { listGoodsTemp } from "@/api/lingtu/goods";
import { listType } from "@/api/lingtu/type";

export default {
  name: "User",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // APP登录用户表格数据
      userList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined,
        userType: "11",
      },
      queryParamsType: {
        pageNum: 1,
        pageSize: 10,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        phone: [{ required: true, message: "电话号不能为空", trigger: "blur" }],
      },
      editStatus: true,
      myGoods: false,
      goodsList: [],
      // 商品类别表格数据
      typeList: [],
      huishouDia : false,
      huishouParam : {
        goodsPrice:0,
        goodsNum:0,
        goodsId:'',
      },
      userId:'',
    };
  },
  created() {
    this.getList();
    listType(this.queryParamsType).then((response) => {
      this.typeList = response.rows;
    });
  },
  methods: {
    /** 查询APP登录用户列表 */
    getList() {
      this.loading = true;
      appUserslist(this.queryParams).then((response) => {
        this.userList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 翻译商品类型
    converGoodsType(val) {
      debugger;
      if (this.typeList.length > 0) {
        for (let i = 0; i < this.typeList.length; i++) {
          if (val == this.typeList[i].typeKey) {
            return this.typeList[i].name;
          }
        }
      }
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.myGoods = false;
      this.huishouDia = false;
      this.reset();
    },

    // 取消按钮
    cancelHs() {
      this.huishouDia = false;
      this.reset();
    },

    // 表单重置
    reset() {
      this.form = {
        id: null,
        phone: null,
        headerImage: null,
        name: null,
        idCard: null,
        refereePhone: null,
        status: "0",
        registerTime: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      // this.ids = selection.map((item) => item.id);
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.editStatus = true;
      this.reset();
      this.open = true;
      this.title = "添加APP登录用户";
    },

    // 冻结-解冻
    dongjie_jiedong(row, val) {
      debugger;
      let valParam = {};
      valParam.userId = row.userId;
      valParam.status = val;

      updateUser(valParam).then((response) => {
        this.$modal.msgSuccess("操作成功");
        this.open = false;
        this.getList();
      });
    },

    // 回收商品-弹窗
    huishouClick(row) {
      debugger
      this.huishouParam.goodsNum = row.num;
      this.huishouParam.goodsPrice = row.salePrice;
      this.huishouParam.saleUser = row.saleUid;
      this.huishouParam.saleUid = row.saleUid;
      this.huishouParam.salePhone = row.salePhone;
      this.huishouParam.goodsId = row.id;

      this.huishouDia = true;
    },

    // 确认回收
    huishou(){

      // 校验必填
      if(undefined == this.huishouParam.goodsNum || '' == this.huishouParam.goodsNum){
        this.$modal.msgError("数量不允许为空！");
        return;
      }
      if(undefined == this.huishouParam.goodsPrice || '' == this.huishouParam.goodsPrice){
        this.$modal.msgError("金额不允许为空！");
        return;
      }
      let _this = this;

      this.$modal
        .confirm('是否确认回收？')
        .then(function () {
          debugger
          huishou(_this.huishouParam).then((response) => {
            _this.$modal.msgSuccess("回收成功");
            

            let goodsParam = {
              pageNum: 1,
              pageSize: 999,
              saleUid: _this.userId,
            };
            listGoodsTemp(goodsParam).then((response) => {
              _this.goodsList = response.rows;
            });
            _this.huishouDia = false;
            return true;
          });
          
        })
        .then(() => {
          // this.$modal.msgSuccess("回收成功");
        })
        .catch(() => {});
    },

    // 我的藏品
    mygoods(row) {
      this.myGoods = true;

      let goodsParam = {
        pageNum: 1,
        pageSize: 999,
        saleUid: row.userId,
      };
      this.userId = row.userId;
      listGoodsTemp(goodsParam).then((response) => {
        this.goodsList = response.rows;
        // this.total = response.total;
        // this.loading = false;
      });
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.editStatus = false;
      this.reset();
      const id = row.id || this.ids;
      getUser(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "详情";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateUser(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除APP登录用户编号为"' + ids + '"的数据项？')
        .then(function () {
          return delUser(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },



    /** 冻结选中用户 */
    dongjieUser(row) {
      debugger;
      const ids = row.id || this.ids;
      let param = {
        userIds : ids,
        status : 1,
      }
      let _this = this;
      this.$modal
        .confirm('是否冻结选中用户？')
        .then(function () {
          debugger
          // 冻结用户
          dongjieUser(param).then((response) => {
            _this.getList();
            _this.$modal.msgSuccess("操作成功");
          });
          return true;
        })
        .then(() => {
          
        })
        .catch(() => {});
    },



    /** 解冻选中用户 */
    jiedongUser(row) {
       debugger;
      const ids = row.id || this.ids;
      let param = {
        userIds : ids,
        status : 0,
      }
      let _this = this;
      this.$modal
        .confirm('是否解冻选中用户？')
        .then(function () {
          debugger
          // 冻结用户
          dongjieUser(param).then((response) => {
            _this.getList();
            _this.$modal.msgSuccess("操作成功");
          });
          return true;
        })
        .then(() => {
        })
        .catch(() => {});
    },




    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/user/export",
        {
          ...this.queryParams,
        },
        `user_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
