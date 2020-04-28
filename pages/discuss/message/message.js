// pages/talk/message/message.js
var util = require('../../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath: "",
    fileID: "",
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    }
  },

  selectImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        //图片本地文件路径列表
        var tempFilePaths = res.tempFilePaths;
        // console.log(res);
        that.setData({
          imgPath: tempFilePaths[0]
        })
      }
    })
  },

  Submit: function (e) {
    var that = this;

    wx.cloud.init();
    const db = wx.cloud.database();
    // console.log(e.detail.value);
    var msg = e.detail.value.msg;
    if (msg!=""&&that.data.imgPath != "") {
      wx.showLoading({
        title: '图片上传中',
      })
      wx.cloud.uploadFile({
        cloudPath: 'discuss/' + (new Date()).valueOf() + '.jpg',
        filePath: this.data.imgPath,
        success: function (res) {
          // console.log(res)
          that.setData({
            fileID: res.fileID
          })
          // console.log(that.data.fileID)

          var name = that.data.userInfo.nickName;
          var head = that.data.userInfo.avatarUrl;
          var fileID = that.data.fileID;
          // console.log(this.data.fileID)
          db.collection('discuss').add({
            data: {
              head: head,
              name: name,
              fileID: fileID,
              msg: msg,
              time: util.formatTime(new Date),
            },
            success: function (res) {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              // console.log(res)
            }
          })

          wx.hideLoading();
          wx.showToast({
            title: "发表成功",
          })
        },
      })
    }else if(msg==""){
      wx.showToast({
        title: "动态内容不能为空哦！",
        icon: 'none',
      })
    }else if(that.data.imgPath == ""){
      
      var name = that.data.userInfo.nickName;
      var head = that.data.userInfo.avatarUrl;
      var fileID = "";
      // console.log(this.data.fileID)
      db.collection('discuss').add({
        data: {
          head: head,
          name: name,
          fileID: fileID,
          msg: msg,
          time: util.formatTime(new Date),
        },
        success: function (res) {
          wx.showToast({
            title: "发表成功",
          })
          // wx.navigateBack({
            
          // })
        }
      })
    }
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})