const app=getApp();
Page({
  data: {
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    soppingList:[],
    checkAll: false,
    'totalCount': 0,
    'totalPrice': 0,
     recommend:[],
    showa:false,
    spId:0,
    call_null:false,
    addArray:[]
  },
  radios:function(){
    this.getTotalPrice();
  },
  //编辑商品
  edit:function(e){
    this.setData({
      showa: !this.data.showa
    })
  },
  //删除商品
  del_cer:function(e){
    var that=this;
    if (that.data.spId==0){
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 1000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }else{
     app.globalData.common.post({
       url:'/cart/deleteCart',
       data:{
         id: that.data.spId
       }
     })
     .then(res=>{
       console.log(res);
       wx.showToast({
         title: '删除成功',
         duration: 1000,
         mask: true,
         success: function(res) {
           that.onLoad();
         },
         fail: function(res) {},
         complete: function(res) {},
       })
     })
    }
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.common.post({
      url:'/cart/myCart'
    })
    .then(res=>{
      console.log(res);
      if(res.data.status=='200'){
        if (res.data.data.list==''){
            this.setData({
              call_null:true
            })
        }else{
          this.setData({
            call_null: false
          })
        }
        var data=res.data.data.list;
        var carts=[];
        data.forEach(item => {
          let messege = {
            checked: false,
            ...item
          }
          carts.push(messege); //实现购物车的最近添加的物品，展现在最前面
        })
        this.setData({
          soppingList: carts,
          recommend: res.data.data.recommend
        })
        console.log(this.data.soppingList);
      }
    })
  },
  /**
     * 用户选择购物车商品
     */
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var ss = e.detail.value;
    var addArray=[];
    this.setData({
      spId: ss[0]
    })
    addArray.push(e.detail.value);
    console.log(addArray)
    var checkboxItems = this.data.soppingList;
    var values = e.detail.value;
    console.log(checkboxItems)
    this.setData({
      addArray: addArray
    })
    for (var i = 0; i < checkboxItems.length; ++i) {
      checkboxItems[i].checked = false;
      if (checkAll == false) {
        for (var i = 0; i < addArray.length; i++) {
          if (addArray[i] == e.detail.value) {
            addArray.splice(i, 1);
            break;
          }
        }
        console.log(addArray)
      }
      for (var j = 0; j < values.length; ++j) {
        if (checkboxItems[i].id == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    var checkAll = false;
    if (checkboxItems.length == values.length) {
      checkAll = true;
      
    }
    this.setData({
      soppingList: checkboxItems,
      checkAll: checkAll
    });
    
    this.calculateTotal();
    
  },
  /**
  * 计算商品总数
  */
  calculateTotal: function () {
    var goodList = this.data.soppingList;
    var totalCount = 0;
    var totalPrice = 0;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      if (good.checked) {
        totalCount += good.goods_num;
        totalPrice += good.goods_num * good.discount_price;
      }
    }
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      'totalCount': totalCount,
      'totalPrice': totalPrice
    })
  },
  /**
  * 用户点击商品减1
  */
  subtracttap: function (e) {
    var index = e.target.dataset.index;
    var goodList = this.data.soppingList;
    var count = goodList[index].goods_num;
    if (count <= 1) {
      return;
    } else {
      goodList[index].goods_num--;
      this.setData({
        soppingList: goodList
      });
      this.calculateTotal();
      console.log(this.data.soppingList)
    }
  },
  /**
    * 用户点击商品加1
    */
  addtap: function (e) {
    var index = e.target.dataset.index;
    var goodList = this.data.soppingList;
    var count = goodList[index].goods_num;
    goodList[index].goods_num++;
    this.setData({
      soppingList: goodList
    });
    this.calculateTotal();
  },
  /**
  * 用户点击全选
  */
  selectalltap: function (e) {
    console.log('用户点击全选，携带value值为：', e.detail.value);
    var value = e.detail.value;
    var checkAll = false;
    if (value && value[0]) {
      checkAll = true;
    }
    var goodList = this.data.soppingList;
    console.log(goodList)
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      good['checked'] = checkAll;
    }

    this.setData({
      checkAll: checkAll,
      soppingList: goodList
    });
    console.log(this.data.checkAll);
    this.calculateTotal();
  },
  //跳转详情
  detail: function (e) {
    var cateId = e.currentTarget.dataset.cateid
    wx.navigateTo({
      url: '../classificationdetail/classificationdetail?cateId=' + cateId,
    })
  },
  //结算
  pay:function(e){
    console.log(this.data.addArray)
    if (this.data.totalCount<=0){
      wx.showToast({
        icon:'none',
        title: '请选择商品',
      })
    }else{
      wx.navigateTo({
        url: '../orderJs/orderJs?type=1&cart_ids=' + this.data.addArray
      }) 
    }
   
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.calculateTotal();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     this.onLoad();
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