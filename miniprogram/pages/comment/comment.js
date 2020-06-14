// pages/comment/comment.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowDate: '',
    comment: [],
    food_id: 0,
    commentId:0,
  },

  CurrentTime: function() {
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    return month + "月" + day + "日";
  },

  changeData: function () {
    this.onLoad();  //最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
  },


  goTomyComment: function() { // 跳转带着食谱id
    wx.navigateTo({
      url: '../myComment/myComment?food_id='+this.data.food_id,
    })
  },

  gotoReplyComment: function(event) { // 跳转带着评论id
    wx.navigateTo({
      url: '../replyComment/replyComment?commentId='+event.target.dataset.commnetId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.setData({
      nowDate: that.CurrentTime(),
      food_id: 0
    })
    console.log(options.id)
    wx.cloud.callFunction({
      // 云函数名称
      name: 'comment_in',
      // 传给云函数的参数 
      data: {
        id:options.id
      },
      success(res) {
        console.log(res);
        that.setData({
          content: res.result.data
        })
      },
      fail: console.error
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