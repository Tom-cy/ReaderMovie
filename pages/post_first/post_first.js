let data_list = require('../../data/post_data');
const InnerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    isplayMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id;
    let firdata = data_list.all_data[id];
    this.setData({
      data: firdata,
      id: id
    })
    // //   // 获取文中所有的状态------------收藏
    var getCollection = wx.getStorageSync('get-coll');
    if (getCollection) {
      //   // 获取当前一个的状态
      var oneCollection = getCollection[id];
      if (oneCollection) {
        this.setData({
          collected: oneCollection
        })
      }
    } else {
      let getCollection = {};
      getCollection[id] = false;
      wx.setStorageSync('get-coll', getCollection);
    }
    // ---------------------------------------------------------------------------------
    // let peo = data_list.all_data[id].collection;
    // let manypeo = ++peo;
    // wx.setStorageSync('come', manypeo);

  },
  
  oncollected: function(event) {
    var allCollection = wx.getStorageSync('get-coll');
    var oneCollection = allCollection[this.data.id];
    oneCollection = !oneCollection;
    allCollection[this.data.id] = oneCollection;
    wx.setStorageSync('get-coll', allCollection);
    this.setData({
      collected: oneCollection
    })

    wx.showToast({
      title: oneCollection ? '收藏成功' : '取消成功',
      icon: '',
      duration: 1500,
      mask: true,
    })
    // ---------------------------------------------
    // let id = this.data.id;
    // let precoll = data_list.all_data[id].collection;
    // console.log(oneCollection)
    // if (oneCollection ){
    //   precoll = +precoll +1
    // }else{
    //   precoll = +precoll - 1;
    // }
    // data_list.all_data[id].collection = precoll;
    // wx.setStorage({
    //   key: 'succprecoll',
    //   data: 'precoll',
    // })
  },
  onshare: function(event) {
    let arr = [
      "分享到微信",
      "分享到QQ",
      "分享到你家",
      "分享到我家",
      "分享到如家"
    ]
    wx.showActionSheet({
      itemList: arr,
      itemColor: "#405f80",
      success: function(res) {
        wx.showModal({
          title: '是否确认' + arr[res.tapIndex],
          content: '如家999不见不散',
        })
      }
    })
  },

  // 播放音乐
  onMusic: function() {
    let isplayMusic = this.data.isplayMusic;
    if (isplayMusic) {
      InnerAudioContext.pause();
      this.setData({
        isplayMusic: false
      })
    } else {
      InnerAudioContext.play();
      this.setData({
        isplayMusic: true
      })
    }

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
    // 来点Music
    let src = data_list.all_data[this.data.id].musicsrc;
    InnerAudioContext.src = src;
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