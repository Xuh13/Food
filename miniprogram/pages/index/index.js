// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    autoplay: true,
    dotsBoll: false,
    interval: 3000,
    duration: 1000,
    current: 0,
    imageUrls: [
      'cloud://recipes-obnmd.7265-recipes-obnmd-1301654443/白菜1.jpg',
      'cloud://recipes-obnmd.7265-recipes-obnmd-1301654443/timg.jpg',
      'cloud://recipes-obnmd.7265-recipes-obnmd-1301654443/timg (2).jpg'
    ]
  },

  intervalChange: function (e) {//自动切换时间间隔
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {//滑动动画时长
    duration: e.detail.value
  },
  changeIndicatorDots: function (e) {//是否显示小圆圈
    this.setData({
      dotsBoll: !this.data.dotsBoll
    })
  },
  changeAutoplay: function (e) {//是否自动播放
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  swipclick: function (e) {//点击图片触发事件
    console.log(this.data.imageUrls[this.data.current]);
  },
  bindchange: function (e) {//轮播图发生改变
    this.setData({
      current: e.detail.current
    })
    nowDate: ''
  },

  search: function(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{
          text: '搜索结果',
          value: 1
        }, {
          text: '搜索结果2',
          value: 2
        }])
      }, 200)
    })
  },
  selectResult: function(e) {
    console.log('select result', e.detail)
  },

  CurrentTime: function() {
    var myDate= new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    return month + "月" + day + "日";
  },

  goToShareMine:function(){
    wx.navigateTo({
      url: '../share/share',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      search: this.search.bind(this),
      nowDate: this.CurrentTime(),
    })
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