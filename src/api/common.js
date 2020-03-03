import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 公共接口

/**
 * 银行列表
 */
export function comboboxBankList () {
  return fetch({
    url: test + '/capital-api/combobox/bank_list',
    method: 'post'
  })
}

/**
 * 核心企业
 */
export function comboboxCentreEnterprise () {
  return fetch({
    url: test + '/capital-api/combobox/centre_enterprise',
    method: 'post'
  })
}

/**
 * 客户类型-下拉
 */
export function customerType () {
  return fetch({
    url: test + '/capital-api/supplier_verify/customer_type',
    method: 'post'
  })
}

/**
 * 商户信息-信息下拉
 */
export function queryEnterprise () {
  return fetch({
    url: test + '/capital-api/agreement/query_enterprise',
    method: 'post'
  })
}

/**
 * 资金方
 */
export function queryCapitalEnterprise () {
  return fetch({
    url: test + '/capital-api/agreement/query_enterprise',
    method: 'post'
  })
}


/**
 * 还款方式
 */
export function repaymentMethod () {
  return fetch({
    url: test + '/capital-api/standing_book/repayment_method',
    method: 'post'
  })
}
/**
 * 经营地情况
 */
export function officeStable() {
  return fetch({
    url: test + '/capital-api/combobox/office_Stable',
    method: 'post'
  })
}
/**
 * 资料明细-借款产品类型
 */
export function loanProductType () {
  return fetch({
    url: test + '/capital-api/standing_book/loan_product_type',
    method: 'post'
  })
}

export default {
  comboboxBankList,
  comboboxCentreEnterprise,
  customerType,
  queryEnterprise,
  queryCapitalEnterprise,
  loanProductType,
  repaymentMethod,
  officeStable
}
