var t = getApp(), a = require("../../wxParse/wxParse.js");

Page({
    data: {
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        goodsDetail: {},
        swiperCurrent: 0,
        hasMoreSelect: !1,
        selectSize: "选择：",
        selectSizePrice: 0,
        shopNum: 0,
        hideShopPopup: !0,
        scrollTop: 0,
        floorstatus: !0,
        buyNumber: 0,
        buyNumMin: 1,
        buyNumMax: 0,
        propertyChildIds: "",
        propertyChildNames: "",
        canSubmit: !1,
        shopCarInfo: {},
        shopType: "addShopCar"
    },
    swiperchange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        });
    },
    onLoad: function(o) {
        o.inviter_id && wx.setStorage({
            key: "inviter_id_" + o.id,
            data: o.inviter_id
        });
        var i = this;
        wx.getStorage({
            key: "shopCarInfo",
            success: function(t) {
                i.setData({
                    shopCarInfo: t.data,
                    shopNum: t.data.shopNum
                });
            }
        }), wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/shop/goods/detail",
            data: {
                id: o.id
            },
            success: function(t) {
                var o = "";
                if (t.data.data.properties) {
                    for (var s = 0; s < t.data.data.properties.length; s++) o = o + " " + t.data.data.properties[s].name;
                    i.setData({
                        hasMoreSelect: !0,
                        selectSize: i.data.selectSize + o,
                        selectSizePrice: t.data.data.basicInfo.minPrice
                    });
                }
                i.data.goodsDetail = t.data.data, i.setData({
                    goodsDetail: t.data.data,
                    selectSizePrice: t.data.data.basicInfo.minPrice,
                    buyNumMax: t.data.data.basicInfo.stores,
                    buyNumber: t.data.data.basicInfo.stores > 0 ? 1 : 0
                }), a.wxParse("article", "html", t.data.data.content, i, 5);
            }
        }), this.reputation(o.id);
    },
    goShopCar: function() {
        wx.reLaunch({
            url: "/pages/shop-cart/index"
        });
    },
    toAddShopCar: function() {
        this.setData({
            shopType: "addShopCar"
        }), this.bindGuiGeTap();
    },
    tobuy: function() {
        this.setData({
            shopType: "tobuy"
        }), this.bindGuiGeTap();
    },
    bindGuiGeTap: function() {
        this.setData({
            hideShopPopup: !1
        });
    },
    closePopupTap: function() {
        this.setData({
            hideShopPopup: !0
        });
    },
    numJianTap: function() {
        if (this.data.buyNumber > this.data.buyNumMin) {
            var t = this.data.buyNumber;
            t--, this.setData({
                buyNumber: t
            });
        }
    },
    numJiaTap: function() {
        if (this.data.buyNumber < this.data.buyNumMax) {
            var t = this.data.buyNumber;
            t++, this.setData({
                buyNumber: t
            });
        }
    },
    labelItemTap: function(a) {
        for (var o = this, i = o.data.goodsDetail.properties[a.currentTarget.dataset.propertyindex].childsCurGoods, s = 0; s < i.length; s++) o.data.goodsDetail.properties[a.currentTarget.dataset.propertyindex].childsCurGoods[s].active = !1;
        o.data.goodsDetail.properties[a.currentTarget.dataset.propertyindex].childsCurGoods[a.currentTarget.dataset.propertychildindex].active = !0;
        for (var e = o.data.goodsDetail.properties.length, d = 0, n = "", r = "", s = 0; s < o.data.goodsDetail.properties.length; s++) {
            i = o.data.goodsDetail.properties[s].childsCurGoods;
            for (var c = 0; c < i.length; c++) i[c].active && (d++, n = n + o.data.goodsDetail.properties[s].id + ":" + i[c].id + ",", 
            r = r + o.data.goodsDetail.properties[s].name + ":" + i[c].name + "  ");
        }
        var h = !1;
        e == d && (h = !0), h && wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/shop/goods/price",
            data: {
                goodsId: o.data.goodsDetail.basicInfo.id,
                propertyChildIds: n
            },
            success: function(t) {
                o.setData({
                    selectSizePrice: t.data.data.price,
                    propertyChildIds: n,
                    propertyChildNames: r,
                    buyNumMax: t.data.data.stores,
                    buyNumber: t.data.data.stores > 0 ? 1 : 0
                });
            }
        }), this.setData({
            goodsDetail: o.data.goodsDetail,
            canSubmit: h
        });
    },
    addShopCar: function() {
        if (this.data.goodsDetail.properties && !this.data.canSubmit) return this.data.canSubmit || wx.showModal({
            title: "提示",
            content: "请选择商品规格！",
            showCancel: !1
        }), void this.bindGuiGeTap();
        if (this.data.buyNumber < 1) wx.showModal({
            title: "提示",
            content: "购买数量不能为0！",
            showCancel: !1
        }); else {
            var t = this.bulidShopCarInfo();
            this.setData({
                shopCarInfo: t,
                shopNum: t.shopNum
            }), wx.setStorage({
                key: "shopCarInfo",
                data: t
            }), this.closePopupTap(), wx.showToast({
                title: "加入购物车成功",
                icon: "success",
                duration: 2e3
            });
        }
    },
    buyNow: function() {
        if (this.data.goodsDetail.properties && !this.data.canSubmit) return this.data.canSubmit || wx.showModal({
            title: "提示",
            content: "请选择商品规格！",
            showCancel: !1
        }), this.bindGuiGeTap(), void wx.showModal({
            title: "提示",
            content: "请先选择规格尺寸哦~",
            showCancel: !1
        });
        if (this.data.buyNumber < 1) wx.showModal({
            title: "提示",
            content: "购买数量不能为0！",
            showCancel: !1
        }); else {
            var t = this.buliduBuyNowInfo();
            wx.setStorage({
                key: "buyNowInfo",
                data: t
            }), this.closePopupTap(), wx.navigateTo({
                url: "/pages/to-pay-order/index?orderType=buyNow"
            });
        }
    },
    toindex: function() {
        wx.navigateTo({
            url: "../index/index"
        });
    },
    bulidShopCarInfo: function() {
        var t = {};
        t.goodsId = this.data.goodsDetail.basicInfo.id, t.pic = this.data.goodsDetail.basicInfo.pic, 
        t.name = this.data.goodsDetail.basicInfo.name, t.barCode = this.data.goodsDetail.basicInfo.barCode, 
        t.stores = this.data.goodsDetail.basicInfo.stores, t.originalPrice = this.data.goodsDetail.basicInfo.originalPrice, 
        t.shopid = this.data.goodsDetail.basicInfo.shopid, t.commission = this.data.goodsDetail.basicInfo.commission, 
        t.propertyChildIds = this.data.propertyChildIds, t.label = this.data.propertyChildNames, 
        t.price = this.data.selectSizePrice, t.left = "", t.active = !0, t.number = this.data.buyNumber, 
        t.logisticsType = this.data.goodsDetail.basicInfo.logisticsId, t.logistics = this.data.goodsDetail.logistics, 
        t.weight = this.data.goodsDetail.basicInfo.weight;
        var a = this.data.shopCarInfo;
        a.shopNum || (a.shopNum = 0), a.shopList || (a.shopList = []);
        for (var o = -1, i = 0; i < a.shopList.length; i++) {
            var s = a.shopList[i];
            if (s.goodsId == t.goodsId && s.propertyChildIds == t.propertyChildIds) {
                o = i, t.number = t.number + s.number;
                break;
            }
        }
        return a.shopNum = a.shopNum + this.data.buyNumber, o > -1 ? a.shopList.splice(o, 1, t) : a.shopList.push(t), 
        a;
    },
    buliduBuyNowInfo: function() {
        var t = {};
        t.goodsId = this.data.goodsDetail.basicInfo.id, t.pic = this.data.goodsDetail.basicInfo.pic, 
        t.name = this.data.goodsDetail.basicInfo.name, t.barCode = this.data.goodsDetail.basicInfo.barCode, 
        t.stores = this.data.goodsDetail.basicInfo.stores, t.originalPrice = this.data.goodsDetail.basicInfo.originalPrice, 
        t.shopid = this.data.goodsDetail.basicInfo.shopid, t.commission = this.data.goodsDetail.basicInfo.commission, 
        t.propertyChildIds = this.data.propertyChildIds, t.label = this.data.propertyChildNames, 
        t.price = this.data.selectSizePrice, t.left = "", t.active = !0, t.number = this.data.buyNumber, 
        t.logisticsType = this.data.goodsDetail.basicInfo.logisticsId, t.logistics = this.data.goodsDetail.logistics, 
        t.weight = this.data.goodsDetail.basicInfo.weight;
        var a = {};
        return a.shopNum || (a.shopNum = 0), a.shopList || (a.shopList = []), a.shopList.push(t), 
        a;
    },
    goTop: function(t) {
        this.setData({
            scrollTop: 0
        });
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        });
    },
    fenxiangxianjin: function() {
        var t = "转发分享该商品，好友下单后可获得" + this.data.goodsDetail.basicInfo.commission + "元现金奖励。\r\n点击右下角图标分享给好友";
        wx.setClipboardData({
            data: "13970289882",
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data);
                    }
                });
            }
        }), wx.showModal({
            title: "分享有赏",
            content: t,
            success: function(t) {
                t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
            }
        });
    },
    fenxiangjifen: function() {
        var t = "转发分享该商品，好友下单后可获得" + this.data.goodsDetail.basicInfo.commission + "积分奖励\r\n点击右下角图标分享给好友";
        wx.setClipboardData({
            data: "13970289882",
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data);
                    }
                });
            }
        }), wx.showModal({
            title: "分享有赏",
            content: t,
            success: function(t) {
                t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
            }
        });
    },
    
    calling: function () {
      wx.makePhoneCall({
        phoneNumber: this.data.goodsDetail.basicInfo.barCode, //此号码并非真实电话号码，仅用于测试
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })
    },
    fxgoods: function(t) {
        wx.navigateTo({
            url: "../share/share?sid=" + this.data.this_goods_id
        });
    },
    onShareAppMessage: function(a) {
        return "button" === a.from && console.log(a.target), {
            title: this.data.goodsDetail.basicInfo.name,
            path: "/pages/goods-details/index?id=" + this.data.goodsDetail.basicInfo.id + "&inviter_id=" + t.globalData.uid,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    reputation: function(a) {
        var o = this;
        wx.request({
            url: "https://api.it120.cc/" + t.globalData.subDomain + "/shop/goods/reputation",
            data: {
                goodsId: a
            },
            success: function(t) {
                0 == t.data.code && o.setData({
                    reputation: t.data.data
                });
            }
        });
    }
});