// pages/purchase/purchase.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideModal:true,
    sel_com:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options, "ooo")
    if (options.id && options.phone && options.address_dz) {
      this.setData({
        address_id: options.id,
        address_phone: options.phone,
        address_dz: options.address_dz,
      })
      this.data.address_id = options.id
      this.data.address_phone = options.phone
      this.data.address_dz = options.address_dz
    }


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

          var address_id;

          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].address_dz = res.data.data[i].province + "\xa0" + res.data.data[i].city + "\xa0" + res.data.data[i].region + "\xa0" + res.data.data[i].address + "\xa0"
          }

          if (res.data.data.length == 0) {
            this.data.address_id = 0
            address_id = 0
          } else {
            this.data.address_id = res.data.data[0].id
            address_id = res.data.data[0].id
          }


          //购买商品 + 运费
          wx.request({
            url: configuration.HOST + '/mini/order/sureOrder',
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              userid: wx.getStorageSync('userinfo').id,
              addressId: address_id,
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
                  ord_arr.push(orderCartlist[i].goodprice / 100)
                }

                // 总和
                var total = 0;
                for (var i = ord_arr.length - 1; i >= 0; i--) {
                  total += ord_arr[i];
                }

                if (res.data.data.isSetShip == false && res.data.data.shipFeeList == '') {
                  this.setData({
                    pay_price: total + 0,
                    pinkage:true,
                  })
                } else if (res.data.data.shipFeeList[0].isfee == true){
                  this.setData({
                    pay_price: total + 0,
                    pinkage: true,
                  })
                }else {
                  this.setData({
                    pay_price: total + (res.data.data.shipFeeList[0].postlist[0].postfee/100),
                    pinkage: false,
                  })
                }

                for (var k = 0; k < res.data.data.shipFeeList[0].postlist.length;k++){
                  res.data.data.shipFeeList[0].postlist[k].select = false
                }

                this.setData({
                  buy_goods: res.data.data.orderCartlist,
                  shipFeeList: res.data.data.shipFeeList,
                  companyId: res.data.data.shipFeeList[0].postlist[0].companyId,

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


          this.setData({
            address: res.data.data,
            address_phone: res.data.data[0].phone,
            address_dz: res.data.data[0].address_dz,
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

  // 选择地址
  select_add: function(e) {
    wx.navigateTo({
      url: '/pages/add_address/add_address?select=' + true,
    })
  },

  // 选择运送公司
  select_pinkage:function(e){
    console.log(this.data.pinkage)
    if (this.data.pinkage != true){
      this.setData({
        hideModal:false
      })
    }
  },

  hideModal:function(e){
    this.setData({
      hideModal: true
    })
  },

  // 选择快递方式
  company:function(e){
    console.log(e)
    this.setData({
      hideModal:true,
      sel_com:true,
      freight_name: e.currentTarget.dataset.name,
      freight_postfee: e.currentTarget.dataset.postfee,
    })

    console.log(this.data.shipFeeList[0].postlist,"pp")

    for (var i = 0; i < this.data.shipFeeList[0].postlist.length;i++){
      if (e.currentTarget.dataset.id == this.data.shipFeeList[0].postlist[i].companyId){
        this.data.shipFeeList[0].postlist[i].select = true
      }else{
        this.data.shipFeeList[0].postlist[i].select = false
      }
    }

    this.setData({
      shipFeeList: this.data.shipFeeList
    })

  },

  // 提交订单
  submit_order:function(e){
    wx.request({
      url: configuration.HOST + '/mini/order/saveOrder',
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