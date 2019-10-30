import API from '../../../api.js';
const getPhone = wx.getStorageSync("phones");
Page({
  data: {
    imgs: [],
    imgsNew:null,
    imgShow: false,
    teacherId: null,//老师id   需要动态的
    studentId: null ,//学生id
    courseNo:null,  //课程编号
    contentId:null //课程内容id
  },
  // 试听
  onScrt: function (event) {
    wx.navigateTo({
      url: '../../auditions/auditions',
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
          imgShow: true
        })
        wx.uploadFile({
          url: 'https://pub.yilanmeishu.com/api/xiaochengxu/home/img_upload_get_img_url.ajax',
          filePath: tempFilePaths[0],
          name: 'file',
          header: { "Content-Type": "multipart/form-data" },
          success: function (res) {
            console.log(JSON.parse(res.data));
            var datas = JSON.parse(res.data);
            if (res.statusCode == '200') {
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
    console.log(imgs);
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs,
      imgShow: false
    });
    console.log(imgs)
  },
  updersUp: function () {
    var that = this;
    var myDate = new Date();
    var currevaluation = {
      appId: '100001',
      token: 'de67f0c0-edea-441f-806a-759673f1e870',
      requestId: myDate.getTime(),
      imgUrl: that.data.imgUrs,
      phone: getPhone,
      teacherId: this.data.teacherId,//老师id   需要动态的
      studentId:this.data.studentId, //学生id
      courseNo: this.data.courseNo, //课程编号
      contentId: this.data.contentId//课程内容id
    }
    console.log(that.data.imgs);
    wx.request({
      url: API.currevaluation,
      method: "get",
      data: API.getParams(currevaluation),
      header: {
        'content-type': 'application/json;charset=utf-8'
        // "Content-Type": "application/ x - www - form - urlencoded"
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == "0") {
          wx.showToast({
            title: "提交成功",
            icon: 'success',
            duration: 2000
          })
          wx.navigateTo({
            url: '../classCadets/classCadets?evaluateId=' + res.data.data.evaluateId,
          })
        } else {
          wx.showToast({
            title: "提交失败",
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       teacherId: options.teacherIds,//老师id   需要动态的
       studentId: options.studentId,//学生id
       courseNo: options.code,  //课程编号
       contentId: options.content //课程内容id
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