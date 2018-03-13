Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let storageSync = wx.getStorageSync("loginInfo");
        this.setData({userInfo: storageSync['userInfo']})

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        wx.login({
            success: function (res) {
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'https://ectest.nipponpaint.com.cn/wechat/user/login',
                        data: {
                            code: res.code
                        },
                        success: function (loginData) {
                            console.log(loginData);
                            let sessionKey = loginData.data.sessionKey;
                            wx.getUserInfo({
                                success: function (userInfo) {
                                    console.log(userInfo);
                                    wx.request({
                                        url: 'https://ectest.nipponpaint.com.cn/wechat/user/info',
                                        data: {
                                            sessionKey: sessionKey,
                                            signature: userInfo.signature,
                                            rawData: userInfo.rawData,
                                            encryptedData: userInfo.encryptedData,
                                            iv: userInfo.iv,
                                            code: res.code
                                        },
                                        success: function (info) {
                                            console.log(info);

                                        }
                                    })

                                }
                            })
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
});
