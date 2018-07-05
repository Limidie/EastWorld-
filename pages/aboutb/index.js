var a = require("../../constant/urlManger.js");

Page({
    data: {
        load_statue: !0,
        shopInfo: {}
    },
    onLoad: function(a) {
        this.loadShopInfo();
    },
    loadShopInfo: function() {
        var t = this;
        wx.request({
            url: a.loadShopDetail,
            data: {
                id: 295
            },
            success: function(a) {
                console.log(a), t.setData({
                    load_statue: !0,
                    shopInfo: {
                        pic: a.data.data.pic,
                        name: a.data.data.name,
                        address: a.data.data.address,
                        latitude: a.data.data.latitude,
                        longitude: a.data.data.longitude,
                        linkPhone: a.data.data.linkPhone,
                        characteristic: a.data.data.characteristic,
                        introduce: a.data.data.introduce
                    }
                });
            },
            fail: function() {
                t.setData({
                    load_statue: !1
                });
            }
        });
    },
    showLocation: function(a) {
        var t = this;
        wx.openLocation({
            latitude: t.data.shopInfo.latitude,
            longitude: t.data.shopInfo.longitude,
            name: t.data.shopInfo.name,
            address: t.data.shopInfo.address,
            characteristic: t.data.shopInfo.characteristic,
            introduce: t.data.shopInfo.introduce
        });
    },
    callPhone: function(a) {
        var t = this;
        wx.makePhoneCall({
            phoneNumber: t.data.shopInfo.linkPhone
        });
    },
    reLoad: function(a) {
        this.loadShopInfo();
    }
});