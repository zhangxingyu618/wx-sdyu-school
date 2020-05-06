const app = getApp()
// 初始化云 创建数据库实例
wx.cloud.init()
const db = wx.cloud.database()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    name: '',
    wname: [],

  },
  onLoad(options) {
    // 信息加载
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    // 获取页面传值
    this.setData({
      name: options.name,
    });
    // console.log(options.name)

    // 用上一个页面传递过来的值
    db.collection(options.type).get({
      success: res => {
        this.setData({
          wname: res.data[0].newslist
        })
        // console.log(res)
      }
    });
    // 列表抽屉
    let list = [{}];
    for (let i = 0; i < 26; i++) {
      list[i] = {};
      list[i].id = i;
    }
    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          let h = data ? data.height : 0;
          tabHeight = tabHeight + h;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})