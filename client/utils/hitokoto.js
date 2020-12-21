/**
 *  一言网 
 *  https://hitokoto.cn/
 */
let waitingQueue = []
let lock = false
const load = callback => {
  getTokenAndDo(token => {
    wx.request({
      url: 'https://v1.hitokoto.cn/?c=j',
      header: {
        'X-User-Token': token
      },
      success: res => {
        if (res.data.id != "") {
          callback(res.data)
        } else {
          console.error("https://v1.hitokoto.cn/ API获取内容失败，错误原因：" + res.data.errMessage)
        }
      },
      fail: () => {
        console.error("https://v1.hitokoto.cn/ API获取内容失败，可能是网络问题或者您没有添加到域名白名单")
      }
    })
  })
}

const getTokenAndDo = callback => {
  let token = wx.getStorageSync("hitokoto-token")
  if (token) {
    callback(token)
  } else {
    waitingQueue.push(callback)
    if (lock) {
      return;
    }
    lock = true
    wx.request({
      url: 'https://v1.hitokoto.cn/?c=j',
      success: res => {
        if (res.data.id != "") {
          wx.setStorageSync("hitokoto-token", res.data)
          lock = false
          while (waitingQueue.length > 0) {
            waitingQueue.pop()(res.data)
          }
        } else {
          console.error("https://v1.hitokoto.cn/ API获取内容失败，错误原因：" + res.data.errMessage)
          lock = false
        }
      },
      fail: () => {
        console.error("https://v1.hitokoto.cn/ API获取内容失败，可能是网络问题或者您没有添加到域名白名单")
      }
    })
  }
}

module.exports = {
  load: load
}