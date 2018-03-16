const app = getApp();
const login = require('login');
module.exports = (url, data, method = 'GET', header = {}) => {
    wx.showLoading({title: 'Loading...'});
    return login().then(res => {
        Object.assign(header, res);
        return new Promise((resolve, reject) => {
            wx.request({
                url: app.config.apiBaseQxx + url,
                data,
                header,
                method,
                dataType: 'json',
                success: resolve,
                fail: reject,
                complete: wx.hideLoading
            })
        })
    });

};
