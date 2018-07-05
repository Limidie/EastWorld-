var a = require("../../constant/urlManger.js");

Page({
    data: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        load_statue: !0,
        goods: [],
        loadingHidden: !1
    },
    onLoad: function(a) {
        console.log(a), this.setData({
            keyword: a.keyword
        }), this.refreshGoodsList();
    },
    loadSearchContent: function(t, o, e) {
        wx.showLoading({
            title: "加载中"
        });
        var s = this;
        console.log(t + "---" + o + "---" + e), wx.request({
            url: a.loadGoods,
            data: {
                page: o,
                pageSize: e,
                nameLike: t
            },
            success: function(a) {
                s.setData({
                    load_statue: !0
                });
                var t = s.data.goods;
                if (null != a.data.data) {
                    for (var o = 0; o < a.data.data.length; o++) t.push(a.data.data[o]);
                    s.setData({
                        goods: t
                    });
                }
                null == a.data.data || a.data.data.length < 10 ? (console.log("数据为空"), s.setData({
                    loadingHidden: !0
                })) : s.setData({
                    loadingHidden: !1
                }), console.log(s.data), wx.showToast({
                    title: "加载成功"
                });
            },
            fail: function() {
                s.setData({
                    load_statue: !1
                }), wx.showToast({
                    title: "加载失败"
                });
            }
        });
    },
    refreshGoodsList: function() {
        this.setData({
            pageNum: 1,
            goods: []
        }), this.loadSearchContent(this.data.keyword, this.data.pageNum, this.data.pageSize);
    },
    loadMoreGoodsList: function() {
        var a = this.data.pageNum + 1;
        this.setData({
            pageNum: a
        }), this.loadSearchContent(this.data.keyword, this.data.pageNum, this.data.pageSize);
    },
    toSearch: function(a) {
        console.log(a), this.setData({
            keyword: a.detail.value
        }), this.refreshGoodsList();
    },
    toDetailsTap: function(a) {
        console.log(a), wx.navigateTo({
            url: "/pages/goods-details/index?id=" + a.currentTarget.dataset.id
        });
    },
    scoresign: function() {
        var a = this;
        wx.request({
            url: "https://api.it120.cc/" + app.globalData.subDomain + "/score/sign",
            data: {
                token: app.globalData.token
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