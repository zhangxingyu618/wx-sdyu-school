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
      "头条",
      "科技",
      "军事",
      "体育",
      "财经",
      "娱乐",
    ],
    news: [],

  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.getNews('T1348647853363')
    
  },
  //获取新闻
  getNews: function (e) {
    var that = this;
    wx.request({
      // url: 'https://www.jsanai.com/api/selfnews/newslist',
      url: 'https://c.m.163.com/nc/article/headline/'+e+'/0-20.html',
      // method: 'POST', //分GET和POST
      header: {
        'Content-Type': 'application/json'
      },
      data: {
      
      },
      success: function (res) {
        // console.log(res.data[e])
        that.setData({
          news:res.data[e]
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
    var digest = e.currentTarget.dataset.digest;
    // console.log(e);
    if (digest != '') {
      wx.showModal({
        title: '详情',
        content: digest+'...',
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
        this.getNews('T1348647853363')
        break;
      case 1:
        this.getNews('T1348649580692')
        break;
      case 2:
        this.getNews('T1348648141035')
        break;
      case 3:
        this.getNews('T1348649079062')
        break;
      case 4:
        this.getNews('T1348648756099')
        break;
      case 5:
        this.getNews('T1348648517839')
        break;
    }
  },



  onReady: function () {
    wx.hideLoading()
  },
})