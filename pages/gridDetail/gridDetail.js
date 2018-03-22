const fetchQxx = require('../../utils/fetchQxx');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        audioURL: "/audio",
        gridData: {},
        innerAudioContext: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let gridData = JSON.parse(options.data);
        let that = this;
        this.setData({gridData: JSON.parse(options.data)});
        fetchQxx(this.data.audioURL + "/" + gridData['audioId']).then(res => {
            const innerAudioContext = wx.createInnerAudioContext();
            innerAudioContext.autoplay = true;
            innerAudioContext.src = res.data.url;
            console.log(res.data.url);
            innerAudioContext.onPlay(() => {
                console.log('开始播放')
            });
            innerAudioContext.onError((res) => {
                console.log(res.errMsg);
                console.log(res.errCode)
            });
            that.setData({innerAudioContext: innerAudioContext});
        });


    },
    onUnload: function () {
        if (this.data.innerAudioContext) {
            this.data.innerAudioContext.destroy();
        }

    },

    audioPlay: function () {
        if (this.data.innerAudioContext) {
            this.data.innerAudioContext.play();
        }
    },

    previewHandle(e) {
        wx.previewImage({
            current: e.target.dataset.src,
            urls: this.data.gridData.sinaUrl
        })
    }

});
