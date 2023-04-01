/**
 * 微信api使用promise简化回调
 * @param {*} api 
 * @returns 
 */
export function promisify(api) {
	return (options, ...params) => {
		return new Promise((resolve, reject) => {
			api(Object.assign({}, options, {
				success: resolve,
				fail: reject
			}), ...params);
		});
	}
}

/**
 * 随机生成dev
 * @param {*} min 最小长度
 * @param {*} max 最大长度
 * @return {string}
 */
export function getRandomDev(min = 32, max = 32) {
  let returnStr = "",
    range = max ? Math.round(Math.random() * (max - min)) + min : min,
    arr = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ];
  for (let i = 0; i < range; i++) {
    let index = Math.round(Math.random() * (arr.length - 1));
    returnStr += arr[index];
  }
  return returnStr.toLowerCase();
}

/**
 * 获取地址栏参数
 * @param {*} name 参数名
 * @returns 参数值
 */
export function getQueryString(name) {
  let url = location.search || location.hash; //获取url中"?"符后的字串
  let theRequest = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substring(url.indexOf("?") + 1);
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]).replace(/\s+/g, "+");
    }
  }
  return theRequest[name] || null;
}

/**
 * localStorage 存储
 * @param {*} key
 * @param {*} value
 */
export function setLocal(key, value) {
	try {
		const curTime = new Date().getTime()
		let data = JSON.stringify({ data: value, time: curTime })
		uni.setStorageSync(key, data)
	} catch (e) {
		console.log('setLocal error', e)
	}
}

/**
 * localStorage 读取
 * @param {*} key
 * @param {*} exp
 * @returns
 */
export function getLocal(key, exp) {
	try {
		const data = uni.getStorageSync(key)
		if (!data) return ''
		let dataObj = JSON.parse(data)
		if (dataObj && new Date().getTime() - dataObj.time > exp) {
			uni.removeStorageSync(key)
			return ''
		} else {
			return dataObj.data
		}
	} catch (e) {
		console.log('getLocal error', e)
		return ''
	}
}

/**
 * localStorage 删除
 * @param {*} key
 * @returns
 */
export function removeLocal(key) {
	try {
		if (uni.getStorageSync(key)) {
			uni.removeStorageSync(key)
		}
	} catch (e) {
		console.log('removeLocal error', e)
	}
}

/**
 * 判断是否是微信浏览器环境
 * @returns {boolean}
 */
export function isWeiXin() {
	var ua = navigator.userAgent.toLowerCase()
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true
	} else {
		return false
	}
}

/**
 * 校验手机号
 * @param {*} val 手机号
 * @returns {Boolean}
 */
export function validateTel(val) {
  let reg = /^(?:(?:\+|00)86)?1\d{10}$/
  return reg.test(val)
}


/**
 * 时间戳转时间
 * [date 函数]
 * @param  {[type]} format [想要格式化成什么样的]
 * @param  {[type]} stamp  [时间戳，可选]
 * @return {[type]}        [按指定格式返回时间]
 */
export function timestampToTime(format, stamp, addDay, setHour) {
	var D = stamp || new Date();
	format = format || "Y-m-d H:i:s";
	var week = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
	var dd = {};
	if (/^\d+$/.test(D)) {
		if (D.toString().length == 10) D *= 1e3;
		D = new Date(D);
	}
	if (addDay) {
		D.setDate(D.getDate() + addDay);
	}
	if (setHour) {
		D.setHours(setHour);
	}
	dd = {
		year: D.getYear(),
		month: D.getMonth() + 1,
		date: D.getDate(),
		day: week[D.getDay()],
		hours: D.getHours(),
		minutes: D.getMinutes(),
		seconds: D.getSeconds()
	};
	dd.g = dd.hours > 12 ? Math.ceil(dd.hours / 2) : dd.hours;
	var oType = {
		Y: D.getFullYear(),
		y: dd.year,
		m: dd.month < 10 ? "0" + dd.month : dd.month,
		n: dd.month,
		d: dd.date < 10 ? "0" + dd.date : dd.date,
		j: dd.date,
		D: dd.day,
		H: dd.hours < 10 ? "0" + dd.hours : dd.hours,
		h: dd.g < 10 ? "0" + dd.g : dd.g,
		G: dd.hours,
		g: dd.g,
		i: dd.minutes < 10 ? "0" + dd.minutes : dd.minutes,
		s: dd.seconds < 10 ? "0" + dd.seconds : dd.seconds
	};
	for (var i in oType) {
		format = format.replace(i, oType[i]);
	}
	return format;
}

