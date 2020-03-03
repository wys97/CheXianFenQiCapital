import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户详情

/**
 * 申请登记-详情-头部
 * @param supplierCapitalId 商户 id
 */
export function detailTop (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/detail_top',
    method: 'post',
    data
  })
}	
/**
 * 头部信息
 * @param supplierCapitalId 商户ID
 */
export function headData (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/detail_top',
    method: 'post',
    data
  })
}

/**
 * 融资概况
 * @param supplierCapitalId 商户ID
 */
export function financeGeneralSituation (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/maintain/finance_general_situation',
    method: 'post',
    data
  })
}

/**
 * 补充资料-企业基本信息_客户类型查询
 * @param supplierCapitalId 商户 id
 */
export function customType (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/custom_type',
    method: 'post',
    data
  })
}
/**
 * 补充资料-企业基本信息_基本情况查询
 * @param supplierCapitalId 商户 id
 */
export function basicData (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/basic_data',
    method: 'post',
    data
  })
}

/**
 * 补充资料-企业基本信息_基本情况保存
 * @param supplierCapitalId 商户 id
 */
export function saveBasicData ({supplierCapitalId,registerAddress,establishDate,mobile,fax,licensePicKey,locationType,locationArea,locationAddress,staffNo,utilitiesMonth,profit,hasSub,remark}) {
  const data = {
    supplierCapitalId,
    registerAddress,
    establishDate,
    mobile,
    fax,
    licensePicKey,
    locationType,
    locationArea,
    locationAddress,
    staffNo,
    utilitiesMonth,
    profit,
    hasSub,
    remark
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/save_basic_data',
    method: 'post',
    data
  })
}

/**
 * 补充资料-企业基本信息_开户许可证查询
 * @param supplierCapitalId 商户 id
 */
export function  accountLicense (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/account_license',
    method: 'post',
    data
  })
}

/**
 * 补充资料-企业基本信息_开户许可证保存
 * @param supplierCapitalId 商户 id
 */
export function saveAccountLicense ({supplierCapitalId,accountName,bankName,branchBankName,accountNo,picKey}) {
  const data = {
    supplierCapitalId,
    accountName,
    bankName,
    branchBankName,
    accountNo,
    picKey
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/save_account_license',
    method: 'post',
    data
  })
}
/**
 * 尽调信息-股东名单列表查询
 * @param supplierCapitalId 商户 id
 */
export function  shareHolding (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/share_holding',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-股东名单保存
 * @param supplierCapitalId 商户 id
 */
export function saveShareHolding ({supplierCapitalId,info}) {
  const data = {
    supplierCapitalId,
    info
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/save_share_holding',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-股东变更信息列表查询
 * @param supplierCapitalId 商户 id
 */
export function enterpriseChange (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/enterprise_change',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-股东变更信息保存
 * @param supplierCapitalId 商户 id
 */
export function saveEnterpriseChange({supplierCapitalId,info}) {
  const data = {
    supplierCapitalId,
    info
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/save_enterprise_change',
    method: 'post',
    data
  })
}

/**
 * 补充资料-企业基本信息_扩展信息(发展, 背景, 往来)查询
 * @param supplierCapitalId 商户 id
 */
export function  extendInfo (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/extend_info',
    method: 'post',
    data
  })
}

/**
 * 补充资料-企业基本信息_扩展信息保存
 * @param supplierCapitalId 商户 id
 */
export function saveExtendInfo ({supplierCapitalId,history,background,comeAndGo}) {
  const data = {
    supplierCapitalId,
    history,
    background,
    comeAndGo
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/save_extend_info',
    method: 'post',
    data
  })
}

/**
 * 补充资料-公司管理情况-公司管理情况查询
 * @param supplierCapitalId 商户 id
 */
export function  companyManage (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/company_manage',
    method: 'post',
    data
  })
}

/**
 * 补充资料-公司管理情况-公司管理情况修改
 * @param supplierCapitalId 商户 id
 */
export function updateCompanyManage ({supplierCapitalId,businessModel,organizationStructure,managementTechnique}) {
  const data = {
    supplierCapitalId,
    businessModel,
    organizationStructure,
    managementTechnique
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/update_company_manage',
    method: 'post',
    data
  })
}
/**
 * 补充资料-主营业务及市场查询
 * @param supplierCapitalId 商户 id
 */
export function  marketInfo (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/market_info',
    method: 'post',
    data
  })
}

/**
 * 补充资料-主营业务及市场保存
 * @param supplierCapitalId 商户 id
 */
export function saveMarketInfo ({supplierCapitalId,position,trend,cycle}) {
  const data = {
    supplierCapitalId,
    position,
    trend,
    cycle
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/save_market_info',
    method: 'post',
    data
  })
}

/**
 * 补充资料-上下游数据-进入上下游页面---查询
 * @param supplierCapitalId 商户 id
 */
export function intoUpdownstream (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/into_updownstream',
    method: 'post',
    data
  })
}
/**
 * 补充资料-上下游数据-上下游数据查询按钮---失去焦点
 * @param supplierCapitalId 商户 id
 */
export function queryTitanUpdownstream (merchantCode) {
  const data = {
    merchantCode
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/query_titan_updownstream',
    method: 'post',
    data
  })
}

/**
 * 补充资料-上下游数据-上下游数据保存
 * @param supplierCapitalId 商户 id
 */
export function saveUpdownstreamData ({supplierCapitalId,merchantCode}) {
  const data = {
  	supplierCapitalId,
    merchantCode
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/save_updownstream_data',
    method: 'post',
    data
  })
}

/**
 * 补充资料-借款信息-借款信息查询
 * @param supplierCapitalId 商户 id
 */
export function borrowInfo (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/borrow_info',
    method: 'post',
    data
  })
}
/**
 * 补充资料-关联公司状态-关联公司状态查询
 * @param supplierCapitalId 商户 id
 */
export function  affiliatedCompany (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/affiliated_company',
    method: 'post',
    data
  })
}

/**
 * 补充资料-关联公司状态-关联公司状态修改
 * @param supplierCapitalId 商户 id
 */
export function updateAffiliatedCompany({supplierCapitalId,companyData}) {
  const data = {
    supplierCapitalId,
    companyData
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/update_affiliated_company',
    method: 'post',
    data
  })
}
/**
 * 尽调信息-成员名单列表查询
 * @param supplierCapitalId 商户 id
 */
export function queryManager (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/maintain/query_manager',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-成员名单根据成员身份查询出法人基本信息
 * @param supplierCapitalId 商户 id
 */
export function queryRepreManager ({supplierCapitalId,type}) {
  const data = {
    supplierCapitalId,
    type
  }
  return fetch({
    url: test + '/capital-api/maintain/query_repre_manager',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-成员名单保存
 * @param supplierCapitalId 商户 id
 */
export function saveManager ({supplierCapitalId,info}) {
  const data = {
    supplierCapitalId,
    info
  }
  return fetch({
    url: test + '/capital-api/maintain/save_manager',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-征信记录列表查询
 * @param supplierCapitalId 商户 id
 */
export function queryCredit (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/maintain/query_credit',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-征信记录保存
 * @param supplierCapitalId 商户 id
 */
export function saveCredit ({supplierCapitalId,info}) {
  const data = {
    supplierCapitalId,
    info
  }
  return fetch({
    url: test + '/capital-api/maintain/save_credit',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-企业附件列表查询
 * @param supplierCapitalId 商户 id
 */
export function queryPaper (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/maintain/query_paper',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-企业附件列表保存
 * @param supplierCapitalId 商户 id
 */
export function savePaper ({supplierCapitalId,info}) {
  const data = {
    supplierCapitalId,
    info
  }
  return fetch({
    url: test + '/capital-api/maintain/save_paper',
    method: 'post',
    data
  })
}

/**
 * 补充资料-法人信息-法人信息查询
 * @param supplierCapitalId 商户 id
 */
export function queryEnterpriseGuarantor (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/repre_info',
    method: 'post',
    data
  })
}

/**
 * 补充资料-法人信息-法人信息修改
 * @param supplierCapitalId 商户 id
 */
export function saveEnterpriseGuarantor ({supplierCapitalId,address,email,educationBackground,maritalStatus,localResident}) {
  const data = {
    supplierCapitalId,
    address,
    email,
    educationBackground,
    maritalStatus,
    localResident,
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/update_repre',
    method: 'post',
    data
  })
}

/**
 * 补充资料-财产信息-财产信息查询
 * @param supplierCapitalId 商户 id
 */
export function assetInfo (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/asset_info',
    method: 'post',
    data
  })
}

/**
 * 补充资料-财产信息-财产信息修改
 * @param supplierCapitalId 商户 id
 */
export function updateAsset ({supplierCapitalId,assetData}) {
  const data = {
    supplierCapitalId,
    assetData
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/update_asset',
    method: 'post',
    data
  })
}

/**
 * 担保人列表-选择
 * @param supplierCapitalId 商户 id
 */
export function selectGuarantorList (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/maintain/select_guarantor_list',
    method: 'post',
    data
  })
}

/**
 * 担保人的测试Key-获取选择
 * @param guarantorId 担保人 id
 */
export function createTestKey (guarantorId) {
  const data = {
    guarantorId
  }
  return fetch({
    url: test + '/capital-api/maintain/create_test_key',
    method: 'post',
    data
  })
}

/**
 * 担保人-删除
 * @param supplierCapitalId 商户 id
 */
export function deleteEnterpriseGuarantor (guarantorId) {
  const data = {
    guarantorId
  }
  return fetch({
    url: test + '/capital-api/maintain/delete_enterprise_guarantor',
    method: 'post',
    data
  })
}
/**
 * 尽调信息-下游平台信息列表-查询
 * @param supplierCapitalId 商户 id
 */
export function queryDistributor (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/maintain/query_distributor',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-下游平台信息-删除
 * @param supplierCapitalId 商户 id
 */
export function deleteDistributor ({supplierCapitalId,centreId}) {
  const data = {
    supplierCapitalId,
    centreId
  }
  return fetch({
    url: test + '/capital-api/maintain/delete_distributor',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-下游平台信息-保存
 * @param supplierCapitalId 商户 id
 */
export function operateDistributor ({centreId,name,username,password,companyName,businessLicense,contractName,contractNum,validDate,bankCode,bankBranch,bankAccountNum,files,supplierCapitalId}) {
  const data = {
    centreId,
    name,
    username,
    password,
    companyName,
    businessLicense,
    contractName,
    contractNum,
    validDate,
    bankCode,
    bankBranch,
    bankAccountNum,
    files,
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/maintain/operate_distributor',
    method: 'post',
    data
  })
}


/**
 * 查询授信签署
 * @param supplierCapitalId 商户 id
 */
export function querySign (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/maintain/query_sign',
    method: 'post',
    data
  })
}


/**
 * 授信签署-计算月利率和年利率
 * @param supplierCapitalId 商户 id
 */
export function calculatedInterest (loanRate) {
  const data = {
    loanRate
  }
  return fetch({
    url: test + '/capital-api/maintain/calculated_interest',
    method: 'post',
    data
  })
}

/**
 * 修改授信签署
 * @param supplierCapitalId 商户 id
 * @param capitalId 资金方 id
 * @param totalCreditLine 总授信额度
 * @param creditLineExpireTime 授信额度届满日
 * @param creditAndIterestRate 授信与利息
 */
export function updateSign ({supplierCapitalId, capitalId, totalCreditLine, creditLineExpireTime,interestRate,overdueRate,chargeRate,marginRate, creditAndIterestRate}) {
  const data = {
    supplierCapitalId,
    capitalId,
    totalCreditLine,
    creditLineExpireTime,
    interestRate,
    overdueRate,
    chargeRate,
    marginRate,
    creditAndIterestRate,
  }
  return fetch({
    url: test + '/capital-api/maintain/update_sign',
    method: 'post',
    data
  })
}

/**
 * 详情-合同管理-列表
 * @param supplierCapitalId 商户 id
 */
export function contractList (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/maintain/contract_list',
    method: 'post',
    data
  })
}
/**
 * 影像列表-查询
 * @param supplierCapitalId 商户 id
 */
export function fileList (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/file_list',
    method: 'post',
    data
  })
}
/**
 * 影像列表-上传影像
 * @param supplierCapitalId 商户 id
 */
export function uploadFile (data) {
  return fetch({
    url: test + '/capital-api/enterprise_data/upload_file',
    method: 'post',
    isFormData: true,
    headers: {'Content-Type': 'multipart/form-data; boundary=' + data._boundary},
    data
  })
}
/**
 * 影像列表-删除影像
 * @param supplierCapitalId 商户 id
 */
export function deleteFile (id) {
  const data = {
  	id
  }
  return fetch({
    url: test + '/capital-api/enterprise_data/delete_file',
    method: 'post',
    data
  })
}
/**
 * 补充资料-提交初审
 * @param supplierCapitalId 商户 id
 */
export function supplySubmitCheck (supplierCapitalId) {
	let data = {
		supplierCapitalId
	}
  return fetch({
    url: test + '/capital-api/enterprise_data/submit_check',
    method: 'post',
    data
  })
}
/**
 * 补充资料-拒绝
 * @param supplierCapitalId 商户 id
 */
export function reject ({supplierCapitalId,remark}) {
	let data = {
		supplierCapitalId,
		remark
	}
  return fetch({
    url: test + '/capital-api/enterprise_data/reject',
    method: 'post',
    data
  })
}
/**
 * 下拉列表-分销商下拉信息查询
 * @param supplierCapitalId 商户 id
 */
export function agentInfo (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/combobox/agent_info',
    method: 'post',
    data
  })
}
/**
 * 业务受理-补充资料-企业基本信息_经营地下拉
 * @param supplierCapitalId 商户 id
 */
export function locationType () {
  return fetch({
    url: test + '/capital-api/combobox/location_type',
    method: 'post',
  })
}
/**
 * 下拉列表-企业成员类型
 * @param supplierCapitalId 商户 id
 */
export function memberType (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/combobox/member_type',
    method: 'post',
    data
  })
}

/**
 * 下拉列表-资产子类型
 * @param supplierCapitalId 商户 id
 */
export function assetSubType (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/combobox/asset_sub_type',
    method: 'post',
    data
  })
}

/**
 * 资产子类型-房
 * @param supplierCapitalId 商户 id
 */
export function assetSubHouseType () {
  return fetch({
    url: test + '/capital-api/combobox/asset_sub_house_type',
    method: 'post'
  })
}

/**
 * 资产子类型-车
 * @param supplierCapitalId 商户 id
 */
export function assetSubCarType () {
  return fetch({
    url: test + '/capital-api/combobox/asset_sub_car_type',
    method: 'post'
  })
}
/**
 * 下拉列表-与借款企业关系
 * @param supplierCapitalId 商户 id
 */
export function affiliateType (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/combobox/affiliate_type',
    method: 'post',
    data
  })
}
/**
 * 下拉列表-严重程度
 * @param supplierCapitalId 商户 id
 */
export function levelInfo (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/combobox/level_info',
    method: 'post',
    data
  })
}

/**
 * 下拉列表-分销商下拉信息查询
 * @param supplierCapitalId 商户 id
 */
export function bankList (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/combobox/bank_list',
    method: 'post',
    data
  })
}

/**
 * 下拉列表-证件类型
 * @param supplierCapitalId 商户 id
 */
export function certificateType (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/combobox/certificate_type',
    method: 'post',
    data
  })
}

/**
 * 下拉列表-征信记录所属下拉
 * @param supplierCapitalId 商户 id
 */
export function creditBelong ({supplierCapitalId,type}) {
  const data = {
    supplierCapitalId,
    type
  }
  return fetch({
    url: test + '/capital-api/combobox/credit_belong',
    method: 'post',
    data
  })
}

/**
 * 下拉列表-身份证件类型
 * @param supplierCapitalId 商户 id
 */
export function identityType ({supplierCapitalId,type}) {
  const data = {
    supplierCapitalId,
    type
  }
  return fetch({
    url: test + '/capital-api/combobox/identity_type',
    method: 'post',
    data
  })
}
/**
 * 补充资料_企业基本信息_股东名单_类型下拉
 * @param supplierCapitalId 商户 id
 */
export function capitalType () {
  return fetch({
    url: test + '/capital-api/enterprise_data/capital_type',
    method: 'post'
  })
}
/**
 * 补充资料_企业基本信息_股东变更_变更事项下拉
 * @param supplierCapitalId 商户 id
 */
export function changeType () {
  return fetch({
    url: test + '/capital-api/enterprise_data/change_type',
    method: 'post'
  })
}

export default {
	detailTop,
	headData,
	financeGeneralSituation,
	customType,
	basicData,
	saveBasicData,
	accountLicense,
	saveAccountLicense,
	shareHolding,
	saveShareHolding,
	enterpriseChange,
  	saveEnterpriseChange,
  	extendInfo,
  	saveExtendInfo,
  	companyManage,
  	updateCompanyManage,
  	marketInfo,
  	saveMarketInfo,
  	intoUpdownstream,
  	queryTitanUpdownstream,
  	saveUpdownstreamData,
  	borrowInfo,
  	affiliatedCompany,
  	updateAffiliatedCompany,
  	queryManager,
  	queryRepreManager,
  	saveManager,
  	queryCredit,
  	saveCredit,
  	queryPaper,
  	savePaper,
  	queryEnterpriseGuarantor,
  	assetInfo,
  	updateAsset,
  	selectGuarantorList,
  	createTestKey,
  	deleteEnterpriseGuarantor,
  	saveEnterpriseGuarantor,
  	queryDistributor,
  	deleteDistributor,
  	operateDistributor,
  	querySign,
  	calculatedInterest,
  	updateSign,
  	contractList,
  	fileList,
  	uploadFile,
  	deleteFile,
  	supplySubmitCheck,
  	reject,
  	agentInfo,
  	locationType,
  	memberType,
  	assetSubType,
  	assetSubHouseType,
  	assetSubCarType,
  	affiliateType,
  	levelInfo,
  	bankList,
  	certificateType,
  	creditBelong,
  	identityType,
  	capitalType,
  	changeType
}