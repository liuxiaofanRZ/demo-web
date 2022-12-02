import { getMenuListByPid } from '@/api'

const pages = import.meta.glob('/src/views/**/page/*.vue')

// 添加动态路由
export async function addRoutes(router) {
  let res = await getMenuListByPid({ pid: 0 })
  res.result.forEach((menu) => {
    let route = Object.assign({}, menu)
    route.component = pages[`/src/views${menu.component}`]
    router.addRoute('base', route)
  })
  return router
}
