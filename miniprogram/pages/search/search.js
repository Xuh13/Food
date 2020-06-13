// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    curNav: 1,//当前选中的左边栏id
    curIndex: 0,//当前选中的左边栏的索引
    // cart: [], //购物车数组
    // cartTotal: 0, //购物车商品数量
    navList: [ //左边栏的数据
      {
        id: 1,
        name: '食材分类'
      },
      {
        id: 2,
        name: '用餐时间'
      },
      {
        id: 3,
        name: '菜系'
      },
      {
        id: 4,
        name: '适用场景'
      },
      {
        id: 5,
        name: '推荐人群'
      }
    ],
    dishesList: [ //使用二维数组,将左边栏和内容区形成对应关系
      [
        {
          name: "全部",
          num: 1,
          food_id: 1
        },
        {
          name: "蔬菜",
          num: 1,
          food_id: 2
        },
        {
          name: "肉类",
          num: 1,
          food_id: 3
        },
        {
          name: "面",
          num: 1,
          food_id: 4
        },
        {
          name: "甜点",
          num: 1,
          food_id: 5
        },
        {
          name: "汤",
          num: 1,
          food_id: 6
        },
        {
          name: "沙拉",
          num: 1,
          food_id: 7
        },
        {
          name: "蛋类",
          num: 1,
          food_id: 8
        }
      ],
      [
        {
          name: "全部",
          num: 1,
          id: 1
        },
        {
          name: "早餐",
          num: 1,
          id: 2
        }
      ],
      [
        {
          name: "大拌菜&quot",
          num: 1,
          id: 5
        },
        {
          name: "川北凉粉",
          num: 1,
          id: 6
        }
      ],
      []
    ],
    dishes: []
  },
  selectNav(event) {
    let id = event.target.dataset.id,
      index = parseInt(event.target.dataset.index);
    self = this;
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  gotoComment: function (event) {
    console.log(event)
    //跳转到详情页面，并且foodid传递过去?foodid=' + event.target.dataset.foodid,
    // app.globalData.id = this.data.navList.id
    wx.navigateTo({
      url: '../search_list/search_list?id=' + event.target.dataset.food_id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

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