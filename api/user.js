import http from "@/utils/request.js";

// 测试接口
export const check = (data) => http.post("/user_applet/check", data, {
	custom: {
		auth: false,
		toast: false,
	}
});
