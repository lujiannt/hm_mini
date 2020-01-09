// pages/evaluate/evaluate.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [{
        id: 1,
        select: true
      },
      {
        id: 2,
        select: true
      },
      {
        id: 3,
        select: true
      },
      {
        id: 4,
        select: true
      },
      {
        id: 5,
        select: true
      },
    ],
    praise: 5,
    count: 1,
    imageUrl: '',
    hint:false,
    total_points:5,
    select_label:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 评论商品
    wx.request({
      url: configuration.HOST + '/mini/order/queryComentTags',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
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
            res.data.data[i].select = false
            // res.data.data[0].select = true
          }

          this.setData({
            label: res.data.data
          })

          console.log(this.data.label, "ll")

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

    console.log(JSON.parse(options.orderlist))
    if (options.orderlist) {
      this.setData({
        orderlist: JSON.parse(options.orderlist)
      })
    }

  },

  subtract: function(e) {
    console.log(e.currentTarget.dataset)
    for (var i = 0; i < this.data.stars.length; i++) {
      if (this.data.stars[i].select == true && e.currentTarget.dataset.key == 4) {
        this.data.stars[e.currentTarget.dataset.key].select = false
      } else if (this.data.stars[4].select == false && e.currentTarget.dataset.key == 3) {
        this.data.stars[e.currentTarget.dataset.key].select = false
      } else if (this.data.stars[4].select == true && e.currentTarget.dataset.key == 3) {
        this.data.stars[4].select = false
        this.data.stars[3].select = false
      } else if (this.data.stars[3].select == false && e.currentTarget.dataset.key == 2) {
        this.data.stars[e.currentTarget.dataset.key].select = false
      } else if (this.data.stars[3].select == true && e.currentTarget.dataset.key == 2) {
        this.data.stars[4].select = false
        this.data.stars[3].select = false
        this.data.stars[2].select = false
      } else if (this.data.stars[2].select == false && e.currentTarget.dataset.key == 1) {
        this.data.stars[e.currentTarget.dataset.key].select = false
      } else if (this.data.stars[2].select == true && e.currentTarget.dataset.key == 1) {
        this.data.stars[4].select = false
        this.data.stars[3].select = false
        this.data.stars[2].select = false
        this.data.stars[1].select = false
      }
    }

    this.setData({
      stars: this.data.stars,
      praise: e.currentTarget.dataset.key,
    })
    this.data.total_points = e.currentTarget.dataset.id - 1
  },

  add: function(e) {
    console.log(e.currentTarget.dataset)
    for (var i = 0; i < this.data.stars.length; i++) {
      if (e.currentTarget.dataset.key == 4) {
        this.data.stars[i].select = true
      } else if (e.currentTarget.dataset.key == 3) {
        this.data.stars[3].select = true
        this.data.stars[2].select = true
        this.data.stars[1].select = true
        this.data.stars[0].select = true
      } else if (e.currentTarget.dataset.key == 2) {
        this.data.stars[2].select = true
        this.data.stars[1].select = true
        this.data.stars[0].select = true
      } else if (e.currentTarget.dataset.key == 1) {
        this.data.stars[1].select = true
        this.data.stars[0].select = true
      }
    }

    this.setData({
      stars: this.data.stars,
      praise: e.currentTarget.dataset.key + 1
    })

    this.data.total_points = e.currentTarget.dataset.id
  },

  // 选择标签
  label_select: function(e) {

    console.log(e)
    

    for (var i = 0; i < this.data.label.length; i++) {


      if (e.currentTarget.dataset.id == this.data.label[i].id) {
        if (this.data.label[i].select == false) {
          if (this.data.count <= 3) {
            this.data.label[i].select = true
            this.data.count = this.data.count + 1
            this.data.select_label.push(e.currentTarget.dataset.tagname)
          }

        } else {
          this.data.label[i].select = false
          this.data.count = this.data.count - 1
          this.data.select_label.pop(e.currentTarget.dataset.tagname)
        }
      }



    }

    console.log(this.data.count, "cc")

    this.setData({
      label: this.data.label,
    })

  },

  com_con: function(e) {
    console.log(e.detail.value)
    this.data.comment_con = e.detail.value
  },

  uploaded: function(e) {

    console.log(this.data.imageUrl, "uu")

    const that = this;
    // 展示操作菜单
    wx.showActionSheet({
      itemList: ["相册", "相机"],
      success: function(res) {
        console.log(res);
        if (res.tapIndex == 0) {
          // 从相册中选择一张图片
          wx.chooseImage({
            count: 9,
            sourceType: ["album"],
            sizeType: ['original', 'compressed'],
            success: function(res) {
              console.log(res);
              // 将图片路径保存至data中
              that.setData({
                imageUrl: res.tempFilePaths
              })

            }
          })
        }
        if (res.tapIndex == 1) {
          // 使用照相机拍照
          wx.chooseImage({
            count: 9,
            sourceType: ["camera"],
            sizeType: ['original', 'compressed'],
            success: function(res) {
              console.log(res);
              // 将图片路径保存至data中
              that.setData({
                imageUrl: res.tempFilePaths
              })


            }
          })
        }
      }
    })

  },

  examine: function(e) {
    console.log(e.currentTarget.dataset.item)
    wx.previewImage({
      current: e.currentTarget.dataset.item, // 当前显示图片的http链接
      urls: this.data.imageUrl, // 需要预览的图片http链接列表，数组形式
    })
  },

  hint:function(e){
    this.setData({
      hint:e.detail,
    })
  },

  hideModal:function(e){
    this.setData({
      hint:false,
    })
  },
  quit:function(e){
    this.setData({
      hint: false,
    })
    wx.navigateBack({
      delta: 1
    })
  },

  // 发表评价
  publish_evaluate:function(e){
    // console.log(this.data.select_label.join(","),"ee")
    var fen;
    // console.log(this.data.total_points,"tt")
    if (this.data.total_points >= 4){
      fen = 1
    } else if (this.data.total_points == 3){
      fen = 2
    } else if (this.data.total_points < 3) {
      fen = 3
    }

    wx.request({
      url: configuration.HOST + '/mini/order/saveGoodOrderComment',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        imgs: this.data.imageUrl,
        memberId: wx.getStorageSync('userinfo').id,
        orderid: e.currentTarget.dataset.orderid,
        score: this.data.total_points,
        type: fen,
        tags: this.data.select_label.join(","),
        orderDetailId: e.currentTarget.dataset.detailsid,
        goodsId: e.currentTarget.dataset.goodsid,
        content: this.data.comment_con,
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
            title: '发表成功',
            icon: 'succeed',
            duration: 1000,
          });
          wx.navigateBack({
            delta: 1
          })
        } else if (res.data.code == 400){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
          });
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