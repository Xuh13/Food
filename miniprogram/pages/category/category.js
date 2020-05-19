// pages/category/category.js
Page({
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

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    box_list: [{
      id: 0,
      src: "cloud://recipes-obnmd.7265-recipes-obnmd-1301654443/蔬菜.png",
      name: "白菜",
      txt: "冬日白菜美如笋\n菜里唯有白菜鲜"
    }, {
      id: 1,
      src: "cloud://recipes-obnmd.7265-recipes-obnmd-1301654443/白萝卜.png",
      name: "白萝卜",
      txt: "冬吃萝卜夏吃姜\n不劳医生开药方"
    }, {
      id: 2,
      src: "cloud://recipes-obnmd.7265-recipes-obnmd-1301654443/菠菜.png",
      name: "菠菜",
      txt: "菠菜豆腐虽贱\n山珍海味不换"
    }, {
      id: 3,
      src: "cloud://recipes-obnmd.7265-recipes-obnmd-1301654443/韭菜.png",
      name: "韭菜",
      txt: "韭菜花开心一枝\n花正黄时叶正肥"
    }, ]
  },

  jump:function(event){
    wx.navigateTo({
      url: '/pages/search_list/search_list?id=' + event.currentTarget.id,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let test = 0;
    let that = this;
    wx.cloud.init()
    wx.cloud.callFunction({
      // 云函数名称
      name: 'category_in',
      // 传给云函数的参数
      data: {
        id: test
      },
      success(res) {
        that.setData({
          box_list: res.result.data
        })
      },
      fail: console.error
    })

    search: this.search.bind(this)
    
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