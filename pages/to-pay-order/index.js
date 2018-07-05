var a = getApp();

Page({
    data: {
        goodsList: [],
        isNeedLogistics: 0,
        allGoodsPrice: 0,
        yunPrice: 0,
        allGoodsAndYunPrice: 0,
        goodsJsonStr: "",
        orderType: "",
        hasNoCoupons: !0,
        coupons: [],
        youhuijine: 0,
        curCoupon: null
    },
    onShow: function() {
        var a = this, t = [];
        if ("buyNow" == a.data.orderType) {
            var e = wx.getStorageSync("buyNowInfo");
            e && e.shopList && (t = e.shopList);
        } else {
            var o = wx.getStorageSync("shopCarInfo");
            o && o.shopList && (t = o.shopList.filter(function(a) {
                return a.active;
            }));
        }
        a.setData({
            goodsList: t
        }), a.initShippingAddress();
    },
    onLoad: function(a) {
        this.setData({
            isNeedLogistics: 1,
            orderType: a.orderType
        });
    },
    getDistrictId: function(a, t) {
        return a ? t || "" : "";
    },
    createOrder: function(t) {
        wx.showLoading();
        var e = this, o = a.globalData.token, d = "";
        t && (d = t.detail.value.remark);
        var s = {
            token: o,
            goodsJsonStr: e.data.goodsJsonStr,
            remark: d
        };
        if (e.data.isNeedLogistics > 0) {
            if (!e.data.curAddressData) return wx.hideLoading(), void wx.showModal({
                title: "错误",
                content: "请先设置您的收货地址！",
                showCancel: !1
            });
            s.provinceId = e.data.curAddressData.provinceId, s.cityId = e.data.curAddressData.cityId, 
            e.data.curAddressData.districtId && (s.districtId = e.data.curAddressData.districtId), 
            s.address = e.data.curAddressData.address, s.linkMan = e.data.curAddressData.linkMan, 
            s.mobile = e.data.curAddressData.mobile, s.code = e.data.curAddressData.code;
        }
        e.data.curCoupon && (s.couponId = e.data.curCoupon.id), t || (s.calculate = "true"), 
        wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/order/create",
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: s,
            success: function(o) {
                if (wx.hideLoading(), 0 == o.data.code) {
                    if (t && "buyNow" != e.data.orderType && wx.removeStorageSync("shopCarInfo"), !t) return e.setData({
                        isNeedLogistics: o.data.data.isNeedLogistics,
                        allGoodsPrice: o.data.data.amountTotle,
                        allGoodsAndYunPrice: o.data.data.amountLogistics + o.data.data.amountTotle,
                        yunPrice: o.data.data.amountLogistics
                    }), void e.getMyCoupons();
                    var d = {};
                    d.keyword1 = {
                        value: "淘宝电商中心",
                        color: "#173177"
                    }, d.keyword2 = {
                        value: o.data.data.dateAdd,
                        color: "#173177"
                    }, d.keyword3 = {
                        value: o.data.data.amountReal + "元",
                        color: "#173177"
                    }, d.keyword4 = {
                        value: o.data.data.orderNumber,
                        color: "#173177"
                    }, d.keyword5 = {
                        value: "订单已关闭",
                        color: "#173177"
                    }, d.keyword6 = {
                        value: "您可以重新下单，请在30分钟内完成支付",
                        color: "#173177"
                    }, a.sendTempleMsg(o.data.data.id, -1, "9oKbO3FyvplWYV9J4DCrOdPeme9BN6efnc1Ipl9ef6o", t.detail.formId, "pages/index/index", JSON.stringify(d)), 
                    // 模板消息
                    (d = {}).keyword1 = {
                        value: "优选商城",
                        color: "#173177"
                    }, d.keyword2 = {
                        value: o.data.data.orderNumber,
                        color: "#173177"
                    }, d.keyword3 = {
                        value: o.data.data.amountReal + "元",
                        color: "#173177"
                    }, d.keyword4 = {
                        value: o.data.data.dateAdd,
                        color: "#173177"
                    }, d.keyword5 = {
                        value: "您的订单已发货，请注意查收",
                        color: "#173177"
                    }, d.keyword6 = {
                        value: "微信支付",
                        color: "#173177"
                    }, d.keyword7 = {
                        value: "Eestworld",
                        color: "#173177"
                    }, a.sendTempleMsg(o.data.data.id, 2, "hFKE-YrMqKTxQ3daUc67EQUGrT4AmnGTblzhqgdmIwE", t.detail.formId, "pages/order-details/index?id=" + o.data.data.id, JSON.stringify(d)), 
                    // 模板消息
                    wx.redirectTo({
                        url: "/pages/order-list/index"
                    });
                } else wx.showModal({
                    title: "错误",
                    content: o.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    initShippingAddress: function() {
        var t = this;
        wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/user/shipping-address/default",
            data: {
                token: a.globalData.token
            },
            success: function(a) {
                0 == a.data.code ? t.setData({
                    curAddressData: a.data.data
                }) : t.setData({
                    curAddressData: null
                }), t.processYunfei();
            }
        });
    },
    processYunfei: function() {
        for (var a = this, t = this.data.goodsList, e = "[", o = 0, d = 0; d < t.length; d++) {
            var s = t[d];
            s.logistics && (o = 1), s.price * s.number;
            var r = "";
            d > 0 && (r = ",");
            var i = 0, n = wx.getStorageSync("inviter_id_" + s.goodsId);
            n && (i = n), e += r += '{"goodsId":' + s.goodsId + ',"number":' + s.number + ',"propertyChildIds":"' + s.propertyChildIds + '","logisticsType":0, "inviter_id":' + i + "}";
        }
        e += "]", a.setData({
            isNeedLogistics: o,
            goodsJsonStr: e
        }), a.createOrder();
    },
    addAddress: function() {
        wx.navigateTo({
            url: "/pages/address-add/index"
        });
    },
    selectAddress: function() {
        wx.navigateTo({
            url: "/pages/select-address/index"
        });
    },
    getMyCoupons: function() {
        var t = this;
        wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/discounts/my",
            data: {
                token: a.globalData.token,
                status: 0
            },
            success: function(a) {
                if (0 == a.data.code) {
                    var e = a.data.data.filter(function(a) {
                        return a.moneyHreshold <= t.data.allGoodsAndYunPrice;
                    });
                    e.length > 0 && t.setData({
                        hasNoCoupons: !1,
                        coupons: e
                    });
                }
            }
        });
    },
    bindChangeCoupon: function(a) {
        var t = a.detail.value[0] - 1;
        -1 != t ? this.setData({
            youhuijine: this.data.coupons[t].money,
            curCoupon: this.data.coupons[t]
        }) : this.setData({
            youhuijine: 0,
            curCoupon: null
        });
    }
});