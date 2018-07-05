var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = getApp();

Page({
    data: {
      goodsList: {
        saveHidden: !0,
        totalPrice: 0,
        allSelect: !0,
        noSelect: !1,
        list: []
      },
        delBtnWidth: 120
    },
    getEleWidth: function(t) {
        try {
            var e = wx.getSystemInfoSync().windowWidth, i = 375 / (t / 2);
            return Math.floor(e / i);
        } catch (t) {
            return !1;
        }
    },
    initEleWidth: function() {
        var t = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth: t
        });
    },
    onLoad: function() {
        this.initEleWidth(), this.onShow();
    },
    onShow: function() {
        var t = [], e = wx.getStorageSync("shopCarInfo");
        e && e.shopList && (t = e.shopList), this.data.goodsList.list = t, this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), t);
    },
    toIndexPage: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    touchS: function(t) {
        1 == t.touches.length && this.setData({
            startX: t.touches[0].clientX
        });
    },
    touchM: function(t) {
        var e = t.currentTarget.dataset.index;
        if (1 == t.touches.length) {
            var i = t.touches[0].clientX, a = this.data.startX - i, s = this.data.delBtnWidth, o = "";
            0 == a || a < 0 ? o = "margin-left:0px" : a > 0 && (o = "margin-left:-" + a + "px", 
            a >= s && (o = "left:-" + s + "px"));
            var n = this.data.goodsList.list;
            "" != e && null != e && (n[parseInt(e)].left = o, this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), n));
        }
    },
    touchE: function(t) {
        var e = t.currentTarget.dataset.index;
        if (1 == t.changedTouches.length) {
            var i = t.changedTouches[0].clientX, a = this.data.startX - i, s = this.data.delBtnWidth, o = a > s / 2 ? "margin-left:-" + s + "px" : "margin-left:0px", n = this.data.goodsList.list;
            "" !== e && null != e && (n[parseInt(e)].left = o, this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), n));
        }
    },
    delItem: function(t) {
        var e = t.currentTarget.dataset.index, i = this.data.goodsList.list;
        i.splice(e, 1), this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), i);
    },
    selectTap: function(t) {
        var e = t.currentTarget.dataset.index, i = this.data.goodsList.list;
        "" !== e && null != e && (i[parseInt(e)].active = !i[parseInt(e)].active, this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), i));
    },
    totalPrice: function() {
        for (var t = this.data.goodsList.list, e = 0, i = 0; i < t.length; i++) {
            var a = t[i];
            a.active && (e += parseFloat(a.price) * a.number);
        }
        return e = parseFloat(e.toFixed(2));
    },
    allSelect: function() {
        for (var t = this.data.goodsList.list, e = !1, i = 0; i < t.length; i++) {
            if (!t[i].active) {
                e = !1;
                break;
            }
            e = !0;
        }
        return e;
    },
    noSelect: function() {
        for (var t = this.data.goodsList.list, e = 0, i = 0; i < t.length; i++) t[i].active || e++;
        return e == t.length;
    },
    setGoodsList: function(t, e, i, a, s) {
        this.setData({
            goodsList: {
                saveHidden: t,
                totalPrice: e,
                allSelect: i,
                noSelect: a,
                list: s
            }
        });
        var o = {}, n = 0;
        o.shopList = s;
        for (var d = 0; d < s.length; d++) n += s[d].number;
        o.shopNum = n, wx.setStorage({
            key: "shopCarInfo",
            data: o
        });
    },
    bindAllSelect: function() {
        var t = this.data.goodsList.allSelect, e = this.data.goodsList.list;
        if (t) for (i = 0; i < e.length; i++) (a = e[i]).active = !1; else for (var i = 0; i < e.length; i++) {
            var a = e[i];
            a.active = !0;
        }
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), !t, this.noSelect(), e);
    },
    jiaBtnTap: function(t) {
        var e = t.currentTarget.dataset.index, i = this.data.goodsList.list;
        "" !== e && null != e && i[parseInt(e)].number < 15 && (i[parseInt(e)].number++, 
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), i));
    },
    jianBtnTap: function(t) {
        var e = t.currentTarget.dataset.index, i = this.data.goodsList.list;
        "" !== e && null != e && i[parseInt(e)].number > 1 && (i[parseInt(e)].number--, 
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), i));
    },
    editTap: function() {
        for (var t = this.data.goodsList.list, e = 0; e < t.length; e++) t[e].active = !1;
        this.setGoodsList(!this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), t);
    },
    saveTap: function() {
        for (var t = this.data.goodsList.list, e = 0; e < t.length; e++) t[e].active = !0;
        this.setGoodsList(!this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), t);
    },
    getSaveHide: function() {
        return this.data.goodsList.saveHidden;
    },
    deleteSelected: function() {
        var t = this.data.goodsList.list;
        t = t.filter(function(t) {
            return !t.active;
        }), this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), t);
    },
    toPayOrder: function() {
        wx.showLoading();
        var i = this;
        if (this.data.goodsList.noSelect) wx.hideLoading(); else {
            var a = [], s = wx.getStorageSync("shopCarInfo");
            if (s && s.shopList && (a = s.shopList.filter(function(t) {
                return t.active;
            })), 0 != a.length) for (var o = !1, n = 0, d = a.length, l = 0; l < a.length; l++) {
                var r = function(t) {
                    if (o) return wx.hideLoading(), {
                        v: void 0
                    };
                    var s = a[t];
                    s.propertyChildIds && "" != s.propertyChildIds ? wx.request({
                        url: "https://api.it120.cc/" + e.globalData.subDomain + "/shop/goods/price",
                        data: {
                            goodsId: s.goodsId,
                            propertyChildIds: s.propertyChildIds
                        },
                        success: function(t) {
                            return n++, t.data.data.stores < s.number ? (wx.showModal({
                                title: "提示",
                                content: s.name + " 库存不足，请重新购买",
                                showCancel: !1
                            }), o = !0, void wx.hideLoading()) : t.data.data.price != s.price ? (wx.showModal({
                                title: "提示",
                                content: s.name + " 价格有调整，请重新购买",
                                showCancel: !1
                            }), o = !0, void wx.hideLoading()) : void (d == n && i.navigateToPayOrder());
                        }
                    }) : wx.request({
                        url: "https://api.it120.cc/" + e.globalData.subDomain + "/shop/goods/detail",
                        data: {
                            id: s.goodsId
                        },
                        success: function(t) {
                            return n++, t.data.data.properties ? (wx.showModal({
                                title: "提示",
                                content: t.data.data.basicInfo.name + " 商品已失效，请重新购买",
                                showCancel: !1
                            }), o = !0, void wx.hideLoading()) : t.data.data.basicInfo.stores < s.number ? (wx.showModal({
                                title: "提示",
                                content: t.data.data.basicInfo.name + " 库存不足，请重新购买",
                                showCancel: !1
                            }), o = !0, void wx.hideLoading()) : t.data.data.basicInfo.minPrice != s.price ? (wx.showModal({
                                title: "提示",
                                content: t.data.data.basicInfo.name + " 价格有调整，请重新购买",
                                showCancel: !1
                            }), o = !0, void wx.hideLoading()) : void (d == n && i.navigateToPayOrder());
                        }
                    });
                }(l);
                if ("object" === (void 0 === r ? "undefined" : t(r))) return r.v;
            } else wx.hideLoading();
        }
    },
    navigateToPayOrder: function() {
        wx.hideLoading(), wx.navigateTo({
            url: "/pages/to-pay-order/index"
        });
    }
});