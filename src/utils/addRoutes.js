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
      name: menu.id, // TODO:在服务端根据path生成该字段,先用id代替
      path: menu.path,
      id: menu.id,
      meta: {
        title: menu.title,
        isLeaf: menu.isLeaf,
        pid: menu.pid,
        id: menu.id,
      },
    }
    if(!menu.path) return 

    // 设置路由组件
    route.component = pages[`/src/views${menu.component}`] || RouterView
    // 添加路由
    if (parentName && !menu.isNewPage) {
      router.addRoute(parentName, route)
    } else {
      router.addRoute(route)
    }
    // 处理子路由
    if (menu.children && menu.children.length > 0) {
      handleRoute(menu.children, router, route.name)
    }
  })
}
