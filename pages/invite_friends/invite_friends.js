// pages/invite_friends/invite_friends.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideModal: true,
    dis:"none",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 好友人数
    wx.request({
      url: configuration.HOST + '/mini/member/getMemberInviteNum',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        memberId: wx.getStorageSync('userinfo').id,
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
            p_num: res.data.data,
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

    // 已获利润
    wx.request({
      url: configuration.HOST + '/mini/member/getMemberProfit',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        memberId: wx.getStorageSync('userinfo').id,
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
            profit: res.data.data,
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

  wx_code: function(e) {
    this.setData({
      hideModal: false,
    })
  },

  hideModal: function(e) {
    this.setData({
      hideModal: true,
    })
  },

  my_friends:function(e){
    wx.navigateTo({
      url: '/pages/my_friends/my_friends',
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
    // console.log(wx.getStorageSync('userinfo'))
    if (wx.getStorageSync('userinfo') != '' || wx.getStorageSync('userinfo') != undefined || wx.getStorageSync('userinfo') != null) {
      this.setData({
        headimg: wx.getStorageSync('userinfo').headimg,
        inv_code: wx.getStorageSync('userinfo').sid,
      })
    }

    this.setData({
      dis:"none"
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

  },

  /**
   * 分享给好友
   */
  onShareAppMessage: function(res) {
    console.log(res.from);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('res.target: ' + res.target)
    }
    return {
      title: '邀请好友赚利润啦',
      //图片地址
      // imageUrl: 'https://jshm.oss-cn-shanghai.aliyuncs.com/images/2.jpg',
      // 用户点击首先进入的当前页面
      path: '/pages/login/login?sid=123',
      success: function(res) {
        // 转发成功
        console.log("转发成功:");
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:");
      }
    }
  },
  //分享到朋友圈 【生成带有邀请码的小程序码的图，让用户保存到本地分享到朋友圈】
  createNewImg: function() {

    this.setData({
      dis:"block",
    })


    if (wx.getStorageSync('tempFilePath') == '') {
      var that = this;
      var context = wx.createCanvasContext('mycanvas', that);
      var path = '/images/fx.png';

      wx.showLoading({
        title: '请稍后',
      })

      wx.getImageInfo({
        src: 'https://jshm.oss-cn-shanghai.aliyuncs.com/other/gh_2a496cfaee5f_1280.jpg',
        success(res) {
          console.log(res, "rr")
          context.drawImage(path, 0, 0, 375, 375)
          context.drawImage(res.path, 108, 145, 160, 160)
          context.draw(false, function () {
            wx.canvasToTempFilePath({
              canvasId: 'mycanvas',
              success: function (res) {

                var tempFilePath = res.tempFilePath;
                console.log(tempFilePath);
                wx.setStorageSync("tempFilePath", tempFilePath)
                wx.previewImage({
                  current: tempFilePath, // 当前显示图片的http链接
                  urls: [tempFilePath], // 需要预览的图片http链接列表，数组形式
                })
                wx.hideLoading()
              },
              fail: function (res) {
                console.log(res);
                wx.hideLoading()
              }
            });
          })
        }
      })
    }else{
      wx.previewImage({
        current: wx.getStorageSync('tempFilePath'), // 当前显示图片的http链接
        urls: [wx.getStorageSync('tempFilePath')], // 需要预览的图片http链接列表，数组形式
      })
    }




    
    //生成带有邀请码的小程序码
    // wx.request({
    //   url: configuration.HOST + '/mini/member/getFriendsImgUrl',
    //   method: "POST",
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   data: {
    //     memberId: wx.getStorageSync('userinfo').id,
    //   },
    //   success: res => {
    //     if (res.statusCode != 200) {
    //       wx.showToast({
    //         title: '系统错误,请稍后',
    //         icon: 'none',
    //         duration: 1000,
    //       });
    //     }

    //     if (res.data.code == 200) {
    //       //小程序码图片地址  
    //       var imgUrl = res.data.data;


    //       //根据生成带有小程序码的分享图 TODO
    //       wx.previewImage({
    //         current: imgUrl,
    //         urls: [imgUrl]
    //       })



    //     } else {
    //       wx.showToast({
    //         title: '系统错误,请稍后',
    //         icon: 'none',
    //         duration: 1000,
    //       });
    //     }

    //   },
    //   fail: req => {
    //     console.log(req, "qqq")
    //     wx.showToast({
    //       title: '系统错误,请稍后',
    //       icon: 'none',
    //       duration: 1000,
    //     });
    //   }
    // })


  },


})