import request from "../utils/request";

//获取图形验证码
export async function captchaImg(data) {
  const res = await request({
    url: "/captcha/image",
    data,
    responseType: "arraybuffer",
  });
  return res;
}
export function loginByJson(data) {
  return request({
    url: "u/loginByJson",
    method: "post",
    data,
  });
}
