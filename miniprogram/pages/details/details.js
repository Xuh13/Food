// pages/details/details.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    array: ['1', '2', '3', '4'],
    index: 0,
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
      Ingredients_name: '',
      Ingredients_dosage: ''
    }],
    Methods: [{
      Method_id: 0,
      Method_txt: '',
      Method_img: ''
    }],
    Difficulty: '',
    Story: '',
    Recipe_Tags: [],
    images: [],
    Methods_name:[],
    Cover_name:'',
    Tags:[]
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
        console.log(tempFilePaths)
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

  Choose(e){
    let id = e.currentTarget.id;
    let index = e.currentTarget.dataset.id;
    console.log(e)
    console.log("id="+id)
    console.log("index="+index);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      page_num: 1
    })
    let that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'details_tag',
      // 传给云函数的参数
      success(res) {
        console.log(res)
        that.setData({
          Tags:res.result.data
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

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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
  uploadCover(){
    let x = this;
    let that = this.data;
    return new Promise(resolve=>{
      wx.cloud.uploadFile({
        cloudPath: new Date().getTime() + '.png',
        filePath: that.Cover,
        success(res) {
          x.setData({
            Cover: res.fileID
          })
          return resolve()
        }
      })
    }) 
  },
  uploadMethod(i){
    let that = this.data;
    return new Promise(resolve=>{
      wx.cloud.uploadFile({
        cloudPath: (new Date().getTime() + i + 1) + '.png',
        filePath: that.Methods[i].Method_img,
        success(res) {
          let mn = that.Methods_name
          mn.push(res.fileID)
          x.setData({
            Methods_name: mn
          })
          console.log("methods")
          return resolve()
        }
      })
    })
    
  },
  uploadMethods(i){
    let that = this
    let x = this.data
    console.log(this.data.Cover)
    console.log(i)
    console.log(this.data.Methods.length)
    this.uploadMethod(i).then(result => {
      console.log(result)
      console.log(i)
      console.log(this.data.Methods.length)
      if (i < that.Methods.length){
        that.uploadMethods(i + 1)
      }else{
        wx.cloud.callFunction({
          // 云函数名称
          name: 'Recipe_upload',
          // 传给云函数的参数
          data: {
            Title: that.data.Title,
            Introduction: that.data.Introduction,
            Cover: that.data.Cover,
            Cover_name: that.data.Cover_name,
            Number: that.data.Number,
            Ingredients: that.data.Ingredients,
            Methods: that.data.Methods,
            Methods_name: that.data.Methods_name,
            Difficulty: that.data.Difficulty,
            Story: that.data.Story,
            Recipe_Tags: that.data.Recipe_Tags,
            Number:that.data.array[that.data.index],
            Tags:that.data.Tags
          },
          success(res) {
            console.log("success")
            console.log(res)
          },
          fail: console.error
        })
      }
    })
    
  },
up(){
     let x = this;
     let that = this.data;
     let wewe;
     let i =0;
     this.uploadCover().then(result=>{
       this.uploadMethods(0);
     })
     
   
    
  },

  end(){
    let that = this
    let x = this.data
    let c = false;

    let promiseArr = [];
    promiseArr.push(new Promise((resolve,reject)=>{
      wx.cloud.uploadFile({
        cloudPath: new Date().getTime() + '.png',
        filePath: x.Cover,
        success(res) {
          that.setData({
            Cover: res.fileID
          })
          resolve()
        }
      })
    }))
    for (let i = 0; i < this.data.Methods.length; i++) {
      let that = this
      let x = this.data
      promiseArr.push(new Promise((resolve, reject) => {
        wx.cloud.uploadFile({
          cloudPath: (new Date().getTime() + i + 1) + '.png',
          filePath: x.Methods[i].Method_img,
          success(res) {
            let mn = x.Methods_name
            mn.push(res.fileID)
            that.setData({
              Methods_name: mn
            })
            resolve()
          }
        })
      }))
    }
    

    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    

    Promise.all(promiseArr).then(res => {//等数组都做完后做then方法
      console.log("图片上传完成后再执行")
      let that = this
      console.log("lai")
      let id = new Date().getTime()
      wx.cloud.callFunction({
        // 云函数名称
        name: 'Recipe_upload',
        // 传给云函数的参数
        data: {
          Recipe_id: uuid,
          Title: that.data.Title,
          Introduction: that.data.Introduction,
          Cover: that.data.Cover,
          Cover_name: that.data.Cover_name,
          Number: that.data.Number,
          Ingredients: that.data.Ingredients,
          Methods: that.data.Methods,
          Methods_name: that.data.Methods_name,
          Difficulty: that.data.Difficulty,
          Story: that.data.Story,
          Recipe_Tags: that.data.Recipe_Tags
        },
        success(res) {
          wx.navigateTo({
            url: '../../pages/flist/flist?food_id=' + uuid
          })
        },
        fail: console.error
      })
    })
    
   
    
    
  }
  })
