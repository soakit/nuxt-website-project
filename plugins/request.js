export default ({ app }, inject) => {
  const { $axios } = app
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
            if (res.message === 'success') {
              resolve(res.data || res.params)
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
