const fetchQxx = require('../../utils/fetchQxx');
const login = require('../../utils/login');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        slides: [],
        categories: []
    },

    onPullDownRefresh() {
        this.onLoad({});
        wx.stopPullDownRefresh();
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        fetchQxx('/slides')
            .then(res => {
                this.setData({slides: res.data})
            }).then(() => {
            return fetchQxx('/categories')
        })
            .then(res => {
                this.setData({categories: res.data})
            })
    }
});
