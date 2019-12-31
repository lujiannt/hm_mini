// pages/purchase/purchase.js
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

    // 获取地址
    wx.request({
      url: configuration.HOST + '/mini/member/listAddress',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        memberId: wx.getStorageSync('userinfo').id
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
  
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].address_dz = res.data.data[i].province + "\xa0" + res.data.data[i].city + "\xa0" + res.data.data[i].region + "\xa0" + res.data.data[i].address + "\xa0"
          }

          this.setData({
            address: res.data.data
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


    // 获取购买商品
    wx.request({
      url: configuration.HOST + '/mini/order/sureOrder',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userid: wx.getStorageSync('userinfo').id,
        addressId: 0,
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
          var orderCartlist = res.data.data.orderCartlist
          var ord_arr = []
          for (var i = 0; i < orderCartlist.length; i++) {

            var title = '';

            for (var m = 0; m < orderCartlist[i].g_itemValues.split('-').length; m++) {
              title += orderCartlist[i].g_itemValues.split('-')[m] + ":" + "\xa0" + orderCartlist[i].itemvalues.split('-')[m] + "\xa0\xa0\xa0";
            }
            orderCartlist[i].pro_title = title
            ord_arr.push(orderCartlist[i].goodprice/100)
          }

          // 总和
          var total = 0;
          for (var i = ord_arr.length - 1; i >= 0; i--) {
            total += ord_arr[i];
          }

          if(res.data.data.shipFeeList  == ''){
            this.setData({
              pay_price: total + 0,
            })
          }else{

          }

          console.log(this.data.pay_price,"ppp")

          this.setData({
            buy_goods: res.data.data.orderCartlist,
            shipFeeList: res.data.data.shipFeeList,
          })

          console.log(this.data.buy_goods, "bbb")


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