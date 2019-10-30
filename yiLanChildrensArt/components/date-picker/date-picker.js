Component({
    properties: {
        value: {
            type: Array,
            value: [],
            observer: "onValue"
        },
        isShow: {
            type: Boolean,
            value: false,
            observer: "onShow"
        }
    },

    data: {
        years: [],
        months: [],
        days: [],
        tempYearPos: [0],
        tempMonthPos: [0],
        tempDayPos: [0],
        showPicker: false,
      isScroll: true,
      showModalStatus: false,
      hiddenName: true,
    },
 
  powerDrawer: function (e) {
    console.log(1);
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu);

  },
  heigged: function () {
    this.setData(
      {
        showModalStatus: true
      }
    );
  },
  tijiO: function () {
    this.setData({
      hiddenName: !this.data.hiddenName
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

    attached: function() {
        /**
         * 初始化年月日
         */
        var date = new Date();
        var years = [];
        var months = [];
        var days = [];

        for (let i = 1900; i <= date.getFullYear(); i++) {
            years.push(i);
        }

        for (let i = 1; i <= 12; i++) {
            let month = 0;
            month = i < 10 ? '0' + i : i;
            months.push(month);
        }

        days = this.getDays(date.getFullYear(), date.getMonth() + 1);

        this.setData({
            years: years,
            months: months,
            days: days
        });

    },

    methods: {
        onTouchmask: function(event) {
        },
        onCacnelClick(e) {
            this.triggerEvent('cancelclick', {});
           isScroll: true
        },
        onSureClick(e) {
          isScroll: true;
            var curYear = this.data.years[this.data.tempYearPos];
            var curMonth = this.data.months[this.data.tempMonthPos];
            var curDay = this.data.days[this.data.tempDayPos];
            var value = [curYear, curMonth, curDay];
            this.triggerEvent('sureclick', {
                value: value,
            });
        },
        year_onChange: function(e) {
            //年改变，月要滑到一月，天要重新计算该年该月多少天
            var days = [];
            var curYear = this.data.years[e.detail.value];
            days = this.getDays(curYear, 1);
            this.setData({
                days: days,
                tempYearPos: e.detail.value,
                tempMonthPos: [0],
                tempDayPos: [0],
            });
        },
        month_onChange: function(e) {
            var days = [];
            var curYear = this.data.years[this.data.tempYearPos];
            var curMonth = this.data.months[e.detail.value];
            days = this.getDays(curYear, curMonth);
            this.setData({
                days: days,
                tempMonthPos: e.detail.value,
                tempDayPos: [0],
            });
        },
        day_onChange: function(e) {
            this.setData({
                tempDayPos: e.detail.value
            });
        },
        onValue() {
            //通过传进来的年月日,计算对应的index
            var data = this.getRefreshData();
            this.setData(data)
        },
        onShow() {
            var data = this.getRefreshData();
            data.showPicker = this.data.isShow;
            this.setData(data)

        },
        getDays(year, month) {
            var days = [];
            month = parseInt(month, 10);
            var date = new Date(year, month, 0);
            var maxDay = date.getDate();
            for (let i = 1; i <= maxDay; i++) {
                let day = 0;
                day = i < 10 ? '0' + i : i;
                days.push(day);
            }
            return days;
        },
        getRefreshData() {
            //通过传进来的年月日,计算对应的inde
            if (this.data.years == null || this.data.years.length == 0) {
                return {};
            }

            var date = new Date();

            var tempYearPos = this.data.years.length - 1;
            var tempMonthPos = date.getMonth();
            var tempDayPos = date.getDate() - 1;

            for (var i = 0; i < this.data.years.length; i++) {
                var item = this.data.years[i];
                if (item == this.data.value[0]) {
                    tempYearPos = i;
                    break;
                }
            }

            for (var i = 0; i < this.data.months.length; i++) {
                var item = this.data.months[i];
                if (item == this.data.value[1]) {
                    tempMonthPos = i;
                    break;
                }
            }

            var days = [];
            var curYear = this.data.years[tempYearPos];
            days = this.getDays(curYear, this.data.months[tempMonthPos]);

            for (var i = 0; i < days.length; i++) {
                var item = days[i];
                if (item == this.data.value[2]) {
                    tempDayPos = i;
                    break;
                }
            }

            var data = {
                days: days,
                tempYearPos: [tempYearPos],
                tempMonthPos: [tempMonthPos],
                tempDayPos: [tempDayPos],
            }
            return data;
        },
     
    }
    
});