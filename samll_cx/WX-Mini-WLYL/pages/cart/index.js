// pages/cart/index.js
//获取应用实例

var app = getApp();
Page({
  data: {
    currentData : 0,
    articleListData: [],//文章列表
    goodsListData:[],//健康产品
    bType: 1,//1：线上2：线下，3：爱心科普
    page: 1,
    imgUrl: app.globalData.imgUrl
    
  },
  onLoad: function (options) {
    
    console.log(options)
    if (options.currentData){
      var currentData = options.currentData;
      this.setData({
        currentData: currentData
      })
      if (currentData == 2) {//健康产品
        this.getGoodsList()
      } else {//文章列表
        this.getArticleList()
      }
    }
    // 从首页点过来的
    if (options.type) {
      this.data.bType = options.type
    }
    // 文章列表
    this.getArticleList();
    
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
  onShow:function(){
    
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;
    console.log(e)
    // 获取数据
    var current = e.currentTarget.dataset.current;
    var bType = e.currentTarget.dataset.type;
    this.data.page=1;
    this.data.bType=bType;
    if (current==2){//健康产品
      this.getGoodsList()
    }else{//文章列表
      this.getArticleList()
    }
    
    that.setData({
      currentData: e.target.dataset.current
    })
  },
  // 文章列表
  getArticleList(type){
    console.log(type)
    if (type == "page") {
      this.data.page++
    }
    var bType = this.data.bType;
    console.log(bType, '传')
    var page = this.data.page;
    app.post(app.globalData.ServerURL + 'mycourse/index', {
      'type': bType,
      'page': page
    }).then((res) => {
      console.log(res, '商城列表');
      if (res.data.code == 0) {
        var articleListData = res.data.data;
        this.setData({
          articleListData: articleListData,
        })
        console.log(this.data.articleListData, '列表数据')
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },
  // 健康产品列表
  getGoodsList(type) {
    console.log(type)
    if (type == "page") {
      this.data.page++
    }
    var page = this.data.page;
    app.post(app.globalData.ServerURL + 'mycourse/healthproducts', {
      'page': page
    }).then((res) => {
      console.log(res, '健康产品列表');
      if (res.data.code == 0) {
        var goodsListData = res.data.data;
        this.setData({
          goodsListData: goodsListData,
        })
        console.log(this.data.goodsListData, '健康产品列表');
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },

  // 到底加载
  onReachBottom() {
    // 判断tag是否有数据，是否需要开启到底加载
    this.setData({
      loadingShow: true
    })
    this.getArticleList('page')

  },


  // 线上课程详情
  onlineCoursedetail(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var free = e.currentTarget.dataset.mes;
    wx.navigateTo({
      url: '/pages/cart/onlineCourse/index?id=' + id + '&free=' + free,
    })
  },
  // 爱心科普
  loveMesdetail(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/cart/loveMesDetail/index?id=' + id,
    })
  },
  // 跳转到线下课程详情
  offlineCoursedetail(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/cart/offlineCourse/index?id=' + id,
    })
  },
  // 立即购买
  buy(e){//直接支付
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/cart/orderDetail/index?id=' + id,
    })
  },
  // 商品详情
  goodsDetail(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/cart/goodsDetail/index?id='+id,
    })
  }
})