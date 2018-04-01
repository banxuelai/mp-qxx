const fetch = require('../../utils/fetch');
const app = getApp();

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
        if (options.login === 'REMOVE_LOGIN') {
            wx.removeStorageSync(app.config.jhpsterHeader)
        }
        fetch.loginAndFetch('/slides')
            .then(res => {
                if (res) {
                    this.setData({slides: res.data})
                }

            }).then(() => {
            return fetch.loginAndFetch('/object-groups', {sort: 'rank,asc'})
        })
            .then(res => {
                if (res) this.setData({categories: res.data})
            })
    },
    loadMore() {
    },
    searchHandle() {
        // console.log(this.data.searchText)
        this.setData({pageData: [], pageIndex: 0, hasMore: true});
        this.loadMore()
    },

    showSearchHandle() {
        this.setData({searchShowed: true})
    },
    hideSearchHandle() {
        this.setData({searchText: '', searchShowed: false})
    },
    clearSearchHandle() {
        this.setData({searchText: ''})
    },
    searchChangeHandle(e) {
        this.setData({searchText: e.detail.value})
    },
});
