//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,

        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //跳转关于反馈页面
  opinion: function (e) {
    wx.navigateTo({
        url: "opinion/opinion"
      }),
      this.setData({
        // message: '跳转成功'
      })
  },
  //跳转关于山青院页面
  toSchool: function (e) {
    wx.navigateTo({
        url: "school/school"
      }),
      this.setData({
        // message: '跳转成功'
      })
  },
  //跳转关于我们页面
  about: function (e) {
    wx.navigateTo({
        url: "about/about"
      }),
      this.setData({
        // message: '跳转成功'
      })
  },
})