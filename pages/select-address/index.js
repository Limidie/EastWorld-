var a = getApp();

Page({
    data: {
        addressList: []
    },
    selectTap: function(t) {
        var s = t.currentTarget.dataset.id;
        wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/user/shipping-address/update",
            data: {
                token: a.globalData.token,
                id: s,
                isDefault: "true"
            },
            success: function(a) {
                wx.navigateBack({});
            }
        });
    },
    addAddess: function() {
        wx.navigateTo({
            url: "/pages/address-add/index"
        });
    },
    editAddess: function(a) {
        wx.navigateTo({
            url: "/pages/address-add/index?id=" + a.currentTarget.dataset.id
        });
    },
    onLoad: function() {
        console.log("onLoad");
    },
    onShow: function() {
        this.initShippingAddress();
    },
    initShippingAddress: function() {
        var t = this;
        wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/user/shipping-address/list",
            data: {
                token: a.globalData.token
            },
            success: function(a) {
                0 == a.data.code ? t.setData({
                    addressList: a.data.data
                }) : 700 == a.data.code && t.setData({
                    addressList: null
                });
            }
        });
    }
});