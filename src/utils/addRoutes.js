import { useMenuStore } from '@/stores/menu'
import { RouterView } from 'vue-router'

const pages = import.meta.glob('/src/views/**/page/*.vue')
// 添加动态路由
export async function addRoutes(router) {
  const menuStore = useMenuStore()
  await menuStore.getMenu()
  handleRoute(menuStore.menuList, router, 'base')
  return router
}

function handleRoute(list, router, parentName) {
  list.forEach((menu) => {
    let route = {
      title: menu.title,
      name: menu.name,
      path: menu.path,
      id: menu.id,
      isLeaf: menu.isLeaf,
      pid: menu.pid,
      meta: {
        id: menu.id,
      },
    }
    // 设置路由组件
    route.component = pages[`/src/views${menu.component}`] || RouterView
    // 添加路由
    if (parentName) {
      router.addRoute(parentName, route)
    } else {
      router.addRoute(route)
    }
    // 处理子路由
    if (menu.children && menu.children.length > 0) {
      handleRoute(menu.children, router, menu.name)
    }
  })
}
