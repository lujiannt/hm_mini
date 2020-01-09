// pages/order_details/order_details.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideModal: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,"oo")

    wx.request({
      url: configuration.HOST + '/mini/order/orderDetailInfo',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        paytogether: options.code,
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

          for (var i = 0; i < res.data.data.orderDetailList.length;i++){
            for (var k = 0; k < res.data.data.orderDetailList[i].gItemValues.split('-').length; k++) {

              res.data.data.orderDetailList[i].title += res.data.data.orderDetailList[i].gItemValues.split('-')[k] + ":" + "\xa0" + res.data.data.orderDetailList[i].itemvalues.split('-')[k] + "\xa0\xa0\xa0"

              res.data.data.orderDetailList[i].title = res.data.data.orderDetailList[i].title.replace(/undefined/g, '')

            }
          }


          this.setData({
            order_details:res.data.data
          })

          console.log(this.data.order_details,"oo")

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


    if (options.status){
      this.setData({
        status: options.status,
        code:options.code,
      })
    }

    //相关推荐
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

  hot_Sale:function(e){
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.dataset.id,
    })
  },

  // 取消订单
  cancellation: function (e) {
    this.setData({
      hideModal: false,
    })
  },

  jump:function(e){
    if (e.detail == true) {
      wx.navigateBack({
        delta: 1
      })
    }
  },

  // 复制
  copy:function(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.code,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
              icon: 'succeed',
              duration: 1500,
            })
          }
        })

      }
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