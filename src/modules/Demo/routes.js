const files = require.context('./modules', true, /routes\/index\.js$/)
const routes = []
files.keys().forEach((key) => {
  // routes
  routes.push(files(key).default)
})

export default {
  path: '/demo',
  name: 'demo',
  component: BlankLayout,
  meta: {
    title: 'mitojs-示例',
    hideMenuLayout: false
  },
  redirect: { name: routes[0].name },
  children: routes
}
