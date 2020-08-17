import EnterpriceService from '@/modules/EnterpriceService/routes'

// 尾递归 不会爆栈
// 将每个router对象中path修改成完整路径
function completePath(item) {
  console.log(item)
  if (item.children) {
    item.children.forEach((value) => {
      if (value.path && !value.path.includes('/')) {
        value.path = `${item.path}/${value.path}`
        console.log(value)
      }
      if (value.children) {
        return completePath(value)
      }
    })
  }
}

// // 将每个route的path都填充完整，复杂度为n
// Object.keys(files).forEach((key) => {
//   const routes = files[key]
//   if (routes.children) {
//     completePath(routes)
//   }
// })

completePath(EnterpriceService)
export { EnterpriceService }
