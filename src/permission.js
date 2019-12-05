import router from './router'
import { resetRouter } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { asyncRoutes,constantRoutes } from '@/router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

function createRoutes() {
  let routes = null
  // eslint-disable-next-line no-unmodified-loop-condition
  if (store) {
    routes = []
    const role = store.getters.role[0]
    for (const route of asyncRoutes) {
      let ready = true
      if ('meta' in route) {
        if ('role' in route.meta) {
          if (!route.meta.role.includes(role)) {
            ready = false
          }
        }
      }
      if (ready && 'children' in route) {
        // 先将子组件清空
        const childrens = []
        const originalChildren = route.children
        route.children = childrens
        for (const children of originalChildren) {
          let childrenReady = true
          if ('meta' in children) {
            if ('role' in children.meta) {
              if (!children.meta.role.includes(role)) {
                childrenReady = false
              }
            }
          }
          if (childrenReady) {
            // 插入childrens
            childrens.push(children)
          }
        }
        // 遍历后将符合权限的子组件替换回来
        route.children = childrens
      }
      if (ready) {
        // 将符合权限的组件插入路由表中
        routes.push(route)
      }
    }
  }
  return routes
}
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.role
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          resetRouter()
          const routes = constantRoutes.concat(createRoutes())
          store.commit('app/SET_ROUTES', routes)
          router.addRoutes(routes)
          next({ ...to})
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
