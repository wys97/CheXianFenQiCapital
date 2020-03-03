<template>
	<div>
		<!--实际控制人-->
		<el-collapse @change="changeVerifyController" v-model="activeVerifyControllerNames" class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	  实际控制人
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="lh_title">实际控制人信息</div>
			    	<div class="info-list">
			    		<el-form-item label="是否是法定代表人：">
			    			<span v-if="readOnly" class="input_read">{{controllerData.representativeText}}</span>
							<template v-else>
								<el-radio-group @change="changeRepresentative" v-model="controllerData.representative">
									<el-radio :label="1">是</el-radio>
									<el-radio :label="0">否</el-radio>
								</el-radio-group>
							</template>
			    		</el-form-item>
			    		<el-form-item label="姓名：">
			    			<span v-if="readOnly" class="input_read">{{controllerData.name}}</span>
							<el-input  v-else v-model="controllerData.name"  style="width: 300px;">
	                		</el-input>
						</el-form-item>
						<el-row>
						  	<el-col :span="12">
							  	<el-form-item label="身份证号：">
									<span v-if="readOnly" class="input_read">{{controllerData.idcardNo}}</span>
									<el-input v-else v-model="controllerData.idcardNo"  style="width: 300px;">
			                		</el-input>
								</el-form-item>
						  	</el-col>
						  	<el-col :span="12">
							  	<el-form-item label="性别：">
									<template>
										<span v-if="readOnly" class="input_read">{{controllerData.genderText}}</span>
										<el-radio-group v-else v-model="controllerData.gender">
											<el-radio label="MALE">男</el-radio>
											<el-radio label="FEMALE">女</el-radio>
										</el-radio-group>
									</template>
								</el-form-item>
						  	</el-col>
						</el-row>
			    		<el-form-item label="地址：">
							<span v-if="readOnly" class="input_read">{{controllerData.address}}</span>
							<el-input v-else v-model="controllerData.address"  style="width: 300px;">
	                		</el-input>
						</el-form-item>
			    		<el-form-item label="手机号：">
							<span v-if="readOnly" class="input_read">{{controllerData.mobile}}</span>
							<el-input v-else v-model="controllerData.mobile"  style="width: 300px;">
	                		</el-input>
						</el-form-item>
			    		<el-form-item label="邮箱：">
							<span v-if="readOnly" class="input_read">{{controllerData.email}}</span>
							<el-input v-else v-model="controllerData.email"  style="width: 300px;">
	                		</el-input>
						</el-form-item>
			    		<el-form-item label="身份证：">
	                		<template>
	                          <Upload
	                          	v-model="controllerData.idcardPicFrontKey"
	                          	:fileUrl="controllerData.idcardPicFront"
	                          	:dataObj="uploadImgData"
	                          	actionUrl="/capital-api/supply_data/upload_image_file"></Upload>
	                        </template>
	                        <template>
	                          <Upload
	                          	v-model="controllerData.idcardPicBackKey"
	                          	:fileUrl="controllerData.idcardPicBack"
	                          	:dataObj="uploadImgData"
	                          	actionUrl="/capital-api/supply_data/upload_image_file"></Upload>
	                        </template>
						</el-form-item>
			    		<el-form-item label="学历：">
	                		<template slot-scope="scope">
	                			<span v-if="readOnly" class="input_read">{{controllerData.educationBackgroundText}}</span>
					        	<el-select v-else  v-model="controllerData.educationBackground"  placeholder="请选择">
								    <el-option v-for="item in educationBackgroundList" :key="item.type" :label="item.typeText" :value="item.type"></el-option>
								</el-select>
					       	</template>
						</el-form-item>
			    		<el-form-item label="婚姻状况：">
	                		<template slot-scope="scope">
	                			<span v-if="readOnly" class="input_read">{{controllerData.maritalStatusText}}</span>
					        	<el-select v-else  v-model="controllerData.maritalStatus"  placeholder="请选择">
								    <el-option v-for="item in maritalStatusList" :key="item.status" :label="item.statusText" :value="item.status"></el-option>
								</el-select>
					       	</template>
						</el-form-item>
			    		<el-form-item label="本地户口：">
	                		<template>
	                			<span v-if="readOnly" class="input_read">{{controllerData.localResidentText}}</span>
								<el-radio-group v-else v-model="controllerData.localResident">
									<el-radio :label="1">是</el-radio>
									<el-radio :label="0">否</el-radio>
								</el-radio-group>
							</template>
						</el-form-item>
						<div v-if="!readOnly" style="text-align: right;">
		                  <el-button  @click="doSaveController" v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"  type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
    <!--企业信息-->
    <el-collapse @change="changeVerifiyEnterprise" v-model="activeVerifyEnterpriseInfo" class="marginBotten">
      <el-collapse-item name="enterpriseInfo">
        <template slot="title">
          企业信息
        </template>
        <el-form  label-width="170px" size="mini" label-position="right">
          <div class="info-list">
            <el-form-item label="营业年数：">
              <div style="width: 300px;">
                <span v-if="readOnly" class="input_read">{{enterpriseData.operatingYears}} 年</span>
                <el-input v-else v-model="enterpriseData.operatingYears">
                  <template slot="append">年</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="经营地情况：">
              <span v-if="readOnly" class="input_read">{{enterpriseData.officeStableText}}</span>
              <template v-else>
                <el-radio-group v-model="enterpriseData.officeStable">
                  <div v-for="(val,key) in officeStableList">
                    <el-radio  :label="key" :key="key">{{val}}</el-radio>
                  </div>
                </el-radio-group>
              </template>
            </el-form-item>
            <el-form-item label="投资背景上溯年数：">
              <div style="width: 300px;">
                <span v-if="readOnly" class="input_read">{{enterpriseData.shareholderYears}} 年</span>
                <el-input v-else v-model="enterpriseData.shareholderYears">
                  <template slot="append">年</template>
                </el-input>
              </div>
            </el-form-item>
            <div v-if="!readOnly" style="text-align: right;">
              <el-button  @click="doSaveEnterprise" v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"  type="primary" size="mini">保存</el-button>
            </div>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
		<!--企业销售情况-->
		<el-collapse @change="changeVerifyEnterpriseSale" v-model="activeVerifyEnterpriseSaleNames" class="marginBotten">
			<el-collapse-item name="enterpriseSaleOne">
			    <template slot="title">
			        	企业销售情况
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<!--企业销售情况-->
					<div class="info-list">
			    		<div class="lh_title">自有系统平台销售数据（金额单位：万元）</div>
			    		<div class="sale_box">
				    		<template>
							  <el-table
							    :data="tableData"
							    border
							    style="width: 100%">
							    <template v-if="saleStatSelfList.data" v-for="item in saleStatSelfList.data">
								    <el-table-column
								      prop="date"
								      :label="item.key"
								      width="180">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{item.value?item.value:'-'}}</span>
								      	<el-input v-else v-model="item.value"  style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
							    </template>
							  </el-table>
							</template>
							<div class="sale_hj">合计：{{saleStatSelfList.totalAmt}}</div>
			    		</div>
			    	</div>
			    	<div class="info-list">
			    		<div class="lh_title">第三方数据平台销售数据（金额单位：万元）</div>
			    		<div class="sale_box" v-if="verifyEnterpriseSaleData">
			    			<div class="lh_title">
				    			平台名称：{{verifyEnterpriseSaleData.saleStatTitan.name}}
				    		</div>
				    		<template>
							  <el-table
							    :data="tableData"
							    border
							    style="width: 100%">
							    <template v-if="saleStatTitanList" v-for="item in saleStatTitanList">
								    <el-table-column
								      prop="date"
								      :label="item.key"
								      width="180">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{item.value?item.value:'-'}}</span>
								      	<el-input v-else v-model="item.value"  style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
							    </template>
							  </el-table>
							</template>
							<div class="sale_hj">合计：{{verifyEnterpriseSaleData.saleStatTitan.totalAmt}}</div>
						</div>
						<div v-for="(item,index) in saleStatOthersList" class="sale_box">
				    		<div class="lh_title">
				    			平台名称：
				    			<template>
				    				<span v-if="readOnly">{{item.nameText?item.nameText:'-'}}</span>
						        	<el-select v-else v-model="item.name"  placeholder="请选择">
									    <el-option v-for="(val,key) in thirdPartyPlatformTypeList" :key="key" :label="val" :value="key"></el-option>
									</el-select>
						       	</template>
						       	<el-button v-if="!readOnly" @click="delSaleStatOthers(index)" type="danger" size="mini">删除</el-button>
				    		</div>
				    		<template>
							  <el-table
							    :data="tableData"
							    border
							    style="width: 100%">
							    <template v-if="item.data" v-for="tabItem in item.data">
								    <el-table-column
								      prop="date"
								      :label="tabItem.key"
								      width="180">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{tabItem.value?tabItem.value:'-'}}</span>
								      	<el-input v-else v-model="tabItem.value"  style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
							    </template>
							  </el-table>
							</template>
							<div class="sale_hj">合计：{{item.totalAmt}}</div>
			    		</div>

						<div class="c_f">
							<el-button  v-if="!readOnly" @click="addSaleStatOthers" type="primary" size="mini">新增</el-button>
		                	<el-button  v-if="!readOnly" @click="doSaveEnterpriseSale" class="r_f" type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    	<!--发票银行流水-->
			    	<div class="info-list">
			    		<div class="lh_title">对有正式销售发票的收入验证（金额单位：万元）</div>
			    		<div class="sale_box">
				    		<el-form-item label="验证方式：" style="margin-top: 15px;">
		                		<template>
		                			<span v-if="readOnly" class="input_read">{{verifyInvoiceBankSaleData.invoiceCheckTypeText?verifyInvoiceBankSaleData.invoiceCheckTypeText:'-'}}</span>
									<el-radio-group v-else v-model="verifyInvoiceBankSaleData.invoiceCheckType">
										<el-radio label="JINSHUIKA">金税卡系统月度汇总表</el-radio>
										<el-radio label="TAX_DECLARATION">纳税申报表</el-radio>
										<el-radio label="OTHER">其他</el-radio>
									</el-radio-group>
								</template>
							</el-form-item>
							<template>
							  <el-table
							    :data="tableData"
							    border
							    style="width: 100%">
							    <template v-if="invoiceData" v-for="item in invoiceData.data">
								    <el-table-column
								      prop="date"
								      :label="item.key"
								      width="180">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{item.value?item.value:'-'}}</span>
								      	<el-input v-else v-model="item.value"  style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
							    </template>
							  </el-table>
							</template>
							<div class="sale_hj">合计：{{invoiceData.totalAmt}}</div>
			    		</div>
			    		<div class="lh_title">银行流水（金额单位：万元）</div>
			    		<div class="sale_box">
			    			<div v-for="(item,index) in bankData" class="sale_box">
					    		<el-form-item label="验证方式：" style="margin-top: 15px;">
					    			<template>
					    				<span v-if="readOnly" class="input_read">{{item.nameText?item.nameText:'-'}}</span>
										<el-select v-else v-model="item.name"  placeholder="请选择">
										    <el-option v-for="(val,key) in bankStatTypeList" :key="key" :label="val" :value="key"></el-option>
										</el-select>
							       </template>
						       		<el-button v-if="!readOnly" @click="delBankData(index)" type="danger" size="mini">删除</el-button>
					    		</el-form-item>
					    		<template>
								  <el-table
								    :data="tableData"
								    border
								    style="width: 100%">
								    <template v-if="item.data" v-for="tabItem in item.data">
									    <el-table-column
									      prop="date"
									      :label="tabItem.key"
									      width="180">
									      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{tabItem.value?tabItem.value:'-'}}</span>
								      	<el-input v-else v-model="tabItem.value"  style="width: 90%;">
			                				</el-input>
									      </template>
									    </el-table-column>
								    </template>
								  </el-table>
								</template>
								<div class="sale_hj">合计：{{item.totalAmt}}</div>
				    		</div>
			    		</div>
			    		<div style="text-align: left;">
							<el-button v-if="!readOnly" @click="addBankData"  type="primary" size="mini">新增</el-button>
		               	</div>
			    		<div class="lh_title">销售额分析及验证过程</div>
			    		<el-input type="textarea" :rows="4" :disabled="readOnly" v-model="verifyInvoiceBankSaleData.saleAnalysis">
	                	</el-input>
			    		<div class="lh_title">可验证销售总额测算</div>
			    		<span v-if="readOnly" class="input_read">{{verifyInvoiceBankSaleData.saleEstimatedAmount?verifyInvoiceBankSaleData.saleEstimatedAmount:'-'}} 万元</span>
						<el-input v-else v-model="verifyInvoiceBankSaleData.saleEstimatedAmount" style="width: 300px;">
			    			<template slot="append">万元</template>
	                	</el-input>
			    		<div class="lh_title">销售收入的结构</div>
			    		<div class="table_top" style="text-align: center;line-height: 40px;margin-bottom: 20px;">
							<el-row style="margin-bottom: 0;">
								<el-col :span="8" class="table_th">有正式销售发票的销售额的占比</el-col>
								<el-col :span="8" class="table_th">无正式发票但开收据的占比</el-col>
								<el-col :span="8" class="table_th">无任何记录依据的占比</el-col>
							</el-row>
							<el-row style="margin-bottom: 0;">
								<el-col :span="8" class="table_td" style="line-height: 40px;">
									{{verifyInvoiceBankSaleData.official}}
								</el-col>
								<el-col :span="8" class="table_td" style="line-height: 40px;">
									{{verifyInvoiceBankSaleData.informal}}
								</el-col>
								<el-col :span="8" class="table_td" style="line-height: 40px;">
									{{verifyInvoiceBankSaleData.unwritten}}
								</el-col>
							</el-row>
						</div>
			    		<div style="text-align: right;">
							<el-button  v-if="!readOnly"  @click="doSaveBankData" class="r_f" type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
		<!--企业主营业务营运资金循环-->
		<el-collapse @change="changeVerifyBusinessOperatCapital" v-model="activeVerifyBusinessOperatCapitalNames" class="marginBotten">
			<el-collapse-item name="businessOperatCapitalOne">
			    <template slot="title">
			        	  企业主营业务营运资金循环
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list">
			    		<div class="lh_title">运营资金循环简述</div>
			    		<el-input type="textarea" :rows="4" :disabled="readOnly" v-model="verifyBusinessOperatCapitalData.businessTurnover">
	                	</el-input>
			    		<div class="lh_title">主要供应商情况</div>
			    		<template v-if="businessUpstreamData">
						  <el-table
						    :data="businessUpstreamData"
						    border
						    style="width: 100%">
						    <template>
							    <el-table-column
							      prop="name"
							      label="供应商名称">
							      <template slot-scope="scope">
							      	<span v-if="readOnly" class="table_input_read">{{scope.row.name?scope.row.name:'-'}}</span>
							      	<el-input v-else v-model="scope.row.name" style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="product"
							      label="产品 / 服务">
							      	<template slot-scope="scope">
							      		<span v-if="readOnly" class="table_input_read">{{scope.row.productText?scope.row.productText:'-'}}</span>
							        	<el-select v-else v-model="scope.row.product"  placeholder="请选择">
										    <el-option v-for="(val,key) in upDownProductTypeList" :key="key" :label="val" :value="key"></el-option>
										</el-select>
							       	</template>
							    </el-table-column>
							    <el-table-column
							      prop="ratio"
							      label="占比（%）">
							      <template slot-scope="scope">
							      	<span v-if="readOnly" class="table_input_read">{{scope.row.ratio?scope.row.ratio:'-'}}</span>
							      	<el-input v-else v-model="scope.row.ratio" style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="accountPeriod"
							      label="账期（天）">
							      <template slot-scope="scope">
							      	<span v-if="readOnly" class="table_input_read">{{scope.row.accountPeriod?scope.row.accountPeriod:'-'}}</span>
							      	<el-input v-else v-model="scope.row.accountPeriod" style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      accountPeriod
							      v-if="!readOnly"
							      width="120"
							      label="操作">
							      	<template slot-scope="scope">
							        	<el-button  v-if="!readOnly&&businessUpstreamData.length>1"  @click="deleteBusinessUpstream(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
							        	<el-button  v-if="!readOnly&&businessUpstreamData.length===scope.$index+1"  @click="plusBusinessUpstream" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
							        </template>
							    </el-table-column>
						    </template>
						  </el-table>
						</template>
						<div class="lh_title">主要下游客户情况</div>
			    		<template v-if="businessDownstreamData">
						  <el-table
						    :data="businessDownstreamData"
						    border
						    style="width: 100%">
						    <template>
							    <el-table-column
							      prop="name"
							      label="客户名称">
							      <template slot-scope="scope">
							      	<span v-if="readOnly" class="table_input_read">{{scope.row.name?scope.row.name:'-'}}</span>
							      	<el-input v-else v-model="scope.row.name" style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="product"
							      label="产品 / 服务">
							      	<template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.productText?scope.row.productText:'-'}}</span>
								      	<el-select v-else v-model="scope.row.product"  placeholder="请选择">
										    <el-option v-for="(val,key) in upDownProductTypeList" :key="key" :label="val" :value="key"></el-option>
										</el-select>
							       	</template>
							    </el-table-column>
							    <el-table-column
							      prop="ratio"
							      label="占比（%）">
							      <template slot-scope="scope">
							      	<span v-if="readOnly" class="table_input_read">{{scope.row.ratio?scope.row.ratio:'-'}}</span>
							      	<el-input v-else v-model="scope.row.ratio" style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="accountPeriod"
							      label="账期（天）">
							      <template slot-scope="scope">
							      	<span v-if="readOnly" class="table_input_read">{{scope.row.accountPeriod?scope.row.accountPeriod:'-'}}</span>
							      	<el-input v-else v-model="scope.row.accountPeriod" style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      width="120"
							      v-if="!readOnly"
							      label="操作">
							      	<template slot-scope="scope">
							        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_delete']&&businessDownstreamData.length>1"  @click="deleteBusinessDownstream(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
							        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&businessDownstreamData.length===scope.$index+1"  @click="plusBusinessDownstream" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
							        </template>
							    </el-table-column>
						    </template>
						  </el-table>
						</template>
			    		<div class="lh_title">大额应收账款出现回收困难等负面情况</div>
			    		<el-form-item label="是否出现回收困难：">
	                		<template>
	                			<span v-if="readOnly" class="input_read">{{verifyBusinessOperatCapitalData.businessReceivableHard==1?'是':verifyBusinessOperatCapitalData.businessReceivableHard==0?'否':''}}</span>
							    <el-radio-group v-else v-model="verifyBusinessOperatCapitalData.businessReceivableHard">
									<el-radio label="1">是</el-radio>
									<el-radio label="0">否</el-radio>
								</el-radio-group>
							</template>
						</el-form-item>
						<el-form-item label="相关描述：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" v-model="verifyBusinessOperatCapitalData.businessReceivableInfo">
	                		</el-input>
						</el-form-item>
						<div class="lh_title">周转指标测算</div>
						<div class="table_top" style="text-align: center;line-height: 40px;margin-bottom: 20px;">
							<el-row style="margin-bottom: 0;">
								<el-col :span="4" class="table_th">应收账款周转（次/年）</el-col>
								<el-col :span="4" class="table_th">存货周转（次/年）</el-col>
								<el-col :span="4" class="table_th">应付账款周转（次/年）</el-col>
								<el-col :span="4" class="table_th">预付账款周转（次/年）</el-col>
								<el-col :span="4" class="table_th">预收账款周转（次/年）</el-col>
								<el-col :span="4" class="table_th">实际营运资金周转（次/年）</el-col>
							</el-row>
							<el-row style="margin-bottom: 0;">
								<el-col :span="4" class="table_td" style="line-height: 40px;">
							      	<span v-if="readOnly" class="table_input_read">{{verifyBusinessOperatCapitalData.turnoverReceivable?verifyBusinessOperatCapitalData.turnoverReceivable:'-'}}</span>
							      	<el-input v-else v-model="verifyBusinessOperatCapitalData.turnoverReceivable">
	                				</el-input>
								</el-col>
								<el-col :span="4" class="table_td" style="line-height: 40px;">
							      	<span v-if="readOnly" class="table_input_read">{{verifyBusinessOperatCapitalData.turnoverStock?verifyBusinessOperatCapitalData.turnoverStock:'-'}}</span>
							      	<el-input v-else v-model="verifyBusinessOperatCapitalData.turnoverStock">
	                				</el-input>
								</el-col>
								<el-col :span="4" class="table_td" style="line-height: 40px;">
							      	<span v-if="readOnly" class="table_input_read">{{verifyBusinessOperatCapitalData.turnoverPayable?verifyBusinessOperatCapitalData.turnoverPayable:'-'}}</span>
							      	<el-input v-else v-model="verifyBusinessOperatCapitalData.turnoverPayable">
	                				</el-input>
								</el-col>
								<el-col :span="4" class="table_td" style="line-height: 40px;">
							      	<span v-if="readOnly" class="table_input_read">{{verifyBusinessOperatCapitalData.turnoverPaid?verifyBusinessOperatCapitalData.turnoverPaid:'-'}}</span>
							      	<el-input v-else v-model="verifyBusinessOperatCapitalData.turnoverPaid">
	                				</el-input>
								</el-col>
								<el-col :span="4" class="table_td" style="line-height: 40px;">
							      	<span v-if="readOnly" class="table_input_read">{{verifyBusinessOperatCapitalData.turnoverReceived?verifyBusinessOperatCapitalData.turnoverReceived:'-'}}</span>
							      	<el-input v-else v-model="verifyBusinessOperatCapitalData.turnoverReceived">
	                				</el-input>
								</el-col>
								<el-col :span="4" class="table_td" style="line-height: 40px;">
							      	<span v-if="readOnly" class="table_input_read">{{verifyBusinessOperatCapitalData.turnoverActualCapital?verifyBusinessOperatCapitalData.turnoverActualCapital:'-'}}</span>
							      	<el-input v-else v-model="verifyBusinessOperatCapitalData.turnoverActualCapital">
	                				</el-input>
								</el-col>
							</el-row>
						</div>
						<div class="lh_title">依据主要产品的售价、成本、费用，与管理者沟通讨论，估算存纯利润率</div>
				      	<span v-if="readOnly" class="input_read">{{verifyBusinessOperatCapitalData.profitRate?verifyBusinessOperatCapitalData.profitRate:'-'}} %</span>
				      	<el-input  v-else v-model="verifyBusinessOperatCapitalData.profitRate" style="width: 300px;">
	                		<template slot="append">%</template>
						</el-input>

			    		<div style="text-align: right;">
							<el-button  v-if="!readOnly"  @click="doSaveBusinessOperatCapital" class="r_f" type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
		<!--企业负债情况-->
		<el-collapse @change="changeVerifyEnterpriseDebt" v-model="activeVerifyEnterpriseDebtNames" class="marginBotten">
			<el-collapse-item name="enterpriseDebtOne">
			    <template slot="title">
			        	企业负债情况
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list" v-if="verifyEnterpriseDebtData">
			    		<div class="lh_title">金融机构贷款情况</div>
			    		<el-form-item label="存在金融机构贷款：">
							<template>
								<span v-if="readOnly" class="input_read">{{verifyEnterpriseDebtData.finance.hasText}}</span>
							    <el-radio-group v-else v-model="verifyEnterpriseDebtData.finance.has">
									<el-radio :label="true">有</el-radio>
									<el-radio :label="false">无</el-radio>
								</el-radio-group>
							</template>
			    		</el-form-item>
			    		<template v-if="financeInfosList&&verifyEnterpriseDebtData.finance.has">
							<el-table
							    :data="financeInfosList"
							    border
							    style="width: 100%">
							    <template>
								    <el-table-column
								      prop="enterprise"
								      label="授信单位">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.enterprise?scope.row.enterprise:'-'}}</span>
								      	<el-input v-else v-model="scope.row.enterprise" style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="limit"
								      label="额度（万元）">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.limit?scope.row.limit:'-'}}</span>
								      	<el-input v-else v-model="scope.row.limit" style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="balance"
								      label="余额（万元）">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.balance?scope.row.balance:'-'}}</span>
								      	<el-input v-else v-model="scope.row.balance" style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="loanTime"
								      label="放款时间">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.loanTime?scope.row.loanTime:'-'}}</span>
								      	<el-date-picker
								      		v-else
									      v-model="scope.row.loanTime"
									      type="date"
									      placeholder="选择日期">
									    </el-date-picker>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="endTime"
								      label="结束时间">
								      <template slot-scope="scope">
		                				<span v-if="readOnly" class="table_input_read">{{scope.row.endTime?scope.row.endTime:'-'}}</span>
								      	<el-date-picker
								      		v-else
									      v-model="scope.row.endTime"
									      type="date"
									      placeholder="选择日期">
									    </el-date-picker>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="type"
								      label="贷款种类">
								      	<template slot-scope="scope" >
								        	<span v-if="readOnly" class="table_input_read">{{scope.row.typeText?scope.row.typeText:'-'}}</span>
								      		<el-select v-else v-if="loanTypeList" v-model="scope.row.typeText"  placeholder="请选择">
											    <el-option v-for="(val,key) in loanTypeList" :key="key" :label="val" :value="key"></el-option>
											</el-select>
								       	</template>
								    </el-table-column>
								    <el-table-column
								      prop="overdue"
								      label="是否逾期">
								     	<template slot-scope="scope">
								        	<span v-if="readOnly" class="table_input_read">{{scope.row.overdueText?scope.row.overdueText:'-'}}</span>
								      		<el-select v-else v-model="scope.row.overdueText"  placeholder="请选择">
											    <el-option key="1" label="是" value="1">是</el-option>
											    <el-option key="0" label="否" value="0">否</el-option>
											</el-select>
								       	</template>
								    </el-table-column>
								    <el-table-column
								      prop="name"
								      v-if="!readOnly"
								      width="120"
								      label="操作">
								      	<template slot-scope="scope">
								        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_delete']&&financeInfosList.length>1"  @click="deleteFinanceInfos(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
								        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&financeInfosList.length===scope.$index+1"  @click="plusFinanceInfos" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
								        </template>
								    </el-table-column>
							    </template>
							</el-table>
						</template>
			    		<div class="lh_title">非金融机构、互联网金融平台贷款情况</div>
			    		<el-form-item label="存在非金融机构贷款：">
							<template>
								<span v-if="readOnly" class="input_read">{{verifyEnterpriseDebtData.nonfinance.hasText}}</span>
							    <el-radio-group v-else v-model="verifyEnterpriseDebtData.nonfinance.has">
									<el-radio :label="true">有</el-radio>
									<el-radio :label="false">无</el-radio>
								</el-radio-group>
							</template>
			    		</el-form-item>
			    		<template v-if="nonfinanceInfosList&&verifyEnterpriseDebtData.nonfinance.has">
							<el-table
							    :data="nonfinanceInfosList"
							    border
							    style="width: 100%">
							    <template>
								    <el-table-column
								      prop="enterprise"
								      label="授信单位">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.enterprise?scope.row.enterprise:'-'}}</span>
								      	<el-input v-else v-model="scope.row.enterprise" style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="limit"
								      label="额度（万元）">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.limit?scope.row.limit:'-'}}</span>
								      	<el-input v-else v-model="scope.row.limit" style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="balance"
								      label="余额（万元）">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.balance?scope.row.balance:'-'}}</span>
								      	<el-input v-else v-model="scope.row.balance" style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="loanTime"
								      label="放款时间">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.loanTime?scope.row.loanTime:'-'}}</span>
								      	<el-date-picker
								      		v-else
									      v-model="scope.row.loanTime"
									      type="date"
									      placeholder="选择日期">
									    </el-date-picker>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="endTime"
								      label="结束时间">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.endTime?scope.row.endTime:'-'}}</span>
								      	<el-date-picker
								      		v-else
									      v-model="scope.row.endTime"
									      type="date"
									      placeholder="选择日期">
									    </el-date-picker>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="type"
								      label="贷款种类">
								      	<template slot-scope="scope" >
								      		<span v-if="readOnly" class="table_input_read">{{scope.row.typeText?scope.row.typeText:'-'}}</span>
								      		<el-select v-else v-if="loanTypeList" v-model="scope.row.type"  placeholder="请选择">
											    <el-option v-for="(val,key) in loanTypeList" :key="key" :label="val" :value="key"></el-option>
											</el-select>
								       	</template>
								    </el-table-column>
								    <el-table-column
								      prop="overdue"
								      label="是否逾期">
								     	<template slot-scope="scope">
								      		<span v-if="readOnly" class="table_input_read">{{scope.row.overdueText?scope.row.overdueText:'-'}}</span>
								      		<el-select v-else v-model="scope.row.overdue"  placeholder="请选择">
											    <el-option key="1" label="是" value="1">是</el-option>
											    <el-option key="0" label="否" value="0">否</el-option>
											</el-select>
								       	</template>
								    </el-table-column>
								    <el-table-column
								      prop="name"
								      width="120"
								      v-if="!readOnly"
								      label="操作">
								      	<template slot-scope="scope">
								        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_delete']&&nonfinanceInfosList.length>1"  @click="deleteNonfinanceInfos(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
								        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&nonfinanceInfosList.length===scope.$index+1"  @click="plusNonfinanceInfos" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
								        </template>
								    </el-table-column>
							    </template>
							</el-table>
						</template>
			    		<div class="lh_title">股东借款、职工借款、民间借贷、典当等情况</div>
			    		<el-form-item label="是否存在：">
							<template>
								<span v-if="readOnly" class="input_read">{{verifyEnterpriseDebtData.borrow.hasText}}</span>
							    <el-radio-group v-else v-model="verifyEnterpriseDebtData.borrow.has">
									<el-radio :label="true">有</el-radio>
									<el-radio :label="false">无</el-radio>
								</el-radio-group>
							</template>
			    		</el-form-item>
			    		<template v-if="borrowInfosList&&verifyEnterpriseDebtData.borrow.has">
							<el-table
							    :data="borrowInfosList"
							    border
							    style="width: 100%">
							    <template>
								    <el-table-column
								      prop="enterprise"
								      label="授信单位">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.enterprise?scope.row.enterprise:'-'}}</span>
								      	<el-input v-else v-model="scope.row.enterprise" style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="limit"
								      label="额度（万元）">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.limit?scope.row.limit:'-'}}</span>
								      	<el-input v-else v-model="scope.row.limit" style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="balance"
								      label="余额（万元）">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.balance?scope.row.balance:'-'}}</span>
								      	<el-input v-else v-model="scope.row.balance" style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="loanTime"
								      label="放款时间">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.loanTime?scope.row.loanTime:'-'}}</span>
								      	<el-date-picker
								      		v-else
									      v-model="scope.row.loanTime"
									      type="date"
									      placeholder="选择日期">
									    </el-date-picker>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="endTime"
								      label="结束时间">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.loanTime?scope.row.loanTime:'-'}}</span>
								      	<el-date-picker
								      		v-else
									      v-model="scope.row.endTime"
									      type="date"
									      placeholder="选择日期">
									    </el-date-picker>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="type"
								      label="贷款种类">
								      	<template slot-scope="scope" >
								      		<span v-if="readOnly" class="table_input_read">{{scope.row.typeText?scope.row.typeText:'-'}}</span>
								      		<el-select v-else v-if="loanTypeList" v-model="scope.row.type"  placeholder="请选择">
											    <el-option v-for="(val,key) in loanTypeList" :key="key" :label="val" :value="key"></el-option>
											</el-select>
								       	</template>
								    </el-table-column>
								    <el-table-column
								      prop="overdue"
								      label="是否逾期">
								     	<template slot-scope="scope">
								      		<span v-if="readOnly" class="table_input_read">{{scope.row.overdueText?scope.row.overdueText:'-'}}</span>
								      		<el-select v-else v-model="scope.row.overdue"  placeholder="请选择">
											    <el-option key="1" label="是" value="1">是</el-option>
											    <el-option key="0" label="否" value="0">否</el-option>
											</el-select>
								       	</template>
								    </el-table-column>
								    <el-table-column
								      prop="name"
								      v-if="!readOnly"
								      width="120"
								      label="操作">
								      	<template slot-scope="scope">
								        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_delete']&&borrowInfosList.length>1"  @click="deleteBorrowInfos(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
								        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&borrowInfosList.length===scope.$index+1"  @click="plusBorrowInfos" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
								        </template>
								    </el-table-column>
							    </template>
							</el-table>
						</template>
			    		<div class="lh_title">对外担保情况</div>
			    		<el-form-item label="是否存在：">
							<template>
								<span v-if="readOnly" class="input_read">{{verifyEnterpriseDebtData.guarantee.hasText}}</span>
							    <el-radio-group v-else v-model="verifyEnterpriseDebtData.guarantee.has">
									<el-radio :label="true">有</el-radio>
									<el-radio :label="false">无</el-radio>
								</el-radio-group>
							</template>
			    		</el-form-item>
			    		<template v-if="guaranteeInfosList&&verifyEnterpriseDebtData.guarantee.has">
							<el-table
							    :data="guaranteeInfosList"
							    border
							    style="width: 100%">
							    <template>
								    <el-table-column
								      prop="enterprise"
								      label="授信单位">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.enterprise?scope.row.enterprise:'-'}}</span>
								      	<el-input v-else v-model="scope.row.enterprise" style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="guarantee"
								      label="担保人">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.guarantee?scope.row.guarantee:'-'}}</span>
								      	<el-input v-else v-model="scope.row.guarantee" style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="guaranteeObj"
								      label="担保对象">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.guaranteeObj?scope.row.guaranteeObj:'-'}}</span>
								      	<el-input v-else v-model="scope.row.guaranteeObj" style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="limit"
								      label="额度（万元）">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.limit?scope.row.limit:'-'}}</span>
								      	<el-input v-else v-model="scope.row.limit" style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="balance"
								      label="余额（万元）">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.balance?scope.row.balance:'-'}}</span>
								      	<el-input v-else v-model="scope.row.balance" style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="loanTime"
								      width="180"
								      label="放款时间">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.loanTime?scope.row.loanTime:'-'}}</span>
								      	<el-date-picker
								      		v-else
									      v-model="scope.row.loanTime"
									      type="date"
									      placeholder="选择日期">
									    </el-date-picker>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="endTime"
								      width="180"
								      label="结束时间">
								      <template slot-scope="scope">
								      	<span v-if="readOnly" class="table_input_read">{{scope.row.endTime?scope.row.endTime:'-'}}</span>
								      	<el-date-picker
								      		v-else
									      v-model="scope.row.endTime"
									      type="date"
									      placeholder="选择日期">
									    </el-date-picker>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="type"
								      label="贷款种类">
								      	<template slot-scope="scope" >
								      		<span v-if="readOnly" class="table_input_read">{{scope.row.typeText?scope.row.typeText:'-'}}</span>
								      		<el-select v-else v-if="loanTypeList" v-model="scope.row.type"  placeholder="请选择">
											    <el-option v-for="(val,key) in loanTypeList" :key="key" :label="val" :value="key"></el-option>
											</el-select>
								       	</template>
								    </el-table-column>
								    <el-table-column
								      prop="overdue"
								      label="是否逾期">
								     	<template slot-scope="scope">
								      		<span v-if="readOnly" class="table_input_read">{{scope.row.overdueText?scope.row.overdueText:'-'}}</span>
								      		<el-select v-else  v-model="scope.row.overdue"  placeholder="请选择">
											    <el-option :key="1" label="是" :value="1">是</el-option>
											    <el-option :key="0" label="否" :value="0">否</el-option>
											</el-select>
								       	</template>
								    </el-table-column>
								    <el-table-column
								      prop="name"
								      v-if="!readOnly"
								      width="120"
								      label="操作">
								      	<template slot-scope="scope">
								        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_delete']&&guaranteeInfosList.length>1"  @click="deleteGuaranteeInfos(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
								        	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']&&guaranteeInfosList.length===scope.$index+1"  @click="plusGuaranteeInfos" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
								        </template>
								    </el-table-column>
							    </template>
							</el-table>
						</template>
			    		<el-row style="margin-top: 15px;">
			    			<el-col :span="12">
					    		<el-form-item label="目前负债余额：">
									{{verifyEnterpriseDebtData.debt}} 万元
								</el-form-item>
			    			</el-col>
			    			<el-col :span="12">
					    		<el-form-item label="目前利息费用：">
								    <span v-if="readOnly" class="table_input_read">{{verifyEnterpriseDebtData.interest?verifyEnterpriseDebtData.interest:'-'}} 万元</span>
								    <el-input v-else class="must_input" v-model="verifyEnterpriseDebtData.interest"  style="width: 300px;">
								    	<template slot="append">万元</template>
			                		</el-input>
								</el-form-item>
			    			</el-col>
			    		</el-row>
			    		<el-row>
			    			<el-col :span="12">
					    		<el-form-item label="企业申请借款：">
									{{verifyEnterpriseDebtData.apply}} 万元
								</el-form-item>
			    			</el-col>
			    		</el-row>
			    		<el-row>
			    			<el-col :span="12">
					    		<el-form-item label="预计授信额度：">
								    <span v-if="readOnly" class="table_input_read">{{verifyEnterpriseDebtData.expectedCreditLine?verifyEnterpriseDebtData.expectedCreditLine:'-'}} 万元</span>
								    <el-input v-else class="must_input" v-model="verifyEnterpriseDebtData.expectedCreditLine"  style="width: 300px;">
								    	<template slot="append">万元</template>
			                		</el-input>
								</el-form-item>
			    			</el-col>
			    			<el-col :span="12">
					    		<el-form-item label="即将年利率：">
								    <span v-if="readOnly" class="table_input_read">{{verifyEnterpriseDebtData.yearInterestRate?verifyEnterpriseDebtData.yearInterestRate:'-'}} %</span>
								    <el-input v-else class="must_input" v-model="verifyEnterpriseDebtData.yearInterestRate"  style="width: 300px;">
								    	<template slot="append">%</template>
			                		</el-input>
								</el-form-item>
			    			</el-col>
			    		</el-row>
			    		<el-form-item label="即将年利息费用：">
			    			{{verifyEnterpriseDebtData.yearInterest}} 万元
						</el-form-item>
						<el-form-item label="年利息费用：">
			    			{{verifyEnterpriseDebtData.yearInterestAmt}} 万元
						</el-form-item>
			    		<el-form-item label="对外担保负债：">
							{{verifyEnterpriseDebtData.totalGuarantee}} 万元
						</el-form-item>
			    		<div style="text-align: right;" v-if="!readOnly" >
							<el-button  @click="doSaveEnterpriseDebt" v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"  type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
		<!--企业财务统计概况-->
		<el-collapse @change="changeVerifyEnterpriseFinance" v-model="activeVerifyEnterpriseFinanceNames" class="marginBotten">
			<el-collapse-item name="enterpriseFinanceOne">
			    <template slot="title">
			        	企业财务统计概况
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
					<div class="info-list" v-if="verifyEnterpriseFinanceData">
						<el-form-item label="总有形资产：">
							<template>
						      	<span v-if="readOnly" class="table_input_read">{{verifyEnterpriseFinanceData.equityAmount?verifyEnterpriseFinanceData.equityAmount:'-'}} 万元</span>
						      	<el-input v-else v-model="verifyEnterpriseFinanceData.equityAmount" class="must_input" style="width: 300px;">
						      		<template slot="append">万元</template>
	                			</el-input>
							</template>
			    		</el-form-item>
						<el-form-item label="总负债：">
							<template>
						      	<span v-if="readOnly" class="table_input_read">{{verifyEnterpriseFinanceData.liabilityAmount?verifyEnterpriseFinanceData.liabilityAmount:'-'}} 万元</span>
						      	<el-input v-else v-model="verifyEnterpriseFinanceData.liabilityAmount" class="must_input" style="width: 300px;">
						      		<template slot="append">万元</template>
	                			</el-input>
							</template>
			    		</el-form-item>
			    		<div class="table_top" style="text-align: center;line-height: 40px;margin-bottom: 20px;">
							<el-row style="margin-bottom: 0;">
								<el-col :span="6" class="table_th">利息保障倍数</el-col>
								<el-col :span="6" class="table_th">杠杆比率（%）</el-col>
								<el-col :span="6" class="table_th">息税前利润（万元）</el-col>
								<el-col :span="6" class="table_th">应收账款周转率</el-col>
							</el-row>
							<el-row style="margin-bottom: 0;">
								<el-col :span="6" class="table_td" style="line-height: 40px;">
									<span>{{verifyEnterpriseFinanceData.interestProtection?verifyEnterpriseFinanceData.interestProtection:'-'}}</span>
								</el-col>
								<el-col :span="6" class="table_td" style="line-height: 40px;">
									<span>{{verifyEnterpriseFinanceData.leverageRatio||verifyEnterpriseFinanceData.leverageRatio===0?verifyEnterpriseFinanceData.leverageRatio:'-'}}</span>
	                			</el-input>
								</el-col>
								<el-col :span="6" class="table_td" style="line-height: 40px;">
									<span>{{verifyEnterpriseFinanceData.profit?verifyEnterpriseFinanceData.profit:'-'}}</span>
	                			</el-input>
								</el-col>
								<el-col :span="6" class="table_td" style="line-height: 40px;">
									<span>{{verifyEnterpriseFinanceData.receivableTurnover?verifyEnterpriseFinanceData.receivableTurnover:'-'}}</span>
	                			</el-input>
								</el-col>
							</el-row>
						</div>
			    		<div v-if="!readOnly" style="text-align: right;">
							<el-button  @click="doSaveEnterpriseFinance" v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"  type="primary" size="mini">保存</el-button>
		                </div>
					</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
		<!--现场尽职调查-->
		<el-collapse @change="changeVerifySpotCheck" v-model="activeVerifySpotCheckNames" class="marginBotten">
			<el-collapse-item name="spotCheckOne">
			    <template slot="title">
			        	  现场尽职调查
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
					<div class="info-list" v-if="verifySpotCheckData">
						<el-form-item label="是否需要现场尽调：">
							<template>
								<span v-if="readOnly" class="input_read">{{verifySpotCheckData.spotCheckText?verifySpotCheckData.spotCheckText:'-'}}</span>
						      	<el-radio-group v-else v-model="verifySpotCheckData.spotCheck">
									<el-radio label="1">是</el-radio>
									<el-radio label="0">否</el-radio>
								</el-radio-group>
							</template>
			    		</el-form-item>
			    		<el-form-item v-if="verifySpotCheckData.spotCheck==='1'" label="尽调原始证据：">
							<template v-if="verifySpotCheckData.spotCheckFiles" v-for="item in verifySpotCheckData.spotCheckFiles">
								<Uploads
	                          	v-model="item.key"
	                          	:fileUrl="item.url"
	                          	:dataObj="uploadImgData"
	                          	actionUrl="/capital-api/check/upload_image"></Uploads>
							</template>
							<div v-if="!readOnly">
								<el-button  @click="addSpotCheckFile" type="primary" size="mini">新增证据</el-button>
							</div>
		                </el-form-item>
			    		<div v-if="!readOnly" style="text-align: right;">
							<el-button  @click="doSaveSpotCheck" v-if="!roleHasPermissions['supplier_manage_maintain_list_save']"  type="primary" size="mini">保存</el-button>
		                </div>
					</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
		<!--负面信息核查结果-->
		<el-collapse @change="changeVerifyNegativeInfo" v-model="activeVerifyNegativeInfoNames" class="marginBotten">
			<el-collapse-item name="negativeInfoOne">
			    <template slot="title">
			        	  负面信息核查结果
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
					<div class="info-list">
						<template v-if="verifyNegativeInfoData">
							<el-table
							    :data="verifyNegativeInfoData"
							    border
							    style="width: 100%;margin-bottom: 20px;">
							    <el-table-column
							      prop="text"
							      label="核查项">
							      <template slot-scope="scope">
							      	<div>{{scope.row.text}}</div>
                      <!-- 文本框修改成不受 有,无 选项的控制  v-if="scope.row.status==1"  -->
							      	<el-input type="textarea" v-model="scope.row.content"></el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="status"
							      label="有"
							      align="center"
							      width="120">
							      <template slot-scope="scope">
							      	<input  type="radio" :name="scope.row.key"  :id="scope.row.key + 1"  value="1" v-model="scope.row.status">
							      	<label :class="scope.row.status=='1'?'radio_label_checked':'radio_label'" :for="scope.row.key + 1">
							      		有
							      	</label>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="status"
							      label="无"
							      align="center"
							      width="120">
							      <template slot-scope="scope">
							      	<input  class="cursor_a" type="radio" :name="scope.row.key"  :id="scope.row.key + 0"  value="0" v-model="scope.row.status">
							      	<label :class="scope.row.status=='0'?'radio_label_checked':'radio_label'" :for="scope.row.key + 0">
							      		无
							      	</label>
							      </template>
							    </el-table-column>
							</el-table>
						</template>
					    <div  v-if="!readOnly" style="text-align: right;">
		                  	<el-button  v-if="!roleHasPermissions['supplier_manage_maintain_list_save']" @click="saveVerifyNegativeInfo" type="primary" size="mini">保存</el-button>
		                </div>
					</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>

	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
	import Uploads from '@/components/Upload/Uploads'
	import defaultImg from '@/assets/imgs/default.jpg'
  // import { comboboxBankList, collateralType, collateralSource,maritalStatus,educationBackground } from '@/api/common'
  import { officeStable } from '@/api/common'
	import merchantAuditDetail from '@/api/merchantAuditManage/merchantAuditDetail'
//	import recheckDetail from '@/api/approveManage/recheckDetail'
//	import reviewRecheckDetail from '@/api/approveManage/reviewRecheckDetail'
//	import finalfirstDetail from '@/api/approveManage/finalfirstDetail'
//	import finalsecondDetail from '@/api/approveManage/finalsecondDetail'
//	import intoButtDetail from '@/api/capitalButtManage/intoButtDetail'
	import { validContent } from '@/utils/validate'
	import { Format, delcommafy } from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
		name: 'verify',
		components: {
			Upload,
			Uploads
		},
		data() {
			return {
				Api:'',//根据父组件传来的值更换api
				uploadImgData: {
					supplierId: '',
					isImage: true
				},
        		activeVerifyControllerNames:'controllerOne',//实际控制人默认项
            activeVerifyEnterpriseInfo:'enterpriseInfo',//企业信息默认项
        		activeVerifyEnterpriseSaleNames:'enterpriseSaleOne',//企业系统销售数据况默认项
        		activeVerifyBusinessOperatCapitalNames:'businessOperatCapitalOne',//企业主营业务营运资金循环默认项
        		activeVerifyEnterpriseDebtNames:'enterpriseDebtOne',//企业负债信息默认项
        		activeVerifyEnterpriseFinanceNames:'enterpriseFinanceOne',//企业财务统计默认项
        		activeVerifySpotCheckNames:'spotCheckOne',//现场尽职调查默认项
        		activeVerifyNegativeInfoNames:'negativeInfoOne',//负面信息核查默认项
				controllerData:'',//实际控制人数据
        officeStableList: '', //企业信息-经营地情况单选信息查询
        enterpriseData:'',//企业信息
				verifyEnterpriseSaleData:'',//企业销售情况数据
				saleStatSelfList:'',//自由系统平台表格数据(子)
				saleStatTitanList:'',//泰坦云平台数据(子)
				saleStatOthersList:'',//其他平台数组数据(子)
				verifyInvoiceBankSaleData:'',//发票银行流水数据
				invoiceData:'',//发票流水数据(子)
				bankData:'',//银行流水数据(子)
				verifyBusinessOperatCapitalData:'',//企业主营业务营运资金循环数据
				businessUpstreamData:'',//主要供应商情况(子)
				businessDownstreamData:'',//主要下游情况(子)
				verifyEnterpriseDebtData:'',//企业负债信息数据
				financeInfosList:'',//金融机构贷款情况数据(子)
				nonfinanceInfosList:'',//非金融机构数据(子)
				borrowInfosList:'',//股东借款数据(子)
				guaranteeInfosList:'',//对外担保情况数据(子)
				verifyEnterpriseFinanceData:'',//企业财务统计数据
				verifySpotCheckData:'',//现场尽职调查数据
				verifyNegativeInfoData:'',//负面信息核查数据
				maritalStatusList:'',//学历下拉
				educationBackgroundList:'',//婚姻状态下拉
				thirdPartyPlatformTypeList:'',//第三方平台下拉
				upDownProductTypeList:'',//产品/服务 下拉
				loanTypeList:'',//贷款种类下拉
				bankStatTypeList:'',//银行流水验证下拉
				tableData: [{
		          date: '2016-05-02',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }]
			}
		},
		props: {
			readOnly: {
				type: Boolean,
				default: false
			},
			supplierId: {
				type: String,
				default: ''
			},
			apiUrl:{
				type: String,
				default: 'merchantAuditDetail'
			}
		},
		watch: {
			//监听路由切换回调
			'$route': 'fetchdata'
		},
		computed: {
			...mapGetters([
				'roleHasPermissions', // 用户权限list
				'tableMaxHeight'
			])
		},
		created() {
			if(this.apiUrl === 'merchantAuditDetail'){
				this.Api = merchantAuditDetail
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.getQueryVerifyController();//尽调检查-实际控制人-查询
				//展开实际控制人
          this.getQueryVerifyEnterprise();//尽调检查-企业信息
		      	//展开企业销售情况
		      	this.getQueryVerifyEnterpriseSale();//尽调检查-企业销售情况-查询
		      	this.getQueryVerifyInvoiceBankSale();//尽调检查-发票银行流水-查询
		      	//展开企业主营业务营运资金循环
		      	this.getQueryVerifyBusinessOperatCapital();//尽调检查-企业主营业务营运资金循环-查询
		      	//展开企业负债信息
		      	this.getQueryVerifyEnterpriseDebt();//尽调检查-企业负债信息-查询
		      	//展开企业财务统计
		      	this.getQueryVerifyEnterpriseFinance();//尽调检查-企业财务统计-查询
		      	//展开现场尽职调查
		      	this.getQueryVerifySpotCheck();//尽调检查-现场尽职调查-查询
		      	//展开负面信息核查
		      	this.getQueryVerifyNegativeInfo();//尽调检查-负面信息核查-查询
//				this.getMaritalStatusList();//学历-状态下拉
//				this.getEducationBackgroundList();//婚姻状态-状态下拉
          this.getOfficeStableList();//获取下拉列表-企业信息_经营地情况下拉
			}, // 初始化
			//新尽调

		    changeVerifyController (val){//展开实际控制人
		      	if(val.length===0){return}
		      	this.getQueryVerifyController();//尽调检查-实际控制人-查询
		    },
        changeVerifiyEnterprise (val) { // 展开企业信息
            if (val.length === 0) {return}
            this.getQueryVerifyEnterprise();//尽调资料-企业信息-查询
        },
		    changeVerifyEnterpriseSale (val){//展开企业销售情况
		      	if(val.length===1){return}
		      	this.getQueryVerifyEnterpriseSale();//尽调检查-企业销售情况-查询
		      	this.getQueryVerifyInvoiceBankSale();//尽调检查-发票银行流水-查询
//		      	this.getThirdPartyPlatformTypeList();//第三方频台下拉
//		      	this.getBankStatTypeList();//银行流水验证下拉
		    },
		    changeVerifyBusinessOperatCapital (val){//展开企业主营业务营运资金循环
		      	if(val.length===1){return}
		      	this.getQueryVerifyBusinessOperatCapital();//尽调检查-企业主营业务营运资金循环-查询
//		      	this.getUpDownProductTypeList();//产品/服务 下拉
		    },
		    changeVerifyEnterpriseDebt (val){//展开企业负债信息
		      	if(val.length===1){return}
		      	this.getQueryVerifyEnterpriseDebt();//尽调检查-企业负债信息-查询
//		      	this.getLoanTypeList();//贷款种类下拉
		    },
		    changeVerifyEnterpriseFinance (val){//展开企业财务统计
		      	if(val.length===1){return}
		      	this.getQueryVerifyEnterpriseFinance();//尽调检查-企业财务统计-查询
		    },
		    changeVerifySpotCheck (val){//展开现场尽职调查
		      	if(val.length===1){return}
		      	this.getQueryVerifySpotCheck();//尽调检查-现场尽职调查-查询
		    },
		    changeVerifyNegativeInfo (val){//展开负面信息核查
		      	if(val.length===1){return}
		      	this.getQueryVerifyNegativeInfo();//尽调检查-负面信息核查-查询
		    },
		    changeRepresentative(val){
		    	if(val=='1'){//是
		    		this.getQueryVerifyRepreInfo();//尽调检查-实际控制人-法人查询
		    	}else{//否
		    		this.getQueryVerifyController('no');//尽调检查-实际控制人-查询
		    	}
		    },
			getQueryVerifyController(type) { //尽调检查-实际控制人-查询
				this.Api.queryController(this.supplierId).then(res => {
					if(res.data.code === '200') {
						if(type=='no'){
							res.data.data.representative = 0
						}
						this.controllerData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
      getQueryVerifyEnterprise() { // 尽调资料-企业信息-查询
          this.Api.queryEnterprise(this.supplierId).then(res => {
              if (res.data.code === '200') {
                  this.enterpriseData = res.data.data;
              } else {
                  this.$message.error(res.data.message);
              }
          }).catch(() => {})
      },
			getQueryVerifyRepreInfo() { //尽调检查-实际控制人-法人查询
				this.Api.repreInfo(this.supplierId).then(res => {
					if(res.data.code === '200') {
						res.data.data.representative = 1
						this.controllerData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doSaveController(){//尽调检查-实际控制人-保存
				let data = baseUtil.copy(this.controllerData)
				data.supplierId = this.supplierId
				this.Api.saveController(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryVerifyEnterpriseSale() { //尽调检查-企业销售情况-查询
				this.Api.verifyEnterpriseSale(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifyEnterpriseSaleData = res.data.data;
						this.saleStatSelfList = res.data.data.saleStatSelf;
						this.saleStatTitanList = res.data.data.saleStatTitan.data;
						this.saleStatOthersList = res.data.data.saleStatOthers;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			delSaleStatOthers(index){//删除平台
				this.saleStatOthersList.splice(index,1)
			},
			addSaleStatOthers(){//新增平台
				let _data = {
					totalAmt:'',
					data:[],
					name:'',
					nameText:''
				}
				let _arr = this.saleStatTitanList
				for(let i=0;i<_arr.length;i++){
					_data.data.push({key:_arr[i].key,value:''})
				}
				this.saleStatOthersList.push(_data)
			},
			doSaveEnterpriseSale(){//尽调检查-企业销售情况-保存
				let data = {};
				let _saleStatSelf = baseUtil.copy(this.saleStatSelfList)
				let _saleStatOther = baseUtil.copy(this.saleStatOthersList)
				data.supplierId = this.supplierId
				data.saleStatSelf = JSON.stringify(_saleStatSelf);
				data.saleStatOther = JSON.stringify(_saleStatOther);
				this.Api.saveVerifyEnterpriseSale(data).then(res => {
					if(res.data.code === '200') {
						this.getQueryVerifyEnterpriseSale();//尽调检查-企业销售情况-查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryVerifyInvoiceBankSale() { //尽调检查-发票银行流水-查询
				this.Api.invoiceBankSale(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifyInvoiceBankSaleData = res.data.data;
						this.invoiceData = res.data.data.invoice;
						this.bankData = res.data.data.bank;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			delBankData(index){//删除平台
				this.bankData.splice(index,1)
			},
			addBankData(){//新增平台
				let _data = {
					totalAmt:'',
					data:[],
					name:'',
					nameText:''
				}
				let _arr = this.invoiceData.data
				for(let i=0;i<_arr.length;i++){
					_data.data.push({key:_arr[i].key,value:''})
				}
				this.bankData.push(_data)
			},
			doSaveBankData(){//尽调检查-发票银行流水-保存
				let data = {};
				let _invoice = baseUtil.copy(this.invoiceData)
				let _bank = baseUtil.copy(this.bankData)
				data.invoice = JSON.stringify(_invoice);
				data.bank = JSON.stringify(_bank);
				data.supplierId = this.supplierId
				data.invoiceCheckType = this.verifyInvoiceBankSaleData.invoiceCheckType
				data.saleAnalysis = this.verifyInvoiceBankSaleData.saleAnalysis
				data.saleEstimatedAmount = this.verifyInvoiceBankSaleData.saleEstimatedAmount
				this.Api.saveInvoiceBankSale(data).then(res => {
					if(res.data.code === '200') {
						this.getQueryVerifyInvoiceBankSale();//尽调检查-发票银行流水-查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryVerifyBusinessOperatCapital() { //尽调检查-企业主营业务营运资金循环-查询
				this.Api.verifyBusinessOperatCapital(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifyBusinessOperatCapitalData = res.data.data;
						if(!res.data.data.businessUpstream){
							this.businessUpstreamData = []
							this.businessUpstreamData.push({
					      		product:'',name:'',accountPeriod:'',ratio:''
					      	})
						}else{
							this.businessUpstreamData = res.data.data.businessUpstream;
						}
						if(!res.data.data.businessDownstream){
							this.businessDownstreamData = []
							this.businessDownstreamData.push({
					      		product:'',name:'',accountPeriod:'',ratio:''
					      	})
						}else{
							this.businessDownstreamData = res.data.data.businessDownstream;
						}

					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
		    deleteBusinessUpstream (index){//尽调信息-主要供应商情况------------删除
		      	this.businessUpstreamData.splice(index,1)
		    },
		    plusBusinessUpstream (){//尽调信息-主要供应商情况------------添加
		      	this.businessUpstreamData.push({
		      		product:'',name:'',accountPeriod:'',ratio:''
		      	})
		    },
		    deleteBusinessDownstream (index){//尽调信息-主要下游情况------------删除
		      	this.businessDownstreamData.splice(index,1)
		    },
		    plusBusinessDownstream (){//尽调信息-主要下游情况------------添加
		      	this.businessDownstreamData.push({
		      		product:'',name:'',accountPeriod:'',ratio:''
		      	})
		    },
			doSaveBusinessOperatCapital(){//尽调检查-企业主营业务营运资金循环-保存
				let data = {};
				data.supplierId = this.supplierId
				data.businessTurnover = this.verifyBusinessOperatCapitalData.businessTurnover
				let _businessUpstream = baseUtil.copy(this.businessUpstreamData)
				let _businessDownstream = baseUtil.copy(this.businessDownstreamData)
				data.businessUpstream = JSON.stringify(_businessUpstream);
				data.businessDownstream = JSON.stringify(_businessDownstream);
				data.businessReceivableHard = this.verifyBusinessOperatCapitalData.businessReceivableHard
				data.businessReceivableInfo = this.verifyBusinessOperatCapitalData.businessReceivableInfo
				data.turnoverReceivable = this.verifyBusinessOperatCapitalData.turnoverReceivable
				data.turnoverStock = this.verifyBusinessOperatCapitalData.turnoverStock
				data.turnoverPayable = this.verifyBusinessOperatCapitalData.turnoverPayable
				data.turnoverPaid = this.verifyBusinessOperatCapitalData.turnoverPaid
				data.turnoverReceived = this.verifyBusinessOperatCapitalData.turnoverReceived
				data.turnoverActualCapital = this.verifyBusinessOperatCapitalData.turnoverActualCapital
				data.profitRate = this.verifyBusinessOperatCapitalData.profitRate
				this.Api.verifyUpdateBusinessOperatCapital(data).then(res => {
					if(res.data.code === '200') {
						this.getQueryVerifyBusinessOperatCapital();//尽调检查-企业主营业务营运资金循环-查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryVerifyEnterpriseDebt() { //尽调检查-企业负债信息-查询
				this.Api.enterpriseDebt(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifyEnterpriseDebtData = res.data.data;
						if(!res.data.data.finance.infos){//finance
							this.financeInfosList=[{
					      		enterprise:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
					      	}]
						}else{
							this.financeInfosList = res.data.data.finance.infos;
						}
						if(!res.data.data.nonfinance.infos){//nonfinance
							this.nonfinanceInfosList=[{
					      		enterprise:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
					      	}]
						}else{
							this.nonfinanceInfosList = res.data.data.nonfinance.infos;
						}
						if(!res.data.data.borrow.infos){//borrow
							this.borrowInfosList=[{
					      		enterprise:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
					      	}]
						}else{
							this.borrowInfosList = res.data.data.borrow.infos;
						}

						if(!res.data.data.guarantee.infos){//guarantee
							this.guaranteeInfosList=[{
					      		enterprise:'',guarantee:'',guaranteeObj:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
					      	}]
						}else{
							this.guaranteeInfosList = res.data.data.guarantee.infos;
						}

					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
		    deleteFinanceInfos (index){//尽调信息-金融机构贷款情况------------删除
		      	this.financeInfosList.splice(index,1)
		    },
		    plusFinanceInfos (){//尽调信息-金融机构贷款情况------------添加
		      	this.financeInfosList.push({
		      		enterprise:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
		      	})
		    },
		    deleteNonfinanceInfos (index){//尽调信息-非金融机构------------删除
		      	this.nonfinanceInfosList.splice(index,1)
		    },
		    plusNonfinanceInfos (){//尽调信息-非金融机构------------添加
		      	this.nonfinanceInfosList.push({
		      		enterprise:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
		      	})
		    },
		    deleteBorrowInfos (index){//尽调信息-股东借款------------删除
		      	this.borrowInfosList.splice(index,1)
		    },
		    plusBorrowInfos (){//尽调信息-股东借款------------添加
		      	this.borrowInfosList.push({
		      		enterprise:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
		      	})
		    },
		    deleteGuaranteeInfos (index){//尽调信息-对外担保情况------------删除
		      	this.guaranteeInfosList.splice(index,1)
		    },
		    plusGuaranteeInfos (){//尽调信息-对外担保情况------------添加
		      	this.guaranteeInfosList.push({
		      		enterprise:'',guarantee:'',guaranteeObj:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
		      	})
		    },
			doSaveEnterpriseDebt(){//尽调检查-企业负债信息-保存
				for(let i=0;i<this.financeInfosList.length;i++){
					console.log(this.financeInfosList[i].loanTime)
					if(this.financeInfosList[i].loanTime&&(typeof this.financeInfosList[i].loanTime)==='object'){
						this.financeInfosList[i].loanTime = Format(this.financeInfosList[i].loanTime, 'yyyy-MM-dd');
					}
					if(this.financeInfosList[i].endTime&&(typeof this.financeInfosList[i].endTime)==='object'){
						this.financeInfosList[i].endTime = Format(this.financeInfosList[i].endTime, 'yyyy-MM-dd');
					}

				}
				for(let i=0;i<this.nonfinanceInfosList.length;i++){
					if(this.nonfinanceInfosList[i].loanTime&&(typeof this.nonfinanceInfosList[i].loanTime)==='object'){
						this.nonfinanceInfosList[i].loanTime = Format(this.nonfinanceInfosList[i].loanTime, 'yyyy-MM-dd');
					}
					if(this.nonfinanceInfosList[i].endTime&&(typeof this.nonfinanceInfosList[i].endTime)==='object'){
						this.nonfinanceInfosList[i].endTime = Format(this.nonfinanceInfosList[i].endTime, 'yyyy-MM-dd');
					}
				}
				for(let i=0;i<this.borrowInfosList.length;i++){
					if(this.borrowInfosList[i].loanTime&&(typeof this.borrowInfosList[i].loanTime)==='object'){
						this.borrowInfosList[i].loanTime = Format(this.borrowInfosList[i].loanTime, 'yyyy-MM-dd');
					}
					if(this.borrowInfosList[i].endTime&&(typeof this.borrowInfosList[i].endTime)==='object'){
						this.borrowInfosList[i].endTime = Format(this.borrowInfosList[i].endTime, 'yyyy-MM-dd');
					}
				}
				for(let i=0;i<this.guaranteeInfosList.length;i++){
					if(this.guaranteeInfosList[i].loanTime&&(typeof this.guaranteeInfosList[i].loanTime)==='object'){
						this.guaranteeInfosList[i].loanTime = Format(this.guaranteeInfosList[i].loanTime, 'yyyy-MM-dd');
					}
					if(this.guaranteeInfosList[i].endTime&&(typeof this.guaranteeInfosList[i].endTime)==='object'){
						this.guaranteeInfosList[i].endTime = Format(this.guaranteeInfosList[i].endTime, 'yyyy-MM-dd');
					}
				}
				let data = {};
				let _finance = {
					has: this.verifyEnterpriseDebtData.finance.has,
					infos:baseUtil.copy(this.financeInfosList)
				}
				let _nonfinance = {
					has: this.verifyEnterpriseDebtData.nonfinance.has,
					infos:baseUtil.copy(this.nonfinanceInfosList)
				}
				let _borrow =  {
					has: this.verifyEnterpriseDebtData.borrow.has,
					infos:baseUtil.copy(this.borrowInfosList)
				}
				let _guarantee =  {
					has: this.verifyEnterpriseDebtData.guarantee.has,
					infos: baseUtil.copy(this.guaranteeInfosList)
				}
				data.supplierId = this.supplierId
				data.finance = JSON.stringify(_finance);
				data.nonfinance = JSON.stringify(_nonfinance);
				data.borrow = JSON.stringify(_borrow);
				data.guarantee = JSON.stringify(_guarantee);
				data.interest = this.verifyEnterpriseDebtData.interest;
				data.yearInterestRate = this.verifyEnterpriseDebtData.yearInterestRate;
				this.Api.enterpriseDeptSave(data).then(res => {
					if(res.data.code === '200') {
						this.getQueryVerifyEnterpriseDebt();//尽调检查-企业负债信息-查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryVerifyEnterpriseFinance (){//尽调检查-企业财务统计-查询
				this.Api.enterpriseFinance(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifyEnterpriseFinanceData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doSaveEnterpriseFinance(){//尽调检查-企业财务统计-保存
				let data = {};
				data.supplierId = this.supplierId
				data.equityAmount = this.verifyEnterpriseFinanceData.equityAmount
				this.Api.enterpriseFinanceSave(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryVerifySpotCheck (){//尽调检查-现场尽职调查-查询
				this.Api.spotCheck(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifySpotCheckData = res.data.data;
						if(!this.verifySpotCheckData.spotCheckFiles){
							this.verifySpotCheckData.spotCheckFiles = []
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			addSpotCheckFile (){//新增证据
				this.verifySpotCheckData.spotCheckFiles.push({key:'',url:''})
			},
			doSaveSpotCheck(){//尽调检查-现场尽职调查-保存
				let data = {};
				data.supplierId = this.supplierId
				data.spotCheck = this.verifySpotCheckData.spotCheck
				let _arr = this.verifySpotCheckData.spotCheckFiles
				let _newArr = [];
				for(let i=0;i<_arr.length;i++){
					if(_arr[i].key){
						_newArr.push(_arr[i].key)
					}
				}
				data.spotCheckFiles = _newArr.join();
				if(this.verifySpotCheckData.spotCheck==='0'){
					data.spotCheckFiles = ''
				}
				this.Api.spotCheckSave(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryVerifyNegativeInfo (){//尽调检查-负面信息核查-查询
				this.Api.verifyNegativeInfo(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifyNegativeInfoData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
      getOfficeStableList() { //企业信息_经营地情况
          officeStable().then(res => {
              if(res.data.code === '200') {
                  this.officeStableList  = res.data.data;
              } else {
                  this.$message.error(res.data.message)
              }
          }).catch(() => {})
      },
		    saveVerifyNegativeInfo(){//负面信息核查结果保存
		      	let data = baseUtil.copy(this.verifyNegativeInfoData)
		      	data.content = JSON.stringify(data)
		      	data.supplierId = this.supplierId
		      	this.Api.verifyUpdateNegativeInfo(data).then(res => {
		          if (res.data.code === '200') {
		            this.$message.success(res.data.message)
		          } else {
		            this.$message.error(res.data.message)
		          }
		        }).catch(() => {})
		    },
			getMaritalStatusList(){//学历-状态下拉
				maritalStatus().then(res => {
					if(res.data.code === '200') {
						this.maritalStatusList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getEducationBackgroundList(){//婚姻状态-状态下拉
				educationBackground().then(res => {
					if(res.data.code === '200') {
						this.educationBackgroundList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getThirdPartyPlatformTypeList(){//第三方频台下拉
				this.Api.thirdPartyPlatformType().then(res => {
					if(res.data.code === '200') {
						this.thirdPartyPlatformTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getUpDownProductTypeList(){//产品/服务 下拉
				this.Api.upDownProductType().then(res => {
					if(res.data.code === '200') {
						this.upDownProductTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getBankStatTypeList(){//银行流水验证下拉
				this.Api.bankStatType().then(res => {
					if(res.data.code === '200') {
						this.bankStatTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getLoanTypeList(){//贷款种类下拉
				this.Api.loanType().then(res => {
					if(res.data.code === '200') {
						this.loanTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},

			//新尽调end
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "approveDetail.scss";
</style>
