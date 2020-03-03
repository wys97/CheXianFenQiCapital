import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 押品管理-信息登记列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param status 阶段状态
 */
export function getListData ({limit,page,agreementNo,agreementType,enterpriseName,capitalName}) {
  const data = {
    limit,
    page,
    agreementNo,
    agreementType,
    enterpriseName,
    capitalName
  }
  return fetch({
    url: test + '/capital-api/agreement/contract_list',
    method: 'post',
    data
  })
}

/**
 * 商户列表查询-（入驻阶段接口）
 */
export function collateralRegisterStatus () {
  return fetch({
    url: test + '/admin/combobox/collateral_register_status',
    method: 'post'
  })
}

/**
 * 合同类型
 */
export function agreementType () {
  return fetch({
    url: test + '/capital-api//agreement/agreement_type',
    method: 'post'
  })
}
export default {
  getListData,
  collateralRegisterStatus,
  agreementType
}
