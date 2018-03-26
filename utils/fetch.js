const app = getApp();
const login = require('login');
module.exports.fetch = (url, data, method = 'GET', header = {}) => {
    wx.showLoading({title: 'Loading...'});
    return new Promise((resolve, reject) => {
        wx.request({
            url: app.config.apiBase + url,
            data,
            header,
            method,
            dataType: 'json',
            success: function (data, statusCode, header) {
                console.log(data);
                console.log(statusCode);
                console.log(header);
                resolve(data)
            },
            fail: reject,
            complete: wx.hideLoading
        })
    })
};
module.exports.loginAndFetch = (url, data, method = 'GET', header = {}) => {
    wx.showLoading({title: 'Loading...'});
    return login().then(res => {
        Object.assign(header, res);
        console.log("RequestHeader:" + res.Authorization);
        console.log("Fetch->Promise.......1");
        return new Promise((resolve, reject) => {
            console.log("Fetch->Promise.......2");
            wx.request({
                url: app.config.apiBaseApi + url,
                data,
                header,
                method,
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if (data.data.status === 401) {
                        reject(401);
                    } else {
                        resolve(data)
                    }
                },
                fail: reject,
                complete: wx.hideLoading
            })
        })
    }).catch((vaule) => {
            console.log("Fetch->Promise.......3");
            if (vaule === 401) {
                wx.navigateTo({
                    url: '/pages/index/index?act=REMOVE_LOGIN'
                })
            }
        }
    )
        ;

};


