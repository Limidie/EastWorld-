Page({
    userInfo: null,
    data: {},
    onLoad: function(n) {},
    onUnload: function() {
        listener.fireEventListener("user.get_info", [ this.userInfo ]);
    },
    onUserInfoTap: function(n) {
        var e = this;
        wx.canIUse("button.open-type.getUserInfo") || wx.openSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(n) {
                        e.userInfo = n.userInfo, wx.navigateBack();
                    }
                });
            }
        });
    },
    onUserInfo: function(n) {
        var e = n.detail;
        e.userInfo ? (this.userInfo = e.userInfo, wx.navigateBack()) : console.error("授权失败：", n);
    }
});