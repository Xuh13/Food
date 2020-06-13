Page({
  data: {
    openid: '',
  },
  onLoad: function () {
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo //用户基本信息
        var nickName = userInfo.nickName //用户名
        var avatarUrl = userInfo.avatarUrl //头像链接
        //var gender = userInfo.gender //性别 0：未知、1：男、2：女
        //var province = userInfo.province //所在省
        // var city = userInfo.city //所在市
        // var country = userInfo.country //所在国家
      }
    })
    this.getOpenid();
  },
  // 获取用户openid
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result)
        var openid = res.result;
        that.setData({
          openid: openid
        })
      }
    })
  },
  test(){
   
  }
})