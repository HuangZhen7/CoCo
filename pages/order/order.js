// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMoney: 0,
    cupNumber: 0,
    flag: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  golist() {
    wx.showToast({
      title: '加载中…',
      icon: 'loading',
      duration: 2000,
    })
    wx.navigateTo({
      url: '../address/address'
    })
  },
  onLoad: function (options) {
    // console.log(options)
    wx.setNavigationBarTitle({
      title: '我的订单'
    })
    if (options.itemList) {
      this.setData({
        cartList: JSON.parse(options.itemList),
        flag: true
      })
    }
    
    // console.log(cartList,'-------')
    // this.setData({
    //   cartList: wx.getStorageSync('cartList') || '',
    //   sumMoney: wx.getStorageSync('sumMoney'),
    //   cupNumber: wx.getStorageSync('cupNumber')
    // })
    // if(this.data.cartList.length != 0) {
    //   this.setData({
    //     flag: true
    //   })
    // } else {
    //   this.setData({
    //     flag: false
    //   }) 
    // }
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