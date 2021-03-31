export const state = () => ({
  menuList: [],
  articleObj: {},
  newsObj: {},
})

export const mutations = {
  GET_MENU_LIST(state, payload) {
    state.menuList = payload
  },
  GET_ARTICLE_LIST(state, payload) {
    state.articleObj = payload
  },
  GET_NEWS_LIST(state, payload) {
    state.newsObj = payload
  },
}

export const actions = {
  // server init时就请求菜单
  async nuxtServerInit({ commit }, app) {
    const menuList = await app.$api.getMenuList()
    commit('GET_MENU_LIST', menuList)
  },
}
