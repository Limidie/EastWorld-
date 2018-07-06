var a = getApp();

Page({
    data: {
        orderId: 0,
        goodsList: [ {
            pic: "/images/goods02.png",
            name: "爱马仕（HERMES）大地男士最多两行文字超出就这样显…",
            price: "300.00",
            label: "大地50ml",
            number: 2
        }, {
            pic: "/images/goods02.png",
            name: "爱马仕（HERMES）大地男士最多两行文字超出就这样显…",
            price: "300.00",
            label: "大地50ml",
            number: 2
        } ],
        yunPrice: "10.00"
    },
    onLoad: function(a) {
        var t = a.id;
        this.data.orderId = t, this.setData({
            orderId: t
        });
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
                    orderDetail: a.data.data
                }) : wx.showModal({
                    title: "错误",
                    content: a.data.msg,
                    showCancel: !1
                });
            }
        });
        for (var e = parseFloat(this.data.yunPrice), o = 0, i = this.data.goodsList, d = 0; d < i.length; d++) o += parseFloat(i[0].price) * i[0].number;
        this.setData({
            allGoodsPrice: o,
            yunPrice: e
        });
    },
    wuliuDetailsTap: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/wuliu/index?id=" + t
        });
    },
    confirmBtnTap: function(t) {
        var e = this, o = t.currentTarget.dataset.id;
        wx.showModal({
            title: "确认您已收到商品？",
            content: "",
            success: function(t) {
                t.confirm && (wx.showLoading(), wx.request({
                    url: "https://api.it120.cc/" + a.globalData.subDomain + "/order/delivery",
                    data: {
                      token: wx.getStorageSync('token'),
                        orderId: o
                    },
                    success: function(a) {
                        0 == a.data.code && e.onShow();
                    }
                }));
            }
        });
    },
    submitReputation: function(t) {
        var e = this, o = {};
        o.token = wx.getStorageSync('token'), o.orderId = this.data.orderId;
        for (var i = [], d = 0; t.detail.value["orderGoodsId" + d]; ) {
            var r = t.detail.value["orderGoodsId" + d], n = t.detail.value["goodReputation" + d], s = t.detail.value["goodReputationRemark" + d], u = {};
            u.id = r, u.reputation = n, u.remark = s, i.push(u), d++;
        }
        o.reputations = i, wx.showLoading(), wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/order/reputation",
            data: {
                postJsonString: o
            },
            success: function(a) {
                wx.hideLoading(), 0 == a.data.code && e.onShow();
            }
        });
    }
});