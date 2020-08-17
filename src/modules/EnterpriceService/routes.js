import RiskAssessment from './RiskAssessment/routes'
import Account from './Account/routes'
export default {
  path: '/enterpriceService',
  name: 'enterpriceService',
  component: BlankLayout,
  meta: {
    title: '企业服务',
    hideMenuLayout: false
  },
  redirect: { name: 'riskAssessment' },
  children: [RiskAssessment, Account]
}
