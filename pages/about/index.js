var a = getApp(), t = require("../../wxParse/wxParse.js");

Page(function(a, t, o) {
    return t in a ? Object.defineProperty(a, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = o, a;
}({
    data: {
        floorstatus: !0
    },
    onLoad: function(o) {
        var s = this;
        wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/shop/subshop/detail",
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
    },
    vip: function() {
        wx.addCard({
            cardList: [ {
                cardId: this.data.subshop.activity,
                cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
            } ],
            success: function(a) {
                console.log(a.cardList);
            }
        });
    },
    weixin: function() {
        wx.setClipboardData({
            data: this.data.subshop.linkPhone,
            success: function(a) {
                wx.getClipboardData({
                    success: function(a) {
                        console.log(a.data);
                    }
                });
            }
        }), wx.showModal({
            title: "复制商家微信号成功",
            content: "请返回微信粘贴添加朋友~",
            showCancel: !1
        });
    }
}, "onShareAppMessage", function() {
    return {
        title: this.data.subshop.name,
        path: "/pages/about/index?id=" + this.data.subshop.id,
        success: function(a) {},
        fail: function(a) {}
    };
}));