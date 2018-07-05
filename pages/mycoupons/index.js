var t = getApp();

Page({
    data: {
        coupons: []
    },
    onLoad: function() {},
    onShow: function() {
        this.getMyCoupons();
    },
    getMyCoupons: function() {
        var a = this;
        wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/discounts/my",
            data: {
                token: t.globalData.token,
                status: 0
            },
            success: function(t) {
                if (0 == t.data.code) {
                    var o = t.data.data;
                    o.length > 0 && a.setData({
                        coupons: o
                    });
                }
            }
        });
    },
    goBuy: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    }
});