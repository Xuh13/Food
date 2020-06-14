// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('recommend')
    .get({
      success: function (res) {
        return res
      }
    })

  } catch (e) {
    return e
  }
}