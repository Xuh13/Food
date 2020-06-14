// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let type = event.type
  let R_id = event.id
  let U_id = event.userInfo.openId
  if(type==0){
    //收藏
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    try {
      return await db.collection('Collections').add({
        data:{
          Recipe_id:R_id,
          Follower_id:U_id,
          Collection_id:uuid
        },
        success:function(res){
          return res
        }
      })
    } catch (e) {
      return e
    }
  }else{
    try {
    //取消收藏
      return await db.collection('Collections').where({
          Recipe_id: R_id,
          Follower_id: U_id,
      }).remove()
    }catch (e) {
      return e
    }
  }
}