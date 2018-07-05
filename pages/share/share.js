Page({
    data: {
        userInfo: {},
        goods_info: [],
        this_goods_id: 0,
        data_list: [],
        shareuid: ""
    },
    go_goods_info: function() {
        wx.redirectTo({
            url: "../malldetail/malldetail?sid=" + this.data.this_goods_id
        });
    },
    onLoad: function(t) {
        var o = this, a = this, s = decodeURIComponent(t.scene), e = 0, n = "";
        if (void 0 != s) {
            var i = [];
            (i = s.split("&")).length > 1 ? (e = i[0], n = i[1]) : i.length > 0 && (e = i[0]);
        }
        var d = t.sid, u = t.shareuid;
        void 0 != d ? a.setData({
            this_goods_id: d
        }) : a.setData({
            this_goods_id: e
        }), void 0 != u ? a.setData({
            shareuid: u
        }) : a.setData({
            shareuid: n
        }), requestUtil.get(_DuoguanData.duoguan_user_info_url, {}, function(t) {
            console.log(t), o.setData({
                userInfo: t
            }), a.getDataList(a.data.this_goods_id, t.openId, a.data.shareuid);
        }), _function.getGoodsInfo(a.data.this_goods_id, a.initGoodsInfoData, this);
    },
    getDataList: function(t, o, a) {
        var s = this;
        requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanShop/FenxiaoApi/goodsfxcode", {
            goodsid: t,
            myopenid: o,
            shareuid: a
        }, function(t) {
            console.log(t), s.setData({
                data_list: t
            }), WxParse.wxParse("content", "html", t.fxrule, s);
        });
    },
    initGoodsInfoData: function(t) {
        this.setData({
            goods_info: t.info
        });
    },
    saveimage: function() {
        var t = this;
        wx.getSetting({
            success: function(o) {
                o.authSetting["scope.writePhotosAlbum"] ? wx.getImageInfo({
                    src: t.data.data_list.codeurl,
                    success: function(t) {
                        var o = t.path;
                        wx.saveImageToPhotosAlbum({
                            filePath: o,
                            success: function(t) {
                                wx.showModal({
                                    title: "提示",
                                    content: "保存图片成功",
                                    showCancel: !1
                                });
                            },
                            fail: function(t) {
                                wx.showModal({
                                    title: "保存图片失败",
                                    content: t.errMsg,
                                    showCancel: !1
                                });
                            }
                        });
                    },
                    fail: function(t) {
                        wx.showModal({
                            title: "获取图片信息失败",
                            content: t.errMsg,
                            showCancel: !1
                        });
                    }
                }) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function(o) {
                        wx.getImageInfo({
                            src: t.data.data_list.codeurl,
                            success: function(t) {
                                var o = t.path;
                                wx.saveImageToPhotosAlbum({
                                    filePath: o,
                                    success: function(t) {
                                        wx.showModal({
                                            title: "提示",
                                            content: "保存图片成功",
                                            showCancel: !1
                                        });
                                    },
                                    fail: function(t) {
                                        wx.showModal({
                                            title: "保存图片失败",
                                            content: t.errMsg,
                                            showCancel: !1
                                        });
                                    }
                                });
                            },
                            fail: function(t) {
                                wx.showModal({
                                    title: "获取图片信息失败",
                                    content: t.errMsg,
                                    showCancel: !1
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this, o = this;
        requestUtil.get(_DuoguanData.duoguan_user_info_url, {}, function(a) {
            console.log(a), t.setData({
                userInfo: a
            }), o.getDataList(o.data.this_goods_id, a.openId, o.data.shareuid);
        }, this, {
            completeAfter: wx.stopPullDownRefresh
        }), _function.getGoodsInfo(o.data.this_goods_id, o.initGoodsInfoData, this);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this;
        return {
            title: "我要推广",
            desc: "",
            path: "/pages/shop/share/share?sid=" + t.data.this_goods_id + "&shareuid=" + t.data.data_list.shareuid
        };
    }
});