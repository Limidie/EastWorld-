var app = getApp();
Page({
  data: {
    loadingHidden: false,
    goods: [],
    categoryid: 0,
    pageSize: 10,
    load_statue: true
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      categoryid: parseInt(options.categoryid)
    })
    this.refreshGoodsList();
  },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
  },
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
  },
  refreshGoodsList: function () {
    this.setData({
      page: 1,
      goods: []
    })
    this.loadGoods();

  },
  loadGoods: function () {
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/list',
      data: {
        page: that.data.page,
        pageSize: that.data.pageSize,
        categoryId: that.data.categoryid,
      },
      success: function (res) {

        that.setData({
          load_statue: true
        })

        var goods = that.data.goods;
        if (res.data.data != null) {
          for (var i = 0; i < res.data.data.length; i++) {
            goods.push(res.data.data[i])
          }
          that.setData({
            goods: goods
          })
        }
        if (res.data.data == null || res.data.data.length < 10) {
          console.log("数据为空")
          that.setData({
            loadingHidden: true
          })
        } else {
          that.setData({
            loadingHidden: false
          })
        }

        console.log(that.data)

        wx.showToast({
          title: '加载成功',
        })
      }
      , fail: function () {

        that.setData({
          load_statue: false
        })
        wx.showToast({
          title: '加载失败',
        })
      }
      , complete() {
        wx.stopPullDownRefresh();
      }
    })
  },
  loadMoreGoodsList: function (e) {
    var page = this.data.page + 1;
    this.setData({
      page: page
    })
    this.loadGoods();

  },
  onPullDownRefresh: function () {
    var that = this;
    setTimeout(function () {
      that.refreshGoodsList();
    }, 1000)

  },
  reLoad: function () {
    this.refreshGoodsList();
  },
  toDetailsTap: function (e) {
    console.log(e)
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  }
})