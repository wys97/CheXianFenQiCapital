import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

//初审

/**
 * 初审详情-头部信息
 * @param supplierCapitalId 商户ID
 */
export function checkHead (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/head',
    method: 'post',
    data
  })
}

/**
 * 实际控制人-查询
 * @param supplierCapitalId 商户ID
 */
export function queryController (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/query_controller',
    method: 'post',
    data
  })
}
/**
 * 企业信息-查询
 * @param supplierCapitalId 商户ID
 */
export function queryEnterprise (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/query_enterprise',
    method: 'post',
    data
  })
}
/**
 * 实际控制人-法人查询
 * @param supplierCapitalId 商户ID
 */
export function repreInfo (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/repre_info',
    method: 'post',
    data
  })
}

/**
 * 实际控制人-保存
 * @param supplierCapitalId 商户ID
 */
export function saveController ({supplierCapitalId,name,idcardNo,gender,address,mobile,email,idcardPicFrontKey,idcardPicBackKey,educationBackground,maritalStatus,localResident,representative}) {
  const data = {
    supplierCapitalId,
    name,
    idcardNo,
    gender,
    address,
    mobile,
    email,
    idcardPicFrontKey,
    idcardPicBackKey,
    educationBackground,
    maritalStatus,
    localResident,
    representative,
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/save_controller',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-企业销售情况-查询
 * @param supplierCapitalId 商户ID
 */
export function verifyEnterpriseSale (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/verify_enterprise_sale',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-企业销售情况-修改
 * @param supplierCapitalId 商户ID
 */
export function saveVerifyEnterpriseSale ({supplierCapitalId,saleStatSelf,saleStatOther}) {
  const data = {
    supplierCapitalId,
    saleStatSelf,
    saleStatOther
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/save_verify_enterprise_sale',
    method: 'post',
    data
  })
}

/**
 * 发票银行流水-查询
 * @param supplierCapitalId 商户ID
 */
export function invoiceBankSale (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/invoice_bank_sale',
    method: 'post',
    data
  })
}
/**
 * 发票银行流水-保存
 * @param supplierCapitalId 商户ID
 */
export function saveInvoiceBankSale ({supplierCapitalId,invoice,invoiceCheckType,bank,saleAnalysis,saleEstimatedAmount}) {
  const data = {
    supplierCapitalId,
    invoice,
    invoiceCheckType,
    bank,
    saleAnalysis,
    saleEstimatedAmount
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/save_invoice_bank_sale',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-企业主营业务营运资金循环-查询
 * @param supplierCapitalId 商户ID
 */
export function verifyBusinessOperatCapital (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/verify_business_operat_capital',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-企业主营业务营运资金循环-修改
 * @param supplierCapitalId 商户ID
 */
export function verifyUpdateBusinessOperatCapital ({supplierCapitalId,businessTurnover,businessUpstream,businessDownstream,businessReceivableHard,businessReceivableInfo,turnoverReceivable,turnoverStock,turnoverPayable,turnoverPaid,turnoverReceived,turnoverActualCapital,profitRate}) {
  const data = {
    supplierCapitalId,
    businessTurnover,
    businessUpstream,
    businessDownstream,
    businessReceivableHard,
    businessReceivableInfo,
    turnoverReceivable,
    turnoverStock,
    turnoverPayable,
    turnoverPaid,
    turnoverReceived,
    turnoverActualCapital,
    profitRate
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/verify_update_business_operat_capital',
    method: 'post',
    data
  })
}

/**
 * 尽调检查-企业负债情况-查询
 * @param supplierCapitalId 商户ID
 */
export function enterpriseDebt (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/enterprise_debt',
    method: 'post',
    data
  })
}
/**
 * 企业负债信息保存
 * @param supplierCapitalId 商户ID
 */
export function enterpriseDeptSave ({supplierCapitalId,finance,nonfinance,borrow,guarantee,interest}) {
  const data = {
    supplierCapitalId,
    finance,
    nonfinance,
    borrow,
    guarantee,
    interest
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/enterprise_dept_save',
    method: 'post',
    data
  })
}

/**
 * 尽调检查-企业负债情况-查询
 * @param supplierCapitalId 商户ID
 */
export function enterpriseFinance (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/enterprise_finance',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-企业财务统计保存
 * @param supplierCapitalId 商户ID
 */
export function enterpriseFinanceSave ({supplierCapitalId,equityAmount}) {
  const data = {
    supplierCapitalId,
    equityAmount
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/enterprise_finance_save',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-现场尽职调查-查询
 * @param supplierCapitalId 商户ID
 */
export function spotCheck (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/spot_check',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-现场尽职调查-修改
 * @param supplierCapitalId 商户ID
 */
export function spotCheckSave ({supplierCapitalId,spotCheck,spotCheckFiles}) {
  const data = {
    supplierCapitalId,
    spotCheck,
    spotCheckFiles
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/spot_check_save',
    method: 'post',
    data
  })
}

/**
 * 尽调检查-负面信息核查结果-查询
 * @param supplierCapitalId 商户ID
 */
export function verifyNegativeInfo (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/verify_negative_info',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-负面信息核查情况-修改
 * @param supplierCapitalId 商户ID
 */
export function verifyUpdateNegativeInfo ({supplierCapitalId,content}) {
  const data = {
    supplierCapitalId,
    content
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/verify_update_negative_info',
    method: 'post',
    data
  })
}

/**
 * 授信结论-查询
 * @param supplierCapitalId 商户ID
 */
export function signConclusion (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/sign_conclusion',
    method: 'post',
    data
  })
}



/**
 * 授信结论-保存
 * @param supplierCapitalId 商户ID
 */
export function saveSignConclusion ({supplierCapitalId,creditLine,creditLineMonth,enterpriseStrength,checkSummary,postLoanManagement,conclusionRemark}) {
  const data = {
    supplierCapitalId,
    creditLine,
    creditLineMonth,
    enterpriseStrength,
    checkSummary,
    postLoanManagement,
    conclusionRemark,
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/save_sign_conclusion',
    method: 'post',
    data
  })
}
/**
 * 授信结论-结论状态-单选按钮数据
 * @param supplierCapitalId 商户ID
 */
export function signConclusionStatus (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/sign_conclusion_status',
    method: 'post',
    data
  })
}
/**
 * 授信结论-企业实力和业绩-单选按钮数据
 * @param supplierCapitalId 商户ID
 */
export function signEnterpriseStrength (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/sign_enterprise_strength',
    method: 'post',
    data
  })
}
/**
 * 评级打分卡-查询
 * @param supplierCapitalId 商户ID
 */
export function scorecardQuery(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/scorecard/query',
    method: 'post',
    data
  })
}
/**
 * 评级打分卡-修改
 * @param supplierCapitalId 商户ID
 */
export function scorecardSave({supplierCapitalId,selectedMap}) {
  const data = {
    supplierCapitalId,
    selectedMap
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/scorecard/save',
    method: 'post',
    data
  })
}

/**
 * 商户审核--详情
 * @param supplierCapitalId 商户ID
 */
export function supplierVerifyDetail(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/detail',
    method: 'post',
    data
  })
}

/**
 * 保存资方授信
 * @param supplierCapitalId 商户ID
 */
export function supplierVerifySave({supplierCapitalId,capitalCreditLine,capitalCreditLineMonth,creditLineRevolvable}) {
  const data = {
    supplierCapitalId,
    capitalCreditLine,
    capitalCreditLineMonth,
    creditLineRevolvable
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/save',
    method: 'post',
    data
  })
}

/**
 * 审批通过
 * @param supplierCapitalId 商户ID
 */
export function checkPass(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/pass',
    method: 'post',
    data
  })
}
/**
 * 审批拒绝
 * @param supplierCapitalId 商户ID
 */
export function checkReject({supplierCapitalId,remark}) {
  const data = {
    supplierCapitalId,
    remark
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/reject',
    method: 'post',
    data
  })
}
/**
 * 初审详情-初审打回
 * @param supplierCapitalId 商户ID
 */
export function checkReturned({supplierCapitalId,remark}) {
  const data = {
    supplierCapitalId,
    remark
  }
  return fetch({
    url: test + '/capital-api/supplier_verify/check_returned',
    method: 'post',
    data
  })
}
/**
 * 授信期限下拉
 * @param supplierCapitalId 商户ID
 */
export function creditLineMonths() {
  return fetch({
    url: test + '/capital-api/supplier_verify/credit_line_months',
    method: 'post',
  })
}
/**
 * 第三方平台下拉
 * @param supplierCapitalId 商户ID
 */
export function thirdPartyPlatformType() {
  return fetch({
    url: test + '/capital-api/supplier_verify/thirdParty_platform_type',
    method: 'post',
  })
}
/**
 * 产品/服务 下拉
 * @param supplierCapitalId 商户ID
 */
export function upDownProductType() {
  return fetch({
    url: test + '/capital-api/supplier_verify/upDown_product_type',
    method: 'post',
  })
}

/**
 * 银行流水验证下拉
 * @param supplierCapitalId 商户ID
 */
export function bankStatType() {
  return fetch({
    url: test + '/capital-api/supplier_verify/bank_stat_type',
    method: 'post',
  })
}

/**
 * 贷款种类下拉
 * @param supplierCapitalId 商户ID
 */
export function loanType() {
  return fetch({
    url: test + '/capital-api/supplier_verify/loan_type',
    method: 'post',
  })
}

export default {
	checkHead,
	verifyUpdateNegativeInfo,
	verifyNegativeInfo,
	spotCheck,
	spotCheckSave,
	enterpriseFinance,
	enterpriseFinanceSave,
	enterpriseDebt,
	enterpriseDeptSave,
	saveVerifyEnterpriseSale,
	invoiceBankSale,
	saveInvoiceBankSale,
	verifyBusinessOperatCapital,
	verifyUpdateBusinessOperatCapital,
	queryController,
  queryEnterprise,
	repreInfo,
	saveController,
	verifyEnterpriseSale,
	signConclusion,
	saveSignConclusion,
	signConclusionStatus,
	signEnterpriseStrength,
	scorecardQuery,
	scorecardSave,
	creditLineMonths,
	thirdPartyPlatformType,
	upDownProductType,
	bankStatType,
	loanType,
	supplierVerifyDetail,
	supplierVerifySave,
	checkPass,
	checkReject,
	checkReturned
}
