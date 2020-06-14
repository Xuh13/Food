// 云函数入口文件

const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  var id = event.id.toString();
  try {
    return await db.collection('Comments').aggregate()
    
    .lookup({
      from: 'Users',
      localField: 'Commentator_id',
      foreignField: 'User_id',
      as: 'user',
      })
      .match({
        Comment_recipe: id
        // Comment_type: 0
      })
      .end()
      .then(res => {return res})
  } catch (e) {
    console.log(e)
  }
  // try {
  //   return await db.collection('Comments').where({
  //     Comment_recipe: id,
  //     Comment_type: 0
  //   }).get({
  //     success: function (res) {
  //       return res.data
  //     }
  //   })
  // } catch (e) {
  //   console.log(e)
  // }
}