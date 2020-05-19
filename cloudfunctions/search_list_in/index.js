const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  var Tag_id = parseInt(event.id);
  try {
    return await db.collection('Recipes').where({
      Recipe_Tags: Tag_id
    }).get().then(res => {
      //   let qqq = []
      //   for(var i = 0;i<res.data.length;i++){
      //     let aaa = []
      //     for (var j = 0; j < res.data[i].Recipe_Tags.length;j++){
      //       //
      //       let q = db.collection('Tags').where({
      //         Tag_id: qqq[i].Recipe_Tags[j]
      //       }).get().then(es => {
      //           // let mmm = 'qqq.data['+i+'].TagNames['+j+']'
      //           // this.setData({
      //           //   [mmm]:res.data
      //           // })
      //           return es.data
      //       })
      //       aaa.push(q)
      //     }
      //     const bbb = {}
      //     bbb.TagNames = aaa
      //     bbb.test = res.data[i]
      //     qqq.push(aaa)
      //   }
       
      // return (await Promise.all(qqq))
      return res
      
    })
  } catch (e) {
    console.log(e)
  }
}