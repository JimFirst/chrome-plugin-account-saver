
const isProduction = process.env.NODE_ENV === 'production'

export function setLocalData(key, data, cb) {
  if (isProduction) {
    chrome.storage.local.set({
      [key]: JSON.stringify(data)
    }, cb)
  } else {
    localStorage.setItem(key, JSON.stringify(data))
  }
}
export function getLocalData(key, initData, cb) {
  if (isProduction) {
    chrome.storage.local.get({
      [key]: JSON.stringify(initData)
    }, (items) => {
      cb(JSON.parse(items[key]))
    })
  } else {
    const res = localStorage.getItem(key)
    if (res) {
      cb(JSON.parse(res))
    } else {
      cb(initData)
    }
  }
}