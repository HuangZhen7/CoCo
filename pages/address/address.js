// pages/address/address.js
var app = getApp(),
    QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js'),
     qqmapsdk = new QQMapWX({
    key: 'LPUBZ-ZOKR2-GIOUE-CRKF7-A76JJ-ZRFJX' // 必填
});
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
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
 
 
})