import parseUnit from 'parse-unit';
import { computed } from 'vue';
export function useSize(sizeGetter) {
    return computed(() => {
        const sizeProp = sizeGetter();
        let [value, unit] = parseUnit(String(sizeProp));
        unit = unit === undefined || unit === '' ? 'px' : unit;
        return {
            value,
            unit,
            string: `${value}${unit}`,
        };
    });
}
