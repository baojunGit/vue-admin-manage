/** 自适应宽高缩放配置 */
import { ref } from 'vue'

export default function adaptive() {
  // 指向最外层的容器
  const screenRef = ref()
  // 定时函数
  const timer = ref(0)
  // 默认缩放值
  const scale = {
    width: '1',
    height: '1'
  }
  // 设计稿尺寸(px)
  const baseWidth = 1920
  const baseHeight = 1080
  //  需保持的比例（默认1.77778）
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))
  const calcRate = () => {
    // 当前宽高比
    const currentRate = parseFloat(
      (window.innerWidth / window.innerHeight).toFixed(5)
    )
    if (screenRef.value) {
      if (currentRate > baseProportion) {
        // 表示更宽
        scale.width = (
          (window.innerHeight * baseProportion) /
          baseWidth
        ).toFixed(5)
        scale.height = (window.innerHeight / baseHeight).toFixed(5)
        screenRef.value.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
      } else {
        // 表示更高
        scale.height = (
          window.innerWidth /
          baseProportion /
          baseHeight
        ).toFixed(5)
        scale.width = (window.innerWidth / baseWidth).toFixed(5)
        screenRef.value.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
      }
    }
  }

  const resize = () => {
    clearTimeout(timer.value)
    /*
     * 遇到Type 'Timeout' is not assignable to type 'number'错误时，
     * 您可以尝试使用window.setTimeout而不是setTimeout，这样就可以明确在TypeScript中使用
     */
    timer.value = window.setTimeout(() => {
      calcRate()
    }, 200)
  }

  // 改变窗口大小重新绘制
  const windowDraw = () => {
    window.addEventListener('resize', resize)
  }

  // 改变窗口大小重新绘制
  const unWindowDraw = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    screenRef,
    calcRate,
    windowDraw,
    unWindowDraw
  }
}
