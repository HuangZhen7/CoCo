// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMoney: 0,
    cupNumber: 0,
    time: '',
    address: '',
    current: 0,
    max: 30,
    text: '',
    show: false,
    currentDate: JSON.stringify(`${new Date().getHours()} +':'+${ new Date().getMinutes()}`),
    minHour: 9,
    maxHour: 22
  },
  orderTime(){
    this.setData({
      show: true
    })
  },
  onConfirm(event) {
    this.setData({
      time: event.detail,
      show: false
    });
  },
  onCancel(event) {
    this.setData({ show: false });
  },
  onClose() {
    this.setData({ show: false });
  },
  limit(e){
    // console.log(e);
    this.setData({
      current: e.detail.cursor,
      text: e.detail.value
    })
    // console.log(this.data.text)
    wx.setStorageSync('remark', this.data.text)
  },
  // content(e){
  //   console.log(e,'------')
  //   this.setData({
  //     text: e.detail.value
  //   })
  // },
  goPay(){
    wx.showToast({
      title: '订单提交中…',
      icon: 'loading',
      duration: 5000
    })
    wx.navigateTo({
      url: '../../pages/orderPay/orderPay'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '提交订单'
    })
    this.setData({
      cartList: wx.getStorageSync('cartList'),
      sumMoney: wx.getStorageSync('sumMoney'),
      cupNumber: wx.getStorageSync('cupNumber'),
      time: wx.getStorageSync('time'),
      address: wx.getStorageSync('storeAdd')
    })
    // console.log(this.data.time)
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