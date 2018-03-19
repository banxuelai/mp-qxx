App({
    config: {
        apiBase: 'https://ectest.nipponpaint.com.cn/api',
        apiBaseQxx: 'https://ectest.nipponpaint.com.cn/api',
        apiLogin: 'https://ectest.nipponpaint.com.cn/wechat/user/login',
        apiUserInfo: 'https://ectest.nipponpaint.com.cn/wechat/user/info',
        jhpsterHeader: "jhpsterHeader"
    },
    message: {
        error: "错误,请重刷新重试,或者联系工作人员",
        unAuth: "错误,您未同意",
        timeOut: "连接超时"
    }
    , onLaunch: function () {

    }
});
