// pages/tabbar/tabbar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    business: [
      { //B端tab数据
        title: '首页',
        icon: "https://img.58cdn.com.cn/images/car/activitypic/weichebao/home_tabbar.png",
        selectedIcon: "https://img.58cdn.com.cn/images/car/activitypic/weichebao/home_tabbar_checked.png"
      },
      {
        title: '库存管理',
        icon: "https://img.58cdn.com.cn/images/car/activitypic/weichebao/buy_tabbar.png",
        selectedIcon: "https://img.58cdn.com.cn/images/car/activitypic/weichebao/buy_tabbar_checked.png"
      },
      {
        title: '客户管理',
        icon: "https://img.58cdn.com.cn/images/car/activitypic/weichebao/customer_normol.png",
        selectedIcon: "https://img.58cdn.com.cn/images/car/activitypic/weichebao/customer_focus.png"
      },
      {
        title: '我的',
        icon: "https://img.58cdn.com.cn/images/car/activitypic/weichebao/me_tabbar.png",
        selectedIcon: "https://img.58cdn.com.cn/images/car/activitypic/weichebao/me_tabbar_checked.png"
      }
    ],
    consumer: [{ //C端tab数据
      title: '首页',
      icon: "https://img.58cdn.com.cn/images/car/activitypic/weichebao/home_tabbar.png",
      selectedIcon: "https://img.58cdn.com.cn/images/car/activitypic/weichebao/home_tabbar_checked.png"
    },
    {
      title: '买车',
      icon: "https://img.58cdn.com.cn/images/car/activitypic/weichebao/buy_tabbar.png",
      selectedIcon: "https://img.58cdn.com.cn/images/car/activitypic/weichebao/buy_tabbar_checked.png"
    },
    {
      title: '我的',
      icon: "https://img.58cdn.com.cn/images/car/activitypic/weichebao/me_tabbar.png",
      selectedIcon: "https://img.58cdn.com.cn/images/car/activitypic/weichebao/me_tabbar_checked.png"
    }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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