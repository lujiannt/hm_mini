// component/cancel_order/cancel_order.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideModal: Boolean,
    paytogether:String,
    order_details:String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    cause: [{
        title: "订单信息有误",
        cause: false
      },
      {
        title: "地址信息填写有误",
        cause: false
      },
      {
        title: "拍错了",
        cause: false
      },
      {
        title: "卖家缺货",
        cause: false
      },
      {
        title: "不想买了",
        cause: false
      },
      {
        title: "其他原因",
        cause: false
      },
    ],
    load:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    hideModal: function(e) {
      for (var i = 0; i < this.data.cause.length; i++) {
        this.data.cause[i].cause = false
      }
      this.setData({
        hideModal: true,
        cause: this.data.cause,
      })
    },

    

    select_cause:function(e){
      for (var i = 0; i < this.data.cause.length;i++){
        if (e.currentTarget.dataset.title == this.data.cause[i].title) {
          this.data.cause[i].cause = true
        }else{
          this.data.cause[i].cause = false
        }
      }
      this.data.cause_title = e.currentTarget.dataset.title
      this.setData({
        cause: this.data.cause,
      })
    },

    cancel:function(e){
      this.setData({
        hideModal: true
      })
    },

    confirm:function(e){
      console.log(this.properties.paytogether)
      wx.request({
        url: configuration.HOST + '/mini/order/cancleOrder',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          paytogether: this.properties.paytogether,
          reason: this.data.cause_title,
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

            for (var i = 0; i < this.data.cause.length;i++){
              this.data.cause[i].cause = false
            }

            this.setData({
              hideModal: true,
              cause: this.data.cause,
            })

            wx.showToast({
              title: '取消成功',
              icon: 'none',
              duration: 1500,
            });

            // if (!this.properties.order_details){
              this.triggerEvent('load', true);
            // }else{
              this.triggerEvent('jump', true);
            // }
            

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

  }
})