export default {
  path: 'account',
  name: 'account',
  component: () => import('@/modules/EnterpriceService/Account/views/list.vue'),
  meta: {
    title: '账户信息',
    icon: 'iconfont iconsquare-account'
  }
}
