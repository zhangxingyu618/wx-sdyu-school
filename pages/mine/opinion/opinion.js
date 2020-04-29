// pages/mine/opinion/opinion.js
//导入时间格式文件
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  Submit: function (e) {
    // console.log(e.detail.value);
    var msg = e.detail.value.msg;
    var qq = e.detail.value.qq;
    if (msg == "" || qq == "") {
      wx.showModal({
        title: '提示',
        content: '请输入完整信息！',
        showCancel: false,
        // success: function (res) {
        //   if (res.confirm) {
        //     console.log('用户点击确定')
        //   }
        // }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '感谢您的反馈及意见！',
        showCancel: false,
      })
      // console.log(e.detail.value)
      // console.log(msg)
      // console.log(qq)

      wx.cloud.init();
      const db = wx.cloud.database();
      db.collection('opinion').add({
        data: {
          qq: qq,
          msg: msg,
          time: util.formatTime(new Date),
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          // console.log(res)
        }
      })

    }
  },
})