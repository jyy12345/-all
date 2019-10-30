// pages/techer/classCadets/classCadets.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    show1: false,
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['3-4A', '3-4B', '4-5A', '4-5B', '5-6A', '5-6B', '6-7A', '6-7B', '7-8A', '7-8B', '8-9A', '8-9B', '9-10A', '9-10B', '10-11A', '10-11B', '11-12A', '11-12B', '12-13A', '12-13B', '13-14A', '13-14B', '14-15A', '14-15B', '15-16A', '15-16B'],//下拉列表的数据
    selectData1: ['猫与狗', '猫与狗', '猫与狗', '猫与狗'],
    index: 0,//选择的下拉列表下标
    index1: 0,
    catalogSelect: 0,//判断是否选中
    catalogs: [
      {
        "name": "张三三",
        "catalogName": "签到",
        "select": 1
      },
      {
        "name": "张三",
        "catalogName": "请假",
        "select": 2
      },
      {
        "name": "张三三",
        "catalogName": "旷课",
        "select": 3
      },
    ],

  },
  sinpy: function (data) {
    console.log(data);
    var that = this;
    that.setData({//把选中值放入判断值
      select: data.currentTarget.id,
      catalogSelect: data.currentTarget.dataset.select
    })


  },
  // // 点击下拉显示框
  // selectTap() {
  //   this.setData({
  //     show: !this.data.show
  //   });
  // },
  // // 点击下拉列表
  // optionTap(e) {
  //   let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
  //   // console.log(Index);
  //   this.setData({
  //     index: Index,
  //     show: !this.data.show
  //   });
  // },
  // selectTap1() {
  //   this.setData({
  //     show: !this.data.show1
  //   });
  // },
  // optionTap1(e) {
  //   let Indexs = e.currentTarget.dataset.index1;//获取点击的下拉列表的下标
  //   this.setData({
  //     index: Indexs,
  //     show: !this.data.show1
  //   });
  // },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
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