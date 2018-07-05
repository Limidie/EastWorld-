const app = getApp()

Page({
  data: {
    balance: 0,
    freeze: 0,
    score: 0,
    score_sign_continuous: 0
  },
  mygoorderlist: function (a) {

    wx.navigateTo({
      url: "/pages/order-list/index"
    });
  },
  onLoad() {

  },
  onShow() {
    let that = this;
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    } else {
      that.setData({
        userInfo: userInfo,
        version: app.globalData.version
      })
    }
    this.getUserApiInfo();
    this.getUserAmount();
    this.checkScoreSign();
  },

  getPhoneNumber: function (a) {
    if (a.detail.errMsg && "getPhoneNumber:ok" == a.detail.errMsg) {
      var e = this;
      wx.request({
        url: "https://api.it120.cc/" + t.globalData.subDomain + "/user/wxapp/bindMobile",
        data: {
          token: t.globalData.token,
          encryptedData: a.detail.encryptedData,
          iv: a.detail.iv
        },
        success: function (t) {
          0 == t.data.code ? (wx.showToast({
            title: "绑定成功",
            icon: "success",
            duration: 2e3
          }), e.getUserApiInfo()) : wx.showModal({
            title: "提示",
            content: "绑定失败",
            showCancel: !1
          });
        }
      });
    } else wx.showModal({
      title: "提示",
      content: "无法获取手机号码",
      showCancel: !1
    });
  },
  getUserApiInfo: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/detail',
      data: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            apiUserInfoMap: res.data.data,
            userMobile: res.data.data.base.mobile
          });
        }
      }
    })

  },
  getUserAmount: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/amount',
      data: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            balance: res.data.data.balance,
            freeze: res.data.data.freeze,
            score: res.data.data.score
          });
        }
      }
    })

  },
  checkScoreSign: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/score/today-signed',
      data: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            score_sign_continuous: res.data.data.continuous
          });
        }
      }
    })
  },
  scoresign: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/score/sign',
      data: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.getUserAmount();
          that.checkScoreSign();
        } else {
          wx.showModal({
            title: '错误',
            content: res.data.msg,
            showCancel: false
          })
        }
      }
    })
  },
  relogin: function () {
    wx.navigateTo({
      url: "/pages/authorize/index"
    })
  },
  recharge: function () {
    wx.navigateTo({
      url: "/pages/recharge/index"
    })
  },
  jifenduihuan: function () {
    wx.navigateTo({
      url: "/pages/vip/index"
    });
  },
  withdraw: function () {
    wx.navigateTo({
      url: "/pages/withdraw/index"
    })
  },
  onSyncWechatInfo: function () {
    var t = this;
    requestUtil.isLoading(this.syncWechatInfoId) || util.getUserInfo(function (a) {
      t.syncWechatInfoId = requestUtil.post(API_USER_INFO_SAVE_URL, {
        nickname: a.nickName,
        avatarUrl: a.avatarUrl,
        sex: a.gender
      }, function (a) {
        console.log(a), wx.showToast({
          title: "同步成功！",
          icon: "success",
          duration: 2e3
        });
        var e = _.extend(t.data.userInfo || {}, a);
        t.setData({
          userInfo: e
        });
      });
    });
  },
  onToggleTap: function (t) {
    var a = t.currentTarget.dataset.name, e = _.find(this.data.menus, {
      name: a
    });
    e && (e.isshow = !e.isshow, this.setData({
      menus: this.data.menus
    }));
  }
})