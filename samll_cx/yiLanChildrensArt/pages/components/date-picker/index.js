import API from '../../../api.js';
const today = new Date()

const week = [
  { value: '周日', class: 'weekend' },
  { value: '周一', class: '' },
  { value: '周二', class: '' },
  { value: '周三', class: '' },
  { value: '周四', class: '' },
  { value: '周五', class: '' },
  { value: '周六', class: 'weekend' },
]

Component({
  behaviors: [],
 
  properties: {
   time:{
     type:String,
     value:''
   },
    hiddenName:{
      type: Boolean,
      value: true
    },
    timesNum:{
     type:String,
     value:''
    },
    isScroll: {
      type: Boolean,
      value:true
    },
    showModalStatus: {
      type: Boolean,
      value:false
    },
    showModal: {
      type: Boolean,
      value:true
      },
    show: {
      type: Boolean,
      value: false,
    },
    enableTime: {
      type: Boolean,
      value: false,
    },
    date: {
      type: String,
      value: '',
      observer: 'init',
    },
    dataTimes:{
      type:String,
      value:''
    },
    dataTap:{
      type:Boolean,
      value:true,
    },
    dataTapTime: {
      type: Boolean,
      value: true,
    }
  },
  data:{
    imgArr: [],
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  ready: function() {
    this.init()
  },
 
  methods: {
    formatTime(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
      //author: meizz
      var o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds(), //毫秒
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      return fmt
    },

    isDate(date) {
      if (date == null || date == undefined) {
        return false
      }
      return new Date(date).getDate() == date.substring(date.length - 2)
    },

    isLeapYear(y) {
      return y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)
    },

    isToday(y, m, d) {
      return y == today.getFullYear() && m == today.getMonth() + 1 && d == today.getDate()
    },

    isWeekend(emptyGrids, d) {
      return (emptyGrids + d) % 7 == 0 || (emptyGrids + d - 1) % 7 == 0
    },

    calEmptyGrid(y, m) {
      const result = new Date(`${y}/${m}/01 00:00:00`).getUTCDay()
      return result + 1 || ''
    },

    calDaysInMonth(y, m) {
      let leapYear = this.isLeapYear(y)
      if (m == 2 && leapYear) {
        return 29
      }
      if (m == 2 && !leapYear) {
        return 28
      }
      if ([4, 6, 9, 11].includes(m)) {
        return 30
      }
      return 31
    },

    calWeekDay(y, m, d) {
      return new Date(`${y}/${m}/${d} 00:00:00`).getUTCDay() || ''
    },

    calDays(y, m) {
      let { selected } = this.data
      let emptyGrids = this.calEmptyGrid(y, m)
      let days = []
      for (let i = 1; i <= 31; i++) {
        let ifToday = this.isToday(y, m, i)
        let isSelected = selected[0] == y && selected[1] == m && selected[2] == i
        let today = ifToday ? 'today' : ''
        let select = isSelected ? 'selected' : ''
        let weekend = this.isWeekend(emptyGrids, i) ? 'weekend' : ''
        let todaySelected = ifToday && isSelected ? 'today-selected' : ''
        let day = {
          value: i,
          class: `date-bg ${weekend} ${today} ${select} ${todaySelected}`,
        }
        days.push(day)
      }
      return days.slice(0, this.calDaysInMonth(y, m))
    },

    changeMonth: function(e) {
      let id = e.currentTarget.dataset.id
      let currYear = this.data.currYear
      let currMonth = this.data.currMonth
      currMonth = id == 'prev' ? currMonth - 1 : currMonth + 1
      if (id == 'prev' && currMonth < 1) {
        currYear -= 1
        currMonth = 12
      }
      if (id == 'next' && currMonth > 12) {
        currYear += 1
        currMonth = 1
      }

      const emptyGrids = this.calEmptyGrid(currYear, currMonth)
      const days = this.calDays(currYear, currMonth)
      this.setData({ currYear, currMonth, emptyGrids, days })
    },

    handleSelectDate: function(e) {
      let data = e.target.dataset.selected
      const selected = [data[0], data[1], data[2]]
      this.setData({ selected })

      let days = this.calDays(data[0], data[1])
      this.setData({
        currYear: data[0],
        currMonth: data[1],
        days: days,
      })
    },
    // 时间选择
    getTimes1: function (e) {
      console.log(e.target.id);
      this.setData({
        timesNum: e.target.id 
      })
      if(e.target.id==1){
        this.setData({
          time: "    16:00-17:30"
        })
      } else if (e.target.id == 2){
        this.setData({
          time: "     18:00-19:30"
        })
      }
    },
    handleDatePickerChange(e) {
      let [year, month] = e.detail.value.split('-')
      year = parseInt(year)
      month = parseInt(month)
      this.setData({ currYear: year, currMonth: month })
      const emptyGrids = this.calEmptyGrid(year, month)
      const days = this.calDays(year, month)
      this.setData({ emptyGrids, days })
    },

    handleTimePickerChange(e) {
      const time = e.detail.value
      this.setData({ time })
    },

    handleReset(e) {
      this.setData({ selected: [], time: '' })
      const days = this.calDays(this.data.currYear, this.data.currMonth)
      this.setData({ days })
      // this.triggerEvent('onselectdate', {})
    },

    init() {
      const { date } = this.data

      const dateTime = this.isDate(date) ? new Date(date) : today

      const year = dateTime.getFullYear()
      const month = dateTime.getMonth() + 1
      const dayInMonth = dateTime.getDate()
      const dayInWeek = dateTime.getDay()
      const time = this.formatTime(dateTime, 'hh:mm')

      const selected = [year, month, dayInMonth]
      this.setData({ currYear: year, currMonth: month, dayInWeek, dayInMonth, week, time, selected })
      const emptyGrids = this.calEmptyGrid(year, month)
      const days = this.calDays(year, month)
      this.setData({ emptyGrids, days })
    },

    handleChooseToday() {
      this.setData({ date: today.toString() })
      this.init()
    },
    // pawert(e){
    // var currentStatu = e.currentTarget.dataset.statu;
    // console.log(currentStatu)
    //     this.util(currentStatu);
    // },
    pawert(e) {
      var currentStatu = e.currentTarget.dataset.statu;
      console.log(currentStatu)
      this.util(currentStatu);
      const { selected, enableTime } = this.data;
      if (selected && selected.length > 0) {
        const dateStr = selected.join('/') + ' ' + this.data.time
        const dateStr1 = this.formatTime(new Date(dateStr), enableTime ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd')
        // this.triggerEvent('onselectdate', { date: dateStr1 })
        this.setData({
          dataTap: false,
        })
        var myEventDetail = {
          val: dateStr1,
          num:1
        } // detail对象，提供给事件监听函数
        this.triggerEvent('myevent', myEventDetail);
        console.log(myEventDetail);
        var myDate = new Date();
        var that = this;
        var auditionTime = {
          appId: '100001',
          token: 'de67f0c0-edea-441f-806a-759673f1e870',
          requestId: myDate.getTime(),
          experienceDate: dateStr1
        }
        wx.request({
          url: API.auditionTime,
          method: "get",
          data: API.getParams(auditionTime),
          header: {
            'content-type': 'application/json;charset=utf-8'
          },
          success: function (res) {
            console.log(res);
            that.setData({
              imgArr:res.data.data
            })
          },
          fail: function () {
            console.log("fail");
          }
        })
      }
      
    },
    powerDrawer: function (e) {
      var currentStatu = e.currentTarget.dataset.statu;
      this.util(currentStatu);
      this.setData({
        dataTapTime:false
      })
    },
    powerDrawer1s:function(e){
      var currentStatu = e.currentTarget.dataset.statu;
      this.util(currentStatu);
      this.triggerEvent('dataTime', this.data.time);
    },
    /**
  * 隐藏模态对话框
  */
    heigged: function () {
      this.setData(
        {
          showModalStatus: true
        }
      );
    },
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

  },
})
