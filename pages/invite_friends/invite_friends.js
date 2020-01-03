// pages/invite_friends/invite_friends.js
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
      console.log('res.target: ' +res.target)
    }
    return {
      title: '快来.....啦',
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
  }
})