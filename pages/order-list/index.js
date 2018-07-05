var t = require("../../utils/pay.js"), a = getApp();

Page({
    data: {
        statusType: [ "待付款", "待发货", "待收货", "待评价", "已完成" ],
        currentType: 0,
        tabClass: [ "", "", "", "", "" ]
    },
    statusTap: function(t) {
        var a = t.currentTarget.dataset.index;
        this.data.currentType = a, this.setData({
            currentType: a
        }), this.onShow();
    },
    orderDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/order-details/index?id=" + a
        });
    },
    cancelOrderTap: function(t) {
        var o = this, e = t.currentTarget.dataset.id;
        wx.showModal({
            title: "确定要取消该订单吗？",
            content: "",
            success: function(t) {
                t.confirm && (wx.showLoading(), wx.request({
                    url: "https://api.it120.cc/" + a.globalData.subDomain + "/order/close",
                    data: {
                        token: a.globalData.token,
                        orderId: e
                    },
                    success: function(t) {
                        wx.hideLoading(), 0 == t.data.code && o.onShow();
                    }
                }));
            }
        });
    },
    toPayTap: function(o) {
        var e = o.currentTarget.dataset.id, n = o.currentTarget.dataset.money;
        wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/user/amount",
            data: {
                token: a.globalData.token
            },
            success: function(o) {
                0 == o.data.code ? (n -= o.data.data.balance) <= 0 ? wx.request({
                    url: "https://api.it120.cc/" + a.globalData.subDomain + "/order/pay",
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        token: a.globalData.token,
                        orderId: e
                    },
                    success: function(t) {
                        wx.reLaunch({
                            url: "/pages/order-list/index"
                        });
                    }
                }) : t.wxpay(a, n, e, "/pages/order-list/index") : wx.showModal({
                    title: "错误",
                    content: "无法获取用户资金信息",
                    showCancel: !1
                });
            }
        });
    },
    onLoad: function(t) {},
    onReady: function() {},
    getOrderStatistics: function() {
        var t = this;
        wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/order/statistics",
            data: {
                token: a.globalData.token
            },
            success: function(a) {
                if (wx.hideLoading(), 0 == a.data.code) {
                    var o = t.data.tabClass;
                    a.data.data.count_id_no_pay > 0 ? o[0] = "red-dot" : o[0] = "", a.data.data.count_id_no_transfer > 0 ? o[1] = "red-dot" : o[1] = "", 
                    a.data.data.count_id_no_confirm > 0 ? o[2] = "red-dot" : o[2] = "", a.data.data.count_id_no_reputation > 0 ? o[3] = "red-dot" : o[3] = "", 
                    a.data.data.count_id_success, t.setData({
                        tabClass: o
                    });
                }
            }
        });
    },
    onShow: function() {
        var t = this;
        wx.showLoading();
        var o = this, e = {
            token: a.globalData.token
        };
        e.status = o.data.currentType, this.getOrderStatistics(), wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/order/list",
            data: e,
            success: function(a) {
                wx.hideLoading(), 0 == a.data.code ? o.setData({
                    orderList: a.data.data.orderList,
                    logisticsMap: a.data.data.logisticsMap,
                    goodsMap: a.data.data.goodsMap
                }) : t.setData({
                    orderList: null,
                    logisticsMap: {},
                    goodsMap: {}
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});