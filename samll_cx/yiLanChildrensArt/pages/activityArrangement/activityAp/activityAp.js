import API from '../../../api.js';
Page({
  data: {
    tabbar: {},
    showModalStatus: false,
    telphone:null,
    babyName:null,
    signUp:true,
    signupSuccess:false,
    contentData:[],
    activeId:null,
  },
  // 试听
  onScrt: function (event) {
    wx.navigateTo({
      url: '../../auditions/auditions',
    })
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu);
  },
  powerDrawer1: function (e) {
    var myDate = new Date();
    var that = this;
    const inpVal = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId:111,
      activityId: that.data.activeId,
      name: that.data.babyName,
      phone: that.data.telphone
    }
    // var currentStatu = e.currentTarget.dataset.statu;
    // this.util(currentStatu);
     this.setData({
       signUp: false,
       signupSuccess: true
     })

    wx.request({
      url:API.activity,
      method: "get",
      data: API.getParams(inpVal),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        console.log(res);
        if(res.code=="0"){
          wx.showToast({
            title: '提交成功',
            icon: 'succes',
            duration: 1000,
            mask: true
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
  heigged:function(){
    this.setData(
      {
        showModalStatus: false,
        signUp: true,
        signupSuccess: false
      }
    );
  },
  onLoad: function (options) {
    getApp().editTabBar();
    var myDate = new Date();
    var that = this;
    that.setData({
      activeId: options.ids
    })
    var artCircles = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: 111,
      activityId: options.ids
    }
    wx.request({
      url: API.hdAp,
      method: "get",
      data: API.getParams(artCircles),
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
  // 拿到手机号
  getPhone: function (e) {
    var val = e.detail.value;
    this.setData({
      telphone: val
    });
  },
  getName: function (e) {
    var val = e.detail.value;
    this.setData({
      babyName: val
    });
  },
})  
