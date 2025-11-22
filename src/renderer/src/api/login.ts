import request from "../utils/request";

//获取图形验证码
export async function captchaImg(data: { key: string }) {
  const res = await request({
    url: "/captcha/image",
    params: data,
    responseType: "arraybuffer",
  });
  return res;
}
export function loginByJson(data) {
  console.log("data: ", data);
  return request({
    url: "/u/loginByJson",
    method: "post",
    data,
  });
}
