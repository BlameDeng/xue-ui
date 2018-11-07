class Formator {
    constructor() {}

    relativeTime(data) {
        if (!data) { return '参数不能为空' }
        let dateObj
        if (typeof data === 'string' || typeof data === 'number') {
            dateObj = new Date(data)
        } else if (typeof data === 'object') {
            dateObj = data
        } else { return '参数只能是字符串、数字或者日期时间对象' }
        let now = Date.now()
        let time = dateObj.getTime()
        let space = (now - time) / 1000 //秒
        if (space < 60) { return '刚刚' }
        if (space < 60 * 60) {
            return Math.floor(space / 60) + '分钟前'
        }
        if (space < 60 * 60 * 24) {
            return Math.floor(space / (60 * 60)) + '小时前'
        } else {
            return Math.floor(space / (60 * 60 * 24)) + '天前'
        }
    }

    timeStr(params) {
        let data
        if (typeof params === 'string') {
            data = new Date(params)
        } else {
            data = params
        }
        let year = data.getFullYear()
        let month = this.fixed(data.getMonth() + 1)
        let date = this.fixed(data.getDate())
        let day = this.switchDay(data.getDay())
        let hour = this.fixed(data.getHours())
        let minutes = this.fixed(data.getMinutes())
        let seconds = this.fixed(data.getSeconds())
        return { date: `${year}-${month}-${date}`, time: `${hour}:${minutes}:${seconds}`, day }
    }

    fixed(params) {
        if (params > 9) {
            return params
        } else {
            return `0${params}`
        }
    }

    switchDay(params) {
        return ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][params]
    }
}

export default Formator