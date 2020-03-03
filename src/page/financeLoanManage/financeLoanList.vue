<template>
  <div class="page-container" ref="page-container" id="page-container"><!---供应商管理-供应商入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="融资单号" prop="orderNo">
          <el-input v-model="listQuery.orderNo" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="商户名称" prop="supplierName" >
          <el-input v-model="listQuery.supplierName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="申请时间:"  prop="shipDate">
         <el-date-picker
			      v-model="shipDate"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
        </el-form-item>
        <el-form-item label="放款时间:"  prop="shipDateLoan">
         <el-date-picker
			      v-model="shipDateLoan"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
        </el-form-item>
        <el-form-item label="状态" class="query-select" prop="status">
          <el-select v-model="listQuery.status" style="width:150px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="融资成功 " value='SUCCESS'></el-option>
            <el-option label="待放款 " value='WAIT_LOAN'></el-option>
            <el-option label="待审核 " value='CAPTICAL_CONTRACT'></el-option>
            <el-option label="已拒绝 " value='FAIL'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="search"  size="mini" type="primary" icon="el-icon-search">查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="mini" type="primary" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--<div class="total-container" ref="total-container" id="total-container">
      <span>提交基础资料中：1</span> <span>审核入驻：21</span><span>审核贸易：2</span><span>预沟通：0</span><span>尽调中：9</span><span>尽调中：9</span><span>签署中：9</span>
    </div>-->
    <el-table :data="list"  @current-change="handleSelectionChange" highlight-current-row  :max-height=tableMaxHeight>
    <el-table-column prop="orderNo" label="融资单号" min-width="100">
		</el-table-column>
	
		<el-table-column prop="supplierName" label="商户" width="200">
			<template slot-scope="scope">
				<div>{{scope.row.supplierName}}</div>
			</template>
		</el-table-column>
		
		<el-table-column prop="financeMethodText" label="融资方式"  align="center">
		</el-table-column>
	
		<el-table-column prop="amount" label="融资金额（元）"  width="122" align="center">
		</el-table-column>
		
		<el-table-column prop="repaymentMethodText" label="还款方式" align="center">
		</el-table-column>
		
		<el-table-column prop="loanMonths" label="期限（月）" align="center">
		</el-table-column>
		
		<el-table-column prop="loanRate" label="年利率（%）" align="center">
		</el-table-column>
		
		<el-table-column prop="interest" label="利息（元）" align="center">
		</el-table-column>
		
		<el-table-column prop="totalAmt" label="还款总金额（元）"  width="124" align="center">
		</el-table-column>
		
		<el-table-column prop="fee" label="服务费（元）"  align="center">
		</el-table-column>
		
		<el-table-column prop="applyDate" label="申请时间"  align="center">
		</el-table-column>
		
		<el-table-column prop="loanDate" label="放款时间"  align="center">
		</el-table-column>
	
		<el-table-column prop="statusText" label="状态"  align="center">
		</el-table-column>
		
	  <el-table-column
	    label="操作"
	    width="122"
	    align="center">
	    <template slot-scope="scope" v-if="!roleHasPermissions['supplier_manage_register_list_view']">
	        <router-link :to="'financeLoanDetail/' + scope.row.orderNo" class="router-link">详情</router-link>
	    </template>
	  </el-table-column>

    </el-table>
    <div  class="pagination-container" ref="pagination-container" id="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPage" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total='total' layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
      <!--total-->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { handleSelectionChange, handleSizeChange, handleCurrentPage } from '@/utils/common'
  import { getListData } from '@/api/financeLoanManage/financeLoanAudit'
  import { Format } from '@/utils/index'
  import {comboboxCentreEnterprise} from '@/api/common'

  export default {
    name: 'SupplierRegister',
    filters: {
      filterStatus: function (value) {
        if (value === 'PASS') {
          return 'suc'
        } else if (value === 'REJECT') {
          return 'fail'
        }
      }
    },
    data () {
      return {
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          orderNo: '', // 融资单号
          supplierName: '', // 商户名称
          applyDate: '', // 申请时间
          status: '', // 状态
          loanDate:'',
        },
        centreList:'',//核心企业列表
        shipDate:'',// 时间范围
        shipDateLoan:'',// 放款时间范围
        yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
        selectedData: '', // 选中某一行的数据
        handleSelectionChange: handleSelectionChange.bind(this),
        handleSizeChange: handleSizeChange.bind(this),
        handleCurrentPage: handleCurrentPage.bind(this),
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    watch :{
    	shipDate(val,oldVal){
	  		let that = this;
	  		let _Time;
	  		if(val){
	  			_Time = Format(val, 'yyyy-MM-dd');
	  		}else{
	  			_Time = ''
	  		}
	  		that.listQuery.applyDate = _Time;
	  	},  
    	shipDateLoan(val,oldVal){
	  		let that = this;
	  		let _Time;
	  		if(val){
	  			_Time = Format(val, 'yyyy-MM-dd');
	  		}else{
	  			_Time = ''
	  		}
	  		that.listQuery.loanDate = _Time;
	  	}
    },
    created () {
    },
    mounted () {
      this.getList()
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    },
    methods: {
    	getSelect(){
    		comboboxCentreEnterprise().then(res => {
          if (res.data.code === '200') {
          	this.centreList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
    	},
      getList () {
        getListData(this.listQuery).then(res => {
          if (res.data.code === '200') {
						const listData = res.data.data.list
						this.total = res.data.data.total
						this.list = listData
						
					} else {
						this.$message.error(res.data.message)
					}
				})
			},
			search() {
				let that = this;
				that.getList();
			},//查询
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.shipDate = '';
      },//重置表单
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .total-container{
    >span{
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid #ccc;
      &:last-of-type{
        border-right: none;
      }
    }
  }
  .router-link{
    display: block;
    color:#409EFF;
  }
</style>

