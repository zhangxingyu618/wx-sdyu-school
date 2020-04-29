var bmap = require('../../libs/bmap-wx.min');

Page({
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'cloud://zhangxingyu-7t0za.7a68-zhangxingyu-7t0za-1301674488/index/swiper/1.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'cloud://zhangxingyu-7t0za.7a68-zhangxingyu-7t0za-1301674488/index/swiper/2.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'cloud://zhangxingyu-7t0za.7a68-zhangxingyu-7t0za-1301674488/index/swiper/3.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'cloud://zhangxingyu-7t0za.7a68-zhangxingyu-7t0za-1301674488/index/swiper/4.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'cloud://zhangxingyu-7t0za.7a68-zhangxingyu-7t0za-1301674488/index/swiper/5.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'cloud://zhangxingyu-7t0za.7a68-zhangxingyu-7t0za-1301674488/index/swiper/6.jpg'
    }],
    tq: '', //天气情况
    t: '', //温度
    c: "", //城市
    day: '', //日期及实时温度
    msg: [],

  },
  onLoad() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
    //显示当前页面可转发分享
    wx.showShareMenu({
      withShareTicket: true
    })
    //接口调用
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
        // json格式转换
        // var obj = JSON.parse(data);
        //  var dataObj = eval("("+data+")");//转换为json对象
        // var json = (new Function("return " + data))();
        that.setData({
          msg: res.data,
        })
      },
      fail: function (res) {
        console.log('.........fail..........');
      }
    })
    //天气
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'LSYySQGi8HClxWpxSYny6iegOgO7bGpq'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      //天气描述
      that.setData({
        tq: weatherData.weatherDesc
      });
      //温度
      that.setData({
        t: weatherData.temperature
      });
      //城市
      that.setData({
        c: weatherData.currentCity
      });
      //日期
      that.setData({
        day: weatherData.date
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });



  },

  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})