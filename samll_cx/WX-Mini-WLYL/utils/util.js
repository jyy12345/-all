const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 存本地数据
function setDataBase(key, val) {
  let dataBase = new DataBase(key, val);
  dataBase.set();
}
// 取本地数据
function getDataBase(key) {
  let dataBase = new DataBase(key);
  let res = dataBase.get();
  return res;
}

//时间戳 截取年-月-日
const savMoth = (time) => {
  if (time) {
    let date = new Date(parseInt(time) * 1000).toJSON().slice(0, 10);
    return date;
  }
}
// toast弹框
function showToast(text, icon, duration) {
  wx.showToast({
    title: text,
    icon: "none",
    duration: duration
  })
}
module.exports = {
  setDataBase: setDataBase,
  getDataBase:getDataBase,
  formatTime: formatTime,
  savMoth: savMoth,
  showToast: showToast
}
