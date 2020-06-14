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
    collect:[],
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
  getCollection(){
    let that = this
    return new Promise((resolve,reject)=>{
      wx.cloud.callFunction({
        // 云函数名称
        name: 'mine',
        // 传给云函数的参数
        success(res) {
          let collection = []
          for(let i = 0 ;i<res.result.data.length;i++){
            collection.push(res.result.data[i].Recipe_id)
          }
          that.setData({
            collect: collection
          })
          resolve()
        },
        fail: console.error
      })
    })
  },
  onLoad: function (options) {
    let that = this;
    //分类搜索  关键字 
    if (options.type == 3) {
      this.getCollection().then(success => {
        console.log(that.data.collect[0])
        wx.cloud.callFunction({
          // 云函数名称
          name: 'search_list_in',
          // 传给云函数的参数
          data: {
            id: options.id,
            type: options.type,
            collect: that.data.collect
          },
          success(res) {
            console.log(res)
            that.setData({
              test: res.result.data
            })
          },
          fail: console.error
        })
      })
      wx.setNavigationBarTitle({
        title: '收藏夹'
      })
    }else{
      if (options.type == 1) {
        this.setData({
          Search: options.id
        })
      }else if(options.type==2){
        wx.setNavigationBarTitle({
          title: '我的食谱'
        })
      }
      wx.cloud.callFunction({
        // 云函数名称
        name: 'search_list_in',
        // 传给云函数的参数
        data: {
          id: options.id,
          type: options.type
        },
        success(res) {
          console.log(res)
          that.setData({
            test: res.result.data
          })
        },
        fail: console.error
      })
    }
    
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