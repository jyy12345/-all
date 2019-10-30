import API from '../../api.js';
Page({
  data: {
      imgs:'',
      imgShow:false,
      imgsNew:null,
      imgUrs:''
  },
  // 试听
  onScrt: function (event) {
    wx.navigateTo({
      url: '../auditions/auditions',
    })
  },
  choice: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        var tempFilePaths = res.tempFilePaths 
        console.log(tempFilePaths[0])
        that.setData({
          imgsNew: tempFilePaths,
          imgs: tempFilePaths[0],
          textHidden: true,
          image_photo: tempFilePaths.toString(),
          photoHidden: false,
          imgShow:true
        })
        wx.uploadFile({
          url: 'https://pub.yilanmeishu.com/api/xiaochengxu/home/img_upload_get_img_url.ajax',
          filePath: tempFilePaths[0],
          name: 'file',
          header: { "Content-Type": "multipart/form-data" },
          success: function (res) {
            console.log(JSON.parse(res.data));
            var datas = JSON.parse(res.data);
            if (res.statusCode=='200'){
                that.setData({
                  imgUrs: datas.data.imgUrl
                })
            }
          }
        })
      }
    })
  },   
  removeImage(e) {
    var imgs = this.data.imgsNew;
      var index = e.currentTarget.dataset.index;
      imgs.splice(index, 1);
      this.setData({
         imgs: imgs,
        imgShow:false
      });
    console.log(imgs);
  },
  updersUp: function () {
    var that=this;
    var myDate = new Date();
    var upende = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      businessId: 111,
      imgUrl: that.data.imgUrs
    }
    wx.request({
      url: API.upende,
      method: "get",
      data: API.getParams(upende),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        console.log(res.data.data);
        var lisData = JSON.stringify(res.data.data)
        if(res.data.code==0){
          wx.navigateTo({ 
            url: '../uploadResults/uploadResults?uploadImg=' + lisData,
          })
        }else{
          wx.showToast({
            icon:'lodding',
            title: '上传失败',
          })
        }
      },
      fail: function () {
        console.log("fail");
      }
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