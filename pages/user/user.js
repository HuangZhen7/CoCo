// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
<<<<<<< HEAD
  goDetail(e){
    // console.log(e)
    let name = e.currentTarget.dataset.name
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000
    })
    wx.navigateTo({
      url: '../../pages/user-info/user-info?name=' + name,
    })
  },
=======

>>>>>>> 164b07c5bdd3bcfa22ed16eacc7f4b5643b3e900
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