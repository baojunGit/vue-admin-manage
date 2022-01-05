// 近一个月的时间范围
export function recentlyMonth() {
  let endtime: Date | string = new Date()
  // 将日期转换成时间戳，再转回日期
  let startime: Date | string = new Date(
    endtime.getTime() - 30 * 24 * 3600 * 1000
  )
  startime = formatDate(startime)
  endtime = formatDate(endtime)
  return [startime, endtime]
}

// 格式化时间
function formatDate(date) {
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  return `${y}-${m}-${d}`
}
