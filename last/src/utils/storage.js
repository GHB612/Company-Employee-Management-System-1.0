// 本地存储工具函数
export const storage = {
  // 保存数据
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  // 获取数据
  get(key, defaultValue = null) {
    const item = localStorage.getItem(key)
    if (item === null) return defaultValue
    try {
      return JSON.parse(item)
    } catch (e) {
      return defaultValue
    }
  },

  // 删除数据
  remove(key) {
    localStorage.removeItem(key)
  },

  // 清空所有数据
  clear() {
    localStorage.clear()
  }
}