const fetch = require('../../utils/fetchQxx');
const app = getApp();

const login = require('../../utils/login');
Page({
    data: {
        balance: 0,
        freeze: 0,
        score: 0,
        score_sign_continuous: 0
    },
    onLoad() {

    },
    onShow() {
        fetch("/account").then(value => {
            this.setData({userInfo: value.data});
        })
    },
    profile: function () {
        wx.navigateTo({
            url: '../settings/settings'
        })
    },
    aboutUs: function () {
        wx.showModal({
            title: '关于我们',
            content: '我们是新新的家人',
            showCancel: false
        })
    },


    relogin: function (e) {
        wx.removeStorageSync(app.config.jhpsterHeader);
        login(e.detail.formId).then(res => {
            if (res.Authorization) {
                wx.showModal({
                    title: '登录成功',
                    content: '登录成功',
                    showCancel: false
                })
            }
        });
    }
});