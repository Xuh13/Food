// 云函数入口文件

const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  var higher_id = event.id;
  try {
    return await db.collection('Tags').where({
      TagHigher_id: higher_id
    }).get({
      success: function (res) {
        return res.data
      }
    })
  } catch (e) {
    console.log(e)
  }
}