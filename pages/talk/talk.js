Page({
  data: {
    latitude: 36.67149,
    longitude: 117.23906,
    markers: [{
      id: 1,
      // iconPath: "../../images/location.png",
      latitude: 36.67149,
      longitude: 117.23906,
    }],
    news: [],

  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://meiriyikan.cn/api/json.php',
      method: 'POST', //方法分GET和POST
      header: { //定死的格式，不用改，照敲就好
        'Content-Type': 'application/json'
      },
      data: {},
      success: function (res) {
        // console.log(res);
        // console.log(res.data.news)
        that.setData({
          news: res.data.news,
        })
      },
      fail: function (res) {
        console.log('.........fail..........');
      }
    })

  },

  onReady: function () {

  },
  //定位方法
  // location: function () {
  //   var that = this;
  //   wx.getLocation({
  //     type: "wgs84",
  //     success: function (res) {
  //       var latitude = res.latitude;
  //       var longitude = res.longitude;
  //       //console.log(res.latitude);
  //       that.setData({
  //         latitude: res.latitude,
  //         longitude: res.longitude,
  //         markers: [{
  //           latitude: res.latitude,
  //           longitude: res.longitude
  //         }]
  //       })
  //     }
  //   })
  // }
})