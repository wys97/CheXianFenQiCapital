<template>
  <div class="container">
    <div v-if="isLookImg" ref="lookImgBox" @click="clearImg"  class="look_img_box">
      <div ref="rotateImg" class="look_img_img" :style="{backgroundImage:'url('+lookImgSrc+')'}">
      </div>
      <div class="rotateBtnRow">
        <div @click.stop="rotateImg('left')" class="rotateBtn">
          <i class="iconfont icon-rotate-left"></i>
        </div>
        <div @click.stop="rotateImg('right')" class="rotateBtn">
          <i class="iconfont icon-rotate-right"></i>
        </div>
      </div>
    </div>
    <div class="top">
      <ul class="flex-item">
        <li>{{headInfoData.enterpriseName}}</li>
        <li>注册时间：{{headInfoData.createTime}}</li>
      </ul>
    </div>
    <div class="content">
      <div class="flex-item">
        <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
        	<el-tab-pane label="授信信息" name="first">
            <div class="tab-content">
            	<div class="info-list">
            		<p class="title">授信额度明细</p>
            		<el-row>
								  <el-col :span="5" :offset="3">
								  	<div style="width: 120px;height: 120px;border-radius: 50%;text-align: center;line-height: 120px; background-color: #f5f7fa;">
								  		{{signDetailData.surplusLimit?signDetailData.surplusLimit:'--'}}
								  	</div>
								  	<div style="line-height: 40px;">当前剩余可融额度</div>
								  </el-col>
								  <el-col :span="5" style="padding-top: 30px;">
								  	<p>当前授信额度：{{signDetailData.signLimit?signDetailData.signLimit:'--'}}</p>
								  	<p>已用授信额度：{{signDetailData.usedSignLimit?signDetailData.usedSignLimit:'--'}}</p>
								  </el-col>
								  <el-col :span="5" style="padding-top: 30px;">
								  	<p>初始授信额度：{{signDetailData.initSignLimit?signDetailData.initSignLimit:'--'}}</p>
								  	<p>在途授信额度：{{signDetailData.onSignLimit?signDetailData.onSignLimit:'--'}}</p>
								  </el-col>
								</el-row>
            	</div>
            	<!--各渠道授信明细-->
							<div class="info-list">
                <p class="title">各渠道授信明细</p>
								<template>
							    <el-table
							      :data="signDetailData.channelDatas"
							      border
							      style="width: 100%">
							      <el-table-column
							        prop="name"
							        label="渠道名">
							      </el-table-column>
							      <el-table-column
							        prop="signLimit"
							        label="当前授信额度">
							      </el-table-column>
							      <el-table-column
							        prop="usedSignLimit"
							        label="已用授信额度">
							      </el-table-column>
							      <el-table-column
							        prop="onSignLimit"
							        label="在途授信额度">
							      </el-table-column>
							      <el-table-column
							        prop="surplusLimit"
							        label="当前剩余可融额度">
							      </el-table-column>
							    </el-table>
							  </template>
              </div>
              <!--各渠道资产明细-->
							<div class="info-list">
                <p class="title">各渠道资产明细</p>
                <template >
							    <el-table
							      :data="signDetailData.channelCapitals"
							      border
							      style="width: 100%">
							      <el-table-column
							        prop="name"
							        label="渠道名">
							      </el-table-column>
							      <el-table-column
							        prop="orderAmount"
							        label="订单总额">
							      </el-table-column>
							      <el-table-column
							        prop="orderCount"
							        label="订单量">
							      </el-table-column>
							      <el-table-column
							        prop="financeRatio"
							        label="融资比">
							      </el-table-column>
							      <el-table-column
							        prop="day"
							        label="应收周转天数">
							      </el-table-column>
							      <el-table-column
							        prop="financeAmount"
							        label="应收账款可融总额">
							      </el-table-column>
							    </el-table>
							  </template>
							</div>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="基本信息" name="second">
            <div class="tab-content">
              <div class="enterprise-info info-list">
                <p class="title ">企业信息</p>
                <template v-if="enterpriseData">
                  <ul class="ul-table">
                    <li>
                      <div>企业名称</div><div>{{enterpriseData.name}}</div>
                    </li>
                    <li>
                      <div>统一社会信用代码</div><div>{{enterpriseData.businessLicenseNo}}</div>
                    </li>
                    <li>
                     <div>注册地址</div><div>{{enterpriseData.address}}</div>
                    </li>
                    <li>
                     <div>成立日期</div><div>{{enterpriseData.establishDate}}</div>
                    </li>
                    <li><div>联系电话</div><div>{{enterpriseData.phone}}</div></li>
                    <li><div>传真</div><div>{{enterpriseData.fax}}</div></li>
                  </ul>
                </template>
              </div>
              <!--企业成员名单-->
							<div class="info-list">
                <p class="title">企业成员名单</p>
								<template>
							    <el-table
							      :data="queryManagerData"
							      border
							      style="width: 100%">
							      <el-table-column
							        prop="name"
							        width="100px"
							        label="姓名">
							      </el-table-column>
							      <el-table-column
							        prop="type"
							        width="110px"
							        label="类型">
							      </el-table-column>
							      <el-table-column
							        prop="name"
							        width="90px"
							        label="占股">
							        <template slot-scope="scope">
							        	{{scope.row.shareHolding}}%
							        </template>
							      </el-table-column>
							      <el-table-column
							        prop="identityTypeText"
							        width="120"
							        label="证件类型">
							      </el-table-column>
							      <el-table-column
							        prop="identityNum"
							        width="220px"
							        label="证件号码">
							      </el-table-column>
							      <el-table-column
							        prop="mobile"
							        width="150px"
							        label="手机号">
							      </el-table-column>
							      <el-table-column
							        prop="email"
							        width="240px"
							        label="邮箱">
							      </el-table-column>
							      <el-table-column
							        prop="workingYears"
							        label="从业年数">
							      </el-table-column>
							      <el-table-column
							        prop="files"
							        width="350px"
							        label="证件照片">
							        <template slot-scope="scope">
                        <template v-for="(subItem, subIndex) in scope.row.files">
                        	<img @click="lookImg(queryManagerData[scope.$index].files[subIndex].url)"  :src='queryManagerData[scope.$index].files[subIndex].url' style="max-width: 150px;">
                          <!--<Upload 
                          	v-model="queryManagerData[scope.$index].files[subIndex].key" 
                          	:fileUrl="queryManagerData[scope.$index].files[subIndex].url" 
                          	:dataObj="uploadImgData"  
                          	actionUrl="/capital-api/supplier_register/upload_image_file"></Upload>-->
                        </template>
                    	</template>
							      </el-table-column>
							    </el-table>
							  </template>
              </div>
              <!--企业附件-->
							<div class="info-list">
                <p class="title">企业附件</p>
                <template >
							    <el-table
							      :data="queryPaperData"
							      border
							      style="width: 100%">
							      <el-table-column
							        prop="typeText"
							        label="证件类型">
							      </el-table-column>
							      <el-table-column
							        prop="startDate"
							        label="起始日期"
							        width="160">
							      </el-table-column>
							      <el-table-column
							        prop="endDate"
							        label="失效日期"
							        width="160">
							      </el-table-column>
							      <el-table-column
							        prop="status"
							        width="100px"
							        label="证件状态">
							        <template slot-scope="scope">
							        	<div>{{scope.row.status}}</div>
							        </template>
							      </el-table-column>
							      <el-table-column
							        prop="approvalStatusText"
							        width="100px"
							        label="审批状态">
							        <template slot-scope="scope">
							        	<div>{{scope.row.approvalStatusText}}</div>
							        </template>
							      </el-table-column>
							      <el-table-column
							        prop="uploadDate"
							        label="上传时间"
							        width="160">
							      </el-table-column>
							      <el-table-column
							        prop="files"
							        width="350px"
							        label="证件照片">
							        <template slot-scope="scope">
                        <template v-for="(subItem, subIndex) in scope.row.files">
                          <img @click="lookImg(subItem.url)"  :src='subItem.url' style="max-width: 150px;">
                          <!--<Uploads 
                          	v-model="queryPaperData[scope.$index].files[subIndex].key" 
                          	:fileUrl="queryPaperData[scope.$index].files[subIndex].url" 
                          	:dataObj="uploadImgData"  
                          	actionUrl="/capital-api/supplier_register/upload_image_file"></Uploads>-->
                        </template>
							        </template>
							      </el-table-column>
							    </el-table>
							  </template>
							</div>
             	<!--担保人信息-->
             	<div class="info-list">
                <p class="title">担保人信息</p>
                <template v-if="guarantorData">
                  <ul class="ul-table" v-for="item in guarantorData" style="margin-bottom: 30px;">
                    <li>
                      <div>担保人姓名</div><div>{{item.name}}</div>
                    </li>
                    <li>
                      <div>担保人身份证号</div><div>{{item.identityNo}}</div>
                    </li>
                    <li>
                      <div>担保人联系地址</div><div>{{item.address}}</div>
                    </li>
                    <li><div>担保人手机号</div><div>{{item.mobile}}</div></li>
                    <li><div>担保人邮箱</div><div>{{item.email}}</div></li>
                    <li style="height: 200px;">
                    	<div style="padding-top: 90px;">担保人身份证</div>
                    	<div style="overflow: hidden">
                    		<img v-if="item.identityFrontUrl" @click="lookImg(item.identityFrontUrl)" alt="正面" :src='item.identityFrontUrl' style="max-height: 180px;">
                    		<img v-if="item.identityBackUrl" @click="lookImg(item.identityBackUrl)" alt="反面" :src='item.identityBackUrl' style="max-height: 180px;">
                    	</div>
                    </li>
                    <li><div>担保人评估价值</div><div>{{item.guaranteeValue}}元</div></li>
                  </ul>
                </template>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="贸易信息" name="third">
            <div class="tab-content">
            	<!--担保人信息-->
             	<!--<div class="info-list" >
                <p class="title">担保人信息</p>
                <template v-if="guarantorData">
                  <ul class="ul-table" v-for="item in guarantorData" style="margin-bottom: 30px;">
                    <li>
                      <div>担保人姓名</div><div>{{item.name}}</div>
                    </li>
                    <li>
                      <div>担保人身份证号</div><div>{{item.identityNo}}</div>
                    </li>
                    <li>
                      <div>担保人联系地址</div><div>{{item.address}}</div>
                    </li>
                    <li><div>担保人手机号</div><div>{{item.mobile}}</div></li>
                    <li><div>担保人邮箱</div><div>{{item.email}}</div></li>
                    <li style="height: 200px;">
                    	<div style="padding-top: 90px;">担保人身份证</div>
                    	<div style="overflow: hidden">
                    		<img @click="lookImg(item.identityFrontUrl)" alt="正面" :src='item.identityFrontUrl' style="max-height: 180px;">
                    		<img @click="lookImg(item.identityBackUrl)" alt="反面" :src='item.identityBackUrl' style="max-height: 180px;">
                    	</div>
                    </li>
                    <li><div>担保人评估价值</div><div>{{item.guaranteeValue}}</div></li>
                  </ul>
                </template>
              </div>-->
              <div v-for="(item,index) in tradeInfoData" :key="index" class="div-table">
                <p class="title">{{item.name}}</p>
                <ul class="ul-table">
                  <li><div>分销商关联编码：</div><div>{{item.id}}</div></li>
                  <li><div>合同签署企业名称：</div><div>{{item.companyName}}</div></li>
                  <li><div>签署企业社会统一信用代码：</div><div>{{item.businessLicense}}</div></li>
                  <li><div>基础交易合同名称：</div><div>{{item.contractName}}</div></li>
                  <li><div>基础交易合同编号：</div><div>{{item.contractNum}}</div></li>
                  <li><div>合同有效期：</div><div>{{item.validDate}}</div></li>
                  <li><div>回款银行：</div><div>{{item.bankCode}}</div></li>
                  <li><div>回款银行网点：</div><div>{{item.bankBranch}}</div></li>
                  <li><div>回款银行账号：</div><div>{{item.bankAccountNum}}</div></li>
                  <li style="height: 200px;"><div style="padding-top: 90px;">合作合同附件：</div>
                    <div style="overflow: hidden">
                      <img @click="lookImg(subItem.url)"  style="max-height: 180px;margin-right:20px;" alt="合作合同" :src='subItem.url' :key="subIndex" v-for="(subItem, subIndex) in item.files">
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div> <!--tab-->
      <div class="flex-item">
        <ul class="right-ul">
          <li class="background-gray color-black">
            <div>操作</div>
            <div></div>
          </li>
        </ul>
      </div> <!--左侧操作栏-->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Upload from '@/components/Upload/Upload'
  import NoteChart from '@/components/charts/noteChart'
  import PieChart from '@/components/charts/pieChart'
  import { comboboxBankList } from '@/api/common'
	import merchantDetail   from '@/api/merchantManage/merchantDetail'
  import baseUtil from '@/utils/baseUtil'
  import { validContent } from '@/utils/validate'
  import { Format } from '@/utils/index'

  export default {
    name: 'merchantDetail',
    components: { Upload ,NoteChart,PieChart},
    data () {
      return {
        supplierId: '', // 供应商id
        signDetailData:'',//授信详情数据
        enterpriseData:{},//企业信息
        queryManagerData:[],//成员名单数据
        queryPaperData:[],//征信附件数据
        guarantorData:[],//担保人信息
        tradeInfoData:[],//贸易信息
        headInfoData:{},//头部信息
        count: 0,
        activeTab: 'first',
        isLookImg:false,
        lookImgSrc:'',
        deg:0,//图片旋转的角度
        uploadFileData: {
          orderNo: '',
          isImage: false
        },
        uploadImgData: {
          orderNo: '',
          isImage: true
        },
      }
    },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ]),
      passDisabled () {
        if (this.registerStatus === 'REAPPROVING' || this.registerStatus === 'APPROVING' || this.registerStatus === 'AMENDING') {
          return false
        }
        return true
      },
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    watch: {
      centreList(val,oldVal){
        for (let i=0;i<val.length;i++) {
          if(val.remark===true){
            this.centreCheckList.push(val.id);
          }
        }
      }
    },
    created () {
      this.supplierId = this.$route.params.id
      if (this.supplierId) {
        this.init()
      }
    },
    mounted () {
    },
    methods: {
      handleClick(tab){//授,基，贸
      	if(tab.index==='0'){
      		this.getSignDetail();//授信信息
        }else if(tab.index==='1'){
      		this.basicInfo();//基本信息
        }else if(tab.index==='2'){
      		this.getTradeInfoData();//贸易资料
        }
      },
      lookImg (imgSrc){//查看图片
        this.deg = 0;
        var that = this;
        that.lookImgSrc = imgSrc;
        that.isLookImg = true;
      },
      clearImg(){//点击图片隐藏
        this.deg = 0;
        var that = this;
        that.isLookImg = false;
      },
      rotateImg(type){//旋转图片
        let deg = this.deg;
        if(type==='left'){
          this.deg-=90;
        }else{
          this.deg+=90;
        }
        let _height = window.getComputedStyle(this.$refs.lookImgBox).height;
        let _width = window.getComputedStyle(this.$refs.lookImgBox).width;
        if(this.isNineTenMutiple(this.deg)){
          this.$refs.rotateImg.style.width = _width;
          this.$refs.rotateImg.style.marginLeft = 'auto';
        }else{
          this.$refs.rotateImg.style.width = parseFloat(_height)-30+'px';
          this.$refs.rotateImg.style.marginLeft = (parseFloat(_width)-parseFloat(_height))/2+'px';
        }
        this.$refs.rotateImg.style.transform = 'rotate('+this.deg+'deg)'
      },
      isNineTenMutiple(number){
        var isTen=number/90;
        if(isTen%2==0){//偶数
          return true;
        }else{//奇数
          return false;
        }
      },
      init () {
      	this.getHeadInfo();// 顶部数据
      	this.getSignDetail();//获取授信信息
      }, // 初始化
      basicInfo(){
      	this.getEnterprise();
      	this.getGuarantor();
      	this.getQueryManager();//成员名单列表查询------------查询
      	this.getQueryPaper();//企业附件列表查询------------查询
      },
      getSignDetail () {//获取授信信息
      	merchantDetail.signDetail(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	this.signDetailData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getEnterprise () {//获取企业信息
      	merchantDetail.enterprise(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	this.enterpriseData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getQueryManager(){//成员名单列表查询------------查询
      	merchantDetail.queryManager(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	this.queryManagerData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getQueryPaper(){//企业附件列表查询------------查询
      	merchantDetail.queryPaper(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	this.queryPaperData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
      getGuarantor () {//获取担保人信息
      	merchantDetail.guarantor(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	this.guarantorData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      
      getTradeInfoData () {
        merchantDetail.queryDistributor(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	this.tradeInfoData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 贸易资料
      getHeadInfo () {
        merchantDetail.headInfo(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	this.headInfoData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 顶部数据
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "merchantDetail.scss";
</style>
