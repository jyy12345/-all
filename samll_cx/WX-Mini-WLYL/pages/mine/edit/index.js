// pages/mine/edit/index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    headImg:'',
    name:'',
    sex: ['男', '女'],
    index: '',
    sexType: '',
    age:'',
    mobile:'',
    userId: '',
    occupationage: '',//教龄
    email: '',
    begoodat: [],//id
    goodAt: [],
    goodArray: [],
    goodHide: true,
    intro: '',//介绍
    role:''
  },
  onLoad: function (options) {
    this.getPersonalMes()
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
  getPersonalMes() {
    var openId = wx.getStorageSync('openId');
    var role = wx.getStorageSync('role');
    this.setData({
      role:role
    })
    console.log(this.data.begoodat)
    app.post(app.globalData.ServerURL + "personalcenter/myinformation", {
      "openid": openId,
      "status": role,
    }).then((res) => {
      console.log(res);
      if (res.data.code == 0) {
        var that = this;
        if(role==1){//专业
          var permes = res.data.data.list;
          var goodAt = res.data.data.begoodat;
          goodAt.forEach(function(item,index){
            that.data.goodAt.push(item.title)
            that.data.begoodat.push(item.id)
          })
          console.log(that.data.goodAt)

          this.setData({
            headImg: permes.image,
            name: permes.name,
            index: Number(permes.sex) - 1,
            sexType: permes.sex,
            age: permes.age,
            mobile: permes.mobile,
            userId: permes.id,
            occupationage: permes.occupationage,
            email: permes.email,
            goodAt: that.data.goodAt,
            intro: permes.content,
          })
        }else{
          res.data.data.forEach(function (item, index) {
            that.data.headImg = item.image;
            that.data.name = item.name;
            that.data.sexType = item.sex;
            that.data.index = Number(item.sex) - 1;
            that.data.age = item.age;
            that.data.mobile = item.mobile;
            that.data.userId = item.id;
          })
          this.setData({
            headImg: this.data.headImg,
            name: this.data.name,
            index: this.data.index,
            age: this.data.age,
            mobile: this.data.mobile,
          })
        }
        
      }
    }).catch((errMsg) => {
      console.log(errMsg);
    })
  },
  // 更换头像
  changeHeadImg(e){
    var that=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0])
        console.log(that.data.userId)
        wx.uploadFile({
          url: app.globalData.ServerURL + 'personalcenter/modifyinghead', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            //和服务器约定的token, 一般也可以放在header中
            'id': that.data.userId
          },
          success(reses) {  
            console.log(reses, 'toux')
            var data=JSON.parse(reses.data)
            if(data.code==0){
              var newImg=data.data.img;
              console.log(newImg)
              that.setData({
                headImg: newImg
              })
            }
          }
        })
      }
    })
  },
  
  // 昵称
  getName(e) {
    console.log(e)
    this.setData({
      name: e.detail.value
    })
  },
  // 性别
  getSex(e) {
    console.log(typeof (Number(e.detail.value)))
    this.data.sexType = Number(e.detail.value) + 1
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.sexType, '性别传值')
  },
  // 年龄
  getAge(e) {
    console.log(e)
    this.setData({
      age: e.detail.value
    })
  },
  // 教龄
  getTeachage(e) {
    this.setData({
      occupationage: e.detail.value
    })
  },
  // 邮箱
  getEmail(e) {
    console.log(e)
    this.setData({
      email: e.detail.value
    })
  },
  // 擅长
  getGood(e) {
    app.post(app.globalData.ServerURL + "user/coachbegoodat", {}).then((res) => {
      console.log(res);
      var goodat = e.currentTarget.dataset.goodat;
      for (var i = 0; i < goodat.length; i++) {
        for (var j = 0; j < res.data.data.length; j++){
          if (goodat[i] == res.data.data[j].title){
            var key = "checked";
            var value = "true"
            res.data.data[j][key]=value
          }
        }
      }
      console.log(res.data.data, '做更改之后')
      this.setData({
        goodArray: res.data.data
      })
    }).catch((errMsg) => {
      console.log(errMsg);
    })
    this.setData({
      goodHide: false,
    })
  },
  checkboxChange: function (e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var arr = [];
    e.detail.value.forEach(current => {
      for (var item of this.data.goodArray) {
        if (current == item.id) {
          arr.push(item.title);
          break;
        }
      }
    });
    this.setData({
      goodAt: arr,
      begoodat: e.detail.value
    });

  },
  unhide(e) {
    console.log(e)
    this.setData({
      goodHide: false,
    })
  },
  confirme(e) {
    this.setData({
      goodHide: true,
    })
  },
  // 个人说明
  getIntro(e) {
    this.setData({
      intro: e.detail.value
    })
  },
  hide(e) {
    console.log(e)
    this.setData({
      goodHide: true,
    })
  },
  // 保存
  save(e){
    var role = wx.getStorageSync('role');
    var headImg = this.data.headImg
    var name = this.data.name
    var sexType = this.data.sexType
    var age = this.data.age
    var occupationage = this.data.occupationage
    var email = this.data.email
    var mobile = this.data.mobile
    var begoodat = this.data.begoodat
    var intro = this.data.intro;
    var userId = this.data.userId
    if(role==1){//专业
      if (name != '' && sexType != '' && age != '' && occupationage != '' && email != '' && begoodat != '' && intro!= '') {
        app.post(app.globalData.ServerURL + "personalcenter/myinformationsave", {
          "image": headImg,
          "name": name,
          "sex": sexType,
          "age": age,
          "occupationage": occupationage,
          "email": email,
          "mobile": mobile,
          "begoodat": begoodat,
          "intro": intro,
          "id": userId,
          "type": role,
        }).then((res) => {
          console.log(res,'专业会员数据');
          if (res.data.code == 0) {
            wx.reLaunch({
              url: '/pages/mine/index',
            })
          }
        }).catch((errMsg) => {
          console.log(errMsg);
        })
      } else {
        wx.showToast({
          title: '请将信息填写完整',
          icon: 'none',
          duration: 1000
        })
      } 
    }else{
      if (name != '' && sexType != '' && age != '') {
        app.post(app.globalData.ServerURL + "personalcenter/myinformationsave", {
          "image": headImg,
          "name": name,
          "sex": sexType,
          "age": age,
          "occupationage": occupationage,
          "email": email,
          "mobile": mobile,
          "begoodat": begoodat,
          "intro": intro,
          "id": userId,
          "type": role,
        }).then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            wx.reLaunch({
              url: '/pages/mine/index',
            })
          }
        }).catch((errMsg) => {
          console.log(errMsg);
        })
      } else {
        wx.showToast({
          title: '请将信息填写完整',
          icon: 'none',
          duration: 1000
        })
      } 
    }
     
  },
  
})