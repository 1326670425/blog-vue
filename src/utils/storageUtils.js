// 封装localStorage操作的工具，并且提供带过期时间的操作
export default {
    setItem(key, value) {
        let type = Object.prototype.toString.call(value);
        if (type === '[object Object]' || type === '[object Array]')
            window.localStorage.setItem(key, JSON.stringify(value))
        else
            window.localStorage.setItem(key, value)
    },
    setItemWithExpire(key, value, expire) {
        let obj = {
            data: value,
            time: Date.now(),
            expire: expire
        }
        this.setItem(key, obj)
    },
    getItem(key) {
        let obj = window.localStorage.getItem(key)
        if (obj == null)
            return null
        try {
            obj = JSON.parse(obj)
        } catch(error){
            return obj
        }
        if (obj.expire && obj.time) {
            if (Date.now() - obj.expire > obj.time) {
                this.removeItem(key)
                return null
            }else{
                return obj.data
            }
        }else {
            return obj
        }


    },
    removeItem(key) {
        window.localStorage.removeItem(key)
    },
    clear(){
        window.localStorage.clear()
    }
}