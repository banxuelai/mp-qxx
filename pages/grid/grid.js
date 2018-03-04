const fetch = require('../../utils/fetch');
const fetchQxx = require('../../utils/fetchQxx');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        apiUrl: "",
        category: null,
        cars: [],
        pageIndex: 0,
        pageSize: 20,
        totalCount: 0,
        hasMore: true
    },

    loadMore() {
        let {pageIndex, pageSize, searchText} = this.data;
        const params = {page: pageIndex++, size: pageSize};
        if (searchText) params['name.contains'] = searchText;

        return fetchQxx(this.data.apiUrl, params)
            .then(res => {
                const totalCount = parseInt(res.header['X-Total-Count']);
                const hasMore = this.data.pageIndex * this.data.pageSize < totalCount;
                let cars = this.data.cars;
                if (hasMore) {
                    cars = this.data.cars.concat(res.data);
                }
                this.setData({cars, totalCount, pageIndex, hasMore})
            })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (options.title) {
            wx.setNavigationBarTitle({title: options.title});
        }
        if (options.apiUrl) {
            this.setData("apiUrl", `/animals`)
        }
        this.loadMore()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.setData({cars: [], pageIndex: 0, hasMore: true});
        this.loadMore().then(() => wx.stopPullDownRefresh())
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        // TODO：节流
        this.loadMore()
    },

    searchHandle() {
        // console.log(this.data.searchText)
        this.setData({cars: [], pageIndex: 0, hasMore: true});
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
    }
});
