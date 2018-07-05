function t(t, a, o) {
    return a in t ? Object.defineProperty(t, a, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = o, t;
}

var a, o = getApp();

Page({
    data: (a = {
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
        cityId: 0,
        goods: [],
        scrollTop: "0",
        loadingMoreHidden: !0
    }, t(a, "scrollTop", 0), t(a, "floorstatus", !0), t(a, "hasNoCoupons", !0), t(a, "coupons", []), 
    a),
    tabClick: function(t) {
        this.setData({
            activeCategoryId: t.currentTarget.id
        }), this.getGoodsList(this.data.activeCategoryId);
    },
    swiperchange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        });
    },
    toDetailsTap: function(t) {
        wx.navigateTo({
            url: "/pages/goods-details/index?id=" + t.currentTarget.dataset.id
        });
    },
    tapBanner: function(t) {
        0 != t.currentTarget.dataset.id && wx.navigateTo({
            url: "/pages/goods-details/index?id=" + t.currentTarget.dataset.id
        });
    },
    bindTypeTap: function(t) {
        this.setData({
            selectCurrent: t.index
        });
    },
    goTop: function(t) {
        this.setData({
            scrollTop: 0
        });
    },
    scroll: function(t) {
        var a = this;
        a.data.scrollTop;
        a.setData({
            scrollTop: t.detail.scrollTop
        });
    },
    onLoad: function() {
        var t = this;
        wx.setNavigationBarTitle({
            title: "商家联盟"
        }), wx.request({
            url: "https://api.it120.cc/" + o.globalData.subDomain + "/banner/list",
            data: {
                key: "mallName"
            },
            success: function(a) {
                404 == a.data.code ? wx.showModal({
                    title: "提示",
                    content: "请在后台添加 banner 轮播图片",
                    showCancel: !1
                }) : t.setData({
                    banners: a.data.data
                });
            }
        }), wx.request({
            url: "https://api.it120.cc/" + o.globalData.subDomain + "/shop/goods/category/all",
            success: function(a) {
                var o = [];
                if (0 == a.data.code) for (var e = 0; e < a.data.data.length; e++) o.push(a.data.data[e]);
                t.setData({
                    categories: o,
                    activeCategoryId: 0
                }), t.getGoodsList(0);
            }
        }), wx.request({
            url: "https://api.it120.cc/" + o.globalData.subDomain + "/shop/subshop/list",
            success: function(a) {
                var o = [];
                if (0 == a.data.code) for (var e = 0; e < a.data.data.length; e++) o.push(a.data.data[e]);
                t.setData({
                    idies: o,
                    activeId: 0
                }), t.getGoodsList(0);
            }
        }), t.getCoupons(), t.getNotice();
    },
    getGoodsList: function(t) {
        0 == t && (t = ""), console.log(t);
        var a = this;
        wx.request({
            url: "https://api.it120.cc/" + o.globalData.subDomain + "/shop/goods/list",
            data: {
                categoryId: t
            },
            success: function(t) {
                a.setData({
                    goods: [],
                    loadingMoreHidden: !0
                });
                var o = [];
                if (0 == t.data.code && 0 != t.data.data.length) {
                    for (var e = 0; e < t.data.data.length; e++) o.push(t.data.data[e]);
                    a.setData({
                        goods: o
                    });
                } else a.setData({
                    loadingMoreHidden: !1
                });
            }
        });
    },
    getCoupons: function() {
        var t = this;
        wx.request({
            url: "https://api.it120.cc/" + o.globalData.subDomain + "/discounts/coupons",
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
    gitCoupon: function(t) {
        wx.request({
            url: "https://api.it120.cc/" + o.globalData.subDomain + "/discounts/fetch",
            data: {
                id: t.currentTarget.dataset.id,
                token: o.globalData.token
            },
            success: function(t) {
                20001 != t.data.code && 20002 != t.data.code ? 20003 != t.data.code ? 20004 != t.data.code ? 0 == t.data.code ? wx.showToast({
                    title: "领取成功，赶紧去下单吧~",
                    icon: "success",
                    duration: 2e3
                }) : wx.showModal({
                    title: "错误",
                    content: t.data.msg,
                    showCancel: !1
                }) : wx.showModal({
                    title: "错误",
                    content: "已过期~",
                    showCancel: !1
                }) : wx.showModal({
                    title: "错误",
                    content: "你领过了，别贪心哦~",
                    showCancel: !1
                }) : wx.showModal({
                    title: "错误",
                    content: "来晚了",
                    showCancel: !1
                });
            }
        });
    },
    toSearch: function(t) {
        console.log(t), wx.navigateTo({
            url: "/pages/search/index?keyword=" + t.detail.value
        }), console.log(t);
    },
    aboutXiao: function() {
        wx.navigateToMiniProgram({
            appId: "wx90d35426759117cb",
            path: "",
            extraData: {
                foo: "bar"
            },
            envVersion: "release",
            success: function(t) {
                打开成功;
            }
        });
    },
    vip: function() {
        wx.addCard({
            cardList: [ {
                cardId: "pCP5otyIJBvBmYe2yoslvnZnXOhM",
                cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
            }, {
                cardId: "pCP5ot9l8VqvR0fff3RxoErM-W1k",
                cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
            }, {
                cardId: "pCP5otwiwhfLNyJVtRgS48y4reTc",
                cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
            }, {
                cardId: "pCP5otx6QDt41UIhw03WHuUhRo8M",
                cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
            }, {
                cardId: "pCP5ot1i4S29yt6cXGYoLlVGmrRg",
                cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
            } ],
            success: function(t) {
                console.log(t.cardList);
            }
        });
    },
    aboutxcx: function() {
        wx.setClipboardData({
            data: "ziyuandi1997",
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data);
                    }
                });
            }
        }), wx.showModal({
            title: "复制微信号ziyuandi1997成功",
            content: "请返回微信粘贴加为好友~",
            showCancel: !1
        });
    },
    getNotice: function() {
        var t = this;
        wx.request({
            url: "https://api.it120.cc/" + o.globalData.subDomain + "/notice/list",
            data: {},
            success: function(a) {
                0 == a.data.code && t.setData({
                    noticeMap: a.data.data.dataList
                });
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: "商家联盟",
            path: "/pages/shop/index",
            success: function(t) {},
            fail: function(t) {}
        };
    }
});