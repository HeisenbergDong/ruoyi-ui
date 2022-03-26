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
      <el-form-item label="买家姓名" prop="purchaseName">
        <el-input
          v-model="queryParams.purchaseName"
          placeholder="请输入"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="买家电话" prop="purchasePhone">
        <el-input
          v-model="queryParams.purchasePhone"
          placeholder="请输入"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="卖家姓名" prop="saleName">
        <el-input
          v-model="queryParams.saleName"
          placeholder="请输入"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="卖家电话" prop="salePhone">
        <el-input
          v-model="queryParams.salePhone"
          placeholder="请输入"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="订单类型" prop="orderType">
        <el-select
          v-model="queryParams.orderType"
          placeholder="请选择"
          clearable
          style="width: 90%"
        >
          <el-option
            v-for="item in orderTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="创建时间" prop="purchaseTime">
        <el-date-picker
          clearable
          v-model="queryParams.purchaseTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择购买时间"
        >
        </el-date-picker>
      </el-form-item> -->

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

    <el-table
      v-loading="loading"
      :data="orderList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单编号" align="center" prop="id" />
      <el-table-column label="买家姓名" align="center" prop="purchaseName" />
      <el-table-column label="买家手机" align="center" prop="purchasePhone" width="110px"/>
      <el-table-column label="卖家姓名" align="center" prop="saleName" />
      <el-table-column label="卖家手机" align="center" prop="salePhone" width="110px"/>

      <el-table-column label="商品名称" align="center" prop="goodsName" width="150px"/>

      <el-table-column label="商品分类" align="center" prop="goods.goodsType">
        <template slot-scope="scope">
          <span>{{ converGoodsType(scope.row.goods.goodsType) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="支付方式" align="center" prop="payType">
        <template slot-scope="scope">
          <span v-if="scope.row.payType == 0">微信</span>
          <span v-if="scope.row.payType == 1">支付宝</span>
          <span v-if="scope.row.payType == 2">积分</span>
          <span v-if="scope.row.payType == 3">账户</span>
          <span v-if="scope.row.payType == 4">盲盒</span>
        </template>
      </el-table-column>

      <el-table-column label="订单类型" align="center" prop="orderType">
        <template slot-scope="scope">
          <span v-if="scope.row.orderType == 0">正常</span>
          <span v-if="scope.row.orderType == 1">积分购买</span>
          <span v-if="scope.row.orderType == 2">回收</span>
          <span v-if="scope.row.orderType == 3">转增</span>
          <span v-if="scope.row.orderType == 4">转卖</span>
          <span v-if="scope.row.orderType == 5">盲盒打开</span>
        </template>
      </el-table-column>

      <el-table-column label="订单状态" align="center" prop="orderStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.orderStatus == 0">成功</span>
          <span v-if="scope.row.orderStatus == 1">取消</span>
          <span v-if="scope.row.orderStatus == 2">退款</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="转增状态" align="center" prop="orderStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.userGiveLog.status == 0">未领取</span>
          <span v-if="scope.row.userGiveLog.status == 1">已领取</span>
          <span v-if="scope.row.userGiveLog.status == 2">已取消</span>
        </template>
      </el-table-column> -->

      <el-table-column label="购买价格" align="center" prop="goodsPrice" />
      <el-table-column label="手续费" align="center" prop="fee" />
      <el-table-column label="数量" align="center" prop="goodsNum" />

      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="150px"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.createTime, "{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>
<!-- 
      <el-table-column
        label="领取时间"
        align="center"
        prop="purchaseTime"
        width="150px"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.purchaseTime, "{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column> -->

    </el-table>

    <pagination
      v-show="total > 0"
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
          <el-input
            v-model="form.salePhone"
            placeholder="请输入卖家电话冗余的"
          />
        </el-form-item>
        <el-form-item label="购买时间" prop="purchaseTime">
          <el-date-picker
            clearable
            v-model="form.purchaseTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择购买时间"
          >
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
          <el-input
            v-model="form.goodsName"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="支付id" prop="payCode">
          <el-input v-model="form.payCode" placeholder="请输入支付id" />
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
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listOrder,
  getOrder,
  delOrder,
  addOrder,
  updateOrder,
} from "@/api/lingtu/order";

import { listType } from "@/api/lingtu/type";

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
        
        
      },
      goodsTypeList: [],
      orderTypeOptions: [
        {
          value: "0",
          label: "正常",
        },
        {
          value: "1",
          label: "积分购买",
        },
        {
          value: "2",
          label: "回收",
        },
        {
          value: "3",
          label: "转增",
        },
        {
          value: "4",
          label: "转卖",
        },
        {
          value: "5",
          label: "盲盒",
        },
      ],

    };
  },
  created() {
    this.getList();
    // 商品类型
    listType(this.queryParamsTemp).then((response) => {
      this.goodsTypeList = response.rows;
    });
  },
  methods: {
    /** 查询订单列表 */
    getList() {
      this.loading = true;
      // this.queryParams.orderType = 0;
      listOrder(this.queryParams).then((response) => {
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

    // 翻译商品类型
    converGoodsType(val) {
      debugger;
      if (this.goodsTypeList.length > 0) {
        for (let i = 0; i < this.goodsTypeList.length; i++) {
          if (val == this.goodsTypeList[i].typeKey) {
            return this.goodsTypeList[i].name;
          }
        }
      }
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
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
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
      const id = row.id || this.ids;
      getOrder(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改订单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateOrder(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOrder(this.form).then((response) => {
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
        .confirm('是否确认删除订单编号为"' + ids + '"的数据项？')
        .then(function () {
          return delOrder(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/order/export",
        {
          ...this.queryParams,
        },
        `order_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
