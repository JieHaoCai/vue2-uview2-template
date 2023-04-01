import App from './App'
import i18nConfig from '@/locale/index.js' //国际化

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

//国际化配置
import VueI18n from 'vue-i18n' // v8.x
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
Vue.prototype._i18n = i18n

// 引入u-view
import uView from "uview-ui";
Vue.use(uView);

// VueX
import store from "@/store";
Vue.prototype.$store = store;

const app = new Vue({
	// i18n,   //国际化
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
