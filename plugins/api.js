export default ({ app: { $request } }, inject) => {
  inject('api', {
    // 导航菜单
    getMenuList() {
      return $request.get('/common/menu')
    },
    // 文章列表
    getArticleList(params) {
      return $request.get('/v2/article/list', params)
    },
    // 文章详情
    getArticleDetail(params) {
      return $request.get('/v2/article/detail', params)
    },
    // 登录
    login(params) {
      return $request.post('/user/login-by-sms', params)
    },
    // 收益
    getProfit(params) {
      return $request.get('/user/get-balance', params)
    },
  })
}
