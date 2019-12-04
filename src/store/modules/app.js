import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // opened: true,
    withoutAnimation: false
  },
  device: 'desktop',
  routes: []
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    // state.sidebar.opened = true
    state.sidebar.withoutAnimation = false
    // state.sidebar.withoutAnimation = true
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      //   Cookies.set('sidebarStatus', 0)
      Cookies.set('sidebarStatus', 1)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    // state.sidebar.opened = true
    state.sidebar.withoutAnimation = withoutAnimation
    // state.sidebar.withoutAnimation = true
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
