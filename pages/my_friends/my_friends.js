// pages/my_friends/my_friends.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    allow: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },

  firends:function(e){
    wx.navigateTo({
      url: '/pages/friends_details/friends_details?item=' + JSON.stringify(e.currentTarget.dataset.item),
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

    this.data.page = this.data.page + 1

    // 我的好友列表
    wx.request({
      url: configuration.HOST + '/mini/member/listMemberInvite',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        memberId: wx.getStorageSync('userinfo').id,
        pageNo: this.data.page,
        pageSize: 10,
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



          for (var i = 0; i < res.data.data.rows.length; i++) {
            res.data.data.rows[i].time = res.data.data.rows[i].createTime.substring(0, 10)
          }

          this.setData({
            rows: res.data.data.rows
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

    var list = this.data.rows
    if (list.length == 0 || list.length % 10 != 0) {
      return
    }

    if (this.data.allow == true) {
      this.setData({
        page: this.data.page + 1
      })
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: configuration.HOST + '/mini/member/listMemberInvite',
        method: "POST",
        data: {
          memberId: wx.getStorageSync('userinfo').id,
          pageNo: this.data.page,
          pageSize: 10,
        },
        success: res => {
          console.log(res)

          var ds = (this.data.rows == undefined ? [] : this.data.rows)
          if (res.data.data.length != 0 || res.data.data.length != undefined) {
            const arr = [];
            for (var i = 0; i < res.data.data.rows.length; i++) {
              arr.push(res.data.data.rows[i])
            }
            // console.log(arr)
            // 添加数据到数组中
            const newArr = ds.concat(arr);
            this.setData({
              rows: newArr,
            })
            console.log(this.data.rows, "rrrr")
          } else {
            this.setData({
              page: this.data.page - 1,
              allow: false
            })
          }
          wx.hideLoading();
        }
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})