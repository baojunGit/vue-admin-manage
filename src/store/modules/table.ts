import { defineStore } from 'pinia';
import { handleSession } from '@/utils/storage';

interface TableType {
	activeValue: string;
}

export const useTableStore = defineStore('tableDrag', {
	state: (): TableType => ({
		activeValue: handleSession.get('TableDragActive') ?? '1'
	}),
	getters: {},
	actions: {
		/**
		 * @description 记录选中的标签编号
		 */
		setTableDragTab(activeValue) {
			this.activeValue = activeValue;
			handleSession.set('TableDragActive', activeValue);
		}
	}
});
