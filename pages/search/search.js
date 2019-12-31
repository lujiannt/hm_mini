// pages/search/search.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的值
    inputValue:'',
    getSearch:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 热搜
    wx.request({
      url: configuration.HOST + '/mini/goods/listHotSearch',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        num: 8
      },
      success: res => {
        console.log(res, "rrr")

        if (res.statusCode != 200) {
          wx.showToast({
            title: '系统错误,请稍后',
            icon: 'none',
            duration: 1000,
          });
        }

        if (res.data.code == 200) {
          this.setData({
            hot_search: res.data.data
          })
        } else {
          wx.showToast({
            title: '系统错误,请稍后',
            icon: 'none',
            duration: 1000,
          });
        }

      },
      fail: req => {
        console.log(req, "qqq")
        wx.showToast({
          title: '系统错误,请稍后',
          icon: 'none',
          duration: 1000,
        });
      }
    })

  },

  importval:function(e){
    this.setData({
      inputValue: e.detail.value
    })
  },

  importchange:function(e){
    console.log(e.detail.value,"eeee")
    var formData = e.detail.value;
    if (this.data.inputValue != '' && this.data.inputValue != null) {
      //调用API从本地缓存中获取数据
      var searchData = wx.getStorageSync('searchData') || []
      var a = false
      for (var x in searchData) {
        if (this.data.inputValue == searchData[x]) {
          a = true
        }
      }
      if (!a && searchData.length <= 8){
        searchData.push(this.data.inputValue)
      }
      wx.setStorageSync('searchData', searchData)
      // console.log(searchData,"sssssss")
    }
  },

  // 删除最近搜索
  clearSearchStorage: function () {
    wx.showModal({
      title: '是否删除搜索历史',
      success(res) {
        if (res.confirm) {
          wx.setStorageSync('searchData', [])
          wx.redirectTo({
            url: '../search/search'
          })
          // this.onLoad()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  // 输入搜索
  search_val:function(e){
    console.log(this.data.inputValue,"iiii")
    wx.navigateTo({
      url: '/pages/productList/productList?inputValue=' + this.data.inputValue,
    })
  },

  // 点击搜索
  click_val:function(e){
    wx.navigateTo({
      url: '/pages/productList/productList?inputValue=' + e.currentTarget.dataset.name,
    })
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
    var getSearch = wx.getStorageSync('searchData');
    this.setData({
      getSearch: getSearch,
      inputValue: ''
    })
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