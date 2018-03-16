const app = getApp();

module.exports = () => {
    let header = {};
    let jhipsterHeader = wx.getStorageSync(app.config.jhpsterHeader);
    if (jhipsterHeader) {
        if (jhipsterHeader.header.Authorization) header.Authorization = jhipsterHeader.header.Authorization;
        return new Promise(resolve => {
            resolve(header);
        })
    } else {
        return new Promise((resolve, reject) => {
            wx.login({success: resolve, fail: reject})
        }).then(res => {
            return new Promise((resolve, reject) => {
                wx.request({
                    url: app.config.apiLogin,
                    data: {
                        code: res.code
                    }, success: function (jhipsterHeader) {
                        if (!jhipsterHeader || !jhipsterHeader.header || jhipsterHeader.header.Authorization === "NO_USER") {
                            reject(jhipsterHeader);
                        } else {
                            resolve(jhipsterHeader);
                        }
                    }
                })
            }).then(jhipsterHeader => {
                wx.setStorageSync(app.config.jhpsterHeader, jhipsterHeader);
                return new Promise(resolve => {
                    resolve({Authorization: jhipsterHeader.header.Authorization})
                })
            })
                .catch((jhipsterHeader) => {
                        return new Promise(resolve => {
                            wx.getUserInfo({
                                success: function (data) {
                                    Object.assign(data, {WxSessionKey: jhipsterHeader.header.WxSessionKey});
                                    resolve(data);
                                }
                            })
                        })
                    }
                ).then(userInfo => {
                    return new Promise(resolve => {
                        wx.request({
                            url: app.config.apiUserInfo,
                            data: {
                                sessionKey: userInfo.WxSessionKey,
                                signature: userInfo.signature,
                                rawData: userInfo.rawData,
                                encryptedData: userInfo.encryptedData,
                                iv: userInfo.iv,
                                code: res.code
                            },
                            success: resolve
                        })
                    })

                })

        });

    }


};

