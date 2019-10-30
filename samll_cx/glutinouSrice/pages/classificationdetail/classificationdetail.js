const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640', 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640', 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'],
    indicatorDots: true,
    indicatorColor: 'rgba(180, 180, 181, .4)',
    indicator_active: '#ff0000',
    autoplay: true,
    interval: 2000,
    duration: 1000,
    // 弹框
    hidden: true,
    actionSheetHidden: true,
    SheetHiddensHir:true,
    recommend:[],
    book_info:[],
    // input默认是1
    num: 1,
    num1:1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    isClick:true,
    libraryBooks:[]
  },
  SheetHidden:function(){
    this.setData({
      SheetHiddensHir: !this.data.SheetHiddensHir
    })
  },
  //申请图书馆采购
  sqTs:function(){
    this.setData({
      hidden:false
    })
  },
  //跳转详情
  detail: function (e) {
    var cateId = e.currentTarget.dataset.cateid
    wx.navigateTo({
      url: '../classificationdetail/classificationdetail?cateId=' + cateId,
    })
  },
  //跳转首页
  goIndex: function (e) {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  //跳转购物车
  goIndex: function (e) {
    wx.switchTab({
      url: '../index/index',
    })
  },
  //加入购物车
  goshoppingCart:function(){
    wx.switchTab({
      url: '../shoppingCart/shoppingCart',
    })
  },
  shoppyC:function(e){
    app.globalData.common.post({
      url:'/cart/addCart',
      data:{
        id:e.target.id,
        num: this.data.num
      }
    })
    .then(res=>{
      console.log(res);
      if(res.data.status=='200'){
        wx.showToast({
          title: '加入成功',
          icon: 'success',
          duration: 2000
        })
        wx.switchTab({
          url: '../shoppingCart/shoppingCart',
        })
      }
    })
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  },
  /* 点击减号 */
  bindMinus1: function () {
    var num = this.data.num1;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num1: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus1: function () {
    var num = this.data.num1;
    // 不作过多考虑自增1
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num1: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual1: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num1: num
    });
  },
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
  // 收藏
  haveSave(e) {
    if (!this.data.isClick == true) {
      app.globalData.common.post({
        url: '/index/category',
        data: { id: e.currentTarget.dataset.id}
      })
        .then(res => {
          console.log(res)
          if (res.data.status == '200') {
            wx.showToast({
              title: '已取消收藏',
            });
          }
        })
    } else {
      app.globalData.common.post({
        url: '/index/category',
        data: { id: e.currentTarget.dataset.id }
      })
        .then(res => {
          console.log(res)
          if (res.data.status == '200') {
            wx.showToast({
              title: '已收藏',
            });
          }
        })
    }
    this.setData({
      isClick: !this.data.isClick
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cateId = options.cateId;
    var that = this;
    app.globalData.common.post({
      url: '/index/details',
      data: { id: cateId}
    })
      .then(res => {
        console.log(res)
        if (res.data.status == '200') {
          that.setData({
            recommend: res.data.data.recommend,
            book_info: res.data.data.book_info,
            libraryBooks: res.data.data.libraryBooks[0]
          })
        }
      })
  },
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  //直接购买
  cancels:function(e) {
      wx.navigateTo({
        url: '../orderJs/orderJs?type=2&bood_id=' + this.data.book_info.id+'&num='+this.data.num1
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