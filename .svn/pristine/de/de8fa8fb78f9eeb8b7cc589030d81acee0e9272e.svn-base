// pages/click_collect/click_collect.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    management: true,
    check_all: false,
    goods_arr:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 获取收藏商品列表
    wx.request({
      url: configuration.HOST + '/mini/goods/listGoodsCollect',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        memberId: wx.getStorageSync('userinfo').id,
        pageNumber: this.data.page,
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
            res.data.data.rows[i].select = false
          }

          this.setData({
            collect: res.data.data,
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

    //相关推荐
    wx.request({
      url: configuration.HOST + '/mini/order/favGoodsList',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userid: wx.getStorageSync('userinfo').id,
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

  manage: function(e) {
    if (this.data.management == true) {
      this.setData({
        management: false
      })
    } else {

      this.setData({
        management: true
      })

      for (var i = 0; i < this.data.rows.length; i++) {
          this.data.rows[i].select = false
      }
      this.setData({
        rows: this.data.rows,
        check_all:false,
      })

    }
  },

  collection: function(e) {
    if (this.data.management == false) {
      console.log(e)

      for (var i = 0; i < this.data.rows.length; i++) {
        if (e.currentTarget.dataset.id == this.data.rows[i].id) {
          if (this.data.rows[i].select == true) {
            this.data.rows[i].select = false
            this.data.goods_arr.pop(this.data.rows[i].id)
          } else {
            this.data.rows[i].select = true
            this.data.goods_arr.push(this.data.rows[i].id)
          }

        }
      }
      this.setData({
        rows: this.data.rows,
      })
      console.log(this.data.goods_arr,"aa")
    }

  },

  click_all: function(e) {
    this.data.goods_arr = []
    for (var i = 0; i < this.data.rows.length; i++) {

      if (this.data.check_all == false) {
        this.data.goods_arr.push(this.data.rows[i].id)
        this.data.rows[i].select = true
      } else {
        this.data.goods_arr.pop(this.data.rows[i].id)
        this.data.rows[i].select = false
      }

    }

    this.setData({
      rows: this.data.rows,
    })


    if (this.data.check_all == false) {
      this.setData({
        check_all: true,
      })

    } else {
      this.setData({
        check_all: false,
      })
    }
    console.log(this.data.goods_arr, "rr")
  },

  shift_out: function(e) {


    wx.request({
      url: configuration.HOST + '/mini/goods/removeGoodsCollectForBatch',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        memberId: wx.getStorageSync('userinfo').id,
        goodsIds:this.data.goods_arr.join("-"),
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
            title: '成功移除',
            icon: 'none',
            duration: 1000,
          });
          this.onLoad()
          this.setData({
            check_all:false,
            management:true,
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