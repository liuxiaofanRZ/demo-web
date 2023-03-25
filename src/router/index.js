import { createRouter, createWebHistory } from 'vue-router'
import Error404 from '@/views/system/page/Error404.vue'
import BaseLayout from '@/components/base/BaseLayout.vue'
import { addRoutes } from '@/utils/addRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'Home',
      component: BaseLayout,
      name: 'base',
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
// 动态路由添加标志
let dynamicRoutesFlag = false
router.beforeEach(async (to) => {
  if (dynamicRoutesFlag) {
    return true
  } else {
    await addRoutes(router)
    dynamicRoutesFlag = true
    return to.fullPath
  }
})

export default router
