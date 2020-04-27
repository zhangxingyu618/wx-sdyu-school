Page({
  data: {
    message: "Hello Word",

  },

  // getTime: function (e) {
  //   this.setData({
  //     message: util.formatTime(new Date)
  //   })    
  // },
  home: function (e) {
    // 跳转并传值
    wx.navigateTo({
      url: "service/service?type=https://www.sdyu.edu.cn"
    })
  },
  jwchome: function (e) {
    // 跳转并传值
    wx.navigateTo({
      url: "service/service?type=https://jwc.sdyu.edu.cn"
    })
  },
  zshome: function (e) {
    // 跳转并传值
    wx.navigateTo({
      url: "service/service?type=https://zsb.sdyu.edu.cn"
    })
  },
  jyhome: function (e) {
    // 跳转并传值
    wx.navigateTo({
      url: "service/service?type=https://jyzd.sdyu.edu.cn"
    })
  },
  toSchool: function (e) {
    // 跳转并传值
    wx.navigateTo({
      url: "../mine/school/school"
    })
  },


  service: function (e) {
    // 跳转并传值
    wx.navigateTo({
      url: "service/service?type=http://jw.sdyu.edu.cn"
    })
  },
  library: function (e) {
    // 跳转并传值
    wx.navigateTo({
      url: "service/service?type=https://lib.sdyu.edu.cn"
    })
  },


  south1: function (e) {
    // 跳转并传值
    wx.navigateTo({
      url: "../dining/dining?type=south-1&name=南苑一楼餐厅"
    })
  },
  south2: function (e) {
    // 跳转并传值
    wx.navigateTo({
      url: "../dining/dining?type=south-2&name=南苑二楼餐厅"
    })
  },
  north1: function (e) {
    // 跳转并传值
    wx.navigateTo({
      url: "../dining/dining?type=north-1&name=北苑一楼餐厅"
    })
  },
  north2: function (e) {
    // 跳转并传值
    wx.navigateTo({
      url: "../dining/dining?type=north-2&name=北苑二楼餐厅"
    })
  },
  snack: function (e) {
    // 跳转并传值
    wx.navigateTo({
      url: "../dining/dining?type=snack&name=各种小吃"
    })
  },
  drink: function (e) {
    // 跳转并传值
    wx.navigateTo({
      url: "../dining/dining?type=drink&name=喝个够"
    })
  },

})