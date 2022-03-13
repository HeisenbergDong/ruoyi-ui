<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="姓名" prop="purchaseName">
        <el-input
          v-model="queryParams.purchaseName"
          placeholder="请输入"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="电话" prop="purchasePhone">
        <el-input
          v-model="queryParams.purchasePhone"
          placeholder="请输入"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="购买时间" prop="purchaseTime">
        <el-date-picker clearable
          v-model="queryParams.purchaseTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择购买时间">
        </el-date-picker>
      </el-form-item>

      <!-- <el-form-item label="商品id" prop="goodsId">
        <el-input
          v-model="queryParams.goodsId"
          placeholder="请输入商品id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="买家id" prop="purchaseId">
        <el-input
          v-model="queryParams.purchaseId"
          placeholder="请输入买家id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="买家电话" prop="purchasePhone">
        <el-input
          v-model="queryParams.purchasePhone"
          placeholder="请输入买家电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="卖家id" prop="saleUser">
        <el-input
          v-model="queryParams.saleUser"
          placeholder="请输入卖家id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="卖家电话冗余的" prop="salePhone">
        <el-input
          v-model="queryParams.salePhone"
          placeholder="请输入卖家电话冗余的"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="购买时间" prop="purchaseTime">
        <el-date-picker clearable
          v-model="queryParams.purchaseTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择购买时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="购买价格" prop="goodsPrice">
        <el-input
          v-model="queryParams.goodsPrice"
          placeholder="请输入购买价格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手续费额度" prop="fee">
        <el-input
          v-model="queryParams.fee"
          placeholder="请输入手续费额度"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="购买数量" prop="goodsNum">
        <el-input
          v-model="queryParams.goodsNum"
          placeholder="请输入购买数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付id" prop="payCode">
        <el-input
          v-model="queryParams.payCode"
          placeholder="请输入支付id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-row :gutter="10" class="mb8"> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:order:add']"
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
          v-hasPermi="['system:order:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:order:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:order:export']"
        >导出</el-button>
      </el-col> -->
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->

    <el-table v-loading="loading" :data="orderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单标号" align="center" prop="id" />
<el-table-column label="买家姓名" align="center" prop="purchaseId" />
<el-table-column label="买家手机" align="center" prop="purchaseId" />
 <el-table-column label="商品名称" align="center" prop="goodsName" />
<el-table-column label="商品分类" align="center" prop="goodsName" />
<el-table-column label="支付方式" align="center" prop="goodsName" />
<el-table-column label="购买单价" align="center" prop="goodsName" />
<el-table-column label="实收款" align="center" prop="goodsName" />
<el-table-column label="购买数量" align="center" prop="goodsName" />

<el-table-column label="购买时间" align="center" prop="purchaseTime" width="150px">
    <template slot-scope="scope">
        <span >{{ parseTime(scope.row.purchaseTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
    </template>
</el-table-column>




      <!-- <el-table-column label="商品id" align="center" prop="goodsId" />
      <el-table-column label="买家id" align="center" prop="purchaseId" />
      <el-table-column label="买家电话" align="center" prop="purchasePhone" />
      <el-table-column label="卖家id" align="center" prop="saleUser" />
      <el-table-column label="卖家电话冗余的" align="center" prop="salePhone" />
      <el-table-column label="购买时间" align="center" prop="purchaseTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.purchaseTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="购买价格" align="center" prop="goodsPrice" />
      <el-table-column label="手续费额度" align="center" prop="fee" />
      <el-table-column label="购买数量" align="center" prop="goodsNum" />
      <el-table-column label="商品名称，冗余" align="center" prop="goodsName" />
      <el-table-column label="支付方式0-微信1-支付宝2-积分" align="center" prop="payType" />
      <el-table-column label="订单类型0-正常1-积分购买2-回收3-转赠" align="center" prop="orderType" />
      <el-table-column label="订单状态0-成功1-失败2-退款" align="center" prop="orderStatus" />
      <el-table-column label="支付id" align="center" prop="payCode" />
      <el-table-column label="备注" align="center" prop="remark" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:order:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:order:remove']"
          >删除</el-button>
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

    <!-- 添加或修改订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="商品id" prop="goodsId">
          <el-input v-model="form.goodsId" placeholder="请输入商品id" />
        </el-form-item>
        <el-form-item label="买家id" prop="purchaseId">
          <el-input v-model="form.purchaseId" placeholder="请输入买家id" />
        </el-form-item>
        <el-form-item label="买家电话" prop="purchasePhone">
          <el-input v-model="form.purchasePhone" placeholder="请输入买家电话" />
        </el-form-item>
        <el-form-item label="卖家id" prop="saleUser">
          <el-input v-model="form.saleUser" placeholder="请输入卖家id" />
        </el-form-item>
        <el-form-item label="卖家电话冗余的" prop="salePhone">
          <el-input v-model="form.salePhone" placeholder="请输入卖家电话冗余的" />
        </el-form-item>
        <el-form-item label="购买时间" prop="purchaseTime">
          <el-date-picker clearable
            v-model="form.purchaseTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择购买时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="购买价格" prop="goodsPrice">
          <el-input v-model="form.goodsPrice" placeholder="请输入购买价格" />
        </el-form-item>
        <el-form-item label="手续费额度" prop="fee">
          <el-input v-model="form.fee" placeholder="请输入手续费额度" />
        </el-form-item>
        <el-form-item label="购买数量" prop="goodsNum">
          <el-input v-model="form.goodsNum" placeholder="请输入购买数量" />
        </el-form-item>
        <el-form-item label="商品名称，冗余" prop="goodsName">
          <el-input v-model="form.goodsName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="支付id" prop="payCode">
          <el-input v-model="form.payCode" placeholder="请输入支付id" />
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
import { listOrder, getOrder, delOrder, addOrder, updateOrder } from "@/api/lingtu/order";

export default {
  name: "Order",
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
      // 订单表格数据
      orderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        goodsId: null,
        purchaseId: null,
        purchasePhone: null,
        saleUser: null,
        salePhone: null,
        purchaseTime: null,
        goodsPrice: null,
        fee: null,
        goodsNum: null,
        goodsName: null,
        payType: null,
        orderType: null,
        orderStatus: null,
        payCode: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        goodsId: [
          { required: true, message: "商品id不能为空", trigger: "blur" }
        ],
        purchaseId: [
          { required: true, message: "买家id不能为空", trigger: "blur" }
        ],
        purchasePhone: [
          { required: true, message: "买家电话不能为空", trigger: "blur" }
        ],
        saleUser: [
          { required: true, message: "卖家id不能为空", trigger: "blur" }
        ],
        salePhone: [
          { required: true, message: "卖家电话冗余的不能为空", trigger: "blur" }
        ],
        purchaseTime: [
          { required: true, message: "购买时间不能为空", trigger: "blur" }
        ],
        goodsPrice: [
          { required: true, message: "购买价格不能为空", trigger: "blur" }
        ],
        fee: [
          { required: true, message: "手续费额度不能为空", trigger: "blur" }
        ],
        goodsNum: [
          { required: true, message: "购买数量不能为空", trigger: "blur" }
        ],
        goodsName: [
          { required: true, message: "商品名称，冗余不能为空", trigger: "blur" }
        ],
        payType: [
          { required: true, message: "支付方式0-微信1-支付宝2-积分不能为空", trigger: "change" }
        ],
        orderType: [
          { required: true, message: "订单类型0-正常1-积分购买2-回收3-转赠不能为空", trigger: "change" }
        ],
        orderStatus: [
          { required: true, message: "订单状态0-成功1-失败2-退款不能为空", trigger: "blur" }
        ],
        payCode: [
          { required: true, message: "支付id不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询订单列表 */
    getList() {
      this.loading = true;
      this.queryParams.orderType = 0;
      listOrder(this.queryParams).then(response => {
        this.orderList = response.rows;
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
        goodsId: null,
        purchaseId: null,
        purchasePhone: null,
        saleUser: null,
        salePhone: null,
        purchaseTime: null,
        goodsPrice: null,
        fee: null,
        goodsNum: null,
        goodsName: null,
        payType: null,
        orderType: null,
        orderStatus: "0",
        payCode: null,
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
      this.title = "添加订单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOrder(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改订单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateOrder(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOrder(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除订单编号为"' + ids + '"的数据项？').then(function() {
        return delOrder(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/order/export', {
        ...this.queryParams
      }, `order_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
