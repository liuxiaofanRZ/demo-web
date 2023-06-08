import BaseLayout from '@/components/base/BaseLayout.vue'
import { useMenuStore } from '@/stores/menu'
import { useUserStore } from '@/stores/user'
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
router.$clearDynamicRoutes = (nameList) => {
  // 清空动态路由，用于重新登录，切换用户的时候
  nameList.forEach(router.removeRoute)
  router.$dynamicRoutesFlag = false
}
/* 处理动态路由 */
// 添加路由
const pages = import.meta.glob('/src/views/**/page/*.vue') // 路由页面的父级目录名必须是page
function handleAddRoute(list, parentName) {
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
      handleAddRoute(menu.children, route.name)
    }
  })
}
async function addRoutes() {
  const menuStore = useMenuStore()
  await menuStore.getMenu()
  handleAddRoute(menuStore.menuList, shortcut.home)
}
// 清空路由
function handleRemoveRoute(menu) {
  if (Array.isArray(menu.children)) {
    menu.children.forEach(handleRemoveRoute)
  }
  router.removeRoute(menu.id)
}
function clearRoutes() {
  const menuStore = useMenuStore()
  menuStore.menuList.forEach(handleRemoveRoute)
  router.$dynamicRoutesFlag = false
  menuStore.setMenuList()
  console.log('动态路由已清空')
}
router.$clearRoutes = clearRoutes

const staticRoutes = ['/Login', '/Register', '/'] // 静态路由白名单
const noTokenRoutes = ['/Login', '/Register']
// 全局导航守卫
router.beforeEach(async (to,from) => {
  console.log(to,from)
  const userStore = useUserStore()
  // 已登录
  if (userStore.userinfo) {
    if (noTokenRoutes.includes(to.path)) {
      return ({path:from.fullPath})
    } else if (router.$dynamicRoutesFlag) {
      return true
    } else {
      await addRoutes(router)
      router.$dynamicRoutesFlag = true
      return to.fullPath
    }
  }
  // 未登录
  else {
    if (noTokenRoutes.includes(to.path)) {
      return true
    } else {
      return {path:'/Login'}
    }
  }
})

export default router
