<template>
  <div class="container">
    <div class="top">
      	<ul class="flex-item">
	      	<li>{{headInfoData.enterpriseName}} </li>
	      	<!--<li>融资单号：{{financeNo}}</li>
	      	<li>期限：{{validDays}}天 | 利息：{{interest}}元 | 还款总额：{{totalAmt}}元</li>-->
	      	<li>注册时间：{{headInfoData.createTime}}</li>
      	</ul>
      	<div class="flex-item">
	    		<el-steps :active="1" v-if="(status === 'REJECT')" finish-status = "error"   :align-center=true>
		        <el-step :title="status === 'REJECT'?'融资失败':'融资失败'">
		            <div slot="description" class="status">
		              <div class="tip" >
		              	<span style="background-color: transparent;border: 1px solid #f56c6c; color: #f56c6c;" >{{statusText}}</span>
		              </div>
		              <i class="el-icon-caret-bottom"></i>
		              <div class="tip-mark" v-if="remark">{{remark}}</div>
		            </div>
		            <span slot="icon">●</span>
		        </el-step>
	        </el-steps>
	        <el-steps v-else :active="statusActive" :process-status="status === 'PASS' ? 'finish': status === 'FAIL' ? 'error': 'process'"  :align-center=true>
	          <el-step title="待审核">
	            <div slot="description" class="status" v-if="status === 'CAPITAL_APPROVING'">
	              <div class="tip" ><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>
	          <el-step title="待签署">
	            <div slot="description" class="status" v-if="status === 'CAPITAL_SIGNING'">
	              <div class="tip" ><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>
	          <el-step title="合作达成">
	            <div slot="description" class="status" v-if="status === 'PASS'">
	              <div class="tip"><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>
	        </el-steps>
      	</div>
    </div>
    <div class="content">
      <div class="flex-item" style="position: relative;">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane class="first_tab_content" label="信用评分" name="first">
            <div class="tab-content">
            	<div  class="pf_box" @click="doScorecard">
            		<div class="pf_box_content">
	            		<el-row>
									  <el-col :span="4">
									  	<div style="text-align: center;">
									  		<span style="font-size: 28px; border-left: 3px solid #85ce61;padding-left: 20px;">最终评级</span>
									  	</div>
									  </el-col>
									  <el-col :span="3" >
									  	<el-button :type="queryGradeData.finalGrade==='A'?'success':queryGradeData.finalGrade==='D'?'danger':'warning'" v-if="queryGradeData.finalGrade">
									  		{{queryGradeData.finalGrade}}
									  	</el-button>
									  </el-col>
									  <el-col :span="5" >
									  	主要标准：<span :class="queryGradeData.primaryGrade==='A'?'suc':queryGradeData.primaryGrade==='D'?'fail':'war'" v-if="queryGradeData.primaryGrade">{{queryGradeData.primaryGrade}}</span>
									  </el-col>
									  <el-col :span="5">
									  	次要标准：<span :class="queryGradeData.secondaryGrade==='A'?'suc':queryGradeData.secondaryGrade==='D'?'fail':'war'" v-if="queryGradeData.secondaryGrade">{{queryGradeData.secondaryGrade}}</span>
									  </el-col>
									  <el-col :span="5">
									  	次要标准评分：<span  v-if="queryGradeData.secondaryScore">{{queryGradeData.secondaryScore}}</span>
									  </el-col>
									  <el-col :span="2">
									  	<div >
									  		<i class="el-icon-arrow-right" style="line-height: 90px; font-size: 60px;color: #cdcdcd;"></i>
									  	</div>
									  </el-col>
									</el-row>
            		</div>
            	</div>
              <p class="des" style="line-height: 60px;">贸易详情：</p>
		          <el-row :gutter="10">
							  <el-col :span="6">
							  	<div class="h_top">
							  		<p class="h_name">渠道商</p>
							  		<p class="h_amt">{{receivableDetailData.channelNum}} 个</p>
							  	</div>
							  </el-col>
							  <el-col :span="6">
							  	<div class="h_top">
							  		<p class="h_name">订单数量（近1年）</p>
							  		<p class="h_amt">{{receivableDetailData.orderNum}} 笔</p>
							  	</div>
							  </el-col>
							  <el-col :span="6">
							  	<div class="h_top">
							  		<p class="h_name">平台交易金额（近1年）</p>
							  		<p class="h_amt">{{receivableDetailData.yearAmount}}</p>
							  	</div>
							  </el-col>
							  <el-col :span="6">
							  	<div class="h_top">
							  		<p class="h_name">实际回款金额（近1年）</p>
							  		<p class="h_amt">{{receivableDetailData.yearReturnAmount}}</p>
							  	</div>
							  </el-col>
							</el-row>
					  	<template>
							  <el-table
							    :data="receivableDetailData.details"
							    border
							    style="width: 100%;margin: 30px 0;">
							    <el-table-column
							      fixed
							      prop="name"
							      label="分销商名称">
							    </el-table-column>
							    <el-table-column
							      fixed
							      prop="duration"
							      label="平台交易时长">
							      <template slot-scope="scope">
							      	<span v-if="scope.row.duration">{{scope.row.duration}}年</span>
							      </template>
							    </el-table-column>
							    <el-table-column
							      fixed
							      prop="count"
							      label="订单量（近1年）">
							      <template slot-scope="scope">
							      	<span>{{scope.row.count}}单</span>
							      </template>
							    </el-table-column>
							    <el-table-column
							      fixed
							      prop="amount"
							      label="平台交易金额（近1年）">
							    </el-table-column>
							    <el-table-column
							      fixed
							      prop="adviceSign"
							      label="建议授信">
							    </el-table-column>
							    <el-table-column
							      fixed
							      prop="financeRatio"
							      label="融资占比">
							      <template slot-scope="scope">
							      	<span>{{scope.row.financeRatio}}%</span>
							      </template>
							    </el-table-column>
							    <el-table-column
							      fixed
							      prop="days"
							      label="应收周转天数">
							    </el-table-column>
							  </el-table>
							</template>
            </div>
          </el-tab-pane>
        	<el-tab-pane v-if="status!== 'CAPTICAL_CONTRACT'" class="first_tab_content" label="授信" name="second">
            <div class="tab-content">
            	<el-form ref="signForm" label-width="140px" size="mini" label-position="left">
                <!--<div class="info-list">
                  <p class="title">合同细则</p>
                  <p style="display: inline-block;width:48%;"><span>合同编码：</span><span>{{querySignData.contractNo}}</span></p>
                  <p style="display: inline-block;width:48%;"><span>企业账号：</span><span>{{querySignData.loginName}}</span></p>
                  <p style="display: inline-block;width:48%;"><span>手机号码：</span>{{querySignData.repreMobile}}</p>
                  <el-form-item label="合同编号签署时间：">
                    <el-date-picker
                    	class="must_input"
                      v-model="querySignData.contractSignTime"
                      align="right"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </div>-->
                <!--<div class="info-list">
                  <p class="title">资金方</p>
                  <el-form-item label="资金机构名称："  style="width:600px;display: inline-block">
                    <el-select class="must_input" v-model="querySignData.capitalId" filterable>
                      <el-option v-for="(subItem, subIndex) in queryCapitalEnterpriseList" :key="subItem.capitalId" :label="subItem.capitalName" :value="subItem.capitalId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>-->
                <div class="info-list">
                  <p class="title">授信与利息</p>
                  <el-form-item label="总授信额度："  style="width:450px;">
                  	<el-input-number class="must_input"  v-model="querySignData.totalCreditLine" :max="1000000" :controls="false" size="mini" >
											
                   	</el-input-number>
                   	<span class="left_label">元</span>
                  </el-form-item>
                  <el-form-item label="日利率："  style="width:450px;position: relative;">
	                  <el-input-number @change="changeRate" class="must_input"  v-model="querySignData.interestRate" :min="0" :max="0.065" :precision="3" :step="0.001" :controls="false" size="mini">	
	                  </el-input-number>
                    <span class="left_label">%</span>
                    <span style="position: absolute;display: inline-block;width: 500px;padding-left: 60px;color: #606266;">
                    	月利率：{{rate.monthRate}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年利率：{{rate.yearRate}}
                    </span>
                  </el-form-item>
                  <el-form-item label="逾期日利率："  style="width:450px;">
                  	<el-input-number class="must_input" v-model="querySignData.overdueRate" :min="0.08" :max="0.09" :precision="3" :step="0.001"  :controls="false" size="mini" >

		                </el-input-number>
		                <span class="left_label">%</span>
                  </el-form-item>
                  <el-form-item label="每笔保证金比例："  style="width:450px;">
                  	<el-input-number class="must_input" v-model="querySignData.marginRate"  :min="0.5" :max="3" :precision="2" :step="0.1" :controls="false" size="mini" >

		                </el-input-number>
		                <span class="left_label">%</span>
                  </el-form-item>
                  <el-form-item label="每笔手续费比例："  style="width:450px;">
                  	<el-input-number class="must_input" v-model="querySignData.chargeRate"  :min="0.5" :max="3" :precision="2" :step="0.1" :controls="false" size="mini" >

                    </el-input-number>
                    <span class="left_label">%</span>
                  </el-form-item>
                  <el-form-item label="融资额度的届满日：">
                    <el-date-picker
                    	class="must_input"
                      v-model="querySignData.creditLineExpireTime"
                      align="right"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <table class="" v-if="querySignData.creditAndIterestRates&&querySignData.creditAndIterestRates.length>0">
                    <tbody>
                    <tr>
                      <td>核心企业</td>
                      <td>初始授信额度（元）</td>
                      <td>每笔账款融资比例(%)</td>
                      <td>应收账款周转天数(天)</td>
                    </tr>
                    <tr v-for="(item, index) in querySignData.creditAndIterestRates">
                      <td style="width: 120px;">
                        <el-input v-model="querySignData.creditAndIterestRates[index].centreName" style="width: 90%" size="mini" clearable  :disabled="true">
                        </el-input>
                      </td>
                      <td>
                        <el-input-number class="must_input"  v-model="querySignData.creditAndIterestRates[index].creditLine" :max="1000000" :controls="false" size="mini" >

                        </el-input-number>
                        <!--<span class="left_label">元</span>-->
                      </td>
                      <td>
                        <el-input-number class="must_input" v-model="querySignData.creditAndIterestRates[index].discountRate" clearable="true" :min="0" :max="70" :controls="false" size="mini" >

                        </el-input-number>
                        <!--<span class="left_label">每笔</span>-->
                      </td>
                      <td >
                      	<el-input class="must_input" type="number" 
                      		v-model="querySignData.creditAndIterestRates[index].receivableTurnoverDays" 
                      		placeholder="" 
                      		:min="1"   
                      		size="mini" clearable>
                      	</el-input>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <!--<div class="info-list">
                  <p class="title padding_left">账户信息</p>
                  <p><span>商户管理平台账号：</span>{{querySignData.loginName}}</p>
                  <p><span>商户号关联手机：</span>{{querySignData.mobile}}</p>
                </div>-->
                <div class="info-list" style="text-align: right;">
                  <el-button  @click="getQuerySignData">重置</el-button>
                  <el-button @click="handleUpdateSign"  type="primary">保存</el-button>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
        
        </el-tabs>
      </div>  <!--tab-->
      <div class="flex-item">
        <ul>
          <li class="background-gray color-black">
            <div>风控审查</div>
            <div></div>
          </li>
          <template v-if="status==='CAPITAL_SIGNING'||status==='PASS'">
          	<li>
		          <el-button type="text" @click="getContractStatus" style="width:100%;display: block;">
		            <div class="flex">
		              <div>企业注册合作合同
		                <!--<p :class="cooperationAgreementData.status==='NORMAL'? 'suc':'fail'">{{cooperationAgreementData.result}}</p>-->
		              </div>
		              <i class="el-icon-arrow-right"></i>
		            </div>
		          </el-button>
		        </li>
          </template>
          <li>
            <div v-if="status==='CAPITAL_APPROVING'">
            	<el-button @click="doApproveFinal">拒绝</el-button>
              <el-button type="primary" @click="doPass">审批通过</el-button>
            </div>
            <div v-if="status==='CAPITAL_SIGNING'">
              <el-button type="primary" @click="doPassCapticalSign">签署并达成合作</el-button>
            </div>
          </li>
        </ul>
      </div> <!--左侧操作栏-->
    </div>
    <!---入驻失败原因-->
    <el-dialog title="拒绝原因" :visible.sync="rejectDialogShow" width="400px">
      <div>
        <el-input type="textarea" :rows="3" v-model="rejectRemark" placeholder="请输入拒绝原因！" ></el-input>
      </div>
      <div slot="footer">
        <el-button @click="rejectDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="approveFinal(false)">提交</el-button>
      </div>
    </el-dialog>
  	<el-dialog
      title="在线签署协议"
      :visible.sync="contractDialogShow"
      fullscreen
      custom-class = 'supplier-detail-dialog dialog_width'
      width="600px">
      <div class="dialog-content">
      	<div>
      		合同状态
      	</div>
        <template >
	      	<table style="margin-top: 40px;">
	          <tbody>
	            <tr>
	              <td>
	              	<a style="cursor: pointer;width: 150px;display: inline-block;padding-top: 15px;" target="_blank"
	              		:href="contractStatusData.commerceFactorContractUrl"
	              		:style="{color:contractStatusData.commerceFactorContractUrl?'#409eff':''}"
	              		>
	              		《国内商业保理合同》
	              	</a>	
	                <el-button @click="messagePush('commerceFactorContract')" style="margin: 5px;float: right;" type="primary">推送消息</el-button>
	              	<el-button @click="createFactorContract" style="margin: 5px;float: right;" type="primary">生成保理合同</el-button>
	              </td>
	             	<td style="width: 120px;">
	              	<span :class="contractStatusData.commerceFactorContractStatus==='SUCCESS'?'suc':'fail'">
	              		{{contractStatusData.commerceFactorContractStatusText}}
	              	</span>
	              </td>
	            </tr>
	          </tbody>
	       	</table>
	       	<table style="margin-top: 40px;">
	          <tbody>
	            <tr v-for="item in contractStatusData.guarantor">
	            	<td>
	              	<a style="cursor: pointer;width: 150px;display: inline-block;padding-top: 15px;" target="_blank"
	              		:href="item.contractUrl"
	              		:style="{color:item.contractUrl?'#409eff':''}"
	              		>
	              		《保证合同》<span style="color: #606266;">{{item.name}}</span>
	              	</a>
	                <el-button @click="messagePush('guaranteeAgreement',item.guarantorId)" style="margin: 5px;float: right;" type="primary">推送消息</el-button>
	              	<el-button @click="createGuaranteeContract(item.guarantorId)" style="margin: 5px;float: right;" type="primary">生成保证合同</el-button> 	
	              </td>
	             	<td style="width: 120px;">
	              	<span :class="item.contractStatus==='SUCCESS'?'suc':'fail'">
	              		{{item.contractStatusText}}
	              	</span>
	              </td>
	            </tr>
	          </tbody>
	       	</table>
	      </template>
      </div>
    </el-dialog> <!---初审核-->
		<el-dialog title="评分卡"
      :visible.sync="scoreCardShow"
      fullscreen
      custom-class = 'supplier-detail-dialog dialog_width'>
      <div class="trade-dialog-content">
      	<div  class="pf_box">
    			<div class="pf_box_content">
		      	<el-row>
						  <el-col :span="4">
						  	<div style="text-align: center;">
						  		<span style="border-left: 3px solid #85ce61;padding-left: 20px;">最终评级</span>
						  	</div>
						  </el-col>
						  <el-col :span="3" >
						  	<el-button :type="queryGradeDetailData.finalGrade==='A'?'success':queryGradeDetailData.finalGrade==='D'?'danger':'warning'" v-if="queryGradeDetailData.finalGrade">
						  		{{queryGradeDetailData.finalGrade}}
						  	</el-button>
						  </el-col>
						  <el-col :span="5" >
						  	主要标准：<span :class="queryGradeDetailData.primaryGrade==='A'?'suc':queryGradeDetailData.primaryGrade==='D'?'fail':'war'" v-if="queryGradeDetailData.primaryGrade">{{queryGradeDetailData.primaryGrade}}</span>
						  </el-col>
						  <el-col :span="5">
						  	次要标准：<span :class="queryGradeDetailData.secondaryGrade==='A'?'suc':queryGradeDetailData.secondaryGrade==='D'?'fail':'war'" v-if="queryGradeDetailData.secondaryGrade">{{queryGradeDetailData.secondaryGrade}}</span>
						  </el-col>
						  <el-col :span="6">
						  	次要标准评分：<span v-if="queryGradeDetailData.secondaryScore">{{queryGradeDetailData.secondaryScore}}</span>
						  </el-col>
						</el-row>
    			</div>
    		</div>
      	<div v-for="item in queryGradeDetailData.modelList" style="margin-bottom: 10px;">
	      	<p class="title" style="line-height: 60px;">{{item.modelName}} &nbsp;&nbsp;&nbsp;
	      		<span :class="item.modelGrade==='A'?'suc':item.modelGrade==='D'?'fail':'war'">{{item.modelGrade}}</span>
	      	</p>
	      	<template>
					  <el-table
					    :data="item.ruleList"
					    stripe
					    style="width: 100%;">
					    <el-table-column
					      prop="ruleName"
					      label="命中规则集">
					    </el-table-column>
					    <el-table-column
					      prop="ruleValue"
					      label="数据值"
					      align="center"
					      width="90">
					    </el-table-column>
					    <el-table-column
					      prop="ruleGrade"
					      label="评级/分值"
					      align="center"
					      width="90">
					      <template slot-scope="scope">
				        	<span :class="scope.row.ruleGrade==='A'?'suc':scope.row.ruleGrade==='D'?'fail':'war'">{{scope.row.ruleGrade}}</span>
				       </template>
					    </el-table-column>
					  </el-table>
					</template>
	        <!--<template>
	        	<p class="title">主要标准</p>
	        	<el-row>
						  <el-col :span="16"></el-col>
						  <el-col :span="4"></el-col>
						  <el-col :span="4"></el-col>
						</el-row>
	        	<el-row>
						  <el-col :span="16">营业年数（股权变动至今）较长（年）</el-col>
						  <el-col :span="4">6</el-col>
						  <el-col :span="4">B</el-col>
						</el-row>
	        </template>-->
      		
      	</div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
  import { Format,delcommafy} from '@/utils/index'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import merchantsDetail   from '@/api/merchantsManage/merchantsDetail'
	import { validContent } from '@/utils/validate'
  import NoteChart from '@/components/charts/noteChart'
  import PieChart from '@/components/charts/pieChart'
  import baseUtil from '@/utils/baseUtil'
	export default {
    name: 'LoanDetail',
    components: { Upload ,NoteChart,PieChart},
    data () {
      	return {
      		queryCreditData:{
      			totalCreditLine:'',//总授信额度
      			creditLineExpireTime:'',//融资额度得届满日
      			creditAndIterestRates:[]
      		},//商户授信
      		receivableDetailData:'',//授信签署-贸易详情
      		headInfoData:{},//头部信息
      		status:'',//状态 PASS 合作达成 REJECT 合作失败 CAPITAL_SIGNING 待签署 CAPITAL_APPROVING 待审核
      		statusText:'',//	状态文本
        	contractDialogShow: false, // 合同dialog
      		inspectionRelateData: {
	          title: '',
	          inspectionArray: []
	        },
      		contractStatusData:{},//合同数据
      		creditScoreData:{},//评分卡数据
        	scoreCardTab: '0',//评分卡tab
      		
      		isDemo:false,
      		tradeRmSummaryData:{"platformName":"永辉超市",
	      	"vendorCode":"20016392",
	      	"vendorName":"贵州恒达泰商贸有限公司",
	      	"platformTradingHours":"23.9",
	      	"nearlyOneYearSettlementAmount":"37,843.00","threeMonthlyAvgAmt":"41,428.08",
	      	"threeMonthlyReceivableRatio":"62.00%","settlementAmount":"548,726.88",
	      	"amountPayable":"846,523.17","settlementMonth":"2018-03 88,374.62",
	      	"settlementMinimumMonth":"2017-10 0.00","purchaseOrder":"23.67",
	      	"invoice":"-","receipts":"23.58","payingInAdvance":"-",
	      	"settlementTrend":{"04/11":"390672.35","04/12":"431731.94","04/13":"573654.37",
	      	"04/14":"125111.54","04/15":"338905.41","04/16":"611616.10"},	
	      	"receivableRatioTrend":{"04/11":"12","04/12":"21","04/13":"4","04/14":"32",
	      	"04/15":"16","04/16":"15"}
	      	},
	      	tradeRmSummaryData2:{"platformName":"永辉超市",
	      	"vendorCode":"20016392",
	      	"vendorName":"贵州恒达泰商贸有限公司",
	      	"platformTradingHours":"23.9",
	      	"nearlyOneYearSettlementAmount":"137,843.00","threeMonthlyAvgAmt":"41,428.08",
	      	"threeMonthlyReceivableRatio":"62.00%","settlementAmount":"548,726.88",
	      	"amountPayable":"846,523.17","settlementMonth":"2018-03 88,374.62",
	      	"settlementMinimumMonth":"2017-10 0.00","purchaseOrder":"23.67",
	      	"invoice":"-","receipts":"23.58","payingInAdvance":"-",
	      	"settlementTrend":{"04/11":"879328.85","04/12":"883954.94","04/13":"84553.04",
	      	"04/14":"394407.03","04/15":"740889.75","04/16":"343247.77"},
	      	"receivableRatioTrend":{"04/11":"24","04/12":"4","04/13":"24","04/14":"22",
	      	"04/15":"7","04/16":"29"}
	      	},
	      	scorecardChart: {
						"amountCashed": "525600",
						"amountCashedPercent": "74.00%",
						"arrearageAmountCashed": "184700",
						"arrearageAmountCashedPercent": "26%"
					},
      		activeCenterName:'centerName1',
      		scoreCardData:{
      				"powerPoints": 85.0,
      				"powerPointsState": "green",
      				"creditPoints": 80.0,
      				"creditPointsState": "green",
      				"buttonState": "green",
      				"buttonStateText": "建议通过",
      				"list": [{
      					"name": "百果园",
      					"creditLine": "713,033.63",
      					"creditPeriod": "2018-12-30",
      					"discountRate": "60",
      					"singleFinancingCeiling": "200,000.00",
      					"interestRate": "0.053",
      					"overdueRate": "0.082",
      					"marginRate": "1.3",
      					"chargeRate": "1.3",
      					"adminSupplierRegisterQueryTardeRmSummaryResponse": {
      						"platformName": "百果园",
      						"vendorCode": "jt000685",
      						"vendorName": "广州原鲜农业有限公司",
      						"platformTradingHours": "2.4",
      						"nearlyOneYearSettlementAmount": "3565168.1756",
      						"threeMonthlyAvgAmt": "1,188,389.39",
      						"threeMonthlyReceivableRatio": "98.58%",
      						"settlementAmount": "3565168.1756",
      						"amountPayable": "51210.2844",
      						"settlementMonth": "2018-05 203,150.34",
      						"settlementMinimumMonth": "2018-07 1,557,442.74",
      						"purchaseOrder": "7.67",
      						"invoice": "7.00",
      						"receipts": "6.00",
      						"payingInAdvance": "5.33",
      						"settlementTrend": {
      							"2018-07": "1557442.7379",
      							"2018-06": "1804575.0977",
      							"2018-05": "203150.3400",
      							"2018-04": "0",
      							"2018-03": "0",
      							"2018-02": "0"
      						},
      						"receivableRatioTrend": {
      							"2018-07": "98.50",
      							"2018-06": "98.67",
      							"2018-05": "98.50",
      							"2018-04": "0",
      							"2018-03": "0",
      							"2018-02": "0"
      						}
      					},
      					"scorecardChart": {
      						"amountCashed": "3565168.17",
      						"amountCashedPercent": "98.58%",
      						"arrearageAmountCashed": "50625.388",
      						"arrearageAmountCashedPercent": "1.42%"
      					}
      				}],
      				"enterpriseAbnormalCount": 0,
      				"repreAbnormalCount": 3,
      				"guarantorAbnormalCount": 0
      			},//评分卡数据
      		
					activeCreditName:'credit1',
					
					tableData2: [{
	          amt1: '0',
	          amt3: '0',
	          amt6: '0',
	          amt12: '0',
	          amt24: '0',
	          name: '多头借贷',
	        },{
	          amt1: '0',
	          amt3: '0',
	          amt6: '0',
	          amt12: '0',
	          amt24: '0',
	          name: '多头借贷被拒绝',
	        },{
	          amt1: '0',
	          amt3: '0',
	          amt6: '0',
	          amt12: '0',
	          amt24: '0',
	          name: '逾期30~60天',
	        },{
	          amt1: '0',
	          amt3: '0',
	          amt6: '0',
	          amt12: '0',
	          amt24: '0',
	          name: '逾期60~180天',
	        },{
	          amt1: '0',
	          amt3: '0',
	          amt6: '0',
	          amt12: '0',
	          amt24: '0',
	          name: '逾期180天以上',
	        },{
	          amt1: '0',
	          amt3: '0',
	          amt6: '0',
	          amt12: '0',
	          amt24: '0',
	          name: '逾期180天以上',
	        }],
					
					
					querySignData: {
	        }, // 查询签署
	        rate:{
	        		monthRate:'',//月利率
	        		yearRate:''//年利率
	        },
	        queryGradeData:{
	        	finalGrade:'',
	        	primaryGrade:'',
	        	secondaryGrade:'',
	        	secondaryScore:'',
	        },//授信签署-评级-查询评级数据
	        queryGradeDetailData:{
	        	finalGrade:'',
	        	primaryGrade:'',
	        	secondaryGrade:'',
	        	secondaryScore:'',
	        },//授信签署-评级-查询评级详情数据
					queryCapitalEnterpriseList: '',//资金方列表
      		scoreCardShow:false,//评分卡dialog
	        adminSupplierRegisterQueryTardeRmSummaryResponse:[],//评分卡数组数据
	        
      		supplierId:'', // 供应商ID
	        receivableNo:'',//应收账款编号
	        supplierName:'', //供应商名称
	        financeAmt:'', // 可融金额
	        validDays:'', // 可融期限
	        interest:'',//利息
	        totalAmt:'',//还款总金额
	        applyTime:'',//	申请时间
	        statusText:'',// 状态中文
	        remark:'',//打回原因
	       
		     	activeName2: 'first',
		     		
		     	rejectDialogShow: false, // 不达标原因显示与隐藏dialog
		        rejectRemark: '', // 拒绝原因text
	     		
	     		bankSerialMatchDialogShow: false, // 银行流水显示与隐藏dialog
	     		tradeMatchDialogShow:false,//贸易信息匹配显示与隐藏dialog
	     		bankRlt:'',//银行流水匹配结果：NORMAL-正常 ABNORMAL-异常 NO_RECORD-无记录
	     		tradeRlt:'',//贸易信息匹配结果：NORMAL-正常 ABNORMAL-异常 NO_RECORD-无记录
	     		tradeUnMatch:'',//贸易信息异常条数
	     		
	     		uploadFileData: {
	          financeNo: '',
	          isImage: false
	        },
	        uploadImgData: {
	          financeNo: '',
	          isImage: true
	        },
     	
      }
    },
    watch:{
	  	//监听路由切换回调
	  	'$route':'fetchdata'
	  },
    computed: {
      statusActive () {
        const status = this.status;
        let num = 0
        if (status === 'CAPITAL_APPROVING') {
          num = 0
        } else if (status === 'CAPITAL_SIGNING') {
          num = 1
        } else if (status === 'PASS') {
          num = 2
        } 
        return num
      },
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    created () {
      this.supplierId = this.$route.params.id
      this.uploadFileData.supplierId = this.supplierId
      this.uploadImgData.supplierId = this.supplierId
      if (this.supplierId) {
        this.init()
      }
    },
    mounted () {
    	
    },
    methods: {
    	fetchdata(){
    		//更换路由显示loading图片
    		this.financeNo = this.$route.params.id
    		if (this.financeNo) {
		        //this.init()
		      }
	    },
     	bankSerialMatchSpanMethod({ row, column, rowIndex, columnIndex }){
      	let that = this;
      	if(rowIndex == 0){
      		if(columnIndex == 0||columnIndex == 3){
      			return [1, 2];
      		}else if(columnIndex == 2){
      			return [1, 1];
      		}else{
      			return [0,0];
      		}
      	}else{
      		
      	}
	  	},
	  	handleClick(tab){//评，授
    		if(tab.index==='0'){
    			this.getReceivableDetailData();//授信签署-贸易详情数据
    			this.getQueryGrade();//授信签署-评级-查询评级
    		}else 
    		if(tab.index==='1'){//授信签署
    			this.getQuerySignData();//查看商户授信
    		}
    	},
	  	init () {
	    	this.getDetailHeadInfo();// 查看商户审核详情-头部信息
	    	this.getReceivableDetailData();//授信签署-贸易详情数据
 	    	this.getQueryGrade();//授信签署-评级-查询评级
	  	}, // 初始化
	  	getReceivableDetailData(){//获取授信签署-贸易详情
	  		merchantsDetail.receivableDetail(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	this.receivableDetailData = res.data.data
          } else {
            that.$message.error(res.data.message)
          }
        }).catch(() => {})
	  	},
	  	getMerchantsDetail () {
	  		let that = this;
	        merchantsDetail.detail(this.supplierId).then(res => {
	          	if (res.data.code === '200'){
	          		that.queryCreditData = res.data.data;
	          	}
	        })
	  	}, // 	融资详情信息
	  	getDetailHeadInfo (){
	  		merchantsDetail.detailHeadInfo(this.supplierId).then(res => {
	          if (res.data.code === '200') {
	          	this.headInfoData = res.data.data
	          	this.status = res.data.data.status
	          	this.statusText = res.data.data.statusText
	          } else {
	            that.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	  	},//获取头部信息
	  	getContractStatus (){
	  		merchantsDetail.contractStatus(this.supplierId).then(res => {
	          if (res.data.code === '200') {
	          	this.contractStatusData = res.data.data;
	          	this.contractDialogShow = true;
	          } else {
	            that.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	  	},//查询合同状态
	  	getScoreCardData (){
	  		merchantsDetail.creditScore(this.supplierId).then(res => {
	          if (res.data.code === '200') {
	          	this.scoreCardData = res.data.data;
	          } else {
	            that.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	  	},//获取评分卡数据
	  	
		    resetBankserial(type){
		      	let that = this;
		      	this.doMoreBankSerial(type);
		    },//重置银行流水  提交
		    saveUpdateCredit(){
		    	let that = this;
	    		let supplierId =this.supplierId;
	    		let totalCreditLine = '';
	    		let creditLineExpireTime = '';
	      	let creditAndIterestRate = [];
	    		if(this.queryCreditData.totalCreditLine){
	    			totalCreditLine = this.queryCreditData.totalCreditLine;
	    		}else{
	    			this.$message.error("总授信额度不能为空")
	    			return
	    		}
	    		if(this.queryCreditData.creditLineExpireTime){
	    			if((typeof this.queryCreditData.creditLineExpireTime)=== 'object' ){
	    				creditLineExpireTime = Format(this.queryCreditData.creditLineExpireTime, 'yyyy-MM-dd');
	    			}else{
	    				creditLineExpireTime = this.queryCreditData.creditLineExpireTime
	    			}
	    		}else{
	    			this.$message.error("授信额度届满日不能为空")
	    			return
	    		}
	    		if(this.queryCreditData.creditAndIterestRates.length>0){
	    			creditAndIterestRate = this.queryCreditData.creditAndIterestRates
	    		}
	      	for(var i=0;i<creditAndIterestRate.length;i++){
	      		if(!creditAndIterestRate[i].creditLine){
	      			this.$message.error("核心企业授信额度输入有误")
	      			return false;
	      		}
	      		if(!creditAndIterestRate[i].interestRate){
	      			this.$message.error("日利率输入有误")
	      			return false;
	      		}
	      		if(!creditAndIterestRate[i].overdueRate){
	      			this.$message.error("	逾期日利率输入有误")
	      			return false;
	      		}
	      		if(!creditAndIterestRate[i].marginRate){
	      			this.$message.error("保证金比例输入有误")
	      			return false;
	      		}
	      		if(!(creditAndIterestRate[i].chargeRate>=0)){
	      			this.$message.error("手续费比例输入有误")
	      			return false;
	      		}
	      		if(!creditAndIterestRate[i].discountRate){
	      			this.$message.error("每笔账款融资比例输入有误")
	      			return false;
	      		}
	      		if(!creditAndIterestRate[i].canMeltDays){
	      			this.$message.error("可融期限输入有误")
	      			return false;
	      		}
	      		
	      	}
	      	creditAndIterestRate = JSON.stringify(creditAndIterestRate);
	      	let data = {
	      		supplierId:supplierId,
	      		totalCreditLine:totalCreditLine,
	      		creditLineExpireTime:creditLineExpireTime,
	      		creditAndIterestRate:creditAndIterestRate
	      	}
	      	merchantsDetail.updateCredit(data).then(res =>{
	      		if(res.data.code === '200'){
	      			this.$message.success(res.data.message)
	      			this.getMerchantsDetail();//刷新商户授信
	//	      			this.getBankSerialMatch();//银行流水匹配刷新
	//	      			this.getRiskResult();//风控审查刷新
	      		}else{
	      			this.$message.error(res.data.message)
	      		}
	      	}).catch(()=>{})
	    },// 保存银行流水  提交
	  	approveFinal (type) {
	        let supplierId =this.supplierId;
	        let data = {
	          supplierId: supplierId,
	          remark: ''
	        }
	        var that = this;
	        // 拒绝
	        if (!type) {
	          if (!validContent(that.rejectRemark)) {
	            that.$message.error('拒绝原因不能为空')
	            return
	          }
	          data.remark = that.rejectRemark.trim()
	          merchantsDetail.refuse(data).then(res => {
		          if (res.data.code === '200') {
		            that.$message.success(res.data.message)
		            that.getDetailHeadInfo();
		            that.contractDialogShow = false
		            that.rejectDialogShow = false
		          } else {
		            that.$message.error(res.data.message)
		          }
		        }).catch(() => {})
	          data.pass = false
	          data.remark = that.rejectRemark.trim()
	        }else{
	        	// 通过提交
	        	merchantsDetail.confirmPass(supplierId).then(function(res){
		          if (res.data.code === '200') {
		            that.$message.success(res.data.message)
		            that.getDetailHeadInfo();
		            that.contractDialogShow = false
		            that.rejectDialogShow = false
		          } else {
		            that.$message.error(res.data.message)
		          }
		        }).catch(() => {})
	        }
	  	}, // 拒绝   通过  提交
	  	loanCapticalSign (){
	  		let that = this;
	        let supplierId =this.supplierId;
	        merchantsDetail.capticalSign(supplierId).then(function(res){
	          if (res.data.code === '200') {
	            that.$message.success(res.data.message)
	            that.getDetailHeadInfo();		
	      			that.activeName2 = 'second';
	            that.contractDialogShow = false
	            that.rejectDialogShow = false
	          } else {
	            that.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	  	},//审批通过并签署协议
	  	doApproveFinal (type) {
	     	this.rejectRemark = ''
	      	this.rejectDialogShow = true
	  	}, // 拒绝 按钮
	  	doPass () {
	        this.$confirm(`确认后, 将进入签署合同流程.`, '确认通过？', {
		        confirmButtonText: '确定',
		        cancelButtonText: '取消',
		        type: 'warning'
		      }).then(() => {
		      	let type = true;
		        this.approveFinal(type)
		      }).catch(() => {
		      })
	  	}, // 确定达标 按钮
	  	doPassCapticalSign () {
	  		let that = this;
	        this.$confirm(`审批通过后，将自动签署协议，并发送消息给商户。`, ' 确认通过？', {
		        confirmButtonText: '确定',
		        cancelButtonText: '取消',
		        type: 'warning'
		      }).then(() => {
	  			this.activeName2='second'
	  			this.isDemo = true;
		        that.loanCapticalSign();
		      }).catch(() => {
		      })
	  	}, //审批通过并签署协议
	  	messagePush(type,guarantorId){//发送消息推送
	      	let _id ='';
	      	if(guarantorId){
	      		_id = guarantorId;
	      	}else{
	      		_id = this.supplierId;
	      	}
	      	merchantsDetail[type](_id).then(res => {
		          if (res.data.code === '200') {
		          	this.$message.success(res.data.message)
		          } else {
		            this.$message.error(res.data.message)
		          }
		      })
	      },
      createFactorContract  (){//生成保理合同
      	merchantsDetail.createFactorContract(this.supplierId).then(res => {
	          if (res.data.code === '200') {
	          	this.$message.success(res.data.message)
	          	this.getContractStatus();
	          } else {
	            this.$message.error(res.data.message)
	          }
	      })
      },
      createGuaranteeContract(guarantorId){//生成保证合同
      	merchantsDetail.createGuaranteeContract(guarantorId).then(res => {
	          if (res.data.code === '200') {
	          	this.$message.success(res.data.message)
	          	this.getContractStatus();
	          } else {
	            this.$message.error(res.data.message)
	          }
	      })
      },
      doScorecard(){
      	merchantsDetail.queryGradeDetail(this.supplierId).then(res => {
	        if (res.data.code === '200') {
	        	if(res.data.data){
	        		this.queryGradeDetailData = res.data.data;
	        		this.adminSupplierRegisterQueryTardeRmSummaryResponse = res.data.data.adminSupplierRegisterQueryTardeRmSummaryResponse;
	        	}
	        } else {
	          this.$message.error(res.data.message)
	        }
	      })
      	this.scoreCardShow = true;
      },//查询评分卡数据
      getQuerySignData () {
        merchantsDetail.queryCredit(this.supplierId).then(res => {
          if (res.data.code === '200') {
            this.querySignData = res.data.data
            this.rate.monthRate = res.data.data.monthRate
            this.rate.yearRate = res.data.data.yearRate
            if(!this.querySignData.bankAccountNo){
            	this.querySignData.bankAccountNo = this.queryVerifyData.centres[0].bankAccountNo
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      }, // 查询签署
      changeRate(loanRate){//获取年利率，月利率
      	merchantsDetail.calculatedInterest(loanRate).then(res => {
          if (res.data.code === '200') {
            this.rate.monthRate = res.data.data.monthRate
            this.rate.yearRate = res.data.data.yearRate
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getQueryGrade () {
        merchantsDetail.queryGrade(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	if(res.data.data){
          		this.queryGradeData = res.data.data
          	}
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      }, // 授信签署-评级-查询评级
      getQueryEvaluateGrade () {
        merchantsDetail.evaluateGrade(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	if(res.data.data){
          		this.queryGradeData = res.data.data
          	}
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      }, // 授信签署-评级-重新评级
      getQueryGradeDetail () {
        merchantsDetail.queryGradeDetail(this.supplierId).then(res => {
          if (res.data.code === '200') {
            this.queryGradeDetailData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      }, //授信签署-评级-查询评级详情
      handleUpdateSign () {
      	if(!this.querySignData.totalCreditLine&&this.querySignData.totalCreditLine!==0){
      		this.$message.error('总授信额度不能为空！');
      		return;
      	}
      	if(!this.querySignData.creditLineExpireTime){
      		this.$message.error('融资额度的届满日不能为空！');
      		return;
      	}
        let data =  baseUtil.copy(this.querySignData);
        data.supplierId = this.supplierId
        if((typeof data.creditLineExpireTime)=='object'){
        	data.creditLineExpireTime = Format(data.creditLineExpireTime, 'yyyy-MM-dd')
        }
        data.creditAndIterestRate = JSON.stringify(data.creditAndIterestRates)
        merchantsDetail.updateCredit(data).then(res => {
          if (res.data.code === '200') {
            this.$message.success(res.data.message)
            this.getQuerySignData()
            this.getQueryGrade();//授信签署-评级-查询评级
            this.getQueryReview()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 修改签署 提交

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "MerchantsAuditDetail.scss";
</style>
