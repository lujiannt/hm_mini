//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 46;
        // if (res.model == "iPhone X") {
        //   this.globalData.dheight = "68rpx"
        //   this.globalData.xheight = 68
        //   this.globalData.xtop = "-20rpx"
        // } else {
        //   this.globalData.dheight = "0rpx"
        //   this.globalData.xheight = 0
        //   this.globalData.xtop = "15rpx"
        // }
      }, fail(err) {
        console.log(err);
      }
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    //鸿盟
    appid: 'wx9f0f7b9feb8225f3',
    appSecret: '21f9ab988f758f2541d3a35ef822171d',
    
    //个人测试
    // appid: 'wx97f59b4a454fbe98',
    // appSecret: 'a6335e23b158d73fb358c62f7c5b930b',
    
    userInfo: null,
    avatarUrl:null,
    gender: null,
    nickName: null,
    openid:null,
  },
  onLaunch: function () {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;//导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
  }
})