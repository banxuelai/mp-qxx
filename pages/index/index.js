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
        fetch.fetchAvailable('/slides').then(res => {
            if (res && res.data.length > 0) {
                this.setData({slides: res.data})
            } else {
                let slides = [];
                let obj = {};
                obj['imgUrl'] = 'http://wx4.sinaimg.cn/mw690/006anqYkgy1fp13mf4chtj30go0b5t9b.jpg';
                slides.push(obj);
                this.setData({slides});
            }
        });
        fetch.fetchAvailable('/word-groups', {sort: 'rank,asc'}).then(res => {
            if (res) this.setData({categories: res.data})
        });


    },
    loadMore() {
    },
    searchHandle() {
        wx.navigateTo({
            url: '/pages/searchGrid/searchGrid?searchText=' + this.data.searchText
        })
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
