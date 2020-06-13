// pages/category/category.js
Page({
  
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
      src: "cloud://recipes-obnmd.7265-recipes-obnmd-1301654443/白菜1.jpg",
      name: "醋溜白菜",
      txt: "酸酸辣辣的，这酸爽~~~O(∩_∩)O~",
      tags: ["蔬菜","白菜","酸辣"]
    }, {
      id: 1,
      src: "cloud://recipes-obnmd.7265-recipes-obnmd-1301654443/白菜2.jpg",
      name: "干煸白菜",
      txt: "如果把酸辣土豆丝比喻为“大众情人”的话 那么干煸白菜就是“梦中情人",
      tags: ["家常菜","秋季食谱"]
    }, {
      id: 2,
      src: "cloud://recipes-obnmd.7265-recipes-obnmd-1301654443/白菜3.jpg",
      name: "砂锅白菜炖豆腐",
      txt: "白菜最家常的做法就是大白菜和豆腐一起炖烧了，做法简单却是营养滋补",
      tags: ["家常菜","冬季食谱"]
    }],
    test:[]
  },

  search(e) {
    console.log(this.data.Search)
    wx.navigateTo({
      url: '../search_list/search_list?id=' + this.data.Search + '&type=1',
    })
  },
  inputSearch(e) {
    this.setData({
      Search: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //分类搜索  关键字 
    if(options.type==1){
      this.setData({
        Search:options.id
      })
    }
    wx.cloud.callFunction({
      // 云函数名称
      name: 'search_list_in',
      // 传给云函数的参数
      data: {
        id: options.id,
        type:options.type
      },
      success(res) {
        console.log(res)
        that.setData({
          test: res.result.data
        })
      },
      fail: console.error
    })
    search: this.search.bind(this)
 
  },

  jump(event){
    console.log(event);
    let u = '../flist/flist?food_id=' + event.currentTarget.id;
    wx.navigateTo({
      url: u
    })
  },

  search(e) {
    console.log(this.data.Search)
    wx.navigateTo({
      url: '../search_list/search_list?id=' + this.data.Search + '&type=1',
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
  }
})