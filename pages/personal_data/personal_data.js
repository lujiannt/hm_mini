// pages/personal_data/personal_data.js
const app = getApp()
var configuration = require('../../configuration/configuration.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sel_sex: true,
    imgurl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  chang_img: function(e) {
    var self = this;

    // 展示操作菜单
    wx.showActionSheet({
      itemList: ["相册", "相机"],
      success: function(res) {
        console.log(res);
        if (res.tapIndex == 0) {
          // 从相册中选择一张图片
          wx.chooseImage({
            count: 1,
            sourceType: ["album"],
            sizeType: ['original', 'compressed'],
            success: function(res) {
              console.log(res);

              //上传头像
              wx.uploadFile({
                url: configuration.HOST + '/mini/member/modifyMemberHeadImg',
                filePath: res.tempFilePaths[0],
                name: 'headImg',
                header: {
                  "Content-Type": "multipart/form-data",
                  'accept': 'application/json',
                },
                formData: {
                  'memberId': wx.getStorageSync('userinfo').id,
                },
                success: function(res) {
                  // var result = JSON.parse(res);
                  console.log(res.data);
                  var josnObj = JSON.parse(res.data);
                  if (josnObj.code == 200) {
                    wx.setStorageSync("userinfo", josnObj.data)
                    self.setData({
                      imgurl: josnObj.data.headimg
                    })
                  } else {
                    wx.showToast({
                      title: '系统错误,请稍后',
                      icon: 'none',
                      duration: 1000,
                    });
                  }
                },
                fail: function(res) {
                  console.log('fail');
                },
              })
            }
          })
        }
        if (res.tapIndex == 1) {
          // 使用照相机拍照
          wx.chooseImage({
            count: 1,
            sourceType: ["camera"],
            sizeType: ['original', 'compressed'],
            success: function(res) {
              console.log(res);

              //上传头像
              wx.uploadFile({
                url: configuration.HOST + '/mini/member/modifyMemberHeadImg',
                filePath: res.tempFilePaths[0],
                name: 'headImg',
                header: {
                  "Content-Type": "multipart/form-data",
                  'accept': 'application/json',
                },
                formData: {
                  'memberId': wx.getStorageSync('userinfo').id,
                },
                success: function(res) {
                  // var result = JSON.parse(res);
                  console.log(res.data);
                  var josnObj = JSON.parse(res.data);
                  if (josnObj.code == 200) {
                    wx.setStorageSync("userinfo", josnObj.data)
                    self.setData({
                      imgurl: josnObj.data.headimg
                    })
                  } else {
                    wx.showToast({
                      title: '系统错误,请稍后',
                      icon: 'none',
                      duration: 1000,
                    });
                  }
                },
                fail: function(res) {
                  console.log('fail');
                },
              })

            }
          })
        }
      }
    })


  },

  amend_nickname: function(e) {
    wx.navigateTo({
      url: '/pages/nickname/nickname?name=' + wx.getStorageSync('userinfo').nickname,
    })
  },

  personal_sex: function(e) {
    this.setData({
      sel_sex: false
    })
  },

  hideModal: function(e) {
    this.setData({
      sel_sex: true,
    })
  },

  sex_man: function(e) {
    this.setData({
      sex: 2
    })
  },
  sex_woman: function(e) {
    this.setData({
      sex: 1
    })
  },

  amend_confirm: function(e) {
    wx.request({
      url: configuration.HOST + '/mini/member/modifyMemberInfo',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        memberId: wx.getStorageSync('userinfo').id,
        sex: this.data.sex,
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
          wx.setStorageSync("userinfo", res.data.data)
          this.setData({
            sel_sex: true,
          })
          wx.showToast({
            title: '修改成功',
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
    this.setData({
      imgurl: wx.getStorageSync('userinfo').headimg,
      name: wx.getStorageSync('userinfo').nickname,
      phone: wx.getStorageSync('userinfo').phone.substring(0, 4) + "****" + wx.getStorageSync('userinfo').phone.substring(8, 11),
      sex: wx.getStorageSync('userinfo').sex,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})