// pages/classify/classify.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedIndex: 0,
    scrollTopLeft: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获取一级分类
    wx.request({
      url: configuration.HOST + '/mini/goods/queryTopCategory',
      method:"POST",
      success: res => {
        if (res.statusCode != 200) {
          wx.showToast({
            title: '系统错误,请稍后',
            icon: 'none',
            duration: 1000,
          });
        }

        if (res.data.code == 200) {
          this.setData({
            first_level:res.data.data,
          })

          // 获取二三级分类
          wx.request({
            url: configuration.HOST + '/mini/goods/queryCategoryByPid',
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              pId: res.data.data[0].id
            },
            success: res => {
              if (res.statusCode != 200) {
                wx.showToast({
                  title: '系统错误,请稍后',
                  icon: 'none',
                  duration: 1000,
                });
              }

              if (res.data.code == 200) {
                this.setData({
                  second_level: res.data.data
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
        wx.showToast({
          title: '系统错误,请稍后',
          icon: 'none',
          duration: 1000,
        });
      }
    })




  },

  // 跳转搜索页
  jump_search: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  // 点击一级分类
  tapKind:function(e){
    this.setData({
      selectedIndex: e.currentTarget.dataset.index,
    })

    // 获取二三级分类
    wx.request({
      url: configuration.HOST + '/mini/goods/queryCategoryByPid',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        pId: e.currentTarget.dataset.id,
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
            second_level: res.data.data
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

  // 点击分类跳转商品列表
  click_val: function (e) {
    wx.navigateTo({
      url: '/pages/productList/productList?inputValue=' + e.currentTarget.dataset.name,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})