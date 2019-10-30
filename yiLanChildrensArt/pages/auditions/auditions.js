// const date = new Date()
// const nowYear = date.getFullYear()
// const nowMonth = date.getMonth() + 1
// const nowDay = date.getDate()

// let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
// // 根据年月 获取当月的总天数
// let getDays = function (year, month) {
//   if (month === 2) {
//     return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28
//   } else {
//     return daysInMonth[month - 1]
//   }
// }
// // 根据年月日设置当前月有多少天 并更新年月日数组
// let setDate = function (year, month, day, _th) {
//   let daysNum = year === nowYear && month === nowMonth ? nowDay : getDays(year, month)
//   day = day > daysNum ? 1 : day
//   let monthsNum = year === nowYear ? nowMonth : 12
//   let years = []
//   let months = []
//   let days = []
//   let yearIdx = 9999
//   let monthIdx = 0
//   let dayIdx = 0

//   // 重新设置年份列表
//   for (let i = 1950; i <= nowYear; i++) {
//     years.push(i)
//   }
//   years.map((v, idx) => {
//     if (v === year) {
//       yearIdx = idx
//     }
//   })
//   // 重新设置月份列表
//   for (let i = 1; i <= monthsNum; i++) {
//     months.push(i)
//   }
//   months.map((v, idx) => {
//     if (v === month) {
//       monthIdx = idx
//     }
//   })
//   // 重新设置日期列表
//   for (let i = 1; i <= daysNum; i++) {
//     days.push(i)
//   }
//   days.map((v, idx) => {
//     if (v === day) {
//       dayIdx = idx
//     }
//   })

//   _th.setData({
//     years: years,//年份列表
//     months: months,//月份列表
//     days: days,//日期列表
//     value: [yearIdx, monthIdx, dayIdx],
//     year: year,
//     month: month,
//     day: day
//   })
// }
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    // years: [],
    // months: [],
    // days: [],
    // year: nowYear,
    // month: nowMonth,
    // day: nowDay,
    // value: [9999, 1, 1],
    hiddenName: true,
    isScroll: true,
  //   dateobj: {
  //     yes: "2017",
  //     yue: "10",
  //     rie: "03"
  // },
    showModalStatus: false
  },
  heigged: function () {
    this.setData(
      {
        showModalStatus: true
      }
    );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // setDate(this.data.year, this.data.month, this.data.day, this)
  },
  showDatePicker: function (e) {
    
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow: true,
      isScroll: "{{false}}"
    });
  },

  datePickerOnSureClick: function (e) {
    console.log('datePickerOnSureClick');
    console.log(e);
    this.setData({
      date: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
  },

  datePickerOnCancelClick: function (event) {
    console.log('datePickerOnCancelClick');
    console.log(event);
    this.setData({
      datePickerIsShow: false,
    });
  },

    // // 日期显示隐藏
    // clickMe: function (e) {
    //   this.setData({
    //     hiddenName: !this.data.hiddenName
    //   })
    // },
  // // 点击取消日期显示隐藏
  // quits: function (e) {
  //   this.setData({
  //     hiddenName: !this.data.hiddenName
  //   })
  // },
    // bindChange: function (e) {
    //   let val = e.detail.value
    //   var that = this;
    //   that.setData({
    //     dataobj: {
    //       yes: that.data.years[val[0]],
    //       yue: that.data.months[val[1]],
    //       rie: that.data.years[val[2]]
    //     }
    //   })
    // },
  tijiO:function(){
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu);
   
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