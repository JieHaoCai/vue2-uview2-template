// 批量导出文件
const requireApi = require.context('.', true, /\.js$/)

let module = {}
requireApi.keys().forEach(key => {
  if (key === './index.js') return
  module = Object.assign(module, requireApi(key))
})

export default module
