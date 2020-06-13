// 云函数入口文件

const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const $ = db.command.aggregate
 
// 云函数入口函数
exports.main = async (event, context) => {
  var id = event.id.toString();
  try{
    return await db.collection('Comments').where({
      Commentater_id: id
    }).get({
      success:function(res){
        return res.data
      }
    })
  }catch(e){
    return e
  }
    
  
}


// aggregate()
//   .lookup({
//     from: 'Users',
//     let: {
//       Commentator: '$Commentator_id',
//     },
//     pipeline: $.pipeline()
//       .match(

//         _.expr($.and([
//           $.eq(['$User_id', '$$Commentator'])
//         ])))
//       .project({
//         _id: 0,
//         UserName: 1,
//         Head: 1
//       })
//       .done(),
//     as: 'User',
//   })
//   .end()
//   .then(res => { return res })