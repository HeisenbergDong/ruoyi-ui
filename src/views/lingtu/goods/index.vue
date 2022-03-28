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
      <el-form-item label="商品名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="商品分类" prop="goodsType">
        <el-select
          v-model="queryParams.goodsType"
          placeholder="请选择"
          style="width: 90%"
          clearable 
        >
          <el-option
            v-for="item in goodsTypeList"
            :key="item.typeKey"
            :label="item.name"
            :value="item.typeKey"
          >
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="是否预售" prop="isPre">
        <el-select
          v-model="queryParams.isPre"
          placeholder="请选择"
          @change="statusChange"
          clearable
          style="width: 90%"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>




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
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:goods:add']"
          >新增</el-button
        >
      </el-col>

      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="goodsList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="${comment}" align="center" prop="id" /> -->
      <!-- <el-table-column label="商品编码" align="center" prop="skuId" /> -->
      <el-table-column label="商品哈希" align="center" prop="skuId" width="150px"/>
      <el-table-column label="商品名称" align="center" prop="name" />

      <el-table-column label="商品主图" align="center" prop="image" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.image" :width="50" :height="50" />
        </template>
      </el-table-column>

      <el-table-column label="商品分类" align="center" prop="goodsType">
        <template slot-scope="scope">
          <span>{{ converGoodsType(scope.row.goodsType) }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="商品类型" align="center" prop="status" /> -->

      <!-- <el-table-column label="商品类型" align="center" prop="status">
          <template slot-scope="scope">
              <span v-if="scope.row.status == 0">在售</span>
              <span v-if="scope.row.status == 1">预售</span>
              <span v-if="scope.row.status == 2">未售</span>
              <span v-if="scope.row.status == 3">部分回收</span>
              <span v-if="scope.row.status == 4">全部回收</span>
          </template>
      </el-table-column> -->
      <el-table-column label="是否预售" align="center" prop="isPre">
        <template slot-scope="scope">
          <span v-if="scope.row.isPre == 0">否</span>
          <span v-if="scope.row.isPre == 1">是</span>
          <!-- <span v-if="scope.row.status == 2">未售</span>
              <span v-if="scope.row.status == 3">部分回收</span>
              <span v-if="scope.row.status == 4">全部回收</span> -->
        </template>
      </el-table-column>

      <el-table-column
        label="预售时间"
        align="center"
        prop="preTime"
        width="150px"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.isPre == 0"></span>
          <span v-if="scope.row.isPre == 1">{{
            parseTime(scope.row.preTime, "{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column
        label="预售时间"
        align="center"
        prop="preTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.preTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="原价" align="center" prop="basePrice" />
      <el-table-column label="折扣价格" align="center" prop="salePrice" />
      <el-table-column label="限购数量" align="center" prop="limitNum" />
      <el-table-column label="库存" align="center" prop="num" />
      <el-table-column label="上架状态" align="center" prop="isSale">
        <template slot-scope="scope">
          <span v-if="scope.row.isSale == 0">未上架</span>
          <span v-if="scope.row.isSale == 1">已上架</span>
        </template>
      </el-table-column>


      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:goods:edit']"
            >修改</el-button
          >
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:goods:remove']"
            >删除</el-button
          > -->
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

    <!-- 添加或修改商品对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px">
      <el-form ref="form" :model="form" :rules="rulesAdd" label-width="120px">
        <el-row>
          <!-- <el-form-item label="商品唯一编码" prop="skuId">
          <el-input v-model="form.skuId" placeholder="请输入商品唯一编码" />
        </el-form-item> -->
          <el-col :span="24">
            <el-form-item label="商品名称" prop="name">
              <el-input
                v-model="form.name"
                type="textarea"
                placeholder="请输入内容"
                maxlength="20"

              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="商品主图">
              <image-upload v-model="form.image" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="商品子图">
              <image-upload v-model="form.imageSon" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="是否预售" prop="isPre">
              <!-- <el-input v-model="form.status" /> -->
              <el-select
                v-model="form.isPre"
                placeholder="请选择"
                @change="statusChange"
                style="width: 90%"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="12">
            <el-form-item label="预售时间" prop="preTime" v-show="statusSow">
              <el-date-picker
                clearable
                v-model="form.preTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择预售时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col> -->
          <el-col :span="24">
            <el-form-item label="预售时间" prop="preTime" v-show="statusSow">
              <el-date-picker
                v-model="form.preTime"
                type="datetime"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="商品分类" prop="goodsType">
              <!-- <el-input v-model="form.status" /> -->
              <el-select
                v-model="form.goodsType"
                placeholder="请选择"
                style="width: 90%"
              >
                <el-option
                  v-for="item in goodsTypeList"
                  :key="item.typeKey"
                  :label="item.name"
                  :value="item.typeKey"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="原价" prop="basePrice">
              <el-input v-model="form.basePrice" placeholder="请输入" maxlength="8" oninput ="value=value.replace(/[^0-9.]/g,'')" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="折扣价格" prop="salePrice">
              <el-input v-model="form.salePrice" placeholder="请输入" maxlength="8"  oninput ="value=value.replace(/[^0-9.]/g,'')"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="库存" prop="num">
              <el-input v-model="form.num" placeholder="请输入" maxlength="8" oninput ="value=value.replace(/[^\d]/g,'')"  />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="限购数量" prop="limitNum">
              <el-input v-model="form.limitNum" placeholder="请输入" maxlength="5" oninput ="value=value.replace(/[^\d]/g,'')"/>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="12">
            <el-form-item label="存证哈希" prop="aaa">
              <el-input v-model="form.aaa" />
            </el-form-item>
          </el-col> -->

          <el-col :span="12">
            <el-form-item label="上架状态" prop="isSale">
              <el-radio v-model="form.isSale" label="0">未上架</el-radio>
              <el-radio v-model="form.isSale" label="1">已上架</el-radio>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="商品哈希" prop="isSale">
              <span>{{form.skuId}}</span>
            </el-form-item>
          </el-col>

          

          <el-col :span="24">
            <el-form-item label="商品介绍">
              <editor v-model="form.introduce" :min-height="300" />
            </el-form-item>
          </el-col>
        </el-row>
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
  listGoods,
  getGoods,
  delGoods,
  addGoods,
  updateGoods,
} from "@/api/lingtu/goods";
import { listType } from "@/api/lingtu/type";

export default {
  name: "Goods",
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
      // 商品表格数据
      goodsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        isScore: "0",
        isSaled: "0",
        
        status: 0,
        obtainType : '0'
      },
      // 查询参数
      queryParamsTemp: {
        pageNum: 1,
        pageSize: 100,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      rulesAdd: {
        name :[{required: true, message: '请输入', trigger: 'blur'}],
        isPre :[{required: true, message: '请输入', trigger: 'blur'}],
        goodsType :[{required: true, message: '请输入', trigger: 'blur'}],
        basePrice :[{required: true, message: '请输入', trigger: 'blur'}],
        salePrice :[{required: true, message: '请输入', trigger: 'blur'}],
        num :[{required: true, message: '请输入', trigger: 'blur'}],
        limitNum :[{required: true, message: '请输入', trigger: 'blur'}],
      },

      statusOptions: [
        {
          value: "0",
          label: "否",
        },
        {
          value: "1",
          label: "是",
        },
      ],

      goodsTypeList: [],
      statusSow: false,
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
    /** 查询商品列表 */
    getList() {
      this.loading = true;
      listGoods(this.queryParams).then((response) => {
        this.goodsList = response.rows;
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
        skuId: null,
        name: null,
        image: null,
        introduce: null,
        activityIntroduce: null,
        resalePrice: null,
        salePrice: null,
        basePrice: null,
        scorePrice: null,
        isSale: null,
        num: null,
        isLimit: null,
        qrCode: null,
        goodsType: null,
        status: 0,
        preTime: null,
        endTime: null,
        isSaled: null,
        saleUser: null,
        obtainType: null,
        isScore: null,
        score: null,
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

    statusChange() {
      if (this.form.isPre == 0) {
        this.statusSow = false;
        // this.form.preTime = '';
      } else if (this.form.isPre == 1) {
        this.statusSow = true;
      }
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
      this.form.isSale = "1";
      this.open = true;
      this.title = "添加商品";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      if (row.isPre == 0) {
        this.statusSow = false;
        // this.form.preTime = '';
      } else if (row.isPre == 1) {
        this.statusSow = true;
      }

      this.reset();
      const id = row.id || this.ids;
      getGoods(id).then((response) => {
        this.form = response.data;
        this.form.isSale = String(this.form.isSale);
        this.open = true;
        this.title = "修改商品";
      });
    },
    /** 提交按钮 */
    submitForm() {
      // 校验
      if(undefined == this.form.image || '' == this.form.image || undefined == this.form.imageSon || '' == this.form.imageSon ){
        this.$modal.msgError("请上传商品图片");
        return;
      }
      // 是否预售
      if(this.form.isPre == 1 && (this.form.preTime == undefined || this.form.preTime == '')){
        this.$modal.msgError("请选择预售时间");
        return;
      }

      this.form.isScore = 0; // 是否积分兑换 0不是
      this.form.isSaled = 0; // 是否二次销售商品 0 不是
      if (this.form.isPre == 0) {
        this.form.preTime = "";
      }
      this.form.obtainType = "0";

      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateGoods(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addGoods(this.form).then((response) => {
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
        .confirm('是否确认删除商品编号为"' + ids + '"的数据项？')
        .then(function () {
          return delGoods(ids);
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
        "system/goods/export",
        {
          ...this.queryParams,
        },
        `goods_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
