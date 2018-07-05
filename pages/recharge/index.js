var n = require("../../utils/pay.js"), o = getApp();

Page({
    data: {},
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    bindCancel: function() {
        wx.navigateBack({});
    },
    bindSave: function(a) {
        var t = a.detail.value.amount;
        "" == t || 1 * t < 0 ? wx.showModal({
            title: "错误",
            content: "请填写正确的充值金额",
            showCancel: !1
        }) : n.wxpay(o, t, 0, "/pages/my/index");
    }
});