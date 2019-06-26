// pages/orderPay/orderPay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMoney: 0,
    cupNumber: 0,
    remark: '',
    nowTime: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    this.setData({
      cartList: wx.getStorageSync('cartList'),
      sumMoney: wx.getStorageSync('sumMoney'),
      cupNumber: wx.getStorageSync('cupNumber'),
      remark: wx.getStorageSync('remark')
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
    // wx.removeStorageSync('remark')
    wx.removeStorage({
      key: 'remark',
      success: function(res) {},
    })
    wx.reLaunch({
      url: '../order/order?itemList=' + JSON.stringify(this.data.cartList),
    })
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