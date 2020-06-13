// 云函数入口文件

const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  var id = parseInt(event.id);
  try {
    return await db.collection('Comments').where({
      Comment_recipe: id,
      Comment_type: 0
    }).get({
      success: function (res) {
        return res.data
      }
    })
  } catch (e) {
    console.log(e)
  }
}