//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    words: [],
    windowHeight: 0,//获取屏幕高度
    refreshHeight: 0,//获取屏幕高度
    refreshing: false,//是否在刷新中
    refreshAnimation: {}, //加载更多旋转动画数据
    clientY: 0,//触摸时Y轴坐标
  },
  onLoad: function () {
    var _this = this;
    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          windowHeight: res.windowHeight
        })
        console.log("屏幕高度: " + res.windowHeight)
      }
    })
    //获取words
    wx.request({
      url: 'https://www.tcm2018.cn/index/homepage/index',
      complete: function (res) {
        console.log(res);
        if (res.data.code == '0') {
          _this.setData({
            words: res.data.data.course
          })
        }
      }
    })
  },
  scroll: function () {
    console.log("滑动了...")
  },
  lower: function () {
    var start = 0;
    start += 1;
    console.log("加载了...")
    var _this = this;
    wx.request({
      url: 'https://www.tcm2018.cn/index/homepage/index',
      
      complete: function (res) {
        if (res.data.code == '0') {
          var words = _this.data.words.concat(res.data.data.course);
          _this.setData({
            words: words
          })
        }
      }
    })
  },
  upper: function () {
    console.log("下拉了....")
    //获取用户Y轴下拉的位移

    if (this.data.refreshing) return;
    this.setData({ refreshing: true });
    updateRefreshIcon.call(this);
    var _this = this;
    var i = Math.random() //获得0-1的随机数
    i = Math.ceil(i * 10) //乘以10并向上去整
    var words = ['龙', '一', '万', '千', '浩', '金', '得', '而', '可', '人'];
    var word = words[i];
    wx.request({
      url: 'https://www.tcm2018.cn/index/homepage/index',

      complete: function (res) {
        if (res.data.code == '0') {
          setTimeout(function () {
            _this.setData({
              words: res.data.data.course
            })
          }, 2000)
        }
        setTimeout(function () {
          _this.setData({
            refreshing: false
          })
        }, 2500)
      }
    })
  },
  start: function (e) {
    var startPoint = e.touches[0]
    var clientY = startPoint.clientY;
    this.setData({
      clientY: clientY,
      refreshHeight: 0
    })
  },
  end: function (e) {
    var endPoint = e.changedTouches[0]
    var y = (endPoint.clientY - this.data.clientY) * 0.6;
    if (y > 50) {
      y = 50;
    }
    this.setData({
      refreshHeight: y
    })
  },
  move: function (e) {
    console.log("下拉滑动了...")
  }
})

/**
 * 旋转上拉加载图标
 */
function updateRefreshIcon() {
  var deg = 0;
  var _this = this;
  console.log('旋转开始了.....')
  var animation = wx.createAnimation({
    duration: 1000
  });

  var timer = setInterval(function () {
    if (!_this.data.refreshing)
      clearInterval(timer);
    animation.rotateZ(deg).step();//在Z轴旋转一个deg角度
    deg += 360;
    _this.setData({
      refreshAnimation: animation.export()
    })
  }, 1000);
}