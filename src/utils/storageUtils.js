// 封装localStorage操作的工具，并且提供带过期时间的操作

export function setItem(key, value) {
    let type = Object.prototype.toString.call(value);
    if (type === '[object Object]' || type === '[object Array]')
        window.localStorage.setItem(key, JSON.stringify(value))
    else
        window.localStorage.setItem(key, value)
}
export function setItemWithExpire(key, value, expire) {
    let obj = {
        data: value,
        time: Date.now(),
        expire: expire
    }
    this.setItem(key, obj)
}
export function getItem(key) {
    let obj = window.localStorage.getItem(key)
    if (obj == 'null' || obj == null)
        return null

    try {
        obj = JSON.parse(obj)
    } catch (error) {
        return obj
    }
    if (obj.hasOwnProperty('expire') && obj.hasOwnProperty('time')) {
        if (Date.now() - obj.expire > obj.time) {
            this.removeItem(key)
            return null
        } else {
            return obj.data
        }
    } else {
        return obj
    }


}
export function removeItem(key) {
    window.localStorage.removeItem(key)
}
export function clear() {
    window.localStorage.clear()
}
