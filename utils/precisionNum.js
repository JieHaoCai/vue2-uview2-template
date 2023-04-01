/*
 * 判断obj是否为一个整数 整数取整后还是等于自己。利用这个特性来判断是否是整数
 */
function isInteger(obj) {
	// 或者使用 Number.isInteger()
	return Math.floor(obj) === obj
}
/*
 * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
 * @param floatNum {number} 小数
 * @return {object}
 *   {times:100, num: 314}
 */
function toInteger(floatNum) {
	// 初始化数字与精度 times精度倍数  num转化后的整数
	var ret = {
		times: 1,
		num: 0
	}
	var isNegative = floatNum < 0 //是否是小数
	if (isInteger(floatNum)) { // 是否是整数
		ret.num = floatNum
		return ret //是整数直接返回
	}
	var strfi = floatNum + '' // 转换为字符串
	var dotPos = strfi.indexOf('.')
	var len = strfi.substr(dotPos + 1).length // 拿到小数点之后的位数
	var times = Math.pow(10, len) // 精度倍数
	/* 为什么加0.5?
	    前面讲过乘法也会出现精度问题
	    假设传入0.16344556此时倍数为100000000
	    Math.abs(0.16344556) * 100000000=0.16344556*10000000=1634455.5999999999 
	    少了0.0000000001
	    加上0.5 0.16344556*10000000+0.5=1634456.0999999999 parseInt之后乘法的精度问题得以矫正
	*/
	var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10)
	ret.times = times
	if (isNegative) {
		intNum = -intNum
	}
	ret.num = intNum
	return ret
}

/*
 * 核心方法，实现加减乘除运算，确保不丢失精度
 * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
 * @param a {number} 运算数1
 * @param b {number} 运算数2
 */
function operation(a, b, op) {
	var o1 = toInteger(a)
	var o2 = toInteger(b)
	var n1 = o1.num // 3.25+3.153
	var n2 = o2.num
	var t1 = o1.times
	var t2 = o2.times
	var max = t1 > t2 ? t1 : t2
	var result = null
	switch (op) {
		// 加减需要根据倍数关系来处理
		case 'add':
			if (t1 === t2) { // 两个小数倍数相同
				result = n1 + n2
			} else if (t1 > t2) {
				// o1 小数位 大于 o2
				result = n1 + n2 * (t1 / t2)
			} else { // o1小数位小于 o2
				result = n1 * (t2 / t1) + n2
			}
			return result / max
		case 'subtract':
			if (t1 === t2) {
				result = n1 - n2
			} else if (t1 > t2) {
				result = n1 - n2 * (t1 / t2)
			} else {
				result = n1 * (t2 / t1) - n2
			}
			return result / max
		case 'multiply':
			// 325*3153/(100*1000) 扩大100倍 ==>缩小100倍
			result = (n1 * n2) / (t1 * t2)
			return result
		case 'divide':
			// (325/3153)*(1000/100)  缩小100倍 ==>扩大100倍
			result = (n1 / n2) * (t2 / t1)
			return result
	}
}

// 加减乘除的四个接口
export function add(a, b) {
	return operation(a, b, 'add')
}
export function subtract(a, b) {
	return operation(a, b, 'subtract')
}
export function multiply(a, b) {
	return operation(a, b, 'multiply')
}
export function divide(a, b) {
	return operation(a, b, 'divide')
}


//金额处理
export function formater(data) {
	if (!data) return '0.00'
	// 将数据分割，保留两位小数
	data = data.toFixed(2)
	// 获取整数部分
	const intPart = Math.trunc(data)
	// 整数部分处理，增加,
	const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
	// 预定义小数部分
	let floatPart = '.00'
	// 将数据分割为小数部分和整数部分
	const newArr = data.toString().split('.')
	if (newArr.length === 2) { // 有小数部分
		floatPart = newArr[1].toString() // 取得小数部分
		return intPartFormat + '.' + floatPart
	}
	return intPartFormat + floatPart
}
