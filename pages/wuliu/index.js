var a = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var t = a.id;
        this.data.orderId = t;
    },
    onShow: function() {
        var t = this;
        wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/order/detail",
            data: {
              token: wx.getStorageSync('token'),
                id: t.data.orderId
            },
            success: function(a) {
                wx.hideLoading(), 0 == a.data.code ? t.setData({
                    orderDetail: a.data.data,
                    logisticsTraces: a.data.data.logisticsTraces.reverse()
                }) : wx.showModal({
                    title: "错误",
                    content: a.data.msg,
                    showCancel: !1
                });
            }
        });
    }
});