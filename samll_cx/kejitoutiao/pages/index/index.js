//main.js
const utils = require('../../utils/util.js');
//获取应用实例
var app = getApp()
var user_id = wx.getStorageSync('userId')
Page({
  data: {
    windowHeight: "",
    windowWidth: "",
    dataId: 0,
    slider: [],
    currentSwiper: 0,
    zhezhao:"none",
    imgAddress: app.globalData.imgUrl,
    label:[],
    newDel:[],
    myLabel:[],
    journalism:[],
    width:'',
    bigWidth:'',
    souInpval:'',
    isnones:false,
    xuYs:true,
    userIs: app.globalData.userId,
    souScontent:[],
  },
  onLoad: function (options) {
    console.log(app.globalData.userId,'id');     
    var that = this;
    //滚动图
    app.get(app.globalData.ServerURL + 'flash').then((res) => {
      console.log(res.data.data);
           that.setData({
          slider: res.data.data,
        });
    }).catch((errMsg) => {
      console.log(errMsg);
    });
    //新闻list
    app.post(app.globalData.ServerURL + 'ling', { 
        user_id: app.globalData.userId,
        mendid: '11' 
       }).then((res) => {
      console.log(res);
      if (res.data.code == 200) {
        res.data.data.forEach(item => {
          var nowTime = utils.formatTime(new Date()).slice(0, 10);//当前年月日
          console.log(nowTime)
          var pubTime = item.statrtime;
          var pubDate;
          if (pubTime) {
            pubDate = pubTime.slice(0, 10);//发布的年月日
          }
          if (nowTime !== pubDate) {
            // console.log('不是一天')
            item.statrtime = pubDate;
          } else {
            let date = new Date(item.statrtime.replace(/-/g, '/')).getTime();
            item.statrtime = utils.timeHandle(date);
          }
        });
        that.setData({
          journalism: res.data.data
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
    // 查看标签 
    app.post(app.globalData.ServerURL + 'label', { 'user_id': wx.getStorageSync('userId')}).then((res)=>{
      console.log(res);
      that.setData({
        label:res.data.data
      })
    }).catch((errMsg)=>{
      console.log(errMsg);
    })
    if (this.data.dataId > 0) {
      console.log(this.data.dataId);
      this.setData({
        xuYs: false
      })
    }
    const query = wx.createSelectorQuery()
    query.select('.laeb').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      res[0].top       // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
      that.setData({
        width: res[0].width + res[0].left,
      })
    })
    const query1 = wx.createSelectorQuery()
    query1.select('.menu').boundingClientRect()
    query1.selectViewport().scrollOffset()
    query1.exec(function (res) {
      res[0].top       // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
      var widths = res[0].width +=res[0].left+35
      that.setData({
        bigWidth: res[0].width +res[0].left+35
      })
      console.log(that.data.bigWidth);
    })
    
    //查看我的标签
    app.post(app.globalData.ServerURL + 'look_user_label', {
      'user_id':wx.getStorageSync('userId')}).then((res) => {
        console.log(res.data.data.length);
      that.setData({
        myLabel: res.data.data,
        bigWidthnew: this.data.bigWidth += this.data.width * res.data.data.length
      })
    }).catch((errMsg) => {
      console.log(errMsg);
    })
  },
  onShow: function (e) {
    console.log('show')
    // this.onLoad();
  },
  ontoA:function(){
    
    app.post(app.globalData.ServerURL + 'label', { 'user_id': wx.getStorageSync('userId') }).then((res) => {
      console.log(res);
      this.setData({
        label: res.data.data
      })
    }).catch((errMsg) => {
      console.log(errMsg);
    })
    //查看我的标签
    app.post(app.globalData.ServerURL + 'look_user_label', {
      'user_id': wx.getStorageSync('userId')
    }).then((res) => {
      console.log(res);
      this.setData({
        myLabel: res.data.data,
        // bigWidthnew: this.data.bigWidth += this.data.width * res.data.data.length
      })
      console.log()
    }).catch((errMsg) => {
      console.log(errMsg);
    })
  },
  // 新闻
  goXinw:function(e){
    // this.onLoad();
    // console.log(e.currentTarget.dataset.ids)
    // console.log(user_id)
    console.log(wx.getStorageSync('userId'),'UID')
    var user_id = wx.getStorageSync('userId');
    if (user_id != '') {
      wx.navigateTo({
        url: '../journalism/journalism?journalismId=' + e.currentTarget.dataset.ids,
      })
    } else {
      wx.showToast({
        title: '请登录',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      wx.navigateTo({
        url: '../authorization/authorization',
      })
    }
  },
  // 搜索
  openS:function(){
    var user_id = wx.getStorageSync('userId');
    if (user_id == '') {
      wx.showToast({
        title: '请登录',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      wx.redirectTo({
        url: '../authorization/authorization',
      })
    } else {
      this.setData({
        isnones: !this.data.isnones
      })
    }
  },
  isTue:function(){
    this.setData({
      isnones: false
    })
  },
  souGosto:function(e){
    // console.log(e._relatedInfo.anchorTargetText);
    app.post(app.globalData.ServerURL + 'SearchNews', { user_id: '1', keyword: e._relatedInfo.anchorTargetText }).then((res) => {
      console.log(res);
      this.setData({
        souScontent: res.data.data,
        isnones: false
      })
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },

  souInp:function(e){
    app.post(app.globalData.ServerURL + 'SearchNews', { user_id: '1', keyword: e.detail.value }).then((res) => {
      console.log(res);
      this.setData({
        souScontent:res.data.data
      })
    }).catch((errMsg) => {
      console.log(errMsg);
    });
    this.setData({
      souInpval:e.detail.value
      
    })
  },
  //搜索
  souGo: function () {
    app.post(app.globalData.ServerURL + 'SearchNews', { user_id: '1', keyword: this.data.souInpval}).then((res) => {
      console.log(res);
      this.setData({
        journalism: res.data.data,
        isnones: false
      })
      if(res.data.code=='400'){
        wx.showToast({
          title: '没有相关信息',
          icon: 'loading',
          duration: 1000,
          mask: true
        })
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },
  //点击添加标签
  labels:function(e){  
    var arrLabel = this.data.label;
    console.log(arrLabel)
    var ss=arrLabel.splice(e.currentTarget.dataset.indexs, 1);
    var newMylavel = this.data.myLabel;
    this.setData({
      label: arrLabel,  //其他频道
      newDel:ss[0]
    })
    newMylavel.push(this.data.newDel);
    this.setData({
      // myLabel: newMylavel,   //我的频道
      bigWidthnew: this.data.bigWidth += this.data.width
    })
    app.post(app.globalData.ServerURL + 'user_label', { 'user_id': wx.getStorageSync('userId'), 'label_id': e.currentTarget.dataset.labelid }).then((res) => {
      console.log(res);
      this.setData({
        myLabel: res.data.data
      })
      this.ontoA();
    }).catch((errMsg) => {
      console.log(errMsg);
    })
  },
  //删除标签
  imgDel:function(e){
    var addLabel = this.data.label;
    var delMyLabel = this.data.myLabel;
    console.log(delMyLabel);
    var dels = delMyLabel.splice(e.currentTarget.dataset.myindexs,1);
    console.log(delMyLabel)
    this.setData({
      myLabel: delMyLabel,
      newDel: dels[0]
    })
    addLabel.unshift(this.data.newDel);
    this.setData({
      label: addLabel,
      bigWidthnew: this.data.bigWidth -= this.data.width
    })
    // wx.setStorageSync('labes', this.data.myLabel);
    app.post(app.globalData.ServerURL + 'delete_label', { 'user_id': wx.getStorageSync('userId'), 'label_id': e.currentTarget.dataset.indeid}).then((res) => {
      console.log(res);
      // this.setData({
      //   myLabel:res.data.data
      // })
    }).catch((errMsg) => {
      console.log(errMsg);
    })
  },
  
  //推荐
  check: function (e) {
    this.setData({
      dataId: e.target.dataset.id,
    })
    app.post(app.globalData.ServerURL + 'ling', { user_id: app.globalData.userId, mendid: '11' }).then((res) => {
      // console.log(res);
      this.setData({
        journalism: res.data.data
      })
    }).catch((errMsg) => {
      console.log(errMsg);
    });
    if (this.data.dataId==0) {
      console.log(this.data.dataId);
      this.setData({
        xuYs: true
      })
    }
  },
  check1: function (e) {
    this.setData({
      dataId: e.target.dataset.id,
    })
    if (this.data.dataId > 0) {
      console.log(this.data.dataId);
      this.setData({
        xuYs: false
      })
    }
    console.log(e);
    app.post(app.globalData.ServerURL + 'ling', { user_id: app.globalData.userId, mendid: '12', id: e.target.dataset.id}).then((res) => {
      // console.log(res);
      this.setData({
        journalism: res.data.data
      })
    }).catch((errMsg) => {
      console.log(errMsg);
    });
  },
  // 添加
  open:function(){
    var user_id = wx.getStorageSync('userId');
    if (user_id==''){
      wx.showToast({
        title: '请登录',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      wx.navigateTo({
        url: '../authorization/authorization',
      })
    }else{
      wx.hideTabBar({})
      this.setData({
        zhezhao: "block"
      })
    }
    
  },
  close:function(){
    wx.showTabBar({})
    this.setData({
      zhezhao: "none"
    })

  }
})
