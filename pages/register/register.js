// pages/register/register.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow1: true,
    inputType: "password",
    newPassword: "",
    phonenum: "",
    disabledtj: true,
    mistake: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // 验证
  phone_number: function(e) {
    this.data.phonenum = e.detail.value
    if (/^1[34578]\d{9}$/.test(this.data.phonenum) && this.data.newPassword != '') {
      this.setData({
        disabledtj: false,
      })
    }
  },
  password1: function(e) {
    // console.log(e.detail.value, "vv")
    this.setData({
      newPassword: e.detail.value,
    })
    this.data.newPassword = e.detail.value
    if (/^1[34578]\d{9}$/.test(this.data.phonenum) && this.data.newPassword != '') {
      this.setData({
        disabledtj: false,
      })
    }
  },
  password2: function(e) {
    this.setData({
      newPassword: e.detail.value,
    })
    this.data.newPassword = e.detail.value
    if (/^1[34578]\d{9}$/.test(this.data.phonenum) && this.data.newPassword != '') {
      this.setData({
        disabledtj: false,
      })
    }
  },

  figure: function(e) {
    this.setData({
      isshow1: false,
    })
  },
  symbol: function(e) {
    this.setData({
      isshow1: true,
    })
  },

  // 表单提交
  gain: function(e) {
    var that = this
    console.log(wx.getStorageSync('openid'), "openid")


    // 登录
    wx.request({
      url: configuration.HOST + '/mini/member/loginByPwd',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        phone: this.data.phonenum,
        password: this.data.newPassword,
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
            title: '登录成功',
            icon: 'none',
            duration: 1000,
          });
          wx.setStorageSync("userinfo", res.data.data)
          wx.setStorageSync("openid", res.data.data.miniopenid)
          wx.navigateBack({
            delta: 1
          })
        } else if (res.data.code == 400) {
          this.setData({
            mistake: true,
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

  },

  // 点击输入框，错误信息消失
  bindfocus: function(e) {
    this.setData({
      mistake: false,
    })
  },

  // 短信登录
  noteclick: function(e) {
    wx.redirectTo({
      url: '/pages/TextLogin/TextLogin?note=' + true,
    })
  },

  // 忘记密码
  forgetclick: function(e) {
    wx.redirectTo({
      url: '/pages/TextLogin/TextLogin?note=' + false,
    })
  },

  // 注册
  loginred: function(e) {
    wx.redirectTo({
      url: '/pages/login/login',
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