export default {
  path: 'riskAssessment',
  name: 'riskAssessment',
  component: () => import('@/modules/EnterpriceService/RiskAssessment/views/list.vue'),
  meta: {
    title: '风险评估服务',
    icon: 'iconfont iconirregular-risk'
  }
}
