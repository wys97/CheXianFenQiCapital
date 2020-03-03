import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

/**
 * 商户审核详情-头部信息
 * @param financeNo 供应商ID
 */
export function detailHeadInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/detail_head_info',
    method: 'post',
    data
  })
}

/**
 * 授信签署-贸易详情
 * @param financeNo 供应商ID
 */
export function receivableDetail (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/receivable_detail',
    method: 'post',
    data
  })
}


/**
 * 查看商户授信
 * @param financeNo 供应商ID
 */
export function detail (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/query_credit',
    method: 'post',
    data
  })
}





/**
 * 审核通过
 * @param supplierId 供应商Id
 */
export function confirmPass (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/audi_pass',
    method: 'post',
    data
  })
}


/**
 * 审核拒绝
 * @param supplierId 供应商Id
 * @param reason 原因
 */
export function refuse ({supplierId,remark}) {
  const data = {
    supplierId,
    remark
  }
  return fetch({
    url: test + '/capital-api/supplier/audi_refuse',
    method: 'post',
    data
  })
}


/**
 * 签署并达成合作
 * @param supplierId 供应商Id
 */
export function capticalSign (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/audi_success',
    method: 'post',
    data
  })
}

/**
 * 查询合同签署状态
 * @param supplierId 供应商Id
 */
export function contractStatus (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/contract_status',
    method: 'post',
    data
  })
}

/**
 * 创建国内商业保理合同
 * @param supplierId 供应商Id
 */
export function createFactorContract (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/create_factor_contract',
    method: 'post',
    data
  })
}

/**
 * 创建保证合同
 * @param supplierId 供应商Id
 */
export function createGuaranteeContract (guarantorId) {
  const data = {
    guarantorId
  }
  return fetch({
    url: test + '/capital-api/supplier/create_guarantee_contract',
    method: 'post',
    data
  })
}

/**
 * 保证合同-发送消息推送
 * @param guarantorId 担保人id
 */
export function guaranteeAgreement (guarantorId) {
  const data = {
    guarantorId
  }
  return fetch({
    url: test + '/capital-api/supplier/guarantee_agreement',
    method: 'post',
    data
  })
}

/**
 * 国内商业保理合同-发送消息推送
 * @param guarantorId 担保人id
 */
export function commerceFactorContract (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/commerce_factor_contract',
    method: 'post',
    data
  })
}

/**
 * 信用评分
 * @param supplierId 供应商id
 */
export function creditScore (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/credit_score',
    method: 'post',
    data
  })
}


/**
 * 查询授信签署
 * @param supplierId 供应商 id
 */
export function queryCredit (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/query_credit',
    method: 'post',
    data
  })
}

/**
 * 授信签署-评级-重新评级
 * @param supplierId 供应商 id
 */
export function evaluateGrade (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier_register/evaluate_grade',
    method: 'post',
    data
  })
}

/**
 * 授信签署-评级-查询评级
 * @param supplierId 供应商 id
 */
export function queryGrade (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/query_grade',
    method: 'post',
    data
  })
}

/**
 * 授信签署-评级-查询评级详情
 * @param supplierId 供应商 id
 */
export function queryGradeDetail (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/query_grade_detail',
    method: 'post',
    data
  })
}

/**
 * 授信签署-计算月利率和年利率
 * @param supplierId 供应商 id
 */
export function calculatedInterest (loanRate) {
  const data = {
    loanRate
  }
  return fetch({
    url: test + '/capital-api/supplier/calculated_interest',
    method: 'post',
    data
  })
}

/**
 * 修改授信签署
 * @param supplierId 供应商 id
 * @param capitalId 资金方 id
 * @param totalCreditLine 总授信额度
 * @param creditLineExpireTime 授信额度届满日
 * @param creditAndIterestRate 授信与利息
 */
export function  updateCredit ({supplierId, capitalId, totalCreditLine, creditLineExpireTime,interestRate,overdueRate,chargeRate,marginRate, creditAndIterestRate}) {
  const data = {
    supplierId,
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
    url: test + '/capital-api/supplier/update_credit',
    method: 'post',
    data
  })
}


export default {
  	detail,
	receivableDetail,
  	detailHeadInfo,
  	confirmPass,
  	refuse,
  	capticalSign,
  	contractStatus,
  	createFactorContract,
  	createGuaranteeContract,
  	guaranteeAgreement,
  	commerceFactorContract,
  	creditScore,
  	queryCredit,
  	evaluateGrade,
  	queryGrade,
  	queryGradeDetail,
  	calculatedInterest,
  	updateCredit,
}
