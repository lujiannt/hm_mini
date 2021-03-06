// component/Shopping_bounced/Shopping_bounced.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideModal: Boolean,
    buy: Boolean,
    explain: Boolean,

    declare: Array,
    attr_header: Object,
    property_title: String,
    p_arr: Array,
    attrArr: Array,

    goodsid:String,
    // animationData: Function,
  },

  /**
   * 组件的初始数据
   */
  data: {
    attr: false,
    goods_num: 1,
    check:true,
    select:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {


    // 隐藏遮罩层
    hideModal: function() {
      if (this.properties.buy == true) {
        this.setData({
          buy: false,
          hideModal: true,
        })
      } else if (this.properties.explain == true) {
        console.log(this.properties.explain)
        this.setData({
          explain: false,
          hideModal: true,
        })
      }

      var attrArr = this.properties.attrArr
      for (var i = 0; i < attrArr.length; i++) {
        for (var j = 0; j < attrArr[i].length; j++) {
          attrArr[i][j].actived = false
        }
      }

      this.setData({
        attrArr: attrArr,
        check:true,
        goods_num:1,
        select:true,
      })
      

    },

    // 点击属性
    click_attr: function(e) {
      // console.log(e.currentTarget.dataset)
      this.data.eid = e.currentTarget.dataset.attr
      var pro_arr = []
      var attrArr = this.properties.attrArr
      for (var i = 0; i < attrArr.length; i++) {
        for (var j = 0; j < attrArr[i].length; j++) {


          if (attrArr[i][j].pid == e.currentTarget.dataset.pid && attrArr[i][j].id == this.data.eid) {

            this.showView(attrArr[i][j].pid, attrArr);

            if (attrArr[i][j].actived == false) {
              attrArr[i][j].actived = true
            } else {
              attrArr[i][j].actived = false
            }
          }


        }
      }
      this.setData({
        attrArr: attrArr
      })
      for (var i = 0; i < this.data.attrArr.length; i++) {
        for (var j = 0; j < this.data.attrArr[i].length; j++) {
          if (this.data.attrArr[i][j].actived == true){
            pro_arr.push(this.data.attrArr[i][j].id)
            this.data.itemIds = pro_arr.join("-")

            console.log(pro_arr.join("-"), "ppp")

            if (pro_arr.length == this.data.attrArr.length){
              this.setData({
                check:false,
              })

              wx.request({
                url: configuration.HOST + '/mini/goods/getGoodsDetail',
                method: "POST",
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  goodsId: this.properties.goodsid,
                  itemIds: this.data.itemIds,
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
                      select:true,
                      attr_header:res.data.data,
                      property_title:res.data.data.itemValues.replace(/-/g, "、"),
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




            }else{
              this.setData({
                check:true,
              })
            }
          }
        }
      }

      

    },
    // 减
    subtract: function() {
      if (this.data.goods_num > 1) {
        this.setData({
          goods_num: this.data.goods_num - 1
        })
      }
    },
    // 加
    add: function(e) {
      this.setData({
        goods_num: this.data.goods_num + 1
      })
    },

    //属性判断
    showView: function(pid, attrArr) {
      for (var i = 0; i < attrArr.length; i++) {
        for (var j = 0; j < attrArr[i].length; j++) {
          if (attrArr[i][j].pid == pid) {
            attrArr[i][j].actived = false
          }
        }
      }
    },

    // 加入购物车
    add_to_car:function(e){

      // 如果登录
      if (wx.getStorageSync('userinfo') != '' && wx.getStorageSync('userinfo') != undefined && wx.getStorageSync('userinfo') != null){

        wx.request({
          url: configuration.HOST + '/mini/order/addShopCard',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            goodid: this.properties.goodsid,
            quality: this.data.goods_num,
            userid: wx.getStorageSync('userinfo').id,
            goodDetailid: this.data.attr_header.id,
            type:1,
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
                title: '成功加入购物车',
                icon: 'success',
                duration: 1000,
              });
              this.hideModal()


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

      }else{

        // 如果没登录有openid
        if (wx.getStorageSync('openid') != '' && wx.getStorageSync('openid') != undefined && wx.getStorageSync('openid') != null) {

          // 直接登录
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

          // 加入购物车
          wx.request({
            url: configuration.HOST + '/mini/order/addShopCard',
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              goodid: this.properties.goodsid,
              quality: this.data.goods_num,
              userid: wx.getStorageSync('userinfo').id,
              goodDetailid: this.data.attr_header.id,
              type: 1,
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
                  title: '成功加入购物车',
                  icon: 'success',
                  duration: 1000,
                });
                this.hideModal()


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

        }else{
          var that = this
          // 如果没有登录并且没有openid
          wx.login({
            success: function (res) {
              console.log(res, "rrr")

              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session',
                method: "GET",
                data: {
                  appid: app.globalData.appid,
                  secret: app.globalData.appSecret,
                  js_code: res.code,
                  grant_type: 'authorization_code',

                },
                success: res => {
                  console.log(res, "rrr")
                  wx.setStorageSync("openid", res.data.openid)
                  console.log(wx.getStorageSync('openid'), "openid")

                  // 获取了openid直接登录
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

                        // 加入购物车
                        wx.request({
                          url: configuration.HOST + '/mini/order/addShopCard',
                          method: "POST",
                          header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                          },
                          data: {
                            goodid: that.properties.goodsid,
                            quality: that.data.goods_num,
                            userid: res.data.data.id,
                            goodDetailid: that.data.attr_header.id,
                            type: 1,
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
                                title: '成功加入购物车',
                                icon: 'success',
                                duration: 1000,
                              });
                              that.hideModal()


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





                },
              })

            }
          })

        }

      }



    },
    // 立即购买
    buy_now:function(e){

      // 如果登录
      if (wx.getStorageSync('userinfo') != '' && wx.getStorageSync('userinfo') != undefined && wx.getStorageSync('userinfo') != null){
        
        // 立即购买的接口
        wx.request({
          url: configuration.HOST + '/mini/order/addShopCard',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            goodid: this.properties.goodsid,
            quality: this.data.goods_num,
            userid: wx.getStorageSync('userinfo').id,
            goodDetailid: this.data.attr_header.id,
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
              wx.navigateTo({
                url: '/pages/purchase/purchase',
              })


            } else if (res.data.code == 400){
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
            console.log(req, "qqq")
            wx.showToast({
              title: '系统错误,请稍后',
              icon: 'none',
              duration: 1000,
            });
          }
        })

      }else{

        // 如果没登录有openid
        if (wx.getStorageSync('openid') != '' && wx.getStorageSync('openid') != undefined && wx.getStorageSync('openid') != null) {

          // 直接登录
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

                // 立即购买的接口
                wx.request({
                  url: configuration.HOST + '/mini/order/addShopCard',
                  method: "POST",
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    goodid: this.properties.goodsid,
                    quality: this.data.goods_num,
                    userid: res.data.data.id,
                    goodDetailid: this.data.attr_header.id,
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
                      wx.navigateTo({
                        url: '/pages/purchase/purchase',
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

        }else{

          var that = this
          // 如果没有登录并且没有openid
          wx.login({
            success: function (res) {
              console.log(res, "rrr")

              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session',
                method: "GET",
                data: {
                  appid: app.globalData.appid,
                  secret: app.globalData.appSecret,
                  js_code: res.code,
                  grant_type: 'authorization_code',

                },
                success: res => {
                  console.log(res, "rrr")
                  wx.setStorageSync("openid", res.data.openid)
                  console.log(wx.getStorageSync('openid'), "openid")

                  // 获取了openid直接登录
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

                        // 立即购买的接口
                        wx.request({
                          url: configuration.HOST + '/mini/order/addShopCard',
                          method: "POST",
                          header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                          },
                          data: {
                            goodid: this.properties.goodsid,
                            quality: this.data.goods_num,
                            userid: res.data.data.id,
                            goodDetailid: this.data.attr_header.id,
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

                              wx.navigateTo({
                                url: '/pages/purchase/purchase',
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





                },
              })

            }
          })


        }

      }

    },
  }
})