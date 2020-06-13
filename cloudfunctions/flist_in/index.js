// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const $ = db.command.aggregate
 
// 云函数入口函数
exports.main = async (event, context) => {
  var recipe_id = event.id.toString();
  try {
    return await db.collection('Recipes').where({
      Recipe_id:recipe_id
    }).get({
      success: function (res) {
        return res.data
      }
    })
      
  }catch(e){
    return e
  }
}



// _.expr($.and([
//   $.eq(['$$Recipe_id', recipe_id]),
//   $.eq(['$$Up', '$User_id']),
// ]))

// .lookup({
//   from: 'Users',
//   let: {
//     Up: '$Recipe_Up',
//     Recipe_id: '$Recipe_id'
//   },
//   pipeline: $.pipeline()
//     .match({
//       _eq()
//     })
//     .project({
//       _id: 0,
//       UserName: 1,
//       Head: 1
//     })
//     .done(),
//   as: 'User',
// })
//   .end()
//   .then(res => { return res })   