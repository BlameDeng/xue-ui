function jsonp(url, params) {
  return new Promise((resolve, reject) => {
    typeof url === 'string' ? '' : reject('url必须是字符串')
    let query = ''
    if (params) {
      typeof params === 'object' ? '' : reject('params只能为非空对象')
      let entries = Object.entries(params)
      entries.forEach(array => {
        let str = `${array[0]}=${array[1]}&`
        query += str
      })
    }
    window.jsonp_callbackfn = function(data) {
      resolve(data)
      script.remove()
      delete window.jsonp_callbackfn
    }
    let queryStr = url + '?' + query + 'callback=jsonp_callbackfn'
    let script = document.createElement('script')
    script.src = queryStr
    document.body.appendChild(script)
  })
}

export default jsonp
