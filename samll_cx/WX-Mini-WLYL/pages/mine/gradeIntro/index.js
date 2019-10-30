// pages/mine/gradeInto/index.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataId:'',
    introListData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStarIntro()
  },
  onShareAppMessage: function (options) {
    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log(options.target)
    }
    return {
      //## 此为转发页面所显示的标题
      title: '未来国医',
      //## 此为转发页面的描述性文字
      desc: '',
      //## 此为转发给微信好友或微信群后，对方点击后进入的页面链接，可以根据自己的需求添加参数
      path: 'pages/index/index',
      //## 转发操作成功后的回调函数，用于对发起者的提示语句或其他逻辑处理
      success: function (res) {
        //这是我自定义的函数，可替换自己的操作
        util.showToast(1, '发送成功');
      },
      //## 转发操作失败/取消 后的回调处理，一般是个提示语句即可
      fail: function () {
        util.showToast(0, '转发失败...');
      }
    }
  },
  getStarIntro(){
    app.post(app.globalData.ServerURL + 'personalcenter/starlevel', {}).then((res) => {
      console.log(res);
      if (res.data.code == 0) {
        var introListData = res.data.data;
        console.log(introListData[0].startlevel[0].id, 'id')
        this.data.dataId = introListData[0].startlevel[0].id;
        this.setData({
          dataId: introListData[0].startlevel[0].id,
          introListData: introListData,
        })
        console.log(this.data.introListData, '数据')
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },
  /**
  * 收起/展开按钮点击事件
  */
  sHidden(e) {
    console.log(e)
    var id = e.target.dataset.id;
    var that = this;
    this.setData({
      dataId: id
    })
    console.log(this.data.dataId,'改变')
  },
  // 爱心公益
  hEllipsis(e) {
    console.log(e)
    var indexs = e.target.dataset.index;
    var that = this;
    this.data.introList.forEach(function (item, index) {
      var ellipsis = item.ellipsis;
      if (indexs == index) {
        that.data.introList[index].ellipsis = !ellipsis;
      }
    })
    this.setData({
      loveList: this.data.introList
    })
  }
})