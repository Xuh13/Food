// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  var title = event.Title
  var introduction = event.Introduction
  var cover = event.Cover
  var number = event.Number
  var ingredients = event.Ingredients
  var methods = event.Methods
  var difficulty = event.Difficulty
  var story = event.Story
  var recipe_Tags = event.Recipe_Tags
  var date = new Date()
  var cover_name = event.Cover_name
  var methods_name= event.Methods_name
  var recipe_id = event.Recipe_id
  var num = event.Number
  for(let i = 0 ;i<methods.length;i++){
    methods[i].Method_img =methods_name[i]
  }
  var id = event.userInfo.openId
  return await db.collection('Recipes').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      Title: title,
      Introduction: introduction,
      Cover: cover,
      Number:number,
      Ingredients: ingredients,
      Methods: methods,
      Difficulty: difficulty,
      Story: story,
      Recipe_Tags: recipe_Tags,
      Recipe_id:recipe_id,
      Recipe_time: date,
      Recipe_Up:id,
      Number:num
    },
    success: function(res) {
      return cover_name
    }
  })
  return {
    cover_name
  }
}