//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    section: [
      { name: '推荐', id: '1001' }, { name: '起范儿', id: '1032' },
      { name: '求真科学营', id: '1003' }, { name: '健康自测', id: '1004' },
      { name: '急救自救', id: '1005' }, { name: '常见疾病', id: '1021' },
      { name: '星动计划', id: '1006' }
    ],
    background: ['https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640', 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640', 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'], //banner
    indicatorDots: true,
    indicatorColor: 'rgba(180, 180, 181, .4)',
    indicator_active: '#ff0000',
    autoplay: true,
    interval: 2000,
    duration: 1000,
    recommend:[],//好书推荐
    collection: [],//馆藏推荐
    daster: [],
    reader:[],//读者推荐
    bestseller:[],//畅销排行
    imgUrl: app.globalData.imgUrl
  },
  onLoad: function () {
    var that=this;
    app.globalData.common.post({
       url:'/index/homePage',
     })
     .then(res=>{
       console.log(res)
       if(res.data.status=='200'){
           that.setData({
             background: res.data.data.banner, //头部广告位
             recommend: res.data.data.recommend,//好书推荐
             collection: res.data.data.collection,//馆藏推荐
             daster:res.data.data.ad,//广告图
             reader: res.data.data.reader,
             bestseller: res.data.data.bestseller
           })
       }
     })
  },
  //搜索
  search_box:function(){
     wx.navigateTo({
       url: '../search/search',
     })
  },
  //查看更多
  gd_ck:function(e){
    var types = e.currentTarget.dataset.types
    wx.navigateTo({
      url: '../oleyDetail/oleyDetail?types=' + types,
    })
  },
  //跳转详情
  detail:function(e){
    var cateId = e.currentTarget.dataset.cateid
    wx.navigateTo({
      url: '../classificationdetail/classificationdetail?cateId=' + cateId,
    })
  }
})
