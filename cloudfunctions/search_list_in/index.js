const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  
  if(event.type == 0){
    var Tag_id = parseInt(event.id);
    try {
      return await db.collection('Recipes').where({
        Recipe_Tags: Tag_id
      }).get().then(res => {
        return res
      })
    } catch (e) {
      console.log(e)
    }
  } else if(event.type ==1){
    var RecipeName = String(event.id);
    try {
      return await db.collection('Recipes').where({
        Title:db.RegExp({
          regexp: RecipeName,
            //从搜索栏中获取的value作为规则进行匹配。
            options: 'i',
            //大小写不区分
          })
        
      }).get().then(res => {
        
        return res

      })
    } catch (e) {
      console.log(e)
    }
  }else if(event.type == 2){
    var id = event.userInfo.openId
    try {
      return await db.collection('Recipes').where({
        Recipe_Up:id

      }).get().then(res => {

        return res

      })
    } catch (e) {
      console.log(e)
    }
  }else if(event.type==3){
    let q = event.collect
    try {
      return await db.collection('Recipes').where({
        Recipe_id: _.in(q)

      }).get().then(res => {

        return res

      })
    } catch (e) {
      console.log(e)
    }
  }
  
}