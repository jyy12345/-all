import API from '../../../api.js';
const getPhone = wx.getStorageSync("phones");
Page({
  data: {
    showModalStatus: false,
    contentData:{},
    Invitation:[],
    sumName:null,
    sumPhone:null,
    sumAge:null,
    yaoBtn:true,
    yaoSuccess:false
  },
  heigged: function () {
    this.setData(
      {
        showModalStatus: false,
        yaoBtn: true,
        yaoSuccess: false
      }
    );
  },
  // 学员档案跳转
  sturted:function(){
    var  getPhone = wx.getStorageSync("phones");
    console.log(getPhone)
    if (getPhone==""){
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      });
      wx.navigateTo({
        url: '../../logos/logos',
      })
    }else{
      wx.navigateTo({
        url: '../studentFiles/studentFiles',
      })
    }
  },
  // 宝贝作品
  studentworks:function(){
    var getPhone = wx.getStorageSync("phones");
    if (getPhone == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      });
      wx.navigateTo({
        url: '../../logos/logos',
      })
    } else {
    wx.navigateTo({
      url: '../studentWorks/studentWorks',
    })
    }
  },
  // 请假补课
  leave:function(){
    var getPhone = wx.getStorageSync("phones");
    if (getPhone == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      });
      wx.navigateTo({
        url: '../../logos/logos',
      })
    } else {
   wx.navigateTo({
     url: '../leave/leave',
   })
    }
  },
  // 积分兑换
  jifRuih:function(){
    var getPhone = wx.getStorageSync("phones");
    if (getPhone == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      });
      wx.navigateTo({
        url: '../../logos/logos',
      })
    } else {
    wx.navigateTo({
      url: '../../exchange/exchange',
    })
    }
  },
  // 最新通知
  newXx:function(){
    var getPhone = wx.getStorageSync("phones");
    if (getPhone == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      });
      wx.navigateTo({
        url: '../../logos/logos',
      })
    } else {
    wx.navigateTo({
      url: '../latestNews/latestNews',
    })
    }
  },

  // 弹框   帮友邀约
  powerDrawer1: function (e) {
    var getPhone = wx.getStorageSync("phones");
    if (getPhone == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      });
      wx.navigateTo({
        url: '../../logos/logos',
      })
    } else {
    var myDate = new Date();
    var that = this;
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu);
    var myBabys = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: 111,
      phone: getPhone
    }
    wx.request({
      url: API.myBabys,
      method: "get",
      data: API.getParams(myBabys),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        that.setData({
          Invitation: res.data.data
        })
        console.log(res);

      },
      fail: function () {
        console.log("fail");
      }
    })
    }
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu);
  },
  sumName:function(e){
    this.setData({
      sumName:e.detail.value
    })
  },
  sumPhone: function (e) {
    this.setData({
      sumPhone:e.detail.value
    })
  },
  sumAge: function (e) {
    this.setData({
      sumAge:e.detail.value
    })
  },
  powerDrawer2: function (e) {
    var myDate = new Date();
    var that = this;
    // var currentStatu = e.currentTarget.dataset.statu;
    // this.util(currentStatu);
    var myBabysbtn = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '巴学园或者是艺澜美术',
      phone: getPhone,
      name: that.data.sumName,
      friendPhone: that.data.sumPhone,
      age: that.data.sumAge,
    }
    wx.request({
      url: API.myBabysbtn,
      method: "get",
      data: API.getParams(myBabysbtn),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        console.log(res);
        if(res.data.code==0){
          that.setData({
            yaoBtn: false,
            yaoSuccess: true
          })
        }
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
  /**
* 隐藏模态对话框
*/
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
  * 对话框取消按钮点击事件
  */
  onCancel: function () {
    this.hideModal();
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myDate = new Date();
    var that = this;
    var myBaby = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '巴学园或者是艺澜美术',
      phone: getPhone
    }
    wx.request({
      url: API.myBaby,
      method: "get",
      data: API.getParams(myBaby),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        that.setData({
          contentData: res.data.data
        })
        console.log(res);

      },
      fail: function () {
        console.log("fail");
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})