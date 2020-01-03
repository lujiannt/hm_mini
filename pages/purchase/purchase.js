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
    address_id:'',
    address_phone:'',
    address_dz:'',
    message:'',

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

          var address_id;

          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].address_dz = res.data.data[i].province + "\xa0" + res.data.data[i].city + "\xa0" + res.data.data[i].region + "\xa0" + res.data.data[i].address + "\xa0"
          }
          if(!options.id){
            if (res.data.data.length == 0) {
              this.data.address_id = 0
              address_id = 0
            } else {
              this.data.address_id = res.data.data[0].id
              address_id = res.data.data[0].id
            }
          }else{
            this.setData({
              address_id: options.id,
              address_phone: options.phone,
              address_dz: options.address_dz,
            })
            this.data.address_id = options.id
            this.data.address_phone = options.phone
            this.data.address_dz = options.address_dz
            address_id = options.id
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

                this.data.total = total
                var cart_arr = []
                if (res.data.data.orderCartlist != ''){
                  if (res.data.data.orderCartlist.length == 1){
                    this.data.cartIds = res.data.data.orderCartlist[0].ordercartid
                  }else{
                    for(var h=0;h<res.data.data.orderCartlist.length;h++){
                      cart_arr.push(res.data.data.orderCartlist[h].ordercartid)
                      cart_arr.join(",")
                    }
                    this.data.cartIds = cart_arr
                  }
                  
                }
                

                if (res.data.data.isSetShip == false && res.data.data.shipFeeList == '') {
                  console.log(total,total + 0,"tt")
                  this.setData({
                    pay_price: total + 0,
                    pinkage: true,
                  })
                } else if (res.data.data.shipFeeList[0].isfee == true) {
                  this.setData({
                    pay_price: total + 0,
                    pinkage: true,
                  })
                } else {
                  this.setData({
                    pay_price: total + (res.data.data.shipFeeList[0].postlist[0].postfee / 100),
                    pinkage: false,

                  })
                  this.data.companyId = res.data.data.shipFeeList[0].postlist[0].id
                  console.log(res.data.data.shipFeeList[0].postlist[0].id,"iiiii")
                }

                if (res.data.data.shipFeeList != ''){
                    for (var k = 0; k < res.data.data.shipFeeList[0].postlist.length; k++) {
                      res.data.data.shipFeeList[0].postlist[k].select = false
                    }
                }


                var goodsname;
                for (var p = 0; p < res.data.data.orderCartlist.length; p++) {
                  goodsname = (res.data.data.orderCartlist[p].goodname + ",").slice(0, -1);
                }

              
                this.data.goodsname = goodsname,

                  this.setData({
                    buy_goods: res.data.data.orderCartlist,
                    shipFeeList: res.data.data.shipFeeList,
                    

                  })

                console.log(res.data.data.shipFeeList,"sss")

                if (res.data.data.shipFeeList != '') {
                    
                      this.data.companyId = res.data.data.shipFeeList[0].postlist[0].companyId,

                    this.data.freight_postfee = this.data.shipFeeList[0].postlist[0].postfee / 100

                }else{
                  this.data.freight_postfee = 0
                  this.data.companyId = 0
                }

                


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
            // address_phone: res.data.data[0].phone,
            // address_dz: res.data.data[0].address_dz,
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


    console.log(options, "ooo")




  },

  user_message:function(e){
    this.data.message = e.detail.value
  },

  // 选择地址
  select_add: function(e) {
    wx.redirectTo({
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
    this.data.companyId = e.currentTarget.dataset.id
    this.data.freight_id = e.currentTarget.dataset.id,

    console.log(this.data.shipFeeList[0].postlist,"pp")

    for (var i = 0; i < this.data.shipFeeList[0].postlist.length;i++){
      if (e.currentTarget.dataset.id == this.data.shipFeeList[0].postlist[i].companyId){
        this.data.shipFeeList[0].postlist[i].select = true
      }else{
        this.data.shipFeeList[0].postlist[i].select = false
      }
    }

    this.setData({
      shipFeeList: this.data.shipFeeList,
    })


    console.log(this.data.shipFeeList[0].postlist[0])
    this.data.freight_id = this.data.shipFeeList[0].postlist[0].id


  },

  // 提交订单
  submit_order:function(e){
    var that = this
    wx.login({
      success: function (co) {

        wx.request({
          url: configuration.HOST + '/mini/order/saveOrder',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: {
            cartIds: that.data.cartIds,
            goodsname: that.data.goodsname,
            addressId: that.data.address_id,
            userId: wx.getStorageSync('userinfo').id,
            shipfee: that.data.freight_postfee,
            goodsfee: that.data.total,
            totalfee: that.data.pay_price,
            remark: that.data.message,
            companyId: that.data.companyId,
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

              wx.request({
                url: configuration.HOST + '/mini/order/wxGoodsPay',
                method: "POST",
                header: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                data: {
                  number:res.data.data,
                  code: co.code,
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