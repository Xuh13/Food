// pages/details/details.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    files: [{
      url: 'http://mmbiz.qpic.cn/mmbiz_png/VUIF3v9blLsicfV8ysC76e9fZzWgy8YJ2bQO58p43Lib8ncGXmuyibLY7O3hia8sWv25KCibQb7MbJW3Q7xibNzfRN7A/0',
    }, {
      loading: true
    }, {
      error: true
    }],
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
    oneButton: [{ text: '确定' }],
    page_num: 1,
    show1: 'display:block;',
    show2: 'display:none;',
    show3: 'display:none;',
    showCover: 'display:none',
    showTXT: 'display:block',
    delIng_TXT: 'display:none',
    delIng_tag: '删除',
    delBool: false,
    delMethodBool:false,
    delMethod_TXT: 'display:none',
    delMethod_tag: '删除',
    methodTXT: [
       'display:block;'
    ],
    methodimg:[
      'display:none;'
    ],
    Title: '',
    Introduction: '',
    Cover: '',
    Number: 0,
    Ingredients: [{
      Ingredients_id: 0,
      Ingredients_name: '1',
      Ingredients_dosage: '1'
    }],
    Methods: [{
      Method_id: 0,
      Method_txt: '',
      Method_img: ''
    }],
    Difficulty: '',
    Story: '',
    Recipe_Tags: [],
    images: []
    
  },

  chooseImage(e) {
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        var tempFilePaths = res.tempFilePaths
        this.setData({
          showCover:'display:block;',
          showTXT:'display:none;',
          Cover : tempFilePaths[0]
        })
      }
    })
    // this.data.showCover = 'display:block;'
    // this.data.Cover = q;
    
  },
  methodImage(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        var tempFilePaths = res.tempFilePaths
        let array = [...this.data.Methods]
        let array1 = [...this.data.methodTXT]
        let array2 = [...this.data.methodimg]
        array[e.currentTarget.id].Method_img = tempFilePaths[0]
        array1[e.currentTarget.id] = 'display:none;'
        array2[e.currentTarget.id] = 'display:block;'

        this.setData({
          methodTXT: array1,
          methodimg: array2,
          Methods: array
        })
      }
    })
    // this.data.showCover = 'display:block;'
    // this.data.Cover = q;

  },

  addMethod() {
    let array = [...this.data.Methods]
    let array1 = [...this.data.methodTXT]
    let array2 = [...this.data.methodimg]
    array.push({
      Method_id: array.length+1,
      Method_txt: '',
      Method_img: ''
    })
    array1.push('')
    array2.push('')
    //更新到视图层
    this.setData({
      Methods: array,
      methodTXT:array1,
      methodimg:array2
    })
  },

  addIngredient(){
    let array = [...this.data.Ingredients];
    array.push({
      Ingredients_id: array.length+1,
      Ingredients_name: '',
      Ingredients_dosage: ''
    })
    //更新到视图层
    this.setData({
      Ingredients: array,
    })
  },

  deleteButton(){
    this.data.delBool = !this.data.delBool
    if(this.data.delBool){
      this.setData({
        delIng_tag:'完成',
        delIng_TXT: 'display:bolck;'
      })
    }else{
      this.setData({
        delIng_tag: '删除',
        delIng_TXT: 'display:none;'
      })
    }
    
  },

  delMethodButton(){
    this.data.delMethodBool = !this.data.delMethodBool
    if (this.data.delMethodBool) {
      this.setData({
        delMethod_tag: '完成',
        delMethod_TXT: 'display:bolck;'
      })
    } else {
      this.setData({
        delMethod_tag: '删除',
        delMethod_TXT: 'display:none;'
      })
    }
  },

  deleteIngredient(e){
    if(this.data.Ingredients.length == 1){
      wx.showToast({
        title: "食材至少有一个",
        icon: 'loading',//图标，支持"success"、"loading" 
        duration: 2000,//提示的延迟时间，单位毫秒，默认：1500 
        mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function () { },
        fail: function () { },
        complete: function () { }
      })
      return
    }
    let array = [...this.data.Ingredients];
    
    array.splice( e.currentTarget.id,1);
    //更新到视图层
    this.setData({
      Ingredients: array,
    })
  },

  deleteMethod(e) {
    if (this.data.Methods.length == 1) {
      wx.showToast({
        title: "至少有一个步骤",
        icon: 'loading',//图标，支持"success"、"loading" 
        duration: 2000,//提示的延迟时间，单位毫秒，默认：1500 
        mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function () { },
        fail: function () { },
        complete: function () { }
      })
      return
    }
    let array = [...this.data.Methods];

    array.splice(e.currentTarget.id, 1);
    //更新到视图层
    this.setData({
      Methods: array,
    })
  },

  back() {
    if(this.data.Title == ''){

    }
    let hidepage = 'show' + this.data.page_num
    let num = this.data.page_num + 1
    let showpage = 'show' + (this.data.page_num - 1)
    this.setData({
      [hidepage]: 'display:none',
      [showpage]: 'display:block',
      page_num: this.data.page_num - 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      page_num: 1
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
  inputit(e){
    this.setData({
      Title:e.detail.value
    })
  },
  inputInstruction(e){
    this.setData({
      Introduction:e.detail.value
    })
  },
  inputIngredients_name(e){
    let list = [...this.data.Ingredients];
    list[e.currentTarget.id].Ingredients_name = e.detail.value;
    this.setData({
      Ingredients: list
    })
  },

  inputIngredients_dosage(e){
    let list = [...this.data.Ingredients];
    list[e.currentTarget.id].Ingredients_dosage = e.detail.value;
    this.setData({
      Ingredients: list
    })
  },

  inputMethod(e){
    let list = [...this.data.Methods];
    list[e.currentTarget.id].Method_txt = e.detail.value;
    this.setData({
      Methods: list
    })
  },

  inputDifficult(e) {
    this.setData({
      Difficulty: e.detail.value
    })
  },

  inputStory(e) {
    this.setData({
      Story: e.detail.value
    })
  },

  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  tapOneDialogButton(e) {
    if(this.data.Title == ''){
      this.setData({
        showOneButtonDialog: true
      })
      return
    }else{
      let hidepage = 'show' + this.data.page_num
      let num = this.data.page_num + 1
      let showpage = 'show' + (this.data.page_num + 1)
      this.setData({
        [hidepage]: 'display:none',
        [showpage]: 'display:block',
        page_num: this.data.page_num + 1
      })
    }
    
  },

  classfy(){
    this.setData({
      show2:'display:none',
      show3:'display:block'
    })
  },

  cancel(){
    this.setData({
      Recipe_Tags: [],
      show3: 'display:none',
      show2: 'display:block'
    })
  },

  save(){
    this.setData({
      show3: 'display:none',
      show2: 'display:block'
    })
  },

  end(){
    let that = this.data
    console.log(that)
    var util = require('../../Utils/uuid/uuid.js')
    let cover_name ='cloud://recipes-obnmd.7265-recipes-obnmd-1301654443/' +util.wxuuid() + '.png';


    wx.getFileSystemManager().readFile({
      filePath: that.Cover, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        wx.cloud.callFunction({
          // 云函数名称
          name: 'Recipe_img_upload',
          // 传给云函数的参数
          data: {
            url: cover_name,
            f_url: res.data
          },
          success(res) {
            console.log('success')
          },
          fail: console.error
        })
      }
    })

    wx.cloud.callFunction({
      // 云函数名称
      name: 'Recipe_img_upload',
      // 传给云函数的参数
      data: {
        url:cover_name,
        f_url:that.cover
      },
      success(res) {
        console.log('success')
      },
      fail: console.error
    })

    let methods_name = [];
    for (let i = 0; i < that.Methods.length;i++){
      methods_name.push('Recipes/' + util.wxuuid() + '.png')
      wx.cloud.callFunction({
        // 云函数名称
        name: 'Recipe_img_upload',
        // 传给云函数的参数
        data: {
          url: methods_name[i],
          f_url: that.Methods[i].Method_img
        },
        success(res) {
          console.log('success')
        },
        fail: console.error
      })
    }
    wx.cloud.callFunction({
      // 云函数名称
      name: 'Recipe_upload',
      // 传给云函数的参数
      data: {
        Title: that.Title,
        Introduction: that.Introduction,
        Cover: that.Cover,
        Cover_name:cover_name,
        Number: that.Number,
        Ingredients: that.Ingredients,
        Methods: that.Methods,
        Methods_name :methods_name,
        Difficulty: that.Difficulty,
        Story: that.Story,
        Recipe_Tags: that.Recipe_Tags
      },
      success(res) {
        console.log('success')
      },
      fail: console.error
    })
  }
})