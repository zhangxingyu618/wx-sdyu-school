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
   
  },
  onLoad: function () {

  },
  onReady: function () {

  },
//定位方法
  location: function () {
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        //console.log(res.latitude);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude
          }]
        })
      }
    })
  }
})