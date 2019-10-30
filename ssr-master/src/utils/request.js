// import { hex_md5 } from "../utils/md5"; 加密中文不可以
const md5 = require('../utils/newmd5');
// const host = 'http://zhong.waterai.cn' //测试地址
const host = 'https://zhong.waterai.cn' //正式地址
function request(url, method, data, header = {}) {
    let copy = data ? JSON.parse(JSON.stringify(data)) : {};
    copy.nonce = String(Math.floor(Math.random() * 3000000) + 100000000);
    let newData = { sign: md5.hexMD5(concat_all(sort_all(copy))).toUpperCase() };
    newData = { ...newData, ...copy }
    wx.showLoading({
        title: '加载中' // 数据请求前loading
    })
    return new Promise((resolve, reject) => {
        wx.request({
            url: host + url,
            method: method,
            data: { ...newData, ...data },
            dataType: "json",
            header: {
                'content-type': 'application/json',  // 默认值
                'token': wx.getStorageSync('token') ? wx.getStorageSync('token') : ''
                // 'token': 'NF8xNTcwNzg2Mjk4'
            },
            success: function (res) {
                wx.hideLoading()
                resolve(res)
            },
            fail: function (res) {
                wx.hideLoading()
            },
            complete: function () {
                wx.hideLoading()
            }
        })
    })
}

function get(obj) {
    return request(obj.url, 'GET', obj.data)
}

function post(obj) {
    return request(obj.url, 'POST', obj.data)
}

function concat_all(obj) {
    var html = "";
    for (let key in obj) {
        html += key + obj[key]
    }
    return html;
}
function sort_all(obj) {
    var arr = new Array();
    var num = 0;
    for (var i in obj) {
        arr[num] = i;
        num++;
    }
    var sortArr = arr.sort();
    var sortObj = {};
    for (var i in sortArr) {
        sortObj[sortArr[i]] = obj[sortArr[i]];
    }
    return sortObj;

}
export default {
    request,
    get,
    post,
    host
}