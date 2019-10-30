// 手机号
export function validatePhone(phone) {
  const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
  return reg.test(phone)
}

//身份证
export function validateIdCard(idCard) {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return reg.test(idCard)
}


export function time(time) {
  let _time = String(time).split(":");
  return `${_time[0].replace(/-/g, "/")}:${_time[1]}`;
}

export function toast(title) {
  wx.showToast({
    title: title,
    icon: "none",
    duration: 1000
  });
}