Page({
  data: {

  },

  //跳转到学校简介
  toSchool: function (e) {
    wx.navigateTo({
      url: "../mine/school/school"
    })
  },

  //复制网址到粘贴板
  copy: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.setClipboardData({
      data: src,
      success(res) {
        wx.getClipboardData({
          success(res) {
            // console.log(res.data) 
          }
        })
      }
    })
  },
  
  //餐饮模块跳转
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