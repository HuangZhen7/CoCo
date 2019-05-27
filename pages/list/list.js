// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    curIndex: 0,
    toView: 'type0',
    conHeight: 0,
    lastActive: 0,
    showModal: false,
    currentIndex: 0,
    currentType: 0,
    moreIndex: 0,
    sugarIndex: 0,
    temIndex: 0,
    more: ['常规', '珍珠', '西米露', '椰果'],
    tem: ['常规冰', '多冰', '少冰', '去冰', '温', '热'],
    sugar: ['常规糖', '无糖', '微糖', '半糖', '多糖']
  },
  selectMenu(e) {
    console.log(e);
    this.setData({
      toView: 'type' + e.currentTarget.dataset.index,
      curIndex: e.currentTarget.dataset.index
    })
    console.log(this.data.toView);
  },
  scroll(e) {
    let that = this;
    console.log(e);
    const scrollTop = e.detail.scrollTop;
    const scrollArr = this.data.heightArr;
    if (scrollTop >= scrollArr[scrollArr.length - 1] - (that.data.conHeight / 2)) {
      return;
    } else {
      for (let i = 0;i < scrollArr.length; i++) {
        if(scrollTop >= 0 && scrollTop < scrollArr[0]) {
          if(0 != that.data.lastActive) {
            that.setData({
              curIndex: 0,
              lastActive: 0
            })
          }
        } else if (scrollTop >= scrollArr[i - 1] - 100 && scrollTop < scrollArr[i]) {
          if(i != that.data.lastActive) {
            console.log(i);
            that.setData({
              curIndex: i,
              lastActive: i
            })
          }
        }
      }
    }
  },
  selectInfo (e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;
    this.setData({
      showModal: !this.data.showModal,
      currentIndex: index,
      currentType: type,
      moreIndex: 0,
      temIndex: 0,
      sugarIndex: 0
    });
  },
  choose(e) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;
    if(type === 0) {
      this.setData({
        moreIndex: index
      })
    }
    if(type === 1) {
      this.setData({
        temIndex: index
      })
    }
    if(type === 2) {
      this.setData({
        sugarIndex: index
      })
    }
  },
  addToCart() {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res);
        //最后获得转化后得rpx单位的窗口高度
        let windowHeight = (res.windowHeight * (750 / res.windowWidth));
        that.setData({
          conHeight: windowHeight
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.showLoading({
      title:'正在努力加载中...'
    })
    wx.request({
      url: 'https://www.easy-mock.com/mock/5ce7fc06b3ab8d779e20e893/CoCo/CoCo',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: (res) => {
        wx.hideLoading();
        console.log(res);
        that.setData({
          listData: res.data,
        })
        let heightArr = [];
        let h = 0;
        // 创建节点选择器
        const query = wx.createSelectorQuery();
        query.selectAll('.content-box').boundingClientRect()
        query.exec(function (res) {
          // console.log(res);
          //res就是 所有标签为contlist的元素的信息 的数组
          res[0].forEach((item) => {
            h += item.height;
            heightArr.push(h);
          })
          that.setData({
            heightArr
          })
          console.log(that.data.heightArr)
        })
        //
      }
    })
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