import BaseLayout from '@/components/base/BaseLayout.vue'
import { useMenuStore } from '@/stores/menu'
import Error404 from '@/views/system/page/Error404.vue'
import { createRouter, createWebHistory, RouterView } from 'vue-router'

const baseRouteName = 'base'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'Home',
      component: BaseLayout,
      name: baseRouteName,
      children: [
        // {
        //   path:"/MenuMgt",
        //   name:"MenuMgt",
        //   component: ()=>import("../views/system/page/MenuMgt.vue")
        // }
      ],
    },
    {
      path: '/:pathMatch(.*)',
      name: 'Error404',
      component: Error404,
    },
  ],
})

/* 动态添加路由-开始 */
const pages = import.meta.glob('/src/views/**/page/*.vue')
function handleRoute(list, parentName) {
  list.forEach((menu) => {
    let route = {
      name: menu.id, // TODO:在服务端根据path生成该字段,先用id代替
      path: menu.path,
      meta: {
        id: menu.id,
        pid: menu.pid,
        title: menu.title,
        isLeaf: menu.isLeaf,
      },
    }
    if (!menu.path) return

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
      handleRoute(menu.children, route.name)
    }
  })
}
async function addRoutes() {
  const menuStore = useMenuStore()
  await menuStore.getMenu()
  handleRoute(menuStore.menuList, baseRouteName)
}
let dynamicRoutesFlag = false
router.beforeEach(async (to) => {
  if (dynamicRoutesFlag) {
    console.log(to);
    return true
  } else {
    await addRoutes(router)
    dynamicRoutesFlag = true
    return to.fullPath
  }
})
/* 动态添加路由-结束 */

export default router
