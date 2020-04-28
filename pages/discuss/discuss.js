// pages/talk/discuss/discuss.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['闲聊', '表白', '求助'],
    currentTab: 0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    discuss: {},
    isShowLoadmore:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        hasUserInfo: true
      })
    }
     else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          hasUserInfo: true,    
        })
      }
    } 
    else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            hasUserInfo: true
          })
        }
      })
    }
    // this.getUserInfo();

    // 获取数据库中的数据
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection("discuss").get({
      success: res => {
        this.setData({
          discuss: res.data.reverse()
        })
        // console.log(res.data)
      }
    });

  },
  // 登陆
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      hasUserInfo: true
    })
  },
  // 分栏导航条
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  // 获取信息
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //跳转关于新建动态页面
  add: function (e) {
    wx.navigateTo({
        url: "message/message"
      }),
      this.setData({
        // message: '跳转成功'
      })
  },
  // 页面刷新
  refresh:function(){
    this.onPullDownRefresh();
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onLoad()
    setTimeout(function ()
      {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }, 1500);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("aaaaaaaaa")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})