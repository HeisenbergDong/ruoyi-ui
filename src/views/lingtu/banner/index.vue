<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input
          v-model="queryParams.sort"
          placeholder="请输入排序"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否展示" prop="isShow">
        <el-input
          v-model="queryParams.isShow"
          placeholder="请输入是否展示"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="banner关联的商品id" prop="goodsId">
        <el-input
          v-model="queryParams.goodsId"
          placeholder="请输入banner关联的商品id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> 
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>-->
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:banner:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:banner:edit']"
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
          v-hasPermi="['system:banner:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:banner:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="bannerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="标题" align="center" prop="title" />
      <el-table-column label="图片" align="center" prop="imageUrl" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.imageUrl" :width="50" :height="50"/>
        </template>
      </el-table-column>

      <!-- <el-table-column label="类型" align="center" prop="bannerType" /> -->
       <el-table-column label="类型" align="center" prop="bannerType">
          <template slot-scope="scope">
              <span v-if="scope.row.bannerType == 0">推广广告</span>
              <span v-if="scope.row.bannerType == 1">商品广告</span>
          </template>
      </el-table-column>

      <!-- <el-table-column label="位置" align="center" prop="bannerPosition" /> -->
      <el-table-column label="位置" align="center" prop="bannerPosition">
          <template slot-scope="scope">
              <span v-if="scope.row.bannerPosition == 0">首页</span>
              <span v-if="scope.row.bannerPosition == 1">搜索页</span>
          </template>
      </el-table-column>
      
      <!-- <el-table-column label="是否展示" align="center" prop="isShow" /> -->
      <el-table-column label="是否展示" align="center" prop="isShow">
          <template slot-scope="scope">
              <span v-if="scope.row.isShow == 0">是</span>
              <span v-if="scope.row.isShow == 1">否</span>
          </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:banner:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:banner:remove']"
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

    <!-- 添加或修改首页banner对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>

        <el-form-item label="商品主图">
          <image-upload v-model="form.imageUrl" />
        </el-form-item>

        <el-form-item label="是否展示" prop="isShow">
          <el-radio-group v-model="isShow" >
           <el-radio  label="0">是</el-radio>
           <el-radio  label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="banner位置" prop="bannerPosition">
          <el-radio-group v-model="bannerPosition" >
            <el-radio label="0">首页</el-radio>
            <el-radio label="1">搜索页</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="banner类型" prop="bannerType" >
          <el-radio-group v-model="bannerType" @change="bannerTypeChange">
           <el-radio  label="0">推广广告</el-radio>
           <el-radio  label="1">商品广告</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="关联商品" prop="goodsId" v-show="goodsShow">
            <el-select v-model="form.goodsId" placeholder="请选择">
              <el-option
                v-for="item in goodsList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>




        <el-form-item label="banner文字描述" prop="text" v-show="showText">
          <!-- <el-input v-model="form.text" type="textarea" placeholder="请输入内容" /> -->
          <editor v-model="form.text"  :min-height="400" />
        </el-form-item>

        <!-- <el-form-item label="banner图url" prop="imageUrl">
          <el-input v-model="form.imageUrl" type="textarea" placeholder="请输入内容" />
        </el-form-item> -->



        <!-- <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="是否展示" prop="isShow">
          <el-input v-model="form.isShow" placeholder="请输入是否展示" />
        </el-form-item>
        <el-form-item label="banner文字描述" prop="text">
          <el-input v-model="form.text" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="banner关联的商品id" prop="goodsId">
          <el-input v-model="form.goodsId" placeholder="请输入banner关联的商品id" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBanner, getBanner, delBanner, addBanner, updateBanner } from "@/api/lingtu/banner";
import { listGoods } from "@/api/lingtu/goods";

export default {
  name: "Banner",
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
      // 首页banner表格数据
      bannerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        // imageUrl: null,
        // sort: null,
        // isShow: null,
        // text: null,
        // goodsId: null,
      }, // 查询参数
      queryParamsGoods: {
        pageNum: 1,
        pageSize: 1000,
        isScore : '0',
         isSaled :'0',
         status : 0
      },
      // 表单参数
      form: {
     
      },
      // 表单校验
      rules: {
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" }
        ],
        // imageUrl: [
        //   { required: true, message: "banner图url不能为空", trigger: "blur" }
        // ],
        // sort: [
        //   { required: true, message: "排序不能为空", trigger: "blur" }
        // ],
        // isShow: [
        //   { required: true, message: "是否展示不能为空", trigger: "blur" }
        // ],
      },
      isShow:0,
      bannerPosition : 0,
      bannerType : 0,
      goodsList:[],
      goodsShow : false,
      showText : true,

    };
  },
  created() {
    this.getList();
debugger
    listGoods(this.queryParamsGoods).then((response) => {
      debugger
      this.goodsList = response.rows;
    });

  },
  methods: {
    /** 查询首页banner列表 */
    getList() {
      this.loading = true;
      listBanner(this.queryParams).then(response => {
        this.bannerList = response.rows;
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
        title: null,
        imageUrl: null,
        sort: null,
        isShow: null,
        text: null,
        goodsId: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
    bannerTypeChange(){
      debugger
      if(this.bannerType == 0){
        this.goodsShow = false;
        this.showText = true;
      }else if(this.bannerType == 1){
        this.goodsShow = true;
        this.showText = false;
      }

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
      this.title = "添加banner";

      this.isShow = '0';
      this.bannerPosition = '0';
      this.bannerType = '0';
      this.goodsShow = false;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      debugger
      this.isShow = row.isShow;
      this.bannerPosition = row.bannerPosition;
      this.bannerType = row.bannerType;

      if(this.bannerType == 0){
        this.goodsShow = false;
      }else if(this.bannerType == 1){
        this.goodsShow = true;
      }


      this.reset();
      const id = row.id || this.ids
      getBanner(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改首页banner";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.form.bannerPosition = this.bannerPosition;
      this.form.bannerType = this.bannerType;
      this.form.isShow = this.isShow;
      // 校验
      if(undefined == this.form.imageUrl || '' == this.form.imageUrl  ){
        this.$modal.msgError("请上传图片");
        return;
      }
      if(this.bannerType == '1' && (undefined == this.form.goodsId || '' == this.form.goodsId)){
        this.$modal.msgError("请选择商品");
        return;
      }

      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBanner(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBanner(this.form).then(response => {
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
      // this.$modal.confirm('是否确认删除首页banner编号为"' + ids + '"的数据项？').then(function() {
      this.$modal.confirm('是否确认删除？').then(function() {
        return delBanner(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/banner/export', {
        ...this.queryParams
      }, `banner_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
