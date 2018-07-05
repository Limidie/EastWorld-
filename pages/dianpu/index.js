getApp();

var s = require("../../constant/urlManger.js");

Page({
    data: {
        subshop: {},
        load_statue: !0
    },
    onLoad: function(s) {
        this.refreshsubshop();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    loadsubshop: function(o) {
        var t = this;
        wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: s.loadsubshop,
            success: function(s) {
                "refresh" == o && t.setData({
                    subshop: s.data.data
                }), t.setData({
                    load_statue: !0
                }), wx.showToast({
                    title: "加载成功"
                });
            },
            fail: function() {
                t.setData({
                    load_statue: !1
                }), wx.showToast({
                    title: "加载失败"
                });
            }
        });
    },
    refreshsubshop: function() {
        this.setData({
            subshop: []
        }), this.loadsubshop("refresh");
    },
    reLoad: function() {
        this.refreshsubshop();
    },
    showsubshopGoodsList: function(s) {
        console.log(s), console.log(s.currentTarget.dataset.subshopid + "我要传的id"), wx.navigateTo({
            url: "../../pages/dianpu-goods-list/index?subshopid=" + s.currentTarget.dataset.subshopid
        });
    }
});