// pages/my_order/my_order.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pitch_on: 0,
    hideModal: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 全部订单
    if (this.data.pitch_on == 0) {

      wx.request({
        url: configuration.HOST + '/mini/order/userOrderList',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          memberId: wx.getStorageSync('userinfo').id,
          type: 2,
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

            // 商品属性样式
            for (var i = 0; i < res.data.data.length; i++) {
              for (var j = 0; j < res.data.data[i].orderDetailList.length; j++) {
                for (var k = 0; k < res.data.data[i].orderDetailList[j].gItemValues.split('-').length; k++) {

                  res.data.data[i].orderDetailList[j].title += res.data.data[i].orderDetailList[j].gItemValues.split('-')[k] + ":" + "\xa0" + res.data.data[i].orderDetailList[j].itemvalues.split('-')[k] + "\xa0\xa0\xa0"
                  res.data.data[i].orderDetailList[j].title = res.data.data[i].orderDetailList[j].title.replace(/undefined/g, '')

                }

              }
            }

            this.setData({
              all_orders: res.data.data,
              pitch_on: 0,
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

    } else if (this.data.pitch_on == 1) {

      wx.request({
        url: configuration.HOST + '/mini/order/userOrderList',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          memberId: wx.getStorageSync('userinfo').id,
          type: 0,
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

            // 商品属性样式
            for (var i = 0; i < res.data.data.length; i++) {
              for (var j = 0; j < res.data.data[i].orderDetailList.length; j++) {
                for (var k = 0; k < res.data.data[i].orderDetailList[j].gItemValues.split('-').length; k++) {

                  res.data.data[i].orderDetailList[j].title += res.data.data[i].orderDetailList[j].gItemValues.split('-')[k] + ":" + "\xa0" + res.data.data[i].orderDetailList[j].itemvalues.split('-')[k] + "\xa0\xa0\xa0"
                  res.data.data[i].orderDetailList[j].title = res.data.data[i].orderDetailList[j].title.replace(/undefined/g, '')

                }

              }
            }

            this.setData({
              all_orders: res.data.data,
              pitch_on: 1,
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

    } else if (this.data.pitch_on == 2) {

      wx.request({
        url: configuration.HOST + '/mini/order/userOrderList',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          memberId: wx.getStorageSync('userinfo').id,
          type: 4,
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

            // 商品属性样式
            for (var i = 0; i < res.data.data.length; i++) {
              for (var j = 0; j < res.data.data[i].orderDetailList.length; j++) {
                for (var k = 0; k < res.data.data[i].orderDetailList[j].gItemValues.split('-').length; k++) {

                  res.data.data[i].orderDetailList[j].title += res.data.data[i].orderDetailList[j].gItemValues.split('-')[k] + ":" + "\xa0" + res.data.data[i].orderDetailList[j].itemvalues.split('-')[k] + "\xa0\xa0\xa0"
                  res.data.data[i].orderDetailList[j].title = res.data.data[i].orderDetailList[j].title.replace(/undefined/g, '')

                }

              }
            }

            this.setData({
              all_orders: res.data.data,
              pitch_on: 2,
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

    } else if (this.data.pitch_on == 3) {

      wx.request({
        url: configuration.HOST + '/mini/order/userOrderList',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          memberId: wx.getStorageSync('userinfo').id,
          type: 10,
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

            // 商品属性样式
            for (var i = 0; i < res.data.data.length; i++) {
              for (var j = 0; j < res.data.data[i].orderDetailList.length; j++) {
                for (var k = 0; k < res.data.data[i].orderDetailList[j].gItemValues.split('-').length; k++) {

                  res.data.data[i].orderDetailList[j].title += res.data.data[i].orderDetailList[j].gItemValues.split('-')[k] + ":" + "\xa0" + res.data.data[i].orderDetailList[j].itemvalues.split('-')[k] + "\xa0\xa0\xa0"
                  res.data.data[i].orderDetailList[j].title = res.data.data[i].orderDetailList[j].title.replace(/undefined/g, '')

                }

              }
            }

            this.setData({
              all_orders: res.data.data,
              pitch_on: 3,
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

    } else if (this.data.pitch_on == 4) {

      wx.request({
        url: configuration.HOST + '/mini/order/userOrderList',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          memberId: wx.getStorageSync('userinfo').id,
          type: 12,
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

            // 商品属性样式
            for (var i = 0; i < res.data.data.length; i++) {
              for (var j = 0; j < res.data.data[i].orderDetailList.length; j++) {
                for (var k = 0; k < res.data.data[i].orderDetailList[j].gItemValues.split('-').length; k++) {

                  res.data.data[i].orderDetailList[j].title += res.data.data[i].orderDetailList[j].gItemValues.split('-')[k] + ":" + "\xa0" + res.data.data[i].orderDetailList[j].itemvalues.split('-')[k] + "\xa0\xa0\xa0"
                  res.data.data[i].orderDetailList[j].title = res.data.data[i].orderDetailList[j].title.replace(/undefined/g, '')

                }

              }
            }

            this.setData({
              all_orders: res.data.data,
              pitch_on: 4,
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

    }

  },

  // 选择功能
  select:function(e){
    if (e.currentTarget.dataset.id == 0){

      wx.request({
        url: configuration.HOST + '/mini/order/userOrderList',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          memberId: wx.getStorageSync('userinfo').id,
          type: 2,
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

            // 商品属性样式
            for (var i = 0; i < res.data.data.length; i++) {
              for (var j = 0; j < res.data.data[i].orderDetailList.length; j++) {
                for (var k = 0; k < res.data.data[i].orderDetailList[j].gItemValues.split('-').length; k++) {

                  res.data.data[i].orderDetailList[j].title += res.data.data[i].orderDetailList[j].gItemValues.split('-')[k] + ":" + "\xa0" + res.data.data[i].orderDetailList[j].itemvalues.split('-')[k] + "\xa0\xa0\xa0"
                  res.data.data[i].orderDetailList[j].title = res.data.data[i].orderDetailList[j].title.replace(/undefined/g, '')

                }

              }
            }

            this.setData({
              all_orders: res.data.data,
              pitch_on: 0,
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

    } else if (e.currentTarget.dataset.id == 1){

      wx.request({
        url: configuration.HOST + '/mini/order/userOrderList',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          memberId: wx.getStorageSync('userinfo').id,
          type: 0,
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

            // 商品属性样式
            for (var i = 0; i < res.data.data.length; i++) {
              for (var j = 0; j < res.data.data[i].orderDetailList.length; j++) {
                for (var k = 0; k < res.data.data[i].orderDetailList[j].gItemValues.split('-').length; k++) {

                  res.data.data[i].orderDetailList[j].title += res.data.data[i].orderDetailList[j].gItemValues.split('-')[k] + ":" + "\xa0" + res.data.data[i].orderDetailList[j].itemvalues.split('-')[k] + "\xa0\xa0\xa0"
                  res.data.data[i].orderDetailList[j].title = res.data.data[i].orderDetailList[j].title.replace(/undefined/g, '')

                }

              }
            }

            this.setData({
              all_orders: res.data.data,
              pitch_on: 1,
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

    } else if (e.currentTarget.dataset.id == 2) {

      wx.request({
        url: configuration.HOST + '/mini/order/userOrderList',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          memberId: wx.getStorageSync('userinfo').id,
          type: 4,
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

            // 商品属性样式
            for (var i = 0; i < res.data.data.length; i++) {
              for (var j = 0; j < res.data.data[i].orderDetailList.length; j++) {
                for (var k = 0; k < res.data.data[i].orderDetailList[j].gItemValues.split('-').length; k++) {

                  res.data.data[i].orderDetailList[j].title += res.data.data[i].orderDetailList[j].gItemValues.split('-')[k] + ":" + "\xa0" + res.data.data[i].orderDetailList[j].itemvalues.split('-')[k] + "\xa0\xa0\xa0"
                  res.data.data[i].orderDetailList[j].title = res.data.data[i].orderDetailList[j].title.replace(/undefined/g, '')

                }

              }
            }

            this.setData({
              all_orders: res.data.data,
              pitch_on: 2,
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

    } else if (e.currentTarget.dataset.id == 3) {

      wx.request({
        url: configuration.HOST + '/mini/order/userOrderList',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          memberId: wx.getStorageSync('userinfo').id,
          type: 10,
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

            // 商品属性样式
            for (var i = 0; i < res.data.data.length; i++) {
              for (var j = 0; j < res.data.data[i].orderDetailList.length; j++) {
                for (var k = 0; k < res.data.data[i].orderDetailList[j].gItemValues.split('-').length; k++) {

                  res.data.data[i].orderDetailList[j].title += res.data.data[i].orderDetailList[j].gItemValues.split('-')[k] + ":" + "\xa0" + res.data.data[i].orderDetailList[j].itemvalues.split('-')[k] + "\xa0\xa0\xa0"
                  res.data.data[i].orderDetailList[j].title = res.data.data[i].orderDetailList[j].title.replace(/undefined/g, '')

                }

              }
            }

            this.setData({
              all_orders: res.data.data,
              pitch_on: 3,
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

    } else if (e.currentTarget.dataset.id == 4) {

      wx.request({
        url: configuration.HOST + '/mini/order/userOrderList',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          memberId: wx.getStorageSync('userinfo').id,
          type: 12,
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

            // 商品属性样式
            for (var i = 0; i < res.data.data.length; i++) {
              for (var j = 0; j < res.data.data[i].orderDetailList.length; j++) {
                for (var k = 0; k < res.data.data[i].orderDetailList[j].gItemValues.split('-').length; k++) {

                  res.data.data[i].orderDetailList[j].title += res.data.data[i].orderDetailList[j].gItemValues.split('-')[k] + ":" + "\xa0" + res.data.data[i].orderDetailList[j].itemvalues.split('-')[k] + "\xa0\xa0\xa0"
                  res.data.data[i].orderDetailList[j].title = res.data.data[i].orderDetailList[j].title.replace(/undefined/g, '')

                }

              }
            }

            this.setData({
              all_orders: res.data.data,
              pitch_on: 4,
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

    }
  },

  cancellation:function(e){
    this.setData({
      hideModal:false,
    })
    console.log(e.currentTarget.dataset.payTogether,"ccc")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})