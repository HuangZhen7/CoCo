// pages/address/address.js
const app = getApp();
var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'LPUBZ-ZOKR2-GIOUE-CRKF7-A76JJ-ZRFJX' // 必填
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    storeList: [],
    newStoreList: [],
    flag: false,
  },
  onClick(event) {
    console.log(event);
    let index = event.detail.index;
    if (index == 1 && this.data.newStoreList != null) {
      this.setData({
        flag: true
      })
    } else if (index == 1 && this.data.newStoreList == null) {
      this.setData({
        flag: true
      })
    }
    wx.showToast({
      title: '加载中…',
      icon: 'loading',
      duration: 1000
    });
  },
  nearby_search() {
    let that = this;
    wx.chooseLocation({
      success: function(res) {
        // console.log(res);
        var newAddress = res.address
        console.log(newAddress);
        that.setData({
          address: newAddress
        })
      }
    })
  },
  onLoad(options) {
    this.setData({
      newStoreList: wx.getStorageSync('newStores')
    })
    // console.log(this.data.newStoreList.length)
  },
  onShow() {

  },

  onReady() {
    var that = this;
    wx.showLoading({
      title: '正在加载…'
    })
    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     qqmapsdk.reverseGeocoder({
    //       success: function (res) {//成功后的回调
    //         // console.log(res);
    //         var curAddress = res.result.address
    //         // console.log(curAddress)
    //         that.setData({
    //           address: curAddress
    //         })
    //       },
    //       fail: function (error) {
    //         console.error(error);
    //       },
    //       complete: function (res) {
    //         // console.log(res);

    //       }
    //     })
    //   }
    // })
    wx.getSetting({
      success(res) {
        // console.log('get-setting', res.authSetting);
        // 只返回用户请求过的授权
        let auth = res.authSetting;
        if (auth['scope.userLocation']) {
          // 已授权，申请定位地址
          wx.getLocation({
            type: 'wgs84',
            success(res) {
              qqmapsdk.reverseGeocoder({
                success: function(res) { //成功后的回调
                  // console.log(res);
                  var curAddress = res.result.address
                  // console.log(curAddress)
                  that.setData({
                    address: curAddress
                  })
                }
              })
            }
          })

        } else if (auth['scope.userLocation'] === undefined) {
          // 用户没有请求过的授权，不需要我们主动弹窗，微信会提供弹窗
          wx.getLocation({
            type: 'wgs84',
            success(res) {
              qqmapsdk.reverseGeocoder({
                success: function(res) { //成功后的回调
                  // console.log(res);
                  var curAddress = res.result.address
                  // console.log(curAddress)
                  that.setData({
                    address: curAddress
                  })
                }
              })
            }
          })
        } else if (!auth['scope.userLocation']) {
          // 没有授权过，需要用户重新授权
          // 这个弹窗是为了实现点击，不然openSetting会失败
          wx.showModal({
            title: '是否授权当前位置？',
            content: '需要获取您的地理位置，请确认授权，否则定位功能将无法使用',
            success: res => {
              if (res.confirm) {
                wx.openSetting({
                  success(res) {
                    // console.log('open-setting-suc', res.authSetting);
                    let setting = res.authSetting;
                    if (!setting['scope.userLocation']) {
                      wx.showToast({
                        title: '地址授权失败，定位功能无法使用',
                        icon: 'none',
                      });
                    } else {
                      // 地址授权成功，申请定位地址
                      wx.getLocation({
                        type: 'wgs84',
                        success(res) {
                          qqmapsdk.reverseGeocoder({
                            success: function(res) { //成功后的回调
                              // console.log(res);
                              var curAddress = res.result.address
                              // console.log(curAddress)
                              that.setData({
                                address: curAddress
                              })
                            }
                          })
                        }
                      })
                    }
                  },
                  fail(err) {
                    // 需要点击，有时候没有点击，是无法触发openSetting
                    console.log('open-setting-fail', err);
                  }
                });
              }
            }
          });
        }
      }
    })

    wx.request({
      url: 'https://www.easy-mock.com/mock/5cf8c9637f91df72def196d3/store/store',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: (res) => {
        wx.hideLoading();
        console.log(res);
        that.setData({
          storeList: res.data.nearbyStroes
        })
      }
    })

  },

  onShow() {
    wx.setNavigationBarTitle({
      title: '定位'
    })
  },


})