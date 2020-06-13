// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    UserName:'',
    User_id:'',
    Head:''
  },

  onLoad: function () {
    wx.getSetting({
      success: (result) => {
        console.log('success')
        wx.getUserInfo({
          success: function (res) {
            console.log()
            var userInfo = res.userInfo //用户基本信息
            var nickName = userInfo.nickName //用户名
            var avatarUrl = userInfo.avatarUrl //头像链接
            wx.cloud.callFunction({
              name: 'login_save',
              data: {
                nickName: nickName, //用户名
                avatarUrl: avatarUrl //头像链接
              },
              success(res) {
                console.log(res)
              },
              fail: console.error
            })
          }
        })
        wx.switchTab({
          url: '../../pages/index/index'
        })
      },
      fail:(result)=>{
        console.log('fail')

      }
    })
  },
  bindGetUserInfo: function (e) {
    let that = this
    if (e.detail.userInfo) {
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo //用户基本信息
          var nickName = userInfo.nickName //用户名
          var avatarUrl = userInfo.avatarUrl //头像链接
          wx.cloud.callFunction({
            name: 'login_save',
            data:{
              nickName : nickName, //用户名
              avatarUrl :avatarUrl //头像链接
            },
            success(res){
              console.log(res)
            },
            fail:console.error
          })
        }
      })
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '../../pages/index/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  

 




  /**
   * 生命周期函数--监听页面加载
   */
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})