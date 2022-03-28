<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="姓名" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="提现状态" prop="auditStatus">
        <el-select
          v-model="queryParams.auditStatus"
          placeholder="请选择"
          style="width: 90%"
          clearable 
        >
          <el-option
            v-for="item in auditStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>


       <!-- <el-form-item label="创建日期" prop="rechargeTime">
        <el-date-picker clearable
          v-model="queryParams.rechargeTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择充值/提现时间">
        </el-date-picker>
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>



    <el-table v-loading="loading" :data="drawList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <!-- <el-table-column label="用户id" align="center" prop="userId" /> -->
      <el-table-column label="姓名" align="center" prop="userName" />
      <el-table-column label="手机号" align="center" prop="userPhone" />

      <el-table-column label="类型" align="center" prop="type" >
        <template slot-scope="scope">
            <span v-if="scope.row.type == 0">充值</span>
            <span v-if="scope.row.type == 1">提现</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center" prop="amount" />

      <el-table-column label="提现地址" align="center" prop="payType" >
        <template slot-scope="scope">
            <span v-if="scope.row.payType == 0">微信</span>
            <span v-if="scope.row.payType == 1">支付宝</span>
        </template>
      </el-table-column>

       <el-table-column label="状态" align="center" prop="auditStatus" >
        <template slot-scope="scope">
            <span v-if="scope.row.auditStatus == 0">待审核</span>
            <span v-if="scope.row.auditStatus == 1">审核通过</span>
        </template>
      </el-table-column>
      
      <!-- <el-table-column label="账户金额" align="center" prop="account" /> -->
      <el-table-column label="创建时间" align="center" prop="rechargeTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="类型0-充值1-提现" align="center" prop="type" /> -->
      <!-- <el-table-column label="状态0-成功1-待审核2-失败" align="center" prop="status" /> -->
      <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="audit(scope.row)"
            v-show="scope.row.auditStatus == 0"
            v-hasPermi="['system:draw:edit']"
          >审批</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:draw:remove']"
          >删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改积分充值/提现记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="冗余用户电话" prop="userPhone">
          <el-input v-model="form.userPhone" placeholder="请输入冗余用户电话" />
        </el-form-item>
        <el-form-item label="充值渠道0-微信1-支付宝" prop="channel">
          <el-input v-model="form.channel" placeholder="请输入充值渠道0-微信1-支付宝" />
        </el-form-item>
        <el-form-item label="充值/提现金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入充值/提现金额" />
        </el-form-item>
        <el-form-item label="账户金额" prop="account">
          <el-input v-model="form.account" placeholder="请输入账户金额" />
        </el-form-item>
        <el-form-item label="充值/提现时间" prop="rechargeTime">
          <el-date-picker clearable
            v-model="form.rechargeTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择充值/提现时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDraw, getDraw, delDraw, addDraw, updateDraw,audit } from "@/api/lingtu/draw";

export default {
  name: "Drawtx",
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
      // 积分充值/提现记录表格数据
      drawList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        userPhone: null,
        channel: null,
        amount: null,
        account: null,
        rechargeTime: null,
        type: null,
        status: null,
        type : '1'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "用户id不能为空", trigger: "blur" }
        ],
        channel: [
          { required: true, message: "充值渠道0-微信1-支付宝不能为空", trigger: "blur" }
        ],
        amount: [
          { required: true, message: "充值/提现金额不能为空", trigger: "blur" }
        ],
        account: [
          { required: true, message: "账户金额不能为空", trigger: "blur" }
        ],
      },

      auditStatusList: [
        {
          id: 0,
          name: "待审核",
        },
        {
          id: 1,
          name: "审核通过",
        },
      ],

    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询积分充值/提现记录列表 */
    getList() {
      this.loading = true;
      listDraw(this.queryParams).then(response => {
        this.drawList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        userId: null,
        userPhone: null,
        channel: null,
        amount: null,
        account: null,
        rechargeTime: null,
        type: null,
        status: "0",
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加积分充值/提现记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {

      this.reset();

      this.$modal.confirm('是否确认审批？').then(function() {
        
        const id = row.id || this.ids
        getDraw(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改积分充值/提现记录";
        });

      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("审批成功");
      }).catch(() => {});

     
      
    },
    
    /** 提现审批 **/
    audit(row){
      debugger
      let _this = this;
      row.auditStatus = '1';
      audit(row).then(response => {
        if(response.data == 0){
          this.$modal.msgError("提现失败，请查看三方支付余额！");
        }else{
          this.$modal.msgSuccess("审批成功");
        }
        _this.getList();
      });
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDraw(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDraw(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除积分充值/提现记录编号为"' + ids + '"的数据项？').then(function() {
        return delDraw(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/draw/export', {
        ...this.queryParams
      }, `draw_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
