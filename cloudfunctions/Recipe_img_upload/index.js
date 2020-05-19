const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')
cloud.init({
  env: 'kindear-fd77cd'
})

exports.main = async (event, context) => {
  let url = event.url
  let f_url = event.f_url
  try {
    return await cloud.uploadFile({
      cloudPath: url,
      fileContent: new Buffer(f_url, 'base64')
    })
  } catch (e) {
    return e;
  }
}