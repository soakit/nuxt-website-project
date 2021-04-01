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
    getArticleDetail(params) {
      return $request.get('/v2/article/detail', params)
    },
    login(params) {
      return $request.post('/user/login-by-sms', params)
    },
  })
}
