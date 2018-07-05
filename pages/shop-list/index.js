var t = getApp();

Page({
    data: {
        indicatorDots: !0,
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        loadingHidden: !1,
        userInfo: {},
        swiperCurrent: 0,
        selectCurrent: 0,
        categories: [],
        activeCategoryId: 0,
        goods: [],
        scrollTop: "0",
        score: 0,
        score_sign_continuous: 0,
        loadingMoreHidden: !0,
        hasNoCoupons: !0,
        coupons: []
    },
    tabClick: function(t) {
        this.setData({
            activeCategoryId: t.currentTarget.id
        }), this.getGoodsList(this.data.activeCategoryId);
    },
    getNotice: function () {
      var a = this;
      wx.request({
        url: "https://api.it120.cc/" + t.globalData.subDomain + "/notice/list",
        data: {},
        success: function (t) {
          0 == t.data.code && a.setData({
            noticeMap: t.data.data.dataList
          });
        }
      });
    },
    aboutxcx: function () {
      wx.setClipboardData({
        data: "ziyuandi1997",
        success: function (t) {
          wx.getClipboardData({
            success: function (t) {
              console.log(t.data);
            }
          });
        }
      }), wx.showModal({
        title: "复制客服微信号ziyuandi1997成功",
        content: "请返回微信粘贴加为好友~",
        showCancel: !1
      });
    },
    onLoad: function() {
        var a = this;
        wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/shop/subshop/list",
            success: function(t) {
                var o = [];
                if (0 == t.data.code) for (var e = 0; e < t.data.data.length; e++) o.push(t.data.data[e]);
                a.setData({
                    idies: o,
                    activeCategoryId: 0
                }); a.getNotice();
            }
        });
    }
});