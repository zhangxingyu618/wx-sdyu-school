const util = require('../../utils/util.js')


Page({
  data:{ 
    message:"Hello Word",

  },

  ck1: function (e) {
    this.setData({
      message: util.formatTime(new Date)
    })    
  },

  go:function(e){  
      wx.navigateTo({ url: "../south-1/south-1" }),
      this.setData({
        message: '跳转成功'
      })    
  }

})