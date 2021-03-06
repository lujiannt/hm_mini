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
    console.log(options)
    if (options.pitch_on){
      this.setData({
        pitch_on: options.pitch_on,
      })
    }

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

  // 取消订单
  cancellation:function(e){
    this.setData({
      hideModal:false,
      paytogether: e.currentTarget.dataset.paytogether,
    })
    console.log(e.currentTarget.dataset.paytogether,"ccc")
  },

  load:function (e) {
    console.log(typeof e.detail);
    if(e.detail == true){

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
      
    }
  },

  // 查看物流
  examine:function(e){
    console.log(e,"ee")
    var orderlist = JSON.stringify(e.currentTarget.dataset.orderlist)

    // 物流信息
    wx.request({
      url: configuration.HOST + '/mini/order/orderShipInfoList',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        number: e.currentTarget.dataset.paytogether,
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
          if(res.data.data != ''){
            wx.navigateTo({
              url: '/pages/logistics/logistics?number=' + e.currentTarget.dataset.paytogether + '&orderlist=' + orderlist,
            })
          }else{
            wx.showToast({
              title: '暂无物流信息~',
              icon: 'none',
              duration: 1000,
            });
          }

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

  // 删除订单
  remove:function(e){

    wx.request({
      url: configuration.HOST + '/mini/order/updateOrderStatus',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        paytogether: e.currentTarget.dataset.paytogether,
        status:-5,
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
          wx.showToast({
            title: '已删除',
            icon: 'none',
            duration: 1000,
          });
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

  // 确认收货
  affirm:function(e){

    wx.request({
      url: configuration.HOST + '/mini/order/updateOrderStatus',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        paytogether: e.currentTarget.dataset.paytogether,
        status: 12,
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
          wx.showToast({
            title: '成功收货',
            icon: 'none',
            duration: 1000,
          });
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

  // 订单详情
  order_details:function(e){
    wx.navigateTo({
      url: '/pages/order_details/order_details?code=' + e.currentTarget.dataset.paytogether + '&status=' + e.currentTarget.dataset.status,
    })
  },

  // 评价
  evaluate:function(e){
    console.log(e,"ee")
    var orderlist = JSON.stringify(e.currentTarget.dataset.orderlist)
    wx.navigateTo({
      url: '/pages/evaluate/evaluate?orderlist=' + orderlist,
    })
  },

  // 再次支付
  again_pay:function(e){
    console.log(e)
    var that = this

    wx.showLoading({
      title: '支付中',
      mask: true,
    })

    wx.login({
      success: function (co) {
        console.log(co, "co")

        // 二次支付获取数据
        wx.request({
          url: configuration.HOST + '/mini/order/wxPayAgain',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            number: e.currentTarget.dataset.paytogether,
            code: co.code,
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

              wx.requestPayment({
                timeStamp: res.data.data.timeStamp, //注意 timeStamp 的格式
                nonceStr: res.data.data.nonceStr,
                package: res.data.data.packageStr,
                signType: res.data.data.signType,
                paySign: res.data.data.paySign, // 支付签名
                success: function (qres) {
                  // 支付成功后的回调函数
                  console.log(qres, "******")
                  wx.hideLoading()
                  // 全部订单
                  if (that.data.pitch_on == 0) {

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

                          that.setData({
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

                  } else if (that.data.pitch_on == 1) {

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

                          that.setData({
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

                  } else if (that.data.pitch_on == 2) {

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

                          that.setData({
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

                  } else if (that.data.pitch_on == 3) {

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

                          that.setData({
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

                  } else if (that.data.pitch_on == 4) {

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

                          that.setData({
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
                fail: function (error) {
                  console.log("支付失败")
                  console.log(error)
                  wx.hideLoading()
                  // 全部订单
                  if (that.data.pitch_on == 0) {

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

                          that.setData({
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

                  } else if (that.data.pitch_on == 1) {

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

                          that.setData({
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

                  } else if (that.data.pitch_on == 2) {

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

                          that.setData({
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

                  } else if (that.data.pitch_on == 3) {

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

                          that.setData({
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

                  } else if (that.data.pitch_on == 4) {

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

                          that.setData({
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

              });


              
            } else {
              wx.showToast({
                title: '系统错误,请稍后',
                icon: 'none',
                duration: 1000,
              });
              wx.hideLoading()
            }

          },
          fail: req => {
            console.log(req, "qqq")
            wx.showToast({
              title: '系统错误,请稍后',
              icon: 'none',
              duration: 1000,
            });
            wx.hideLoading()
          }
        })


      }
    })

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
    console.log("sshhoww")
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