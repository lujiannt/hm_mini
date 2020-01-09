// component/head-navbar/head-navbar.js
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    pageName: String,
    showNav: {
      type: Boolean,
      value: true
    },
    showHome: {
      type: Boolean,
      value: true
    },
    top: String,
    add:Boolean,
    invite:Boolean,
    be_form:String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    returns: function (e) {
      console.log("11111")
      if (this.properties.add == true){
        this.triggerEvent('man', true);
      } else if (this.properties.be_form == "evaluate"){
        this.triggerEvent('hint',true)
      }else{
        wx.navigateBack({
          delta: 1
        })
      }

    },
  }
})
