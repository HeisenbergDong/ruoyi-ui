<template>
  <div class="app-container">

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:box:add']"
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
      :data="boxList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="" align="center" prop="id" /> -->
      <el-table-column label="主图" align="center" prop="image" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.image" :width="50" :height="50" />
        </template>
      </el-table-column>

      <el-table-column label="子图" align="center" prop="imageSon" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.imageSon" :width="50" :height="50" />
        </template>
      </el-table-column>

      <!-- <el-table-column label="小图" align="center" prop="imageSon" /> -->
      <el-table-column label="开启盲盒费用" align="center" prop="price" />
      <!-- <el-table-column label="活动介绍" align="center" prop="tips" /> -->
      <el-table-column
        label="活动时间"
        align="center"
        prop="activeTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.activeTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="活动商品id，多个用‘,’分割" align="center" prop="goodsIds" /> -->
      <el-table-column label="参与人数" align="center" prop="persionNum" />
      <el-table-column label="主办单位" align="center" prop="company" />
      <!-- <el-table-column label="活动说明" align="center" prop="introduction" /> -->
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
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:box:edit']"
            >修改</el-button
          >

          <el-button
            size="mini"
            type="text"
            @click="boxShowClick(scope.row)"
            v-hasPermi="['system:box:edit']"
            >关联商品</el-button
          >

          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:box:remove']"
            >删除</el-button
          > -->

        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    /> -->


    <!-- 添加或修改盲盒对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="主图">
              <image-upload v-model="form.image" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="小图" prop="imageSon">
              <!-- <el-input v-model="form.imageSon" placeholder="请输入小图" /> -->
              <image-upload v-model="form.imageSon" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="开启盲盒费用" prop="price">
              <el-input v-model="form.price" placeholder="请输入开启盲盒费用" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="活动时间" prop="activeTime">
              <el-date-picker
                clearable
                v-model="form.activeTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择活动时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <!-- <el-form-item label="活动商品id，多个用‘,’分割" prop="goodsIds">
          <el-input v-model="form.goodsIds" placeholder="请输入活动商品id，多个用‘,’分割" />
        </el-form-item> -->
          <el-col :span="12">
            <el-form-item label="参与人数" prop="persionNum">
              <el-input
                v-model="form.persionNum"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="主办单位" prop="company">
              <el-input v-model="form.company" placeholder="请输入主办单位" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="活动介绍" prop="tips">
              <!-- <el-input v-model="form.tips" type="textarea" placeholder="请输入内容" /> -->
              <editor v-model="form.tips" :min-height="300" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="活动说明" prop="introduction">
              <!-- <el-input v-model="form.introduction" placeholder="请输入活动说明" /> -->
              <editor v-model="form.introduction" :min-height="300" />
            </el-form-item>
          </el-col>
          <!-- <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item> -->
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>






     <!-- 添加或修改盲盒对话框 -->
    <el-dialog title="关联商品" :visible.sync="boxShow" width="700px" append-to-body>
      <el-form ref="form1" :model="form" label-width="120px">
        <el-row>
          <el-col :span="8">
            <span>商品</span>
          </el-col>
          <el-col :span="8">
            <span>数量</span>
          </el-col>
          <el-col :span="8">
            <span>几率</span>
          </el-col>
        </el-row>
        

        <!--      1     -->
        <el-row>
          <el-col :span="8">
              <el-select v-model="good1" placeholder="请选择">
                <el-option
                  v-for="item in goodsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="num1" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pro1" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
        </el-row>

        <!--      2     -->
        <el-row>
          <el-col :span="8">
              <el-select v-model="good2" placeholder="请选择">
                <el-option
                  v-for="item in goodsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="num2" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pro2" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
        </el-row>

        <!--      3     -->
        <el-row>
          <el-col :span="8">
              <el-select v-model="good3" placeholder="请选择">
                <el-option
                  v-for="item in goodsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="num3" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pro3" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
        </el-row>

        <!--      4     -->
        <el-row>
          <el-col :span="8">
              <el-select v-model="good4" placeholder="请选择">
                <el-option
                  v-for="item in goodsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="num4" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pro4" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
        </el-row>

        <!--      5     -->
        <el-row>
          <el-col :span="8">
              <el-select v-model="good5" placeholder="请选择">
                <el-option
                  v-for="item in goodsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="num5" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pro5" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
        </el-row>


        <!--      6     -->
        <el-row>
          <el-col :span="8">
              <el-select v-model="good6" placeholder="请选择">
                <el-option
                  v-for="item in goodsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="num6" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pro6" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
        </el-row>
        


        <!--      7     -->
        <el-row>
          <el-col :span="8">
              <el-select v-model="good7" placeholder="请选择">
                <el-option
                  v-for="item in goodsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="num7" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pro7" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
        </el-row>


        <!--      8     -->
        <el-row>
          <el-col :span="8">
              <el-select v-model="good8" placeholder="请选择">
                <el-option
                  v-for="item in goodsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="num8" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pro8" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
        </el-row>


        <!--      9     -->
        <el-row>
          <el-col :span="8">
              <el-select v-model="good9" placeholder="请选择">
                <el-option
                  v-for="item in goodsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="num9" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pro9" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
        </el-row>


        <!--      10     -->
        <el-row>
          <el-col :span="8">
              <el-select v-model="good10" placeholder="请选择">
                <el-option
                  v-for="item in goodsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="num10" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pro10" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
        </el-row>


        <!--      11     -->
        <el-row>
          <el-col :span="8">
              <el-select v-model="good11" placeholder="请选择">
                <el-option
                  v-for="item in goodsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="num11" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pro11" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
        </el-row>


        <!--      12     -->
        <el-row>
          <el-col :span="8">
              <el-select v-model="good12" placeholder="请选择">
                <el-option
                  v-for="item in goodsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="num12" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="pro12" placeholder="请输入" oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-col>
        </el-row>



      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="boxSub">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
import { listBox, getBox, delBox, addBox, updateBox } from "@/api/lingtu/box";
import { listRule, getRule, delRule, addRule, updateRule } from "@/api/lingtu/boxRule";

import {
  listGoods,
} from "@/api/lingtu/goods";


export default {
  name: "Box",
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
      // 盲盒表格数据
      boxList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 盲盒关联商品弹层
      boxShow : false,

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        image: null,
        imageSon: null,
        price: null,
        tips: null,
        activeTime: null,
        goodsIds: null,
        persionNum: null,
        company: null,
        introduction: null,
      },
      // 查询参数
      queryParamsGoods: {
        pageNum: 1,
        pageSize: 1000,

        isScore: '0',
        isSaled :'0',
        status :'0',
      },

      // 表单参数
      form: {},
      // 表单校验
      rules: {
        image: [{ required: true, message: "主图不能为空", trigger: "blur" }],
        imageSon: [
          { required: true, message: "小图不能为空", trigger: "blur" },
        ],
      },
      goodsList:[],
      ruleList:[],

      boxId:'',

      good1:'',
      num1:'',
      pro1:'',

      good2:'',
      num2:'',
      pro2:'',

      good3:'',
      num3:'',
      pro3:'',

      good4:'',
      num4:'',
      pro4:'',

      good5:'',
      num5:'',
      pro5:'',

      good6:'',
      num6:'',
      pro6:'',

      good7:'',
      num7:'',
      pro7:'',

      good8:'',
      num8:'',
      pro8:'',

      good9:'',
      num9:'',
      pro9:'',

      good10:'',
      num10:'',
      pro10:'',

      good11:'',
      num11:'',
      pro11:'',

      good12:'',
      num12:'',
      pro12:'',
      
      boxAddShow : true,
    };
  },
  created() {
    this.getList();
    listGoods(this.queryParamsGoods).then((response) => {
      debugger
      this.goodsList = response.rows;
      if(undefined!=this.goodsList && this.goodsList.length > 0){
        this.boxAddShow = false;
      }
    });

  },
  methods: {
    /** 查询盲盒列表 */
    getList() {
      this.loading = true;
      listBox(this.queryParams).then((response) => {
        this.boxList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    boxSub(){

      let ruleList = [];
      
      // 必传校验
      if(undefined == this.good1 || '' == this.good1 || undefined == this.num1 || '' == this.num1 || undefined == this.pro1 || '' == this.pro1 
      || undefined == this.good2 || '' == this.good2 || undefined == this.num2 || '' == this.num2 || undefined == this.pro2 || '' == this.pro2
      || undefined == this.good3 || '' == this.good3 || undefined == this.num3 || '' == this.num3 || undefined == this.pro3 || '' == this.pro3 
      || undefined == this.good4 || '' == this.good4 || undefined == this.num4 || '' == this.num4 || undefined == this.pro4 || '' == this.pro4 
      || undefined == this.good5 || '' == this.good5 || undefined == this.num5 || '' == this.num5 || undefined == this.pro5 || '' == this.pro5 
      || undefined == this.good6 || '' == this.good6 || undefined == this.num6 || '' == this.num6 || undefined == this.pro6 || '' == this.pro6 
      || undefined == this.good7 || '' == this.good7 || undefined == this.num7 || '' == this.num7 || undefined == this.pro7 || '' == this.pro7 
      || undefined == this.good8 || '' == this.good8 || undefined == this.num8 || '' == this.num8 || undefined == this.pro8 || '' == this.pro8 
      || undefined == this.good9 || '' == this.good9 || undefined == this.num9 || '' == this.num9 || undefined == this.pro9 || '' == this.pro9 
      || undefined == this.good10 || '' == this.good10 || undefined == this.num10 || '' == this.num10 || undefined == this.pro10 || '' == this.pro10
      || undefined == this.good11 || '' == this.good11 || undefined == this.num11 || '' == this.num11 || undefined == this.pro11 || '' == this.pro11 
      || undefined == this.good12 || '' == this.good12 || undefined == this.num12 || '' == this.num12 || undefined == this.pro12 || '' == this.pro12 ){
        this.$modal.msgError("信息不完善，请全部填写！");
        return;
      }

      // 商品-----1
      let boxRule1 = {
        boxId:this.boxId,
        goodsId:this.good1,
        goodsNum:this.num1,
        probability:this.pro1,
      };
      ruleList.push(boxRule1);

      // 商品-----2
      let boxRule2 = {
        boxId:this.boxId,
        goodsId:this.good2,
        goodsNum:this.num2,
        probability:this.pro2,
      };
      ruleList.push(boxRule2);

      // 商品-----3
      let boxRule3 = {
        boxId:this.boxId,
        goodsId:this.good3,
        goodsNum:this.num3,
        probability:this.pro3,
      };
      ruleList.push(boxRule3);

      // 商品-----4
      let boxRule4 = {
        boxId:this.boxId,
        goodsId:this.good4,
        goodsNum:this.num4,
        probability:this.pro4,
      };
      ruleList.push(boxRule4);

      // 商品-----5
      let boxRule5 = {
        boxId:this.boxId,
        goodsId:this.good5,
        goodsNum:this.num5,
        probability:this.pro5,
      };
      ruleList.push(boxRule5);

      // 商品-----6
      let boxRule6 = {
        boxId:this.boxId,
        goodsId:this.good6,
        goodsNum:this.num6,
        probability:this.pro6,
      };
      ruleList.push(boxRule6);

      // 商品-----7
      let boxRule7 = {
        boxId:this.boxId,
        goodsId:this.good7,
        goodsNum:this.num7,
        probability:this.pro7,
      };
      ruleList.push(boxRule7);

      // 商品-----8
      let boxRule8 = {
        boxId:this.boxId,
        goodsId:this.good8,
        goodsNum:this.num8,
        probability:this.pro8,
      };
      ruleList.push(boxRule8);

      // 商品-----9
      let boxRule9 = {
        boxId:this.boxId,
        goodsId:this.good9,
        goodsNum:this.num9,
        probability:this.pro9,
      };
      ruleList.push(boxRule9);

      // 商品-----10
      let boxRule10 = {
        boxId:this.boxId,
        goodsId:this.good10,
        goodsNum:this.num10,
        probability:this.pro10,
      };
      ruleList.push(boxRule10);

      // 商品-----11
      let boxRule11 = {
        boxId:this.boxId,
        goodsId:this.good11,
        goodsNum:this.num11,
        probability:this.pro11,
      };
      ruleList.push(boxRule11);

      // 商品-----12
      let boxRule12 = {
        boxId:this.boxId,
        goodsId:this.good12,
        goodsNum:this.num12,
        probability:this.pro12,
      };
      ruleList.push(boxRule12);



      let param = {
        boxId : this.boxId,
        listRule : ruleList
      };


      addRule(param).then(response => {
        this.$modal.msgSuccess("关联成功");
        // this.open = false;
        // this.getList();
        this.boxShow = false;
      });
    },


    // 盲盒关联商品
    boxShowClick(row){
      this.boxId = row.id;
debugger
      let ruleParams={
        pageNum: 1,
        pageSize: 999,
        boxId: row.id,
        goodsId: null,
        goodsNum: null,
        probability: null,
      };

      listRule(ruleParams).then(response => {
        debugger
        let resRule = response.rows;
        if(response.total > 0){
          // 商品 1
          this.good1 = resRule[0].goodsId;
          this.num1 = resRule[0].goodsNum;
          this.pro1 = resRule[0].probability;

          // 商品 2
          this.good2 = resRule[1].goodsId;
          this.num2 = resRule[1].goodsNum;
          this.pro2 = resRule[1].probability;

          // 商品 3
          this.good3 = resRule[2].goodsId;
          this.num3 = resRule[2].goodsNum;
          this.pro3 = resRule[2].probability;

          // 商品 4
          this.good4 = resRule[3].goodsId;
          this.num4 = resRule[3].goodsNum;
          this.pro4 = resRule[3].probability;

          // 商品 5
          this.good5 = resRule[4].goodsId;
          this.num5 = resRule[4].goodsNum;
          this.pro5 = resRule[4].probability;

          // 商品 6
          this.good6 = resRule[5].goodsId;
          this.num6 = resRule[5].goodsNum;
          this.pro6 = resRule[5].probability;

          // 商品 7
          this.good7 = resRule[6].goodsId;
          this.num7 = resRule[6].goodsNum;
          this.pro7 = resRule[6].probability;

          // 商品 8
          this.good8 = resRule[7].goodsId;
          this.num8 = resRule[7].goodsNum;
          this.pro8 = resRule[7].probability;

          // 商品 9
          this.good9 = resRule[8].goodsId;
          this.num9 = resRule[8].goodsNum;
          this.pro9 = resRule[8].probability;

          // 商品 10
          this.good10 = resRule[9].goodsId;
          this.num10 = resRule[9].goodsNum;
          this.pro10 = resRule[9].probability;

          // 商品 11
          this.good11 = resRule[10].goodsId;
          this.num11 = resRule[10].goodsNum;
          this.pro11 = resRule[10].probability;

          // 商品 12
          this.good12 = resRule[11].goodsId;
          this.num12 = resRule[11].goodsNum;
          this.pro12 = resRule[11].probability;




        }
        this.ruleList = response.rows;
      });

      this.boxShow = true;
    },


    // 取消按钮
    cancel() {
      this.open = false;
      this.boxShow = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        image: null,
        imageSon: null,
        price: null,
        tips: null,
        activeTime: null,
        goodsIds: null,
        persionNum: null,
        company: null,
        introduction: null,
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
      this.title = "添加盲盒";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getBox(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改盲盒";
      });
    },
    
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateBox(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBox(this.form).then((response) => {
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
        .confirm('是否确认删除盲盒编号为"' + ids + '"的数据项？')
        .then(function () {
          return delBox(ids);
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
        "system/box/export",
        {
          ...this.queryParams,
        },
        `box_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
