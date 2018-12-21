var app = getApp();
var unitl = require('../../../unitl/unitl.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie :"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let movId = options.id;

    var url = app.globalData.doubanBase +
      '/v2/movie/subject/' + movId

    unitl.http(url, this.processMovieData)


  },

  processMovieData: function(data) {
      if(!data){
        return;
      }
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie = {
      // 图片地址
      movieImg: data.images ? data.images.large : "",
      // 国家
      country: data.countries[0],
      // 主题
      title: data.title,
      // 主题
      originaTitle: data.original_title,
      // 赞
      wishCount: data.wish_count,
      // 评论
      commentCount: data.comments_count,
      // 年
      year: data.year,
      // 转换为字符串
      generes: data.genres.join("、"),
      stars: unitl.getStarall(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: unitl.converToCastString(data.casts),
      castInfo: unitl.converTcastInfos(data.casts),
      summary: data.summary
    }






    console.log(movie)


    this.setData({
      movie: movie
    })


  }

})