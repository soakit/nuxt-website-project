export default function (app) {
  const { route, req, redirect, $cookies } = app
  const isClient = process.client
  const isServer = process.server
  let redirectURL = '/login'
  let token, path
  // 在服务端
  if (isServer) {
    token = $cookies.get('token') || ''
    path = req.originalUrl
  }
  // 在客户端判读是否需要登陆
  if (isClient) {
    token = localStorage.getItem('token') || ''
    path = route.path
  }
  if (path) {
    redirectURL = '/login?redirectUrl=' + encodeURIComponent(path)
  }
  // 需要进行权限判断的页面开头
  if (!token) {
    redirect(redirectURL)
  }
}
