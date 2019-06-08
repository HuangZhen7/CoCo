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
    } else if (index == 1 && this.data.newStoreList == null){
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
  nearby_search(){
    let that = this;
    wx.chooseLocation({
      success: function(res) {
      console.log(res);
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
   console.log(this.data.newStoreList.length)
 },
 onShow(){
   
 },

onReady() {
  var that = this;
  wx.showLoading({
    title:'正在加载…'
  })
  wx.getLocation({
      type: 'wgs84',
      success (res) {
        qqmapsdk.reverseGeocoder({
          success: function(res) {//成功后的回调
            // console.log(res);
            var curAddress = res.result.address
            // console.log(curAddress)
            that.setData({
              address:curAddress
            })
          },
          fail: function(error) {
            console.error(error);
          },
          complete: function(res) {
            // console.log(res);
            
          }
        })
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

onShow(){
  wx.setNavigationBarTitle({
      title: '定位'
    })
},
 
  
})