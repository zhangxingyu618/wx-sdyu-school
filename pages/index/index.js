


Page({
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://file.moetu.org/images/2020/03/26/ab50f54dcc833eecf.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://file.moetu.org/images/2020/03/27/20200227banner24f8f944aebe2fdc7.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://file.moetu.org/images/2020/03/27/140dda59c53f47a48.png'
    }, {
      id: 3,
      type: 'image',
      url: 'https://file.moetu.org/images/2020/03/27/2792916b6872cf1a3.png'
    }, {
      id: 4,
      type: 'image',
      url: 'https://file.moetu.org/images/2020/03/26/ab50f54dcc833eecf.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://file.moetu.org/images/2020/03/26/ab50f54dcc833eecf.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://file.moetu.org/images/2020/03/26/ab50f54dcc833eecf.jpg'
    }],
  },
  onLoad() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
    //显示当前页面可转发分享
    wx.showShareMenu({
      withShareTicket: true
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