var n = getApp();

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
    bindSave: function(o) {
        var t = this, a = o.detail.value.amount;
        "" == a || 1 * a < 20 ? wx.showModal({
            title: "错误",
            content: "请填写正确的提现金额",
            showCancel: !1
        }) : wx.request({
            url: "https://api.it120.cc/" + n.globalData.subDomain + "/user/withDraw/apply",
            data: {
                token: n.globalData.token,
                money: a
            },
            success: function(n) {
                0 == n.data.code ? wx.showModal({
                    title: "成功",
                    content: "您的提现申请已提交，等待财务打款",
                    showCancel: !1,
                    success: function(n) {
                        n.confirm && t.bindCancel();
                    }
                }) : wx.showModal({
                    title: "错误",
                    content: n.data.msg,
                    showCancel: !1
                });
            }
        });
    }
});