const getters = {
  rootHost: state => state.app.rootHost,
  apiUrls: state => state.app.apiUrls,
  apiIndex: state => state.app.apiIndex,
  refer: state => state.app.refer,
  dev: state => state.app.dev,
  wxConfig: state => state.app.wxConfig,
  isWeiXin: state => state.app.isWeiXin,
  
  // user
  // token: state => state.user.token,
  // account: state => state.user.account,
  // balance: state => state.user.balance,
}

export default getters
