/** 时间相关配置 */

// 近一个月的时间范围
export function recentlyMonth() {
  let endtime: Date | string = new Date()
  // 将日期转换成时间戳，再转回日期
  let startime: Date | string = new Date(
    endtime.getTime() - 30 * 24 * 3600 * 1000
  )
  startime = formatDate(startime, 'yyyymmmmdddd')
  // console.log(startime)

  endtime = formatDate(endtime, 'yyyymmmmdddd')
  return [startime, endtime]
}

// 获取近五个月的年月格式的日期，
export function recentlyFiveMonth() {
  const result = []
  const d = new Date()
  // 设置月份,设置当前日为1号 （避免出现31号时候，其他月份没有31号的bug）
  d.setMonth(d.getMonth() + 1, 1)
  for (let i = 0; i < 5; i++) {
    // 月份值-1  循环的时候在当前月份上减一 来获取上个月的月份（0 ~ 11）
    d.setMonth(d.getMonth() - 1)
    // 月份 + 1 来获取真正的月份 （1 ~ 12）
    let m: any = d.getMonth() + 1
    // 三元表达式来判断 如果小于10月 给前面 +0 如果大于等于10月 则不变输出
    m = m < 10 ? '0' + m : m
    // 将循环出来的 年月 一次 存放进 result 数组中
    result.push(d.getFullYear() + '-' + m)
  }
  console.log(result)
  // 返回反向排列数组
  return result.reverse()
}

// 正则格式化日期
export function formatDate(date: Date, dateFormat: string) {
  /* 单独格式化年份，根据y的字符数量输出年份
     * 例如：yyyy => 2019
            yy => 19
            y => 9
     */
  if (/(y+)/.test(dateFormat)) {
    dateFormat = dateFormat.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  // 格式化月、日、时、分、秒
  const o = {
    'm+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'i+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(dateFormat)) {
      // 取出对应的值
      const str = o[k] + ''
      /* 根据设置的格式，输出对应的字符
       * 例如: 早上8时，hh => 08，h => 8
       * 但是，当数字>=10时，无论格式为一位还是多位，不做截取，这是与年份格式化不一致的地方
       * 例如: 下午15时，hh => 15, h => 15
       */
      dateFormat = dateFormat.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return dateFormat
}

// 日期时间补零
function padLeftZero(str: string | any[]) {
  return ('00' + str).substr(str.length)
}
