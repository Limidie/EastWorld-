var t = getApp(), a = require("../../wxParse/wxParse.js");

Page({
    data: {},
    onLoad: function(n) {
        var o = this;
        wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/notice/detail",
            data: {
                id: n.id
            },
            success: function(t) {
                0 == t.data.code && (o.setData({
                    notice: t.data.data
                }), a.wxParse("article", "html", t.data.data.content, o, 5));
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.notice.title,
            path: "/pages/notice/show?id=" + this.data.notice.id,
            success: function(t) {},
            fail: function(t) {}
        };
    }
});