// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgs:''
  },
  // 试听
  onScrt: function (event) {
    wx.navigateTo({
      url: '../auditions/auditions',
    })
  },
  choice: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        var tempFilePaths = res.tempFilePaths
        that.setData({
          imgs:tempFilePaths,
          textHidden: true,
          image_photo: tempFilePaths,
          photoHidden: false
        })
      }
    })
  },
      
  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    $digest(this)
  },
  uploadPhoto: function () {
    var that = this
    let param = util.json2Form({
      tel: '18600346580',
      orderSn: that.data.orderSn,
      parkingPhoto: that.data.image_photo,
    });
    wx.uploadFile({
      url: 'https://testapi.com/v4.0.0/uploadParkingPhoto', //仅为示例 
      filePath: that.data.image_photo[0],
      name: 'parkingPhoto',
      formData: {
        'tel': '***********',
        'orderSn': that.data.orderSn,
      },
      success: function (res) {
        var obj = JSON.parse(res.data);;
        console.log(obj.result)
        console.log(obj.msg)
        var resule = obj.result;
        var msg = obj.msg;
        if (resule == 'false') {
          wx.showToast({
            title: msg,
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.navigateBack({
            delta: 1,
            success: function (res) {
              wx.showToast({
                title: msg,
                icon: 'success',
                duration: 2000
              })
            },

          })
        }
      }
    })

  },
   updersUp:function(){
     wx.navigateTo({
       url: '../uploadResults/uploadResults',
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