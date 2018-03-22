const fetchQxx = require('../../utils/fetchQxx');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        apiUrl: "",
        pageData: [],
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
                let pageData = this.data.pageData;
                if (hasMore) {
                    pageData = this.data.pageData.concat(res.data);
                }
                for (let data of pageData) {
                    data["json"] = JSON.stringify(data)
                }
                this.setData({pageData, totalCount, pageIndex, hasMore})
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
            this.setData({"apiUrl": options.apiUrl})
        }
        this.loadMore()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.setData({pageData: [], pageIndex: 0, hasMore: true});
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
    }
});
