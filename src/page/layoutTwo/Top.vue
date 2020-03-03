<template>
  <div class="ed_top">
  	<div class="ed_top_title">
  		{{enterpriseTopData.enterpriseName}}
  	</div>
  	<div class="ed_top_content" v-if="false">
  		<div class="" style="min-width: 900px;">
  			<el-steps :active="statusActive" finish-status="success"  wait="error">
				  <el-step 
				  	v-for="item in enterpriseTopData.statusInfo" 
				  	:title="item.statusText" 
				  	:status="item.light=='YELLOW'?'process':item.light=='GREEN'?'success':'wait'" 
				  	:key="status">
				  </el-step>
				</el-steps>
  		</div>
  		
		<!--<el-button style="margin-top: 12px;" @click="next">下一步</el-button>-->
  	</div>
  </div>
</template>

<script>
	
//import enterpriseData from '@/api/enterpriseDataManage/enterpriseData'
export default {
  	data () {
	    return {
	    	 enterpriseTopData:'',//头部数据
	    	 status:'',//
	    }
  	},
    computed: {
	    statusActive () {
	        const status = this.status;
	        let num = 0
	        if(status==='APPLY'){//申请登记
	        	num = 0;
	        } else if(status==='SUPPLY'){//补充资料
	        	num = 1;
	        } else if(status==='SUPPLY'){//补充资料
	        	num = 2;
	        } else if(status==='CHECK'){//初审尽职调查
	        	num = 3;
	        } else if(status==='RECHECK'){//复审
	        	num = 4;
	        } else if(status==='FINALFIRST'){//终审一审
	        	num = 5;
	        } else if(status==='FINALSECOND'){//终审二审
	        	num = 6;
	        } else if(status==='PASS'){//审批通过
	        	num = 7;
	        }
	        return num
	    },
    },
  	watch: {
  		enterpriseTopData(val,oldVal){
  			this.enterpriseTopData = val;
  		}
  	},
    created () {
      this.supplierCapitalId = this.$route.params.id
      this.$store.dispatch('getEnterpriseTopData',this.supplierCapitalId)
      
      if (this.supplierCapitalId) {
        this.init()
      }
    },
    mounted () {
    	let that = this;
    	setTimeout(function(){
    		that.enterpriseTopData = that.$store.state.app.enterpriseTopData
    	},1000)
    	setTimeout(function(){
    		that.enterpriseTopData = that.$store.state.app.enterpriseTopData
    	},3000)
    },
  	methods: {
  		init(){
//			this.getDetailTop();
  		},
  		next() {
	        if (this.active++ > 2) this.active = 0;
	   	},
  		getDetailTop (){
  			enterpriseData.detailTop(this.supplierCapitalId).then(res => {
          if (res.data.code === '200') {
          	this.enterpriseTopData = res.data.data;
          	this.status = res.data.data.status;
          } else{
          	this.$message.error(res.data.message)
          }
        })
  		}
  		
  	},
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ed_top{
	background-color: #fff;
	min-height: 40px;
}
.ed_top_title{
	line-height: 40px;
	height: 40px;
	background-color: #f5f7fa;
	padding-left: 30px;
	font-size: 14px;
}

.ed_top_content{
	height: 120px;
	display: flex;
    align-items: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-justify-content: center;
}
</style>
