var t = getApp();

Page({
    data: {
        id: 351,
        userInfo: {}
    },
    onLoad: function() {
        var a = this;
        wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/shop/subshop/list",
            success: function(t) {
                var s = [];
                if (0 == t.data.code) for (var e = 0; e < t.data.data.length; e++) s.push(t.data.data[e]);
                a.setData({
                    idies: s,
                    id: 351,
                    activeId: 0
                }), a.getGoodsList(0);
            }
        }), a.getCoupons(), a.getNotice();
    }
});