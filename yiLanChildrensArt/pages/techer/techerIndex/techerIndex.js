Page({
  data: {
    
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['3-4A', '3-4B', '4-5A', '4-5B', '5-6A', '5-6B', '6-7A', '6-7B', '7-8A', '7-8B', '8-9A', '8-9B', '9-10A', '9-10B', '10-11A', '10-11B', '11-12A', '11-12B', '12-13A', '12-13B', '13-14A', '13-14B', '14-15A', '14-15B', '15-16A', '15-16B'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    msg: '数据',
    imgalist: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496287851&di=0a26048f586b852193cb5026d60c4fad & imgtype=jpg & er=1 & src=http % 3A % 2F % 2Fpic.58pic.com % 2F58pic % 2F12 % 2F74 % 2F05 % 2F99C58PICYck.jpg' 
    ],
    imgalist1: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496287851&di=0a26048f586b852193cb5026d60c4fad & imgtype=jpg & er=1 & src=http % 3A % 2F % 2Fpic.58pic.com % 2F58pic % 2F12 % 2F74 % 2F05 % 2F99C58PICYck.jpg,https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496287851&di=0a26048f586b852193cb5026d60c4fad & imgtype=jpg & er=1 & src=http % 3A % 2F % 2Fpic.58pic.com % 2F58pic % 2F12 % 2F74 % 2F05 % 2F99C58PICYck.jpg,https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496287851&di=0a26048f586b852193cb5026d60c4fad & imgtype=jpg & er=1 & src=http % 3A % 2F % 2Fpic.58pic.com % 2F58pic % 2F12 % 2F74 % 2F05 % 2F99C58PICYck.jpg,https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496287851&di=0a26048f586b852193cb5026d60c4fad & imgtype=jpg & er=1 & src=http % 3A % 2F % 2Fpic.58pic.com % 2F58pic % 2F12 % 2F74 % 2F05 % 2F99C58PICYck.jpg'
    ]
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgalist // 需要预览的图片http链接列表
    })
  },
  previewImages: function (e) {
    var currents = e.target.dataset.src;
    wx.previewImage({
      current: currents, // 当前显示图片的http链接
      urls: this.data.imgalist1 // 需要预览的图片http链接列表
    })
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  onLoad: function (options) {

  }

})