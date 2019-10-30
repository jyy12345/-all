// pages/returngoods/returngoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
    actionSheetItems: [     
      { name: 'USA',bindtap: 'Menu1', txt: '发错货', checked: 'true' },
      { name: 'USA1', bindtap: 'Menu2', txt: '质量问题' },
      { name: 'USA2', bindtap: 'Menu3', txt: '商品与页面描述不符' },
      { name: 'USA2', bindtap: 'Menu3', txt: '商品损坏' },
      { name: 'USA2', bindtap: 'Menu3', txt: '缺少件' },
      { name: 'USA2', bindtap: 'Menu3', txt: '不想要了' }
    ],
    menu: '请选择申请原因',
    // checked: false
  },

  //是否选中
  // checkedTap: function () {
  //   var checked = this.data.checked;
  //   this.setData({
  //     "checked": !checked
  //   })
  // },
  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu1: function () {
    this.setData({
      menu: 1,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu2: function () {
    this.setData({
      menu: 2,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu3: function () {
    this.setData({
      menu: 3,
      actionSheetHidden: !this.data.actionSheetHidden
    })
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