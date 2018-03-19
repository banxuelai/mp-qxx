const app = getApp();

module.exports = (url, data, method = 'GET', header = {}) => {
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
