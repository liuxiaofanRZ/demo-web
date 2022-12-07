import { getMenuListByPid } from '@/api'
import { useMenuStore } from '@/stores/menu'

const pages = import.meta.glob('/src/views/**/page/*.vue')
// 添加动态路由
export async function addRoutes(router) {
  const menuStore = useMenuStore()
  await menuStore.getMenu()
  handleRoute(menuStore.menuData, router)
  return router
}
function handleRoute(list, router) {
  list.forEach((menu) => {
    let route = {
      title: menu.title,
      name: menu.name,
      path: menu.path,
      id: menu.id,
      isLeaf: menu.isLeaf,
      pid: menu.pid,
      component: menu.component,
      meta: {
        id: menu.id
      }
    }
    // 错误的path
    if (!/^\//.test(route.path)) return
    route.component = pages[`/src/views${menu.component}`]
    if (menu.children && menu.children.length > 0) {
      handleRoute(menu.children, router)
    }
    // 全部添加到name为base的路由下
    router.addRoute('base', route)
  })
}
