import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '面板', icon: 'dashboard' }
    }]
  },

  {
    path: '/home',
    component: Layout,
    redirect: '/home/banners',
    meta: { title: '首页设置', icon: 'example' },
    children: [
      {
        path: 'banners',
        name: 'Banners',
        component: () => import('@/views/home/banners'),
        meta: { title: '轮播图设置', icon: 'tree' }
      },
      {
        path: 'buttons',
        name: 'Buttons',
        component: () => import('@/views/home/buttons'),
        meta: { title: '按钮设置', icon: 'tree' }
      }
    ]
  },

  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    meta: { title: '商品管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'productList',
        component: () => import('@/views/product/list'),
        meta: { title: '所有商品', icon: 'form' }
      },
      {
        path: 'info',
        name: 'productInfo',
        hidden: true,
        component: () => import('@/views/product/info'),
        meta: { title: '商品详情', icon: 'form' }
      },
      {
        path: 'insert',
        name: 'Form',
        component: () => import('@/views/product/info'),
        meta: { title: '新增商品', icon: 'form' }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    children: [{
      path: 'index',
      name: 'order',
      component: () => import('@/views/order/index'),
      meta: { title: '订单管理', icon: 'form' }
    }]
  },

  {
    path: '/news',
    component: Layout,
    redirect: '/news/list',
    children: [{
      path: 'list',
      name: 'news',
      component: () => import('@/views/news/news'),
      meta: { title: '品牌文化', icon: 'form' }
    }]
  },

  {
    path: '/videos',
    component: Layout,
    redirect: '/videos/list',
    children: [{
      path: 'list',
      name: 'videos',
      component: () => import('@/views/videos/videos'),
      meta: { title: '品牌视频', icon: 'form' }
    }]
  },

  {
    path: '/retail',
    component: Layout,
    redirect: '/retail/index',
    children: [{
      path: 'index',
      name: 'retail',
      component: () => import('@/views/retail/retail'),
      meta: { title: '营销配置', icon: 'form' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    children: [{
      path: 'index',
      name: 'user',
      component: () => import('@/views/user/index'),
      meta: { title: '账号设置', icon: 'form' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
