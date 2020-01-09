// pages/my/my.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {





  },

  // 去登陆
  to_login: function(e) {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  // 订单页
  my_order:function(e){

    wx.navigateTo({
      url: '/pages/my_order/my_order',
    })

  },


  await:function(e){
    console.log(e)
    if (e.currentTarget.dataset.name == "待付款"){
      wx.navigateTo({
        url: '/pages/my_order/my_order?pitch_on=' + 1,
      })
    } else if (e.currentTarget.dataset.name == "待发货"){
      wx.navigateTo({
        url: '/pages/my_order/my_order?pitch_on=' + 2,
      })
    } else if (e.currentTarget.dataset.name == "待收货") {
      wx.navigateTo({
        url: '/pages/my_order/my_order?pitch_on=' + 3,
      })
    } else if (e.currentTarget.dataset.name == "待评价") {
      wx.navigateTo({
        url: '/pages/my_order/my_order?pitch_on=' + 4,
      })
    } else if (e.currentTarget.dataset.name == "售后") {
      // wx.navigateTo({
      //   url: '/pages/my_order/my_order?',
      // })
    }
  },

  click_collect:function(e){
    wx.navigateTo({
      url: '/pages/click_collect/click_collect',
    })
  },

  about_us:function(e){
    wx.navigateTo({
      url: '/pages/About_Us/About_Us',
    })
  },

  my_comments:function(e){
    wx.navigateTo({
      url: '/pages/my_comments/my_comments',
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
    var whether_login = wx.getStorageSync('userinfo');
   
    if (whether_login != null && whether_login != '') {
      if (whether_login.sid == null) {
        whether_login.sid = '暂无'
      }
      
    }
    this.setData({
      whether_login: whether_login
    })

    // console.log(wx.getStorageSync('userinfo'), "uuuuu")
    // console.log(wx.getStorageSync('openid'), "openid")

    if (this.data.whether_login == '' || this.data.whether_login == undefined || this.data.whether_login == null) {
      console.log(wx.getStorageSync('openid'), "openid")
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
              this.setData({
                whether_login: res.data.data
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

    // 待收货数字
    wx.request({
      url: configuration.HOST + '/mini/order/memberOrderCount',
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
            state:res.data.data
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

    // 最新物流
    wx.request({
      url: configuration.HOST + '/mini/order/nearlySendOrder',
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
            logistics:res.data.data[0]
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

    // 收藏数量
    wx.request({
      url: configuration.HOST + '/mini/goods/getGoodsCollectNum',
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
            collect:res.data.data
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

  // 个人资料
  personal_data:function(e){
    wx.navigateTo({
      url: '/pages/personal_data/personal_data',
    })
  },

  // 地址管理
  add_address:function(e){
    wx.navigateTo({
      url: '/pages/add_address/add_address',
    })
  },

  // 邀请好友
  invite_friends:function(e){
    wx.navigateTo({
      url: '/pages/invite_friends/invite_friends',
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