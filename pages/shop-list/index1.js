var a = require("../../constant/urlManger.js");

Page({
    data: {
        keyword: "",
        pageSize: 10,
        load_statue: !0,
        shop: [],
        loadingHidden: !1
    },
    onLoad: function(a) {
        console.log(a), this.setData({
            keyword: a.keyword
        }), this.refreshshopList();
    },
    loadSearchContent: function(t, e) {
        wx.showLoading({
            title: "加载中"
        });
        var s = this;
        console.log(t + "---" + e), wx.request({
            url: a.loadshop,
            data: {
                pageSize: e,
                address: t
            },
            success: function(a) {
                s.setData({
                    load_statue: !0
                });
                var t = s.data.shop;
                if (null != a.data.data) {
                    for (var e = 0; e < a.data.data.length; e++) t.push(a.data.data[e]);
                    s.setData({
                        shop: t
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
    refreshshopList: function() {
        this.setData({
            pageNum: 1,
            shop: []
        }), this.loadSearchContent(this.data.keyword, this.data.pageNum, this.data.pageSize);
    },
    loadMoreshopList: function() {
        var a = this.data.pageNum + 1;
        this.setData({
            pageNum: a
        }), this.loadSearchContent(this.data.keyword, this.data.pageNum, this.data.pageSize);
    },
    toSearch: function(a) {
        console.log(a), this.setData({
            keyword: a.detail.value
        }), this.refreshshopList();
    },
    toDetailsTap: function(a) {
        console.log(a), wx.navigateTo({
            url: "/pages/shop-details/index?id=" + a.currentTarget.dataset.id
        });
    }
});