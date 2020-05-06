Page({
  data: {
    latitude: 36.67149,
    longitude: 117.23906,
    markers: [{
      id: 1,
      latitude: 36.67149,
      longitude: 117.23906,
    }],
    news: [],

  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://api.apiopen.top/getWangYiNews',
      // method: 'POST', //分GET和POST
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        page: "1",
        count: "10",
      },
      success: function (res) {
        // console.log(res.data.result)
        that.setData({
          news: res.data.result,
        })
      },
      fail: function (res) {
        console.log('.........接口调用失败..........');
      }
    })

  },
  // 点击图片放大
  previewImg: function (e) {
    // console.log(e.currentTarget.dataset.src);
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, //当前图片地址
      urls: [src], //所有要预览的图片的地址集合 数组形式
    })
  },

  onReady: function () {},
})