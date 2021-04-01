export const state = () => ({
  token: '',
  menuList: [],
  articleObj: {},
  newsObj: {},
  profitData: null,
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
  SET_TOKEN(state, payload = '') {
    state.token = payload
  },
  GET_PROFIT(state, payload) {
    state.profitData = payload
  },
}

export const actions = {
  // server init时就请求菜单
  async nuxtServerInit({ commit }, app) {
    const { $api, $cookies } = app
    const menuList = await $api.getMenuList()
    commit('GET_MENU_LIST', menuList)
    // 服务端从cookie中取token
    commit('SET_TOKEN', $cookies.get('token'))
  },
  nuxtClientInit({ commit }) {
    // 客户端从localStorage中取token
    commit('SET_TOKEN', localStorage.getItem('token'))
  },
}
