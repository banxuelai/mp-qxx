const app = getApp();

module.exports = (formId='') => {
    let header = {};
    let jhipsterHeader = wx.getStorageSync(app.config.jhpsterHeader);
    if (jhipsterHeader) {
        if (jhipsterHeader.header.Authorization)
            header.Authorization = jhipsterHeader.header.Authorization;
        return new Promise(resolve => {
            console.log("Promise.......1");
            resolve(header);
        })
    } else {
        return new Promise((resolve, reject) => {
            console.log("Promise.......2");
            wx.login({success: resolve, fail: reject})
        }).then(res => {
            return new Promise((resolve, reject) => {
                console.log("Promise.......3");
                wx.request({
                    url: app.config.apiLogin,
                    data: {
                        code: res.code,
                        formId:formId
                    }, success: function (jhipsterHeader) {
                        if (!jhipsterHeader || !jhipsterHeader.header || jhipsterHeader.header.Authorization === "NO_USER") {
                            reject(jhipsterHeader);
                        } else {
                            resolve(jhipsterHeader);
                        }
                    }, fail: function (error) {
                        console.log(error);
                    }, complete: function () {
                        console.log("complete")
                    }
                })
            }).then(jhipsterHeader => {
                wx.setStorageSync(app.config.jhpsterHeader, jhipsterHeader);
                return new Promise(resolve => {
                    console.log("Promise.......4");
                    resolve({Authorization: jhipsterHeader.header.Authorization})
                })
            })
                .catch((jhipsterHeader) => {
                        console.log("catch.......");
                        return new Promise((resolve, reject) => {
                            console.log("Promise.......5");
                            wx.getUserInfo({
                                success: function (data) {
                                    Object.assign(data, {WxSessionKey: jhipsterHeader.header.WxSessionKey});
                                    resolve(data);
                                },
                                fail: function (error) {
                                    console.log(error);
                                    reject(error);
                                }
                            })
                        }).then(userInfo => {
                            return new Promise((resolve, reject) => {
                                console.log("Promise.......6");
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
                                    success: function (jhipsterHeader) {
                                        console.log("用户创建:" + jhipsterHeader);
                                        wx.setStorageSync(app.config.jhpsterHeader, jhipsterHeader);
                                        resolve({Authorization: jhipsterHeader.header.Authorization})
                                    }, fail: reject
                                })
                            })

                        })
                    }
                ).catch(error => {
                    console.log("Login Last catch.....");
                    console.log(error);
                    wx.hideLoading();
                    return new Promise(resolve => {
                        wx.showToast({
                            title: app.message.unAuth,
                            icon: "none",
                            duration: 5000
                        });
                        throw new Error(error);
                    })
                })

        });

    }


};

