// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = (event, context) => {
  let nickname= event.nickName;
  let avatarUrl =event.avatarUrl //头像链接
  let Id = event.userInfo.openId;
  db.collection('Users').where({
    User_id:Id
  }).remove().then(res=>{
    db.collection('Users').add({
      data: {
        User_id: Id,
        UserName: nickname,
        Head: avatarUrl
      }
      
    })
    return Id
  })
}
