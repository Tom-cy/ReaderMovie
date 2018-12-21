var app = getApp();
var unitl = require('../../unitl/unitl.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: "",
    motitle: "",
    teUrl: "",
    isEmpty: true,
    toMoive: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var movietitle = options.catery;
    this.motitle = movietitle;
    var dataUrl = "";
    switch (movietitle) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
        break;
      case "奥斯卡影片":
        dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
        break;
    }
    unitl.http(dataUrl, this.processMovieData);
    this.data.teUrl = dataUrl;
  },
  // 电影地址数据、
  processMovieData: function(movieDouban) {
    var movie = [];
    for (var idx in movieDouban.subjects) {
      var subject = movieDouban.subjects[idx];
      var movieTitle = subject.title;
      var movieaverage = subject.rating.average;
      var movieimages = subject.images.large;
      var movieid = subject.id;
      var movietars = subject.rating.stars;

      if (movieTitle.length >= 6) {
        movieTitle = movieTitle.substring(0, 6) + "...";
      }
      var temp = {
        stars: unitl.getStarall(movietars),
        movieTitle: movieTitle,
        movieaverage: movieaverage,
        movieimages: movieimages,
        movieid: movieid
      }
      movie.push(temp);
    }
    // 数据叠加
    var concatMoive = {}
    if (!this.data.isEmpty) {
      concatMoive = this.data.movie.concat(movie);

    } else {
      concatMoive = movie;
      this.data.isEmpty = false;
    }

    this.setData({
      movie: concatMoive
    })

    this.data.toMoive += 20;
    // 数据完成
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let til = this.motitle;
    // 设置电影头
    wx.setNavigationBarTitle({
      title: til,
    })

  },
  // --------------------------------------
  OnmovieTap: function (event) {
    let movid = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "/pages/movie/movie-detail/movie-detail?id=" + movid,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
     this.data.toMoive += 10;
     
    let preUrl = this.data.teUrl + '?start=' + this.data.toMoive + '&count=10';
 
    this.data.isEmpty = false;
    unitl.http(preUrl, this.processMovieData);
    wx.showNavigationBarLoading();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    
    let nextUrl = this.data.teUrl + '?start=' + this.data.toMoive + '&count=10';
    unitl.http(nextUrl, this.processMovieData);
    wx.showNavigationBarLoading();
  }

})