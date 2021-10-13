<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group appear name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect == 'redirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ $t(item.meta.title) }}</span
        >
        <a v-else @click="handleLink(item)">
          {{ $t(item.meta.title) }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue'
import { RouteLocationMatched, useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    // 1.ref与reactive
    // reactive必须传递一个对象
    // ref和reactive一样, 也是用来实现响应式数据的方法
    // ref底层的本质其实还是reactive，会自动转换ref(xx) -> reactive({value:xx})
    // 在Vue中使用ref的值不用通过value获取，在JS中使用ref的值必须通过value获取

    // 2.ts类型断言：当我们比ts更了解某个变量的详细信息，可以进行类型断言
    // 类型断言只在编译阶段识别，不影响实际运行
    const levelList: Ref<RouteLocationMatched[]> = ref([])
    const route = useRoute()
    const router = useRouter()

    // 判断是否首页
    const isIndex = (route: RouteLocationMatched): boolean | string => {
      const name = route && (route.name as string)
      if (!name) {
        return false
      }
      // trim() 删除字符串的头尾空白符
      // toLocaleLowerCase() 把字符串内容全部转为小写
      return name.trim().toLocaleLowerCase() === 'index'
    }

    // 获取生成面包屑的路由
    const getBreadcrumb = (): void => {
      // 如果meta存在，则返回meta.title，否则返回meta
      // console.log(route.matched)
      let matched = route.matched.filter(item => item.meta && item.meta.title)
      // console.log(matched)
      const first = matched[0]
      if (!isIndex(first)) {
        matched = [
          {
            path: '/index',
            meta: { title: 'message.index' }
          } as unknown as RouteLocationMatched
        ].concat(matched)
      }
      levelList.value = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
      // console.log(levelList.value)
    }

    getBreadcrumb()

    watch(
      () => route.path,
      () => getBreadcrumb()
    )

    const handleLink = (item: RouteLocationMatched): any => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect.toString())
        return
      }
      router.push(path)
    }

    return {
      levelList,
      handleLink
    }
  }
})
</script>
