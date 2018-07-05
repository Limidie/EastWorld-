var t = require("../../utils/city.js"), i = getApp();

Page({
    data: {
        provinces: [],
        citys: [],
        districts: [],
        selProvince: "请选择",
        selCity: "请选择",
        selDistrict: "请选择",
        selProvinceIndex: 0,
        selCityIndex: 0,
        selDistrictIndex: 0
    },
    bindCancel: function() {
        wx.navigateBack({});
    },
    bindSave: function(a) {
        var e = this, s = a.detail.value.linkMan, d = a.detail.value.address, n = a.detail.value.mobile, c = a.detail.value.code;
        if ("" != s) if ("" != n) if ("请选择" != this.data.selProvince) if ("请选择" != this.data.selCity) {
            var l, r = t.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].id;
            if (l = "请选择" != this.data.selDistrict && this.data.selDistrict ? t.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[this.data.selDistrictIndex].id : "", 
            "" != d) {
                var o = "add", h = e.data.id;
                h ? o = "update" : h = 0, wx.request({
                    url: "https://api.it120.cc/" + i.globalData.subDomain + "/user/shipping-address/" + o,
                    data: {
                        token: i.globalData.token,
                        id: h,
                        provinceId: t.cityData[this.data.selProvinceIndex].id,
                        cityId: r,
                        districtId: l,
                        linkMan: s,
                        address: d,
                        mobile: n,
                        code: c,
                        isDefault: "true"
                    },
                    success: function(t) {
                        if (0 != t.data.code) return wx.hideLoading(), void wx.showModal({
                            title: "失败",
                            content: t.data.msg,
                            showCancel: !1
                        });
                        wx.navigateBack({});
                    }
                });
            } else wx.showModal({
                title: "提示",
                content: "请填写详细地址",
                showCancel: !1
            });
        } else wx.showModal({
            title: "提示",
            content: "请选择地区",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择地区",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请填写手机号码",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请填写联系人姓名",
            showCancel: !1
        });
    },
    initCityData: function(i, a) {
        if (1 == i) {
            for (var e = [], s = 0; s < t.cityData.length; s++) e.push(t.cityData[s].name);
            this.setData({
                provinces: e
            });
        } else if (2 == i) {
            for (var e = [], d = a.cityList, s = 0; s < d.length; s++) e.push(d[s].name);
            this.setData({
                citys: e
            });
        } else if (3 == i) {
            for (var e = [], d = a.districtList, s = 0; s < d.length; s++) e.push(d[s].name);
            this.setData({
                districts: e
            });
        }
    },
    bindPickerProvinceChange: function(i) {
        var a = t.cityData[i.detail.value];
        this.setData({
            selProvince: a.name,
            selProvinceIndex: i.detail.value,
            selCity: "请选择",
            selCityIndex: 0,
            selDistrict: "请选择",
            selDistrictIndex: 0
        }), this.initCityData(2, a);
    },
    bindPickerCityChange: function(i) {
        var a = t.cityData[this.data.selProvinceIndex].cityList[i.detail.value];
        this.setData({
            selCity: a.name,
            selCityIndex: i.detail.value,
            selDistrict: "请选择",
            selDistrictIndex: 0
        }), this.initCityData(3, a);
    },
    bindPickerChange: function(i) {
        var a = t.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[i.detail.value];
        a && a.name && i.detail.value && this.setData({
            selDistrict: a.name,
            selDistrictIndex: i.detail.value
        });
    },
    onLoad: function(t) {
        var a = this;
        this.initCityData(1);
        var e = t.id;
        e && (wx.showLoading(), wx.request({
            url: "https://api.it120.cc/" + i.globalData.subDomain + "/user/shipping-address/detail",
            data: {
                token: i.globalData.token,
                id: e
            },
            success: function(t) {
                if (wx.hideLoading(), 0 == t.data.code) return a.setData({
                    id: e,
                    addressData: t.data.data,
                    selProvince: t.data.data.provinceStr,
                    selCity: t.data.data.cityStr,
                    selDistrict: t.data.data.areaStr
                }), void a.setDBSaveAddressId(t.data.data);
                wx.showModal({
                    title: "提示",
                    content: "无法获取快递地址数据",
                    showCancel: !1
                });
            }
        }));
    },
    setDBSaveAddressId: function(i) {
        for (var a = 0; a < t.cityData.length; a++) if (i.provinceId == t.cityData[a].id) {
            this.data.selProvinceIndex = a;
            for (var e = 0; e < t.cityData[a].cityList.length; e++) if (i.cityId == t.cityData[a].cityList[e].id) {
                this.data.selCityIndex = e;
                for (var s = 0; s < t.cityData[a].cityList[e].districtList.length; s++) i.districtId == t.cityData[a].cityList[e].districtList[s].id && (this.data.selDistrictIndex = s);
            }
        }
    },
    selectCity: function() {},
    deleteAddress: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "确定要删除该收货地址吗？",
            success: function(t) {
                t.confirm ? wx.request({
                    url: "https://api.it120.cc/" + i.globalData.subDomain + "/user/shipping-address/delete",
                    data: {
                        token: i.globalData.token,
                        id: a
                    },
                    success: function(t) {
                        wx.navigateBack({});
                    }
                }) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    readFromWx: function() {
        var i = this;
        wx.chooseAddress({
            success: function(a) {
                for (var e = a.provinceName, s = a.cityName, d = a.countyName, n = 0; n < t.cityData.length; n++) if (e == t.cityData[n].name) {
                    i.data.selProvinceIndex = n;
                    for (var c = 0; c < t.cityData[n].cityList.length; c++) if (s == t.cityData[n].cityList[c].id) {
                        i.data.selCityIndex = c;
                        for (var l = 0; l < t.cityData[n].cityList[c].districtList.length; l++) d == t.cityData[n].cityList[c].districtList[l].id && (i.data.selDistrictIndex = l);
                    }
                }
                i.setData({
                    wxaddress: a,
                    selProvince: e,
                    selCity: s,
                    selDistrict: d
                });
            }
        });
    }
});