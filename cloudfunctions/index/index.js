// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const $ = db.command.aggregate
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var recipe_list = event.list;
  try {
    return await db.collection('Recipes').where({
      Recipe_id:_.in(recipe_list)
    })
    .get({
      success: function (res) {
        return res
      }
    })

  } catch (e) {
    return e
  }
}