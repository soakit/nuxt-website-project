const environment = {
  production: process.env.NUXT_ENV === 'production',
}
const apiConfig = {
  mApiUrl: '',
  miningApiUrl: '',
  dataAppid: '',
  windowUrl: '',
  centerUrl: '',
  wxUrl: '',
}
if (environment.production) {
  // 生产
  apiConfig.mApiUrl = 'https://mapi.ipfsmain.cn/'
  apiConfig.miningApiUrl = 'https://miningapi.ipfsmain.cn/'
  apiConfig.dataAppid = '2018231629'
  apiConfig.windowUrl = 'https://www.ipfsmain.cn/'
  apiConfig.centerUrl = 'https://app.ipfsmain.cn/'
  apiConfig.wxUrl =
    'https://mapi.ipfsmain.cn/wx/auth-base?redirect_url=https://app.ipfsmain.cn/'
} else {
  // 测试环境
  apiConfig.mApiUrl = 'https://mapi.qiqutv.cn/'
  apiConfig.miningApiUrl = 'https://miningapi.qiqutv.cn/'
  apiConfig.dataAppid = '2093908371'
  apiConfig.windowUrl = 'https://www.qiqutv.cn/'
  apiConfig.centerUrl = 'https://app.qiqutv.cn/'
  apiConfig.wxUrl =
    'https://mapi.qiqutv.cn/wx/auth-base?redirect_url=https://app.qiqutv.cn/'
}

export { apiConfig }

export default function ({ app }) {
  const { $axios, $cookies } = app
  $axios.defaults.timeout = 30000
  $axios.interceptors.request.use((config) => {
    // console.log('config', config)
    const { url } = config
    if (url.startsWith('/user/')) {
      config.baseURL = apiConfig.miningApiUrl
    } else {
      config.baseURL = apiConfig.mApiUrl
    }
    config.headers['x-ipfsmain-token'] = $cookies.get('token') || ''
    return config
  })
  $axios.interceptors.response.use((response) => {
    if (/^[4|5]/.test(response.status)) {
      return Promise.reject(response.statusText)
    }
    return response.data
  })
}
