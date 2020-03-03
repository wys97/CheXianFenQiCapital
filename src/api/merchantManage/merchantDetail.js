import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

/**
 * 商户管理授信信息
 * @param supplierId 供应商ID
 */
export function signDetail (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/sign_detail',
    method: 'post',
    data
  })
}
/**
 * 商户管理详情-基本信息 企业信息
 * @param supplierId 供应商ID
 */
export function enterprise (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/query_enterprise_info',
    method: 'post',
    data
  })
}

/**
 * 商户管理详情-基本信息 法定代表人信息
 * @param supplierId 供应商ID
 */
export function repre (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/management_detail_repre',
    method: 'post',
    data
  })
}

/**
 * 商户管理详情-基本信息 担保人信息
 * @param supplierId 供应商ID
 */
export function guarantor (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/query_enterprise_guarantor',
    method: 'post',
    data
  })
}

/**
 * 商户管理-贸易信息
 * @param supplierId 供应商ID
 */
export function queryDistributor (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/query_distributor',
    method: 'post',
    data
  })
}

/**
 * 商户管理-头部信息
 * @param supplierId 供应商ID
 */
export function headInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/head_info',
    method: 'post',
    data
  })
}
/**
 * 成员名单列表查询
 * @param supplierId 供应商 id
 */
export function queryManager (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/query_manager',
    method: 'post',
    data
  })
}

/**
 * 企业附件列表查询
 * @param supplierId 供应商 id
 */
export function queryPaper (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/query_paper',
    method: 'post',
    data
  })
}
export default {
	signDetail,
  enterprise,
  repre,
  guarantor,
  queryDistributor,
  headInfo,
  queryManager,
  queryPaper
}
