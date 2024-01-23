// 读取数据
export const getStorage = (key: string) => {
  if (!key) {
    return null
  }
  try {
    const strData = window.localStorage.getItem(key)
    return JSON.parse(strData!) // 这里需要非空断言，因为JSON.parse()返回的是一个对象
  } catch (error: any) {
    return window.localStorage.getItem(key)
  }
}

// 写入缓存
export const setStorage = (key: string, data: any) => {
  if (data === null || data === undefined) {
    window.localStorage.removeItem(key)
  }
  else {
    const stringifyData = JSON.stringify(data);
    window.localStorage.setItem(key, stringifyData);
  }
}

// 删除缓存
export const removeStorage = (key: string) => {
  window.localStorage.removeItem(key);
}