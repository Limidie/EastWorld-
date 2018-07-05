var a = getApp();

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
        loadingMoreHidden: !0,
        hasNoCoupons: !0,
        coupons: []
    },
    tabClick: function(a) {
        this.setData({
            activeCategoryId: a.currentTarget.id
        }), this.getGoodsList(this.data.activeCategoryId);
    },
    swiperchange: function(a) {
        this.setData({
            swiperCurrent: a.detail.current
        });
    },
    toDetailsTap: function(a) {
        wx.navigateTo({
            url: "/pages/goods-details/index?id=" + a.currentTarget.dataset.id
        });
    },
    tapBanner: function(a) {
        0 != a.currentTarget.dataset.id && wx.navigateTo({
            url: "/pages/goods-details/index?id=" + a.currentTarget.dataset.id
        });
    },
    bindTypeTap: function(a) {
        this.setData({
            selectCurrent: a.index
        });
    },
    scroll: function(a) {
        var t = this;
        t.data.scrollTop;
        t.setData({
            scrollTop: a.detail.scrollTop
        });
    },
    onLoad: function() {
        var t = this;
        wx.setNavigationBarTitle({
            title: "商品分类"
        }), wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/shop/goods/category/all",
            success: function(a) {
                var e = [ {
                    id: 0,
                    name: "全部"
                } ];
                if (0 == a.data.code) for (var o = 0; o < a.data.data.length; o++) e.push(a.data.data[o]);
                t.setData({
                    categories: e,
                    activeCategoryId: 0
                }), t.getGoodsList(0);
            }
        }), t.getCoupons(), t.getNotice();
    },
    getGoodsList: function(t) {
        0 == t && (t = ""), console.log(t);
        var e = this;
        wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/shop/goods/list",
            data: {
                categoryId: t
            },
            success: function(a) {
                e.setData({
                    goods: [],
                    loadingMoreHidden: !0
                });
                var t = [];
                if (0 == a.data.code && 0 != a.data.data.length) {
                    for (var o = 0; o < a.data.data.length; o++) t.push(a.data.data[o]);
                    e.setData({
                        goods: t
                    });
                } else e.setData({
                    loadingMoreHidden: !1
                });
            }
        });
    },
    getCoupons: function() {
        var t = this;
        wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/discounts/coupons",
            data: {
                type: ""
            },
            success: function(a) {
                0 == a.data.code && t.setData({
                    hasNoCoupons: !1,
                    coupons: a.data.data
                });
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: wx.getStorageSync("mallName") + "——" + a.globalData.shareProfile,
            path: "/pages/index/index",
            success: function(a) {},
            fail: function(a) {}
        };
    },
    toSearch: function(a) {
        console.log(a), wx.navigateTo({
            url: "/pages/search/index?keyword=" + a.detail.value
        }), console.log(a);
    },

    getNotice: function() {
        var t = this;
        wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/notice/list",
            data: {
                pageSize: 5
            },
            success: function(a) {
                0 == a.data.code && t.setData({
                    noticeList: a.data.data
                });
            }
        });
    }
});