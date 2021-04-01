import { message } from 'ant-design-vue'

function salert(value, type = 'info') {
  message.config({
    top: '10%',
  })
  message[type](value)
}

export default ({ app }, inject) => {
  const { route, req, redirect, $axios } = app.context
  const requestList = {}
  const methods = ['get', 'post', 'put', 'delete']
  methods.forEach((method) => {
    const dataKey = method === 'get' ? 'params' : 'data'
    requestList[method] = function (url, data) {
      return new Promise((resolve) => {
        $axios({
          method,
          url,
          [dataKey]: data,
        })
          .then((res) => {
            if (res.status === 200) {
              resolve(res.data || res.params)
            } else if (res.status === 401) {
              if (process.client) {
                salert(res.message, 'error')
                setTimeout(() => {
                  const path = route.path
                  redirect('/login?redirectUrl=' + encodeURIComponent(path))
                }, 1500)
              } else {
                const path = req.originalUrl
                redirect('/login?redirectUrl=' + encodeURIComponent(path))
              }
            } else {
              resolve({
                data: { length: 0 },
                params: { length: 0 },
              })
            }
          })
          .catch((err) => {
            console.error(err)
            resolve({
              data: { length: 0 },
              params: { length: 0 },
            })
          })
      })
    }
  })
  inject('request', requestList)
}
