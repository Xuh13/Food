// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  var user_id = event.id.toString();
  let use ={}
  try {
    return await db.collection('Users').where({
      User_id: user_id
    }).get({
      success: function (res) {
        use = {
          UserName: res.data[0].UserName,
          Head: res.data[0].Head
        }
        return use
      }
    })

  } catch (e) {
    return e
  }
}
