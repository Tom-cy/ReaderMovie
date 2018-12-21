var app = getApp();
var unitl = require('../../unitl/unitl.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchtext: "",
    valu: "",
    inTheatersUrl: {},
    comingSoonUrl: {},
    top250Url: {},
    searchUrl: {},
    idx: 0,
    xxx: false,
    bodymovie: true,
    searchmovie: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(event) {
    var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=3&count=3';
    var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=3&count=3';
    var top250Url = app.globalData.doubanBase + '/v2/movie/top250' + '?start=3&count=3';

    this.getMovie(inTheatersUrl, 'inTheatersUrl', "正在热映");
    this.getMovie(comingSoonUrl, 'comingSoonUrl', "即将上映");
    this.getMovie(top250Url, 'top250Url', "奥斯卡影片");

  },
  // 获取电影发送请求
  getMovie: function(url, setKey, category) {
    var that = this
    wx.request({
      url: url,
      method: "get",
      header: {
        'content-type': "json"
      },
      success(res) {
        that.processMovieData(res.data, setKey, category);
      }
    })
  },
  processMovieData: function(movieDouban, setKey, category) {
    var movie = [];
    for (var idx in movieDouban.subjects) {
      var subject = movieDouban.subjects[idx];
      var movieTitle = subject.title;
      var movieaverage = subject.rating.average;
      var movieimages = subject.images.large;
      var movieid = subject.id;
      var moviestars = subject.rating.stars;

      if (movieTitle.length >= 6) {
        movieTitle = movieTitle.substring(0, 6) + "...";
      }
      var temp = {
        stars: unitl.getStarall(moviestars),
        movieTitle: movieTitle,
        movieaverage: movieaverage,
        movieimages: movieimages,
        movieid: movieid
      }
      movie.push(temp);
    }
    var movieList = {};
    movieList[setKey] = {
      movie: movie,
      category: category
    };
    // 数据完成
    this.setData(movieList);
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  // -----------------------------------------------
  OnmovieTap: function (event) {
    let movid = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "/pages/movie/movie-detail/movie-detail?id=" + movid ,
    })
  },

    // -------------------------------------------------------------------------------
  onMore: function(event) {
    let morego = event.currentTarget.dataset.catery;
    wx.navigateTo({
      url: "/pages/movie-more/movie-more?catery=" + morego,
    })
  },

  // 下拉更新、
  onPullDownRefresh: function(event) {
    this.data.idx += 3;
    var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=' + this.data.idx + '&count=3';
    var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=' + this.data.idx + '&count=3';
    var top250Url = app.globalData.doubanBase + '/v2/movie/top250' + '?start=' + this.data.idx + '&count=3';

    this.getMovie(inTheatersUrl, 'inTheatersUrl', "正在热映");
    this.getMovie(comingSoonUrl, 'comingSoonUrl', "即将上映");
    this.getMovie(top250Url, 'top250Url', "奥斯卡影片");

    wx.showNavigationBarLoading();
  },
  // 电影搜索---------------------------------------------
  // xxx事件
  xxxxxx: function(e) {
    let val = this.data.searchtext;
    val = "";
    this.setData({
      searchmovie: false,
      bodymovie: true,
      xxx: false,
      searchtext: val
    })
  },
  // 搜索小黄片专用
  onBindChange: function(e) {
    let val = e.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + val;
    this.getMovie(searchUrl, "searchUrl", "小黄片大集合");
    this.setData({
      searchtext: val
    })
  },
 


  // 看小黄片专用
  onBindFocus: function() {
    this.setData({
      searchmovie: true,
      bodymovie: false,
      xxx: true,
      searchUrl: ""
    })
      
  }

})