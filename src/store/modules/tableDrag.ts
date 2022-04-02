import { defineStore } from 'pinia'
import { handleSession } from '@/utils/storage'

interface TableDragType {
  activeValue: string
}

export const useTableDragStore = defineStore('tableDrag', {
  state: (): TableDragType => ({
    activeValue: handleSession.get('TableDragActive') ?? '1'
  }),
  getters: {},
  actions: {
    /**
     * @description 记录选中的标签编号
     */
    setTableDragTab(activeValue) {
      this.activeValue = activeValue
      handleSession.set('TableDragActive', activeValue)
    }
  }
})
