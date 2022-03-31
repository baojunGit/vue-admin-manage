/** 监测所使用的设备 */

/**
 * @description 判断是PC端还是移动端  navigator.userAgent（用户使用的系统信息及浏览器信息）
 */

// 用interface解决match匹配始终返回false的问题
interface DeviceInter {
  match: Function
}
// 监测设备类型（手机返回true，反之false）
export function deviceDetection() {
  const sUserAgent: DeviceInter = navigator.userAgent.toLowerCase()
  // iphone手机
  const bIsIphoneOs = sUserAgent.match(/iphone os/i) === 'iphone os'
  // 安卓手机
  const bIsAndroid = sUserAgent.match(/android/i) === 'android'
  const bIsMidp = sUserAgent.match(/midp/i) === 'midp'
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === 'rv:1.2.3.4'
  const bIsUc = sUserAgent.match(/ucweb/i) === 'ucweb'
  const bIsCE = sUserAgent.match(/windows ce/i) === 'windows ce'
  const bIsWM = sUserAgent.match(/windows mobile/i) === 'windows mobile'
  return (
    bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM
  )
}
