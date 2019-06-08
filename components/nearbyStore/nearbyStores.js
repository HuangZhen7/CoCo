// components/nearbyStores.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    stores: Array
  },
  /**
   * 组件的初始数据
   */
  data: {
    radio: '1',
    flag: false,
    styleHidden: false,
    curIndex: 0,
    show: false,
    currentDate: JSON.stringify(`${new Date().getHours()} +':'+${ new Date().getMinutes()}`),
    minHour: 9,
    maxHour: 22
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onConfirm(event) {
      console.log(event)
      let time = event.detail
      wx.setStorageSync('time', time)
      this.setData({
        currentDate: time,
        show: false
      });
    },
    onCancel(event) {
      this.setData({ show: false });
    },
    onClose() {
      this.setData({ show: false });
    },
    onChange(event) {
      // console.log(event)
      this.setData({
        radio: event.detail,
      });
      if(this.data.radio == 2) {
        this.setData({
          show: true
        })
      }
    },
    collect(e) {
      let that = this;
      // console.log(e);
      let id = e.target.id
      // console.log(that.data.curIndex)
      let list = {
        "storeName": that.data.stores[id].storeName,
        "distance": that.data.stores[id].distance,
        "detail": that.data.stores[id].detail,
        "flag": that.data.flag
      }
      let stores = []
      if (that.data.flag == true) {
        // stores.unshift(that.data.stores[id]);
        stores.unshift(list)
        wx.setStorageSync('newStores', stores)
      } else {
        // stores.shift(list)
        wx.clearStorageSync('newStores')
        // wx.setStorageSync('newStores', stores)
      }
      console.log(stores)
      if(that.data.curIndex == id) {
        that.setData({
          // curIndex: id,
          flag: !that.data.flag
        })
        wx.setStorageSync('newStores', stores)
      } else {
        that.setData({
          flag: false
        })
        wx.clearStorageSync('newStores')
      }
    },
    goList(e) {
      console.log(e)
      let id = e.target.id
      console.log(this.data.stores[id].detail)
      wx.setStorageSync('storeAdd',this.data.stores[id].detail)
      wx.showToast({
        title: '加载中…',
        icon: 'loading',
        duration: 500
      })
      wx.navigateTo({
        url: '/pages/list/list'
      })
    },  
    selected(res) {
      // console.log(res);
      let index = res.currentTarget.dataset.index;
      if (this.data.curIndex != index) {
        this.setData({
          curIndex: index,
          // styleHidden: false
        })
      }
    },
    storeDetail(){
      wx.showToast({
        title: '加载中…',
        icon: 'loading',
        duration: 500
      })
      wx.navigateTo({
        url: '/pages/storeDetail/storeDetail'
      })
    }
  }
})
