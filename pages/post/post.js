// 引入数据
let data_list = require('../../data/post_data');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    succprecoll: ''
  },
  onPicTap: function(e) {
    let id = e.target.dataset.picid;
    wx.navigateTo({
      url: '/pages/post_first/post_first?id=' + id,
    })

  },
  // 点击跳转事件
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      all_key: data_list.all_data
    });

    // ---------------------------------------------------
       
  },
  onTap: (e) => {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/post_first/post_first?id=' + id,
    })

    // -------------------------------------------------------
    // let howpeo = wx.getStorageSync("come");
    // let coll = data_list.all_data[id].collection;
    //  coll = howpeo;
    // data_list.all_data[id].collection = coll;

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})