import API from '../../api.js';
const getPhone = wx.getStorageSync("phones");
Page({
  data: {
    tabbar: {},
    showModalStatus: false,
    integral:[],
    exchangeId:null
  },
  gouTo:function(){
    wx.navigateTo({
      url: '../exchangeEdit/exchangeEdit',
    })
  },
  integralRight:function(){
    wx.navigateTo({
      url: '../exchangeContent/exchangeContent',
    })
  },
  powerDrawer: function (e) {
    console.log(e.target.id)
    this.setData({
      exchangeId: e.target.id
    })
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  powerDrawer1: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu);
    var myDate = new Date();
    var that = this;
    var exchangebtn = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone,
      prizeId: that.data.exchangeId
    }
    wx.request({
      url: API.exchangebtn,
      method: "get",
      data: API.getParams(exchangebtn),
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        console.log(res);
        if(res.data.code=="0"){
          wx.showToast({
            title: '兑换成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }else{
          wx.showToast({
            title: '兑换失败',
            image: '../../images/tab/shib.png'
          });
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
  heigged: function () {
    this.setData(
      {
        showModalStatus: false
      }
    );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().editTabBar(); 
    var myDate = new Date();
    var that = this;
    var exchange = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: '哈哈',
      phone: getPhone,
      page: 3
    }
    wx.request({
      url: API.exchange,
      method: "get",
      data: API.getParams(exchange),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        that.setData({
          integral: res.data.data
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