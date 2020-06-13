// pages/replyComment/replyComment.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [],
    commentType: 1,
    commentId: -1
  },

  onCommentChange: function(event) {
    this.setData({
      content: event.detail
    })
  },

  submit: function() {
    db.collection('Comments').add({
      data: {
        content: this.data.content.value,
        commentType: this.data.commentType,
        commentId: this.data.commentId
      }
    }).then(res => {
      this.changeParentData();
      wx.showToast({
        title: '评论成功'
      }).catch(err => {
        wx.showToast({
          title: '评论失败'
        })
      })
    })
  },

  changeParentData: function() {
    var pages = getCurrentPages(); //当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
      beforePage.changeData(); //触发父页面中的方法
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.setData({
      commentId: options.commentId
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