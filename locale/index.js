import VueI18n from 'vue-i18n'

import en from './en.json'
import zhHans from './zh-Hans.json'



const messages = {
  en,
  'zh-Hans': zhHans,
}

let i18nConfig = {
  locale: uni.getLocale(), // 获取已设置的语言
  messages
}



export default i18nConfig
