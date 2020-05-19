Page({
  data: {
    latitude: 36.67149,
    longitude: 117.23906,
    markers: [{
      id: 1,
      latitude: 36.67149,
      longitude: 117.23906,
    }],
    navbarActiveIndex: 0,
    navbarTitle: [
      "国际",
      "科技",
      "体育",
      "军事",
      "财经",
      "娱乐",
    ],
    news: [],

  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.getNews(5)
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  },
  //获取新闻
  getNews: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.jsanai.com/api/selfnews/newslist',
      // method: 'POST', //分GET和POST
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        type: e
      },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          news: res.data.data,
        })
      },
      fail: function (res) {
        console.log('.........接口调用失败..........');
      }
    })
  },
  // 点击图片放大
  previewImg: function (e) {
    // console.log(e);
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, //当前图片地址
      urls: [src], //所有要预览的图片的地址集合 数组形式
    })
  },
  // 点击新闻详情
  description: function (e) {
    var description = e.currentTarget.dataset.description;
    // console.log(e);
    if (description != '') {
      wx.showModal({
        title: '详情',
        content: description,
        showCancel: false,
      })
    }
  },
  /**
   * 点击导航栏
   */
  onNavBarTap: function (event) {
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: navbarTapIndex
    })
    // console.log(this.data.navbarActiveIndex)
    switch (this.data.navbarActiveIndex) {
      case 0:
        this.getNews(5)
        break;
      case 1:
        this.getNews(1)
        break;
      case 2:
        this.getNews(3)
        break;
      case 3:
        this.getNews(7)
        break;
      case 4:
        this.getNews(2)
        break;
      case 5:
        this.getNews(4)
        break;
    }
  },



  onReady: function () {},
})