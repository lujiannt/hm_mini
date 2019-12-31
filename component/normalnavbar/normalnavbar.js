// component/normalnavbar/normalnavbar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageName: String,
    scrollTop:Number,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    attached: function () {
      this.setData({
        navH: app.globalData.navHeight
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    returns:function(e){
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
