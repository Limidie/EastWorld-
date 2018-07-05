var a = getApp(), t = require("../../wxParse/wxParse.js");

Page({
    data: {},
    onLoad: function(o) {
        var s = this;
        wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/shop/subshop/list",
            data: {
                id: o.id
            },
            success: function(a) {
                0 == a.data.code && (s.setData({
                    subshop: a.data.data
                }), t.wxParse("article", "html", a.data.data.name, s, 5));
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    showLocation: function(a) {
        var t = this;
        wx.openLocation({
            latitude: t.data.subshop.latitude,
            longitude: t.data.subshop.longitude,
            name: t.data.subshop.name,
            id: t.data.subshop.id,
            address: t.data.subshop.address,
            characteristic: t.data.subshop.characteristic,
            introduce: t.data.subshop.introduce,
            cityId: t.data.subshop.cityId,
            activity: t.data.subshop.activity
        });
    },
    callPhone: function(a) {
        var t = this;
        wx.makePhoneCall({
            phoneNumber: t.data.subshop.linkPhone
        });
    }
});