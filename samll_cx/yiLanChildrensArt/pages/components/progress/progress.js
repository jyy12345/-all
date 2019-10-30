Component({
  data: {
    width: 0
  },
  properties: {
    percent: {
      value: 0,
      type: Number,
      observer: function (oldVal, newVal) {
        this.updateProgress(newVal)
      }
    }
  },
  ready: function () {
    wx.createSelectorQuery().in(this).select('#progressBar').boundingClientRect(function (rect) {
      rect.width 
    }).exec((res) => {
      this.setData({
        barWidth: res[0].width
      })
    })
  },
  methods: {
    updateProgress: function (percent) {
      const barWidth = this.data.barWidth
      this.setData({
        width: barWidth * percent
      })
    }
  }
})