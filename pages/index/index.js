var bmap = require('../../libs/bmap-wx.min');


Page({
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      url: 'cloud://zhangxingyu-7t0za.7a68-zhangxingyu-7t0za-1301674488/index/swiper/1.jpg'
    }, {
      id: 1,
      url: 'cloud://zhangxingyu-7t0za.7a68-zhangxingyu-7t0za-1301674488/index/swiper/2.jpg',
    }, {
      id: 2,
      url: 'cloud://zhangxingyu-7t0za.7a68-zhangxingyu-7t0za-1301674488/index/swiper/3.jpg'
    }, {
      id: 3,
      url: 'cloud://zhangxingyu-7t0za.7a68-zhangxingyu-7t0za-1301674488/index/swiper/4.jpg'
    }, {
      id: 4,
      url: 'cloud://zhangxingyu-7t0za.7a68-zhangxingyu-7t0za-1301674488/index/swiper/5.jpg'
    }, {
      id: 5,
      url: 'cloud://zhangxingyu-7t0za.7a68-zhangxingyu-7t0za-1301674488/index/swiper/6.jpg'
    }],
    tq: '', //天气情况
    t: '', //温度
    c: "", //城市
    day: '', //日期及实时温度
    msg: [],
    yiyan: []

  },
  onLoad() {
    //初始化音频
    this.audioCtx = wx.createAudioContext('english')
    // 初始化towerSwiper 传已有的数组名即可
    this.towerSwiper('swiperList');
    //显示当前页面可转发分享
    wx.showShareMenu({
      withShareTicket: true
    })
    //接口调用
    var that = this;
    wx.request({
      url: 'https://open.iciba.com/dsapi/',
      header: {
        'Content-Type': 'application/json'
      },
      data: {},
      success: function (res) {
        // console.log(res.data)
        that.setData({
          msg: res.data,
        })
      },
      fail: function (res) {
        console.log('.........fail..........');
      }
    })

    this.yiyan()


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
      that.setData({
        //天气描述
        tq: weatherData.weatherDesc,
        //温度
        t: weatherData.temperature,
        //城市
        c: weatherData.currentCity,
        //日期
        day: weatherData.date
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });

  },
  //一言接口
  yiyan: function () {
    var that = this;
    wx.request({
      url: 'https://v1.hitokoto.cn',
      header: {
        'Content-Type': 'application/json'
      },
      data: {},
      success: function (res) {
        // console.log(res.data)
        that.setData({
          yiyan: res.data,
        })
      },
      fail: function (res) {
        console.log('.........接口调用失败..........');
      }
    })
  },

  // 播放音频
  audioPlay: function () {
    this.audioCtx.play()
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