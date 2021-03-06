// pages/logistics/logistics.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    overflow:"hidden",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)

    if (options.number){
      this.setData({
        serial:options.number,
        orderlist: JSON.parse(options.orderlist)
      })
    }

    console.log(JSON.parse(options.orderlist),"oooo")

    // 物流信息
    wx.request({
      url: configuration.HOST + '/mini/order/orderShipInfoList',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        number: options.number,
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

          var log1 = res.data.data.itemlist.shift()
          var log2 = res.data.data.itemlist.shift()

          var bot1 = res.data.data.itemlist.pop()
          var bot2 = res.data.data.itemlist.pop()
          var bot3 = res.data.data.itemlist.pop()

          console.log(bot1)

          this.setData({
            logistics:res.data.data,
            log1: log1,
            log2: log2,
            bot1: bot1,
            bot2: bot2,
            bot3: bot3,
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

    // 猜你喜欢
    wx.request({
      url: configuration.HOST + '/mini/order/favGoodsList',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userid: wx.getStorageSync('userinfo').id,
        limit: 6,
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
            recommend: res.data.data
          })
        } else {
          // wx.showToast({
          //   title: '系统错误,请稍后',
          //   icon: 'none',
          //   duration: 1000,
          // });
        }

      },
      fail: req => {
        wx.showToast({
          title: '系统错误,请稍后',
          icon: 'none',
          duration: 1000,
        });
      }
    })

  },

  check:function(e){
    this.setData({
      overflow:"visible"
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