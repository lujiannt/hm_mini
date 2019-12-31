// pages/details/details.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatordots: true,
    autoplay: true,
    circular: true,
    beforeColor: "#e6e6e6", //指示点颜色
    afterColor: "#de4040", //当前选中的指示点颜色
    isCollect: false,
    hideModal: true,
    buy: false,
    explain: false,

    // animationData: {},

    // 评论数据
    comment: [

      {
        img: "/images/my/head.png",
        name: "昵称2541",
        evaluate: "商品评价商品评价商品评价商品评价商品评价商品评价"
      },
      {
        img: "/images/my/head.png",
        name: "昵称2542",
        evaluate: "商品评价商品评价商品评价商品评价商品评价商品评价"
      },
      {
        img: "/images/my/head.png",
        name: "昵称2543",
        evaluate: "商品评价商品评价商品评价商品评价商品评价商品评价"
      },
      {
        img: "/images/my/head.png",
        name: "昵称2544",
        evaluate: "商品评价商品评价商品评价商品评价商品评价商品评价"
      },
      {
        img: "/images/my/head.png",
        name: "昵称2545",
        evaluate: "商品评价商品评价商品评价商品评价商品评价商品评价"
      },
      {
        img: "/images/my/head.png",
        name: "昵称2546",
        evaluate: "商品评价商品评价商品评价商品评价商品评价商品评价"
      },
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options, "oo")

    if (options.id) {
      this.setData({
        goodsid: options.id,
      })
      this.data.goodsid = options.id
    }

    wx.request({
      url: configuration.HOST + '/mini/goods/queryGoodsById',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        goodsId: this.data.goodsid,
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
          // 商品属性中判断最小金额
          var arr = []
          for (var i = 0; i < res.data.data.details.length; i++) {
            arr.push(res.data.data.details[i].goodPrice)
          }
          // console.log(Math.min.apply(null, arr))
          var p_arr = []
          this.setData({
            details: res.data.data,
            imgUrls: res.data.data.picImages.split(","),
            goods_price: Math.min.apply(null, arr),
            attr_itemImage: res.data.data.details[0].itemImage,
            attr_itemValues: res.data.data.details[0].itemValues.replace(/-/g, "、"),
            property_title: res.data.data.itemValues.replace(/-/g, "、"),
          })
          var p_title = res.data.data.itemValues.split('-')
          var itemIds = res.data.data.itemIds.split('-')

          for (var j = 0; j < p_title.length; j++) {
            var obj = {
              id: itemIds[j],
              value: p_title[j]
            }
            p_arr.push(obj);
          }
          this.setData({
            p_arr: p_arr
          })

          console.log(res.data.data.itemValues.split('-'), "ppp")
          this.data.details_id = res.data.data.id

          //商品中id串
          var pIdStr = this.data.details.itemIds;
          var pids = pIdStr.split('-');
          // console.log('pids length = ' + pids.length);

          var details = this.data.details.details

          var array = new Array(pids.length);

          //第一次 以商品中的父规格id串循环
          for (var i = 0; i < pids.length; i++) {
            var sonArray = new Array();

            //第二次 以商品的detail数组循环
            for (var k = 0; k < details.length; k++) {
              var detail = details[k];
              var ids = detail.itemIds.split('-');
              var vals = detail.itemValues.split('-');
              var obj = {
                pid: pids[i],
                id: ids[i],
                value: vals[i],
                actived:false,
              };

              //TODO 需要判断是否重复
              var flag = true;
              for (var index in sonArray) {
                var thisObj = sonArray[index]
                if (thisObj.id == obj.id) {
                  flag = false;
                }
              }
              if (flag) {
                sonArray.push(obj);
              }
            }

            array[i] = sonArray;
          }

          // this.data.attrArr = array


          this.setData({
            attrArr: array,
          })

          console.log(this.data.attrArr, 'array');




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


    // 查看商品是否收藏
    if (wx.getStorageSync('userinfo') != '' && wx.getStorageSync('userinfo') != undefined && wx.getStorageSync('userinfo') != null) {

      wx.request({
        url: configuration.HOST + '/mini/goods/getGoodsCollect',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          memberId: wx.getStorageSync('userinfo').id,
          goodsId: this.data.goodsid,
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
              isCollect: res.data.data.isCollect,
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
          wx.showToast({
            title: '系统错误,请稍后',
            icon: 'none',
            duration: 1000,
          });
        }
      })

    }






  },

  // 收藏
  collect: function(e) {

    if (wx.getStorageSync('userinfo') != '' && wx.getStorageSync('userinfo') != undefined && wx.getStorageSync('userinfo') != null) {

      wx.request({
        url: configuration.HOST + '/mini/goods/addGoodsCollect',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          memberId: wx.getStorageSync('userinfo').id,
          goodsId: this.data.goodsid,
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
              isCollect: true,
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
          wx.showToast({
            title: '系统错误,请稍后',
            icon: 'none',
            duration: 1000,
          });
        }
      })

    } else {
      console.log(wx.getStorageSync('openid'), "openid")
      if (wx.getStorageSync('openid') != '' && wx.getStorageSync('openid') != undefined && wx.getStorageSync('openid') != null) {

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

              wx.request({
                url: configuration.HOST + '/mini/goods/addGoodsCollect',
                method: "POST",
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  memberId: res.data.data.id,
                  goodsId: this.data.goodsid,
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
                      isCollect: true,
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
        wx.navigateTo({
          url: '/pages/register/register',
        })
      }


    }

  },
  // 取消收藏
  cancel_collect: function(e) {

    if (wx.getStorageSync('userinfo') != '' && wx.getStorageSync('userinfo') != undefined && wx.getStorageSync('userinfo') != null) {

      wx.request({
        url: configuration.HOST + '/mini/goods/removeGoodsCollect',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          memberId: wx.getStorageSync('userinfo').id,
          goodsId: this.data.goodsid,
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
              isCollect: false,
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
          wx.showToast({
            title: '系统错误,请稍后',
            icon: 'none',
            duration: 1000,
          });
        }
      })

    }

  },

  // 说明
  state: function(e) {
    console.log("aaa")
    if (wx.getStorageSync('openid') != '' || wx.getStorageSync('openid') != undefined || wx.getStorageSync('openid') != null) {
      this.setData({
        explain: true,
        hideModal: false,
      })

      console.log(this.data.explain,"xxx")

      wx.request({
        url: configuration.HOST + '/mini/goods/queryGoodsInfo',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          goodsId: this.data.goodsid,
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
              declare: res.data.data,
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


  // 底部导航栏
  jump_home: function(e) {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  jump_shopping: function(e) {
    wx.switchTab({
      url: '/pages/shopping/shopping',
    })
  },

  // 加入购物车
  add_cart: function(e) {

    var bunch;
    for (var i = 0; i < this.data.attrArr.length; i++) {
      bunch += "-" + this.data.attrArr[i][0].id
    }
    bunch = bunch.split('undefined-')

    wx.request({
      url: configuration.HOST + '/mini/goods/getGoodsDetail',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        goodsId: this.data.goodsid,
        itemIds: bunch[1],
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
            attr_header: res.data.data
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

    this.setData({
      hideModal: false,
      buy: true,
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


    console.log(wx.getStorageSync('userinfo'))
    if (wx.getStorageSync('userinfo') == '' || wx.getStorageSync('userinfo') == undefined || wx.getStorageSync('userinfo') == null) {
      this.data.userid = 0
    } else {
      this.data.userid = wx.getStorageSync('userinfo').id

      if (wx.getStorageSync('openid') != '' && wx.getStorageSync('openid') != undefined && wx.getStorageSync('openid') != null) {

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

      }
    }

    //相关推荐
    wx.request({
      url: configuration.HOST + '/mini/order/favGoodsList',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userid: this.data.userid,
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