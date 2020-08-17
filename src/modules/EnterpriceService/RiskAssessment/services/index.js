import request from '@/utils/request'

// 获取分页获取风险评估列表
export function getRiskAssessmentTable(params) {
  return request(`/api/risk_assess/page_by_param`, {
    method: 'GET',
    data: params
  })
}
