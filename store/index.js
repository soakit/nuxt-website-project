export const state = () => ({
  menuList: [],
})

export const mutations = {
  GET_MENU_LIST(state, payload) {
    state.menuList = payload
  },
}

export const actions = {
  // server init时就请求菜单
  async nuxtServerInit({ commit }, app) {
    const menuList = await app.$api.getMenuList()
    commit('GET_MENU_LIST', menuList)
  },
}
