const fetch = require('../../utils/fetch')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    shop: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
      this.setData({ shop: options })
  },

  previewHandle (e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.shop.sinaUrl
    })
  }
})
