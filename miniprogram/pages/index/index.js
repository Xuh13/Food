// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowDate: '',
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
    ],
    active:0,
    Search:'',
    list:[]
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
      url: '../details/details',
    })
  },
  
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  a() {
    let that = this
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'index_in',
        // 传给云函数的参数
        success(res) {
          
          let l = []
          for (let i = 0; i < res.result.data.length; i++) {
            l.push(res.result.data[i].Recipe_id)
          }
          console.log(l)
          that.setData({
            list: l
          })
          resolve()
        },
        fail: console.error
      })
    })
  },
  jump(e){
    console.log(e)
    let u = '../flist/flist?food_id=' + e.currentTarget.dataset.rid;
    wx.navigateTo({
      url: u
    })
    
  },
  onLoad: function(options) {
    let that = this
    this.a().then(success=>{
      wx.cloud.callFunction({
        // 云函数名称
        name: 'index',
        // 传给云函数的参数
        data:{
          list:that.data.list
        },
        success(res) {
          console.log(res)
         
          that.setData({
            list: res.result.data
          })
        },
        fail: console.error
      })
    })
    this.setData({
      search: this.search.bind(this),
      nowDate: this.CurrentTime(),
    })
  },
  search(e){
    console.log(this.data.Search)
    wx.navigateTo({
      url: '../search_list/search_list?id=' + this.data.Search+'&type=1',
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

  },
  inputSearch(e) {
    this.setData({
      Search: e.detail.value
    })
  },
})