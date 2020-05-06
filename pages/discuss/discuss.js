const app = getApp()
wx.cloud.init()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    discuss: {},
    hasMore: true,
    pageNum: 5, //每页数据量
    loadSum: 5, //已加载的数据量

  },

  //  生命周期函数--监听页面加载
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
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
    //第一次加载数据库中的值
    this.load()
  },
  // 第一次加载数据库数据
  load: function () {
    let {
      pageNum,
    } = this.data
    db.collection("discuss").orderBy('fileName', 'desc').skip(0)
      .limit(pageNum)
      .get({
        success: res => {
          // console.log(res.data)
          this.setData({
            discuss: res.data
          })
          // console.log(this.data.discuss)
        }
      });
  },

  // 懒加载分次加载数据库中的数据
  loadMore: function () {
    if (this.data.hasMore) {
      let {
        pageNum,
        loadSum
      } = this.data
      db.collection("discuss").orderBy('fileName', 'desc').skip(loadSum) // 跳过结果集中的前 loadSum 条，从第 loadSum+1 条开始返回
        .limit(pageNum)
        .get({
          success: res => {
            const newsdata = res.data
            // console.log(newsdata)
            //判断还能不能再加载
            const hasMore = res.data.length == pageNum
            // console.log(res.data.length)
            // console.log(hasMore) 
            this.setData({
              discuss: this.data.discuss.concat(newsdata),
              loadSum: pageNum + loadSum,
              hasMore: hasMore
            })
          }
        });
    }
  },

  // 获取用户信息
  getUserInfo: function (e) {
    // console.log(e)
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
    })
  },
  //删除动态
  delete: function (e) {
    var that = this;
    // console.log(e.currentTarget.dataset.id)
    // console.log(e.currentTarget.dataset.src)
    wx.showActionSheet({
      itemList: ['删除'],
      itemColor: "#F23A3A",
      success(res) {
        wx.showModal({
          title: '提示',
          content: '确认删除此条动态吗？',
          success(res) {
            if (res.confirm) {
              // 删除数据库中数据
              db.collection('discuss').doc(e.currentTarget.dataset.id).remove({
                success: function (res) {
                  // console.log(res.data)
                  that.refresh()
                }
              })
              // 删除云存储中图片
              if (e.currentTarget.dataset.src != '') {
                wx.cloud.deleteFile({
                  fileList: [e.currentTarget.dataset.src],
                  success: res => {
                    // console.log(res.fileList)
                    that.refresh()
                  },
                  fail: console.error
                })
              }

            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
      },
      fail(res) {
        console.log("----删除失败-----")
      }
    })
  },

  // 页面刷新
  refresh: function () {
    // 回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    this.setData({
      loadSum: 5,
      hasMore: true,
    })
    // 下拉刷新操作
    this.onPullDownRefresh();
  },
  // 监听用户下拉动作
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.load()
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {

    this.loadMore()

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})