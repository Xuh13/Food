const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var id = event.userInfo.openId
  var Recipe = event.Recipe
  try {
    return await db.collection('Collections').where({
      Follower_id: id ,
      Recipe_id:Recipe
    }).get({
      success: function (res) {
        return res
      }
    })

  } catch (e) {
    return e
  }
}
