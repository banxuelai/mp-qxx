App({
    config: {
        apiBase: 'https://locally.uieee.com',
        apiBaseQxx: 'https://socialtest.icolor.com.cn/api/wx',
        apiLogin: 'https://socialtest.icolor.com.cn/wechat/user/login'
    }, onLaunch: function () {
        wx.login({
            success: function (res) {
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'https://socialtest.icolor.com.cn/wechat/user/login',
                        data: {
                            code: res.code
                        },
                        success:function (data) {
                            console.log(data);
                            wx.getUserInfo({
                                success:function (data) {
                                  wx.setStorageSync("loginInfo",data);

                                }
                            })
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    }
});
