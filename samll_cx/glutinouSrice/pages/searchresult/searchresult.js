const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:false,
    select1:false,
    select2: false,
    select3: false,
    label_pressIds:'',
    label_authorIds:'',
    bigPrice:'',
    readersList:[{id:1,title:'成人'},{id:2,title:'少儿'}],
    search:'',
    labelId:'',//上个页面传过来的标签id
    page:1,
    code:'',
    booksList:[],
    readerss:'',
    load: true,
    loading:false,
    count: 0
  },
  //出版社id
  label_pressId:function(e){
   this.setData({
     label_pressIds: e.currentTarget.id
   })
  },
  //作者id
  label_authorId: function (e) {
    this.setData({
      label_authorIds: e.currentTarget.id
    })
  },
  //价格
  bigPrice:function(e){
    this.setData({
      bigPrice: e.detail.value
    })
  },
  semallPrice: function (e) {
    this.setData({
      semallPrice: e.detail.value
    })
  },
  //读者
  readers:function(e){
    this.setData({
      readerss: e.currentTarget.id
    })
  },
  //重置
  reset_press:function(){
    this.setData({
      label_pressIds:''
    })
  },
  reset_press1: function () {
    this.setData({
      label_authorIds: ''
    })
  },
  reset_press2: function () {
    this.setData({
      readerss: ''
    })
  },
  jsCz:function(){
    this.setData({
      bigPrice:'',
      semallPrice:''
    })
  },
  //确定
  det_press:function(){
    this.ajaxRec();
    this.setData({
      select1: false,
      select: false,
      select2: false,
      select3: false,
    })
  },
  det_author:function(){
    this.ajaxRec();
    this.setData({
      select1: false,
      select: false,
      select2: false,
      select3: false,
    })
  },
  det_readerss:function(){
    this.ajaxRec();
    this.setData({
      select1: false,
      select: false,
      select2: false,
      select3: false,
    })
  },
  jsbtn:function(){
    this.ajaxRec();
    this.setData({
      select1: false,
      select: false,
      select2: false,
      select3: false,
    })
  },

  getSearch_txt: function (e) {
    this.setData({
      search: e.detail.value
    })
  },
  searchSubmit: function (options) {
    var that = this;
    var search_txt = that.data.search;
    this.setData({
      search: search_txt
    })
    // wx.navigateTo({
    //   url: '../searchresult/searchresult?search=' + this.data.search,
    // })
    that.ajaxRec();
  },
  //跳转详情
  detail: function (e) {
    var cateId = e.currentTarget.dataset.cateid
    wx.navigateTo({
      url: '../classificationdetail/classificationdetail?cateId=' + cateId,
    })
  },
  gw:function(e){
    app.globalData.common.post({
      url:'/cart/addCart',
      data:{
        id: e.currentTarget.dataset.cateids,
        num:1
      }
    })
    .then(res=>{
      console.log(res);
      if(res.data.status=='200'){
        wx.showToast({
          title: '加入成功',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: options.search,
      labelId: options.labelId,
      code:options.code
    })
   app.globalData.common.post({
     url:'/index/filter'
   })
   .then(res=>{
     console.log(res);
     if(res.data.status=='200'){
       this.setData({
         laber_press: res.data.data.press,
         laber_author: res.data.data.author
       })
     }
   })
   this.ajaxRec();
  },
  ajaxRec:function(){
     app.globalData.common.post({
       url:'/index/lists',
       data:{
         search: this.data.search,
         page:this.data.page,
         sort:'',
         sort_type:'',
         press: this.data.label_pressIds,
         author: this.data.label_authorIds,
         min_price: this.data.semallPrice,
         max_price: this.data.bigPrice,
         readers: this.data.readerss,
         code:this.data.code
       }
     })
     .then(res=>{
       console.log(res);
       if(res.data.status=='200'){
          this.setData({
            booksList:res.data.data.books
          })
       }
     })
  },
  selectbtn:function(e){
    this.setData({
      select: !this.data.select,
      select1: false,
      select2: false,
      select3: false
    })
  },
  selectbtn1: function (e) {
    this.setData({
      select1: !this.data.select1,
      select: false,
      select2: false,
      select3: false,
    })
    
  },
  selectbtn2: function (e) {
    this.setData({
      select2: !this.data.select2,
      select: false,
      select1: false,
      select3: false,
    })
  },
  selectbtn3: function (e) {
    this.setData({
      select3: !this.data.select3,
      select: false,
      select1: false,
      select2: false
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
    console.log(111)
    var that = this;

    if (that.data.load) {//全局标志位，方式请求未响应是多次触发
      if (that.data.booksList.length < that.data.count) {

        that.setData({
          load: false,
          loading: true,//加载动画的显示
        })
        app.globalData.common.post({
          url: '/index/lists',
          data: {
            search: this.data.search,
            page: this.data.page,
            sort: '',
            sort_type: '',
            press: this.data.label_pressIds,
            author: this.data.label_authorIds,
            min_price: this.data.semallPrice,
            max_price: this.data.bigPrice,
            readers: this.data.readerss,
            code: this.data.code
          }
        })
          .then(res => {  
            console.log(res); 
            if (res.data.status == '200') {
              var content = that.data.booksList.concat(res.data.data.books)//将放回结果放入content
              that.setData({
                booksList: content,
                page: that.data.page * 1 + 1,
                load: true,
                loading: false,
              })
            } else {
              that.setData({
                loading: false,
                load: true,
              })
              wx.showToast({
                title: '数据异常',
                icon: 'none',
                duration: 2000,
              })
            }
          })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})