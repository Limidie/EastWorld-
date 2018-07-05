function o(o, a, t) {
    return a in o ? Object.defineProperty(o, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[a] = t, o;
}

var a, t = require("../../constant/urlManger.js");

Page((a = {
    data: {
        loadingHidden: !1,
        goods: [],
        subshopid: 0,
        pageSize: 10,
        load_statue: !0
    },
    onLoad: function(o) {
        console.log(o), this.setData({
            subshopid: parseInt(o.subshopid)
        }), this.refreshGoodsList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    refreshGoodsList: function() {
        this.setData({
            page: 1,
            goods: []
        }), this.loadGoods();
    },
    loadGoods: function() {
        var o = this;
        wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: t.loadGoods,
            data: {
                page: o.data.page,
                pageSize: o.data.pageSize,
                subshopId: o.data.subshopid
            },
            success: function(a) {
                o.setData({
                    load_statue: !0
                });
                var t = o.data.goods;
                if (null != a.data.data) {
                    for (var e = 0; e < a.data.data.length; e++) t.push(a.data.data[e]);
                    o.setData({
                        goods: t
                    });
                }
                null == a.data.data || a.data.data.length < 10 ? (console.log("数据为空"), o.setData({
                    loadingHidden: !0
                })) : o.setData({
                    loadingHidden: !1
                }), console.log(o.data), wx.showToast({
                    title: "加载成功"
                });
            },
            fail: function() {
                o.setData({
                    load_statue: !1
                }), wx.showToast({
                    title: "加载失败"
                });
            },
            complete: function() {
                wx.stopPullDownRefresh();
            }
        });
    },
    loadMoreGoodsList: function(o) {
        var a = this.data.page + 1;
        this.setData({
            page: a
        }), this.loadGoods();
    }
}, o(a, "onPullDownRefresh", function() {
    var o = this;
    setTimeout(function() {
        o.refreshGoodsList();
    }, 1e3);
}), o(a, "reLoad", function() {
    this.refreshGoodsList();
}), o(a, "toDetailsTap", function(o) {
    console.log(o), wx.navigateTo({
        url: "/pages/goods-details/index?id=" + o.currentTarget.dataset.id
    });
}), a));