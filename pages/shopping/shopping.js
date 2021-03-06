// pages/shopping/shopping.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regulate: false,
    but_set: true,
    check_all: "/images/shopping/k_choice.png",
    c_arr: [],
    goodsid: [],
    goods_qua: [],
    no_add: true,
    total_prices: 0,
    tot_arr: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("aa")

    this.setData({
      check_all: "/images/shopping/k_choice.png",
      total_prices: 0,
      tot_arr: [],
      goodsid:[],
      goods_qua:[],
      c_arr: [],
      but_set: true,
    })

    // 获取购物车商品
    wx.request({
      url: configuration.HOST + '/mini/order/shopcartList',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userid: wx.getStorageSync('userinfo').id,
        pageSize: 100,
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
          var orderCartlist = res.data.data.rows

          for (var i = 0; i < orderCartlist.length; i++) {
            orderCartlist[i].select = false

            var title = '';

            for (var m = 0; m < orderCartlist[i].g_itemvalues.split('-').length; m++) {
              title += orderCartlist[i].g_itemvalues.split('-')[m] + ":" + "\xa0" + orderCartlist[i].itemvalues.split('-')[m] + "\xa0\xa0\xa0";
            }
            orderCartlist[i].pro_title = title
            orderCartlist[i].no_add = true

          }

          this.setData({
            rows: orderCartlist,
          })

          console.log(this.data.rows, "rrr")

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


  // 去登陆
  to_login: function(e) {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  // 选择商品
  choose: function(e) {
    console.log(e, "ee")

    for (var i = 0; i < this.data.rows.length; i++) {
      if (e.currentTarget.dataset.id == this.data.rows[i].id) {
        if (this.data.rows[i].select == false) {
          this.data.rows[i].select = true
          this.data.c_arr.push(this.data.rows[i].id)

          this.data.goodsid.push(e.currentTarget.dataset.id)
          this.data.goods_qua.push(e.currentTarget.dataset.quality)

          this.data.rows[i].no_add = false

          this.data.tot_arr.push((this.data.rows[i].goodprice / 100) * this.data.rows[i].quality)

        } else {
          this.data.rows[i].select = false
          this.data.c_arr.pop(this.data.rows[i].id)

          this.data.goodsid.pop(e.currentTarget.dataset.id)
          this.data.goods_qua.pop(e.currentTarget.dataset.quality)

          this.data.tot_arr.pop((this.data.rows[i].goodprice / 100) * this.data.rows[i].quality)

          this.data.rows[i].no_add = true
        }
      }

      if (this.data.c_arr.length >= 1) {
        this.setData({
          but_set: false
        })
      } else {
        this.setData({
          but_set: true
        })
      }
    }


    var s = 0;
    for (var i = this.data.tot_arr.length - 1; i >= 0; i--) {
      s += this.data.tot_arr[i];
    }

    this.setData({
      rows: this.data.rows,
      total_prices: s
    })



  },

  // 管理
  finish: function(e) {
    if (this.data.regulate == true) {
      this.setData({
        regulate: false,
      })
    } else {
      this.setData({
        regulate: true,
      })
    }

  },

  // 加减
  add: function(e) {

    for (var i = 0; i < this.data.rows.length; i++) {
      if (e.currentTarget.dataset.id == this.data.rows[i].id) {
        if (this.data.rows[i].no_add == true) {
          this.data.rows[i].quality = this.data.rows[i].quality + 1
          console.log(this.data.rows[i].quality)
        }

      }
    }
    this.setData({
      rows: this.data.rows,
    })
    this.data.rows = this.data.rows


  },

  subtract: function(e) {

    for (var i = 0; i < this.data.rows.length; i++) {
      if (e.currentTarget.dataset.id == this.data.rows[i].id && this.data.rows[i].quality > 1) {
        if (this.data.rows[i].no_add == true) {
          this.data.rows[i].quality = this.data.rows[i].quality - 1
          console.log(this.data.rows[i].quality)
        }
      }
    }
    this.setData({
      rows: this.data.rows,
    })
    this.data.rows = this.data.rows
  },

  // 全选
  c_all: function(e) {
    if (this.data.rows.length != 0) {
      if (this.data.check_all == '/images/shopping/k_choice.png') {
        this.setData({
          check_all: '/images/shopping/choice.png'
        })



        for (var i = 0; i < this.data.rows.length; i++) {
          this.data.rows[i].select = true
          if (this.data.goodsid.indexOf(this.data.rows[i].id) == -1) {
            this.data.goodsid.push(this.data.rows[i].id)
          }
          if (this.data.goodsid.indexOf(this.data.rows[i].quality) == -1) {
            this.data.goods_qua.push(this.data.rows[i].quality)
          }

          this.data.tot_arr.push((this.data.rows[i].goodprice / 100) * this.data.rows[i].quality)

        }

        var s = 0;
        for (var i = this.data.tot_arr.length - 1; i >= 0; i--) {
          s += this.data.tot_arr[i];
        }


        this.setData({
          rows: this.data.rows,
          but_set: false,
          total_prices: s
        })

      } else {
        
        this.setData({
          check_all: '/images/shopping/k_choice.png'
        })
        for (var i = 0; i < this.data.rows.length; i++) {
          this.data.rows[i].select = false
          this.data.goodsid.push(this.data.rows[i].id)
          this.data.goods_qua.push(this.data.rows[i].quality)
          this.data.tot_arr.pop((this.data.rows[i].goodprice / 100) * this.data.rows[i].quality)
        }

        var s = 0;
        for (var i = this.data.tot_arr.length - 1; i >= 0; i--) {
          s += this.data.tot_arr[i];
        }

        this.setData({
          rows: this.data.rows,
          but_set: true,
          total_prices: s,
        })
      }
    }

  },

  // 猜你喜欢
  hot_Sale: function(e) {
    console.log(e, "ee")
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.dataset.id,
    })
  },

  // 结算
  clearing: function(e) {

    wx.request({
      url: configuration.HOST + '/mini/order/sureToPay',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        orderCartids: this.data.goodsid.join(","),
        qualitys: this.data.goods_qua.join(","),
        userid: wx.getStorageSync('userinfo').id,
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
          wx.navigateTo({
            url: '/pages/purchase/purchase',
          })
        } else if (res.data.code == 400) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
          });
        } else {
          wx.showToast({
            title: '系统错误,请稍后',
            icon: 'none',
            duration: 1000,
          });
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


  // 删除商品
  remove: function(e) {

    wx.request({
      url: configuration.HOST + '/mini/order/batchDeletePreOrder',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        orderCartids: this.data.goodsid.join(","),
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
            title: '删除成功',
            icon: 'none',
            duration: 1000,
          });
          this.setData({
            check_all: '/images/shopping/choice.png'
          })
          this.onLoad()
        } else if (res.data.code == 400) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
          });
        } else {
          wx.showToast({
            title: '系统错误,请稍后',
            icon: 'none',
            duration: 1000,
          });
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad()
    if (wx.getStorageSync('userinfo') == '' || wx.getStorageSync('userinfo') == undefined || wx.getStorageSync('userinfo') == null) {
      this.setData({
        no_login: true
      })

      if (wx.getStorageSync('openid') != '' && wx.getStorageSync('openid') != undefined && wx.getStorageSync('openid') != null) {
        // 验证是否登录
        wx.request({
          url: configuration.HOST + '/mini/member/loginByWx',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            openId: wx.getStorageSync('openid')
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
              wx.setStorageSync("userinfo", res.data.data)
              this.setData({
                no_login: false,
              })

              // 获取购物车商品
              wx.request({
                url: configuration.HOST + '/mini/order/shopcartList',
                method: "POST",
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  userid: res.data.data.id
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
                      rows: res.data.data.rows,
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
      } else {
        this.setData({
          no_login: true
        })
      }


    } else {
      this.setData({
        no_login: false,
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