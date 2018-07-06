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
        address: "中国",
        loadingMoreHidden: !0,
        hasNoCoupons: !0,
        coupons: []
    },
    location: function() {
        var t = this;
        wx.chooseLocation({
            success: function(a) {
                console.log(a), t.setData({
                    address: a.address
                });
            }
        });
    },
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
        0 != t.currentTarget.dataset.id && (wx.navigateTo({
            url: "/pages/goods-details/index?id=" + t.currentTarget.dataset.id
        }), console.log("e.detail.minPrice:" + t.detail.minPrice.toFixed(2)));
    },
    bindTypeTap: function(t) {
        this.setData({
            selectCurrent: t.index
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
        var a = this;
        wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/banner/list",
            data: {
                key: "mallName"
            },
            success: function(t) {
                404 == t.data.code ? wx.showModal({
                    title: "提示",
                    content: "请在后台添加 banner 轮播图片",
                    showCancel: !1
                }) : a.setData({
                    banners: t.data.data
                });
            }
        }), wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/friendly-partner/list",
            data: {
                type: "首页显示"
            },
            success: function(t) {
                a.setData({
                    Friendly: t.data.data
                });
            }
        }), wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/shop/goods/category/all",
            success: function(t) {
                var o = [];
                if (0 == t.data.code) for (var e = 0; e < t.data.data.length; e++) o.push(t.data.data[e]);
                a.setData({
                    categories: o,
                    activeCategoryId: 0
                }), a.getGoodsList(0);
            }
        }), wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/shop/subshop/list",
            success: function(t) {
                var o = [];
                if (0 == t.data.code) for (var e = 0; e < t.data.data.length; e++) o.push(t.data.data[e]);
                a.setData({
                    idies: o,
                    activeId: 0
                }), a.getGoodsList(0);
            }
        }), a.getCoupons(), a.getNotice();
    },
    getGoodsList: function(a) {
        0 == a && (a = ""), console.log(a);
        var o = this;
        wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/shop/goods/list",
            data: {
                categoryId: a,
                recommendStatus: ""
            },
            success: function(t) {
                o.setData({
                    goods: [],
                    loadingMoreHidden: !0
                });
                var a = [];
                if (0 == t.data.code && 0 != t.data.data.length) {
                    for (var e = 0; e < t.data.data.length; e++) a.push(t.data.data[e]);
                    o.setData({
                        goods: a
                    });
                } else o.setData({
                    loadingMoreHidden: !1
                });
            }
        });
    },
    getCoupons: function() {
        var a = this;
        wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/discounts/coupons",
            data: {
                type: "首页推荐"
            },
            success: function(t) {
                0 == t.data.code && a.setData({
                    hasNoCoupons: !1,
                    coupons: t.data.data
                });
            }
        });
    },
    gitCoupon: function(a) {
        wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/discounts/fetch",
            data: {
                id: a.currentTarget.dataset.id,
                token: wx.getStorageSync('token')
            },
            success: function(t) {
                20001 != t.data.code && 20002 != t.data.code ? 20003 != t.data.code ? 30001 != t.data.code ? 20004 != t.data.code ? 0 == t.data.code ? wx.showToast({
                    title: "领取成功，赶紧去下单吧~",
                    icon: "success",
                    duration: 2e3
                }) : wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1
                }) : wx.showModal({
                    title: "提示",
                    content: "优惠券已过期~",
                    showCancel: !1
                }) : wx.showModal({
                    title: "提示",
                    content: "您的积分不足,每天签到可获积分",
                    showCancel: !1
                }) : wx.showModal({
                    title: "提示",
                    content: "您领过了，别贪心哦~",
                    showCancel: !1
                }) : wx.showModal({
                    title: "提示",
                    content: "来晚了，本次发完了~",
                    showCancel: !1
                });
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: wx.getStorageSync("mallName") + "——" + t.globalData.shareProfile,
            path: "/pages/index/index",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    toSearch: function(t) {
        console.log(t), wx.navigateTo({
            url: "/pages/search/index?keyword=" + t.detail.value
        }), console.log(t);
    },
    shop_saoma_bind: function() {
        wx.scanCode({
            success: function(t) {}
        });
    },
    
    bind_go_cart: function() {
        wx.navigateTo({
            url: "/pages/shop-carts/index"
        });
    },
    // 微信卡券领取   cardId 为微信卡卷id
    vip: function() {
        wx.addCard({
            cardList: [ {
                cardId: "",
                cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
            }, {
                cardId: "",
                cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
            }, {
                cardId: "",
                cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
            }, {
                cardId: "",
                cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
            }, {
                cardId: "",
                cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
            } ],
            success: function(t) {
                console.log(t.cardList);
            }
        });
    },
    getNotice: function() {
        var a = this;
        wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/notice/list",
            data: {},
            success: function(t) {
                0 == t.data.code && a.setData({
                    noticeMap: t.data.data.dataList
                });
            }
        });
    },
    checkScoreSign: function() {
        var a = this;
        wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/score/today-signed",
            data: {
              token: wx.getStorageSync('token'),
            },
            success: function(t) {
                0 == t.data.code && a.setData({
                    score_sign_continuous: t.data.data.continuous
                });
            }
        });
    },
    scoresign: function() {
        var a = this;
        wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/score/sign",
            data: {
              token: wx.getStorageSync('token')
            },
            success: function(t) {
                0 == t.data.code ? (wx.showModal({
                    title: "签到成功",
                    content: "增加1积分，我的查看积分",
                    showCancel: !1
                }), a.getUserAmount(), a.checkScoreSign()) : wx.showModal({
                    title: "提示",
                    content: "今天已经签过了，明天再来吧~",
                    showCancel: !1
                });
            }
        });
    }
});