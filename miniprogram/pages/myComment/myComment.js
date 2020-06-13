// pages/myComment/myComment.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: '',
    images: [],
    commentType: 0,
    fileIds: [],
    foodId: -1
  },

  submit: function() {
    console.log(this.data.comments.value);
    let promiseArr = [];
    for (let i = 0; i < this.data.images.length; i++) {
      promiseArr.push(new Promise((reslove, reject) => {
        let item = this.data.images[i];
        let suffix = /\.\w+$/.exec(item)[0]; // 图片扩展名
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
          filePath: item, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            this.setData({
              fileIds: this.data.fileIds.concat(res.fileID),  
            });
            this.changeParentData();
            reslove();
          },
          fail: console.error
        })
      }))
    }

    Promise.all(promiseArr).then(res => {
      // 插入数据
      db.collection('Comments').add({
        data: {
          comments: this.data.comments,
          commentType: this.data.commentType,
          food_id: this.data.food_id,
          fileIds: this.data.fileIds
        }
      }).then(res => {
        wx.showToast({
          title: '评论成功',
        })
      }).catch(err => {
        wx.showToast({
          title: '评论失败'
        })
      })
    })
  },

  onCommentChange: function(event) {
    this.setData({
      content: event.detail
    })
  },

  uploadImg: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          images: this.data.images.concat(tempFilePaths)
        })
      }
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
      food_id: options.food_id
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