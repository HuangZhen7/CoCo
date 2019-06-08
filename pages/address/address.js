// pages/address/address.js
<<<<<<< HEAD
const app = getApp();
var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
=======
var app = getApp(),
    QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js'),
     qqmapsdk = new QQMapWX({
>>>>>>> 164b07c5bdd3bcfa22ed16eacc7f4b5643b3e900
    key: 'LPUBZ-ZOKR2-GIOUE-CRKF7-A76JJ-ZRFJX' // 必填
});
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
<<<<<<< HEAD
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
 
  
=======
        address: '',
        // 展示列表
        locationList: [],
        // 默认当前坐标附近的列表
        poiList: [],
    },
 
  
 
    bindSearch(e) {
        var that = this;
        var searchVal = e.detail.value;
        qqmapsdk.search({
            keyword: searchVal,
            success: function(res) {
                console.log(res)
                var data = res.data;
                if (data.length > 0) {
                    that.setData({
                        locationList: data
                    })
                } else {
                    wx.showLoading({
                        title: '搜索结果为空',
                        duration: 1000
                    })
                }
            },
            fail: function(res) {
                if (res.status == 120) {
                    wx.showLoading({
                        title: '搜索频率过快',
                        duration: 1000
                    })
                    that.setData({
                        locationList: that.data.poiList
                    })
                }
                that.setData({
                    locationList: that.data.poiList
                })
            }
        });
    },
 
 
    onShow: function() {
        var that = this;
        wx.getLocation({
            type: 'gcj02',
            altitude: 'true',
            success: function(res) {
                console.log(res)
                //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    }, //坐标
                    get_poi: 1, //是否获取坐标对应附近列表
                    poi_options: 'policy=2;radius=3000;page_size=10;page_index=1', //poi 参数
                    success: function(res) {
                        console.log(res)
                        var address = res.result.address;
                        var poiList = res.result.pois;
                        that.setData({
                            address: address,
                            poiList: poiList,
                            locationList: poiList
                        })
 
                    }
                })
            }
        });
    },
 
 
>>>>>>> 164b07c5bdd3bcfa22ed16eacc7f4b5643b3e900
})