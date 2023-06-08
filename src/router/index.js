import BaseLayout from '@/components/base/BaseLayout.vue'
import { useMenuStore } from '@/stores/menu'
import Error404 from '@/views/system/page/Error404.vue'
import { createRouter, createWebHistory, RouterView } from 'vue-router'
let router
const shortcut = {
  home: 'Base',
  login: 'Login',
  register: 'Register',
  error404: 'Error404',
}
router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'Home',
      component: BaseLayout,
      name: shortcut.home,
      children: [
        // {
        //   path:"/MenuMgt",
        //   name:"MenuMgt",
        //   component: ()=>import("../views/system/page/MenuMgt.vue")
        // }
      ],
    },
    {
      path: '/Login',
      name: shortcut.login,
      component: () => import('@/views/system/user/page/Login.vue'),
    },
    {
      path: '/Register',
      name: shortcut.register,
      component: () => import('@/views/system/user/page/Register.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      name: shortcut.error404,
      component: Error404,
    },
  ],
})
router.$shortcut = shortcut // TODO: 一些快捷功能（不是很好用，待重构）
router.$dynamicRoutesFlag = false // 是否添加了动态路由
/* 添加动态路由 */
const pages = import.meta.glob('/src/views/**/page/*.vue') // 路由页面的父级目录名必须是page
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
  handleRoute(menuStore.menuList, shortcut.home)
}

const staticRoutes = ['/Login', '/Register', '/'] // 静态路由白名单
// 全局导航守卫
router.beforeEach(async (to) => {
  if (router.$dynamicRoutesFlag || staticRoutes.includes(to.path)) {
    return true
  } else {
    await addRoutes(router)
    router.$dynamicRoutesFlag = true
    return to.fullPath
  }
})

export default router
