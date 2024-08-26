"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));
var _size = require("../../hooks/size");
var _utils = require("../../tools/utils");
var _dom = require("../../tools/dom");
var _event = require("../../tools/event");
var _date = require("./date");
var _number = require("./number");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const yearSize = 12;
const monthSize = 20;
const quarterSize = 8;
var _default = exports.default = (0, _vue.defineComponent)({
  name: 'VxeInput',
  props: {
    modelValue: [String, Number, Date],
    immediate: {
      type: Boolean,
      default: true
    },
    name: String,
    type: {
      type: String,
      default: 'text'
    },
    clearable: {
      type: Boolean,
      default: () => _conf.default.input.clearable
    },
    readonly: Boolean,
    disabled: Boolean,
    placeholder: {
      type: String,
      default: () => _xeUtils.default.eqNull(_conf.default.input.placeholder) ? _conf.default.i18n('vxe.base.pleaseInput') : _conf.default.input.placeholder
    },
    maxlength: [String, Number],
    autocomplete: {
      type: String,
      default: 'off'
    },
    align: String,
    form: String,
    className: String,
    size: {
      type: String,
      default: () => _conf.default.input.size || _conf.default.size
    },
    multiple: Boolean,
    // text
    showWordCount: Boolean,
    countMethod: Function,
    // number、integer、float
    min: {
      type: [String, Number],
      default: null
    },
    max: {
      type: [String, Number],
      default: null
    },
    step: [String, Number],
    exponential: {
      type: Boolean,
      default: () => _conf.default.input.exponential
    },
    // number、integer、float、password
    controls: {
      type: Boolean,
      default: () => _conf.default.input.controls
    },
    // float
    digits: {
      type: [String, Number],
      default: () => _conf.default.input.digits
    },
    // date、week、month、quarter、year
    startDate: {
      type: [String, Number, Date],
      default: () => _conf.default.input.startDate
    },
    endDate: {
      type: [String, Number, Date],
      default: () => _conf.default.input.endDate
    },
    minDate: [String, Number, Date],
    maxDate: [String, Number, Date],
    // 已废弃 startWeek，被 startDay 替换
    startWeek: Number,
    startDay: {
      type: [String, Number],
      default: () => _conf.default.input.startDay
    },
    labelFormat: {
      type: String,
      default: () => _conf.default.input.labelFormat
    },
    valueFormat: {
      type: String,
      default: () => _conf.default.input.valueFormat
    },
    editable: {
      type: Boolean,
      default: true
    },
    festivalMethod: {
      type: Function,
      default: () => _conf.default.input.festivalMethod
    },
    disabledMethod: {
      type: Function,
      default: () => _conf.default.input.disabledMethod
    },
    // week
    selectDay: {
      type: [String, Number],
      default: () => _conf.default.input.selectDay
    },
    prefixIcon: String,
    suffixIcon: String,
    placement: String,
    transfer: {
      type: Boolean,
      default: () => _conf.default.input.transfer
    }
  },
  emits: ['update:modelValue', 'input', 'change', 'keydown', 'keyup', 'wheel', 'click', 'focus', 'blur', 'clear', 'search-click', 'toggle-visible', 'prev-number', 'next-number', 'prefix-click', 'suffix-click', 'date-prev', 'date-today', 'date-next'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const $xeform = (0, _vue.inject)('$xeform', null);
    const $xeformiteminfo = (0, _vue.inject)('$xeformiteminfo', null);
    const xID = _xeUtils.default.uniqueId();
    const computeSize = (0, _size.useSize)(props);
    const reactData = (0, _vue.reactive)({
      inited: false,
      panelIndex: 0,
      showPwd: false,
      visiblePanel: false,
      animatVisible: false,
      panelStyle: null,
      panelPlacement: '',
      isActivated: false,
      inputValue: props.modelValue,
      datetimePanelValue: null,
      datePanelValue: null,
      datePanelLabel: '',
      datePanelType: 'day',
      selectMonth: null,
      currentDate: null
    });
    const refElem = (0, _vue.ref)();
    const refInputTarget = (0, _vue.ref)();
    const refInputPanel = (0, _vue.ref)();
    const refInputTimeBody = (0, _vue.ref)();
    const refMaps = {
      refElem,
      refInput: refInputTarget
    };
    const $xeinput = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    };
    let inputMethods = {};
    const parseDate = (value, format) => {
      const {
        type
      } = props;
      if (type === 'time') {
        return (0, _date.toStringTimeDate)(value);
      }
      return _xeUtils.default.toStringDate(value, format);
    };
    const computeIsDateTimeType = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      return type === 'time' || type === 'datetime';
    });
    const computeIsNumType = (0, _vue.computed)(() => {
      return ['number', 'integer', 'float'].indexOf(props.type) > -1;
    });
    const computeInputCount = (0, _vue.computed)(() => {
      return _xeUtils.default.getSize(reactData.inputValue);
    });
    const computeIsCountError = (0, _vue.computed)(() => {
      const inputCount = computeInputCount.value;
      return props.maxlength && inputCount > _xeUtils.default.toNumber(props.maxlength);
    });
    const computeIsDatePickerType = (0, _vue.computed)(() => {
      const isDateTimeType = computeIsDateTimeType.value;
      return isDateTimeType || ['date', 'week', 'month', 'quarter', 'year'].indexOf(props.type) > -1;
    });
    const computeIsPawdType = (0, _vue.computed)(() => {
      return props.type === 'password';
    });
    const computeIsSearchType = (0, _vue.computed)(() => {
      return props.type === 'search';
    });
    const computeDigitsValue = (0, _vue.computed)(() => {
      return _xeUtils.default.toInteger(props.digits) || 1;
    });
    const computeStepValue = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      const digitsValue = computeDigitsValue.value;
      const step = props.step;
      if (type === 'integer') {
        return _xeUtils.default.toInteger(step) || 1;
      } else if (type === 'float') {
        return _xeUtils.default.toNumber(step) || 1 / Math.pow(10, digitsValue);
      }
      return _xeUtils.default.toNumber(step) || 1;
    });
    const computeIsClearable = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      const isNumType = computeIsNumType.value;
      const isDatePickerType = computeIsDatePickerType.value;
      const isPawdType = computeIsPawdType.value;
      return props.clearable && (isPawdType || isNumType || isDatePickerType || type === 'text' || type === 'search');
    });
    const computeDateStartTime = (0, _vue.computed)(() => {
      return props.startDate ? _xeUtils.default.toStringDate(props.startDate) : null;
    });
    const computeDateEndTime = (0, _vue.computed)(() => {
      return props.endDate ? _xeUtils.default.toStringDate(props.endDate) : null;
    });
    const computeSupportMultiples = (0, _vue.computed)(() => {
      return ['date', 'week', 'month', 'quarter', 'year'].includes(props.type);
    });
    const computeDateListValue = (0, _vue.computed)(() => {
      const {
        modelValue,
        multiple
      } = props;
      const isDatePickerType = computeIsDatePickerType.value;
      const dateValueFormat = computeDateValueFormat.value;
      if (multiple && modelValue && isDatePickerType) {
        return _xeUtils.default.toValueString(modelValue).split(',').map(item => {
          const date = parseDate(item, dateValueFormat);
          if (_xeUtils.default.isValidDate(date)) {
            return date;
          }
          return null;
        });
      }
      return [];
    });
    const computeDateMultipleValue = (0, _vue.computed)(() => {
      const dateListValue = computeDateListValue.value;
      const dateValueFormat = computeDateValueFormat.value;
      return dateListValue.map(date => _xeUtils.default.toDateString(date, dateValueFormat));
    });
    const computeDateMultipleLabel = (0, _vue.computed)(() => {
      const dateListValue = computeDateListValue.value;
      const dateLabelFormat = computeDateLabelFormat.value;
      return dateListValue.map(date => _xeUtils.default.toDateString(date, dateLabelFormat)).join(', ');
    });
    const computeDateValueFormat = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      return type === 'time' ? 'HH:mm:ss' : props.valueFormat || (type === 'datetime' ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd');
    });
    const computeDateValue = (0, _vue.computed)(() => {
      const {
        modelValue
      } = props;
      const isDatePickerType = computeIsDatePickerType.value;
      const dateValueFormat = computeDateValueFormat.value;
      let val = null;
      if (modelValue && isDatePickerType) {
        const date = parseDate(modelValue, dateValueFormat);
        if (_xeUtils.default.isValidDate(date)) {
          val = date;
        }
      }
      return val;
    });
    const computeIsDisabledPrevDateBtn = (0, _vue.computed)(() => {
      const dateStartTime = computeDateStartTime.value;
      const {
        selectMonth
      } = reactData;
      if (selectMonth && dateStartTime) {
        return selectMonth <= dateStartTime;
      }
      return false;
    });
    const computeIsDisabledNextDateBtn = (0, _vue.computed)(() => {
      const dateEndTime = computeDateEndTime.value;
      const {
        selectMonth
      } = reactData;
      if (selectMonth && dateEndTime) {
        return selectMonth >= dateEndTime;
      }
      return false;
    });
    const computeDateTimeLabel = (0, _vue.computed)(() => {
      const {
        datetimePanelValue
      } = reactData;
      if (datetimePanelValue) {
        return _xeUtils.default.toDateString(datetimePanelValue, 'HH:mm:ss');
      }
      return '';
    });
    const computeDateHMSTime = (0, _vue.computed)(() => {
      const dateValue = computeDateValue.value;
      const isDateTimeType = computeIsDateTimeType.value;
      return dateValue && isDateTimeType ? (dateValue.getHours() * 3600 + dateValue.getMinutes() * 60 + dateValue.getSeconds()) * 1000 : 0;
    });
    const computeDateLabelFormat = (0, _vue.computed)(() => {
      const isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        return props.labelFormat || _conf.default.i18n(`vxe.input.date.labelFormat.${props.type}`);
      }
      return null;
    });
    const computeYearList = (0, _vue.computed)(() => {
      const {
        selectMonth,
        currentDate
      } = reactData;
      const years = [];
      if (selectMonth && currentDate) {
        const currFullYear = currentDate.getFullYear();
        const selectFullYear = selectMonth.getFullYear();
        const startYearDate = new Date(selectFullYear - selectFullYear % yearSize, 0, 1);
        for (let index = -4; index < yearSize + 4; index++) {
          const date = _xeUtils.default.getWhatYear(startYearDate, index, 'first');
          const itemFullYear = date.getFullYear();
          years.push({
            date,
            isCurrent: true,
            isPrev: index < 0,
            isNow: currFullYear === itemFullYear,
            isNext: index >= yearSize,
            year: itemFullYear
          });
        }
      }
      return years;
    });
    const computeSelectDatePanelLabel = (0, _vue.computed)(() => {
      const isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        const {
          datePanelType,
          selectMonth
        } = reactData;
        const yearList = computeYearList.value;
        let year = '';
        let month;
        if (selectMonth) {
          year = selectMonth.getFullYear();
          month = selectMonth.getMonth() + 1;
        }
        if (datePanelType === 'quarter') {
          return _conf.default.i18n('vxe.input.date.quarterLabel', [year]);
        } else if (datePanelType === 'month') {
          return _conf.default.i18n('vxe.input.date.monthLabel', [year]);
        } else if (datePanelType === 'year') {
          return yearList.length ? `${yearList[0].year} - ${yearList[yearList.length - 1].year}` : '';
        }
        return _conf.default.i18n('vxe.input.date.dayLabel', [year, month ? _conf.default.i18n(`vxe.input.date.m${month}`) : '-']);
      }
      return '';
    });
    const computeFirstDayOfWeek = (0, _vue.computed)(() => {
      const {
        startDay,
        startWeek
      } = props;
      return _xeUtils.default.toNumber(_xeUtils.default.isNumber(startDay) || _xeUtils.default.isString(startDay) ? startDay : startWeek);
    });
    const computeWeekDatas = (0, _vue.computed)(() => {
      const weeks = [];
      const isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        let sWeek = computeFirstDayOfWeek.value;
        weeks.push(sWeek);
        for (let index = 0; index < 6; index++) {
          if (sWeek >= 6) {
            sWeek = 0;
          } else {
            sWeek++;
          }
          weeks.push(sWeek);
        }
      }
      return weeks;
    });
    const computeDateHeaders = (0, _vue.computed)(() => {
      const isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        const weekDatas = computeWeekDatas.value;
        return weekDatas.map(day => {
          return {
            value: day,
            label: _conf.default.i18n(`vxe.input.date.weeks.w${day}`)
          };
        });
      }
      return [];
    });
    const computeWeekHeaders = (0, _vue.computed)(() => {
      const isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        const dateHeaders = computeDateHeaders.value;
        return [{
          label: _conf.default.i18n('vxe.input.date.weeks.w')
        }].concat(dateHeaders);
      }
      return [];
    });
    const computeYearDatas = (0, _vue.computed)(() => {
      const yearList = computeYearList.value;
      return _xeUtils.default.chunk(yearList, 4);
    });
    const computeQuarterList = (0, _vue.computed)(() => {
      const {
        selectMonth,
        currentDate
      } = reactData;
      const quarters = [];
      if (selectMonth && currentDate) {
        const currFullYear = currentDate.getFullYear();
        const currQuarter = (0, _date.getDateQuarter)(currentDate);
        const firstYear = _xeUtils.default.getWhatYear(selectMonth, 0, 'first');
        const selFullYear = firstYear.getFullYear();
        for (let index = -2; index < quarterSize - 2; index++) {
          const date = _xeUtils.default.getWhatQuarter(firstYear, index);
          const itemFullYear = date.getFullYear();
          const itemQuarter = (0, _date.getDateQuarter)(date);
          const isPrev = itemFullYear < selFullYear;
          quarters.push({
            date,
            isPrev,
            isCurrent: itemFullYear === selFullYear,
            isNow: itemFullYear === currFullYear && itemQuarter === currQuarter,
            isNext: !isPrev && itemFullYear > selFullYear,
            quarter: itemQuarter
          });
        }
      }
      return quarters;
    });
    const computeQuarterDatas = (0, _vue.computed)(() => {
      const quarterList = computeQuarterList.value;
      return _xeUtils.default.chunk(quarterList, 2);
    });
    const computeMonthList = (0, _vue.computed)(() => {
      const {
        selectMonth,
        currentDate
      } = reactData;
      const months = [];
      if (selectMonth && currentDate) {
        const currFullYear = currentDate.getFullYear();
        const currMonth = currentDate.getMonth();
        const selFullYear = _xeUtils.default.getWhatYear(selectMonth, 0, 'first').getFullYear();
        for (let index = -4; index < monthSize - 4; index++) {
          const date = _xeUtils.default.getWhatYear(selectMonth, 0, index);
          const itemFullYear = date.getFullYear();
          const itemMonth = date.getMonth();
          const isPrev = itemFullYear < selFullYear;
          months.push({
            date,
            isPrev,
            isCurrent: itemFullYear === selFullYear,
            isNow: itemFullYear === currFullYear && itemMonth === currMonth,
            isNext: !isPrev && itemFullYear > selFullYear,
            month: itemMonth
          });
        }
      }
      return months;
    });
    const computeMonthDatas = (0, _vue.computed)(() => {
      const monthList = computeMonthList.value;
      return _xeUtils.default.chunk(monthList, 4);
    });
    const computeDayList = (0, _vue.computed)(() => {
      const {
        selectMonth,
        currentDate
      } = reactData;
      const days = [];
      if (selectMonth && currentDate) {
        const dateHMSTime = computeDateHMSTime.value;
        const weekDatas = computeWeekDatas.value;
        const currFullYear = currentDate.getFullYear();
        const currMonth = currentDate.getMonth();
        const currDate = currentDate.getDate();
        const selFullYear = selectMonth.getFullYear();
        const selMonth = selectMonth.getMonth();
        const selDay = selectMonth.getDay();
        const prevOffsetDate = -weekDatas.indexOf(selDay);
        const startDayDate = new Date(_xeUtils.default.getWhatDay(selectMonth, prevOffsetDate).getTime() + dateHMSTime);
        for (let index = 0; index < 42; index++) {
          const date = _xeUtils.default.getWhatDay(startDayDate, index);
          const itemFullYear = date.getFullYear();
          const itemMonth = date.getMonth();
          const itemDate = date.getDate();
          const isPrev = date < selectMonth;
          days.push({
            date,
            isPrev,
            isCurrent: itemFullYear === selFullYear && itemMonth === selMonth,
            isNow: itemFullYear === currFullYear && itemMonth === currMonth && itemDate === currDate,
            isNext: !isPrev && selMonth !== itemMonth,
            label: itemDate
          });
        }
      }
      return days;
    });
    const computeDayDatas = (0, _vue.computed)(() => {
      const dayList = computeDayList.value;
      return _xeUtils.default.chunk(dayList, 7);
    });
    const computeWeekDates = (0, _vue.computed)(() => {
      const dayDatas = computeDayDatas.value;
      const firstDayOfWeek = computeFirstDayOfWeek.value;
      return dayDatas.map(list => {
        const firstItem = list[0];
        const item = {
          date: firstItem.date,
          isWeekNumber: true,
          isPrev: false,
          isCurrent: false,
          isNow: false,
          isNext: false,
          label: _xeUtils.default.getYearWeek(firstItem.date, firstDayOfWeek)
        };
        return [item].concat(list);
      });
    });
    const computeHourList = (0, _vue.computed)(() => {
      const list = [];
      const isDateTimeType = computeIsDateTimeType.value;
      if (isDateTimeType) {
        for (let index = 0; index < 24; index++) {
          list.push({
            value: index,
            label: ('' + index).padStart(2, '0')
          });
        }
      }
      return list;
    });
    const computeMinuteList = (0, _vue.computed)(() => {
      const list = [];
      const isDateTimeType = computeIsDateTimeType.value;
      if (isDateTimeType) {
        for (let index = 0; index < 60; index++) {
          list.push({
            value: index,
            label: ('' + index).padStart(2, '0')
          });
        }
      }
      return list;
    });
    const computeSecondList = (0, _vue.computed)(() => {
      const minuteList = computeMinuteList.value;
      return minuteList;
    });
    const computeInpReadonly = (0, _vue.computed)(() => {
      const {
        type,
        readonly,
        editable,
        multiple
      } = props;
      return readonly || multiple || !editable || type === 'week' || type === 'quarter';
    });
    const computeInputType = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      const {
        showPwd
      } = reactData;
      const isNumType = computeIsNumType.value;
      const isDatePickerType = computeIsDatePickerType.value;
      const isPawdType = computeIsPawdType.value;
      if (isDatePickerType || isNumType || isPawdType && showPwd || type === 'number') {
        return 'text';
      }
      return type;
    });
    const computeInpPlaceholder = (0, _vue.computed)(() => {
      const {
        placeholder
      } = props;
      if (placeholder) {
        return (0, _utils.getFuncText)(placeholder);
      }
      return '';
    });
    const computeInpMaxlength = (0, _vue.computed)(() => {
      const {
        maxlength
      } = props;
      const isNumType = computeIsNumType.value;
      // 数值最大长度限制 16 位，包含小数
      return isNumType && !_xeUtils.default.toNumber(maxlength) ? 16 : maxlength;
    });
    const computeInpImmediate = (0, _vue.computed)(() => {
      const {
        type,
        immediate
      } = props;
      return immediate || !(type === 'text' || type === 'number' || type === 'integer' || type === 'float');
    });
    const computeNumValue = (0, _vue.computed)(() => {
      const {
        type
      } = props;
      const {
        inputValue
      } = reactData;
      const isNumType = computeIsNumType.value;
      if (isNumType) {
        return type === 'integer' ? _xeUtils.default.toInteger((0, _number.handleNumber)(inputValue)) : _xeUtils.default.toNumber((0, _number.handleNumber)(inputValue));
      }
      return 0;
    });
    const computeIsDisabledSubtractNumber = (0, _vue.computed)(() => {
      const {
        min
      } = props;
      const {
        inputValue
      } = reactData;
      const isNumType = computeIsNumType.value;
      const numValue = computeNumValue.value;
      // 当有值时再进行判断
      if ((inputValue || inputValue === 0) && isNumType && min !== null) {
        return numValue <= _xeUtils.default.toNumber(min);
      }
      return false;
    });
    const computeIsDisabledAddNumber = (0, _vue.computed)(() => {
      const {
        max
      } = props;
      const {
        inputValue
      } = reactData;
      const isNumType = computeIsNumType.value;
      const numValue = computeNumValue.value;
      // 当有值时再进行判断
      if ((inputValue || inputValue === 0) && isNumType && max !== null) {
        return numValue >= _xeUtils.default.toNumber(max);
      }
      return false;
    });
    const getNumberValue = val => {
      const {
        type,
        exponential
      } = props;
      const inpMaxlength = computeInpMaxlength.value;
      const digitsValue = computeDigitsValue.value;
      const restVal = type === 'float' ? (0, _number.toFloatValueFixed)(val, digitsValue) : _xeUtils.default.toValueString(val);
      if (exponential && (val === restVal || _xeUtils.default.toValueString(val).toLowerCase() === _xeUtils.default.toNumber(restVal).toExponential())) {
        return val;
      }
      return restVal.slice(0, inpMaxlength);
    };
    const triggerEvent = evnt => {
      const {
        inputValue
      } = reactData;
      inputMethods.dispatchEvent(evnt.type, {
        value: inputValue
      }, evnt);
    };
    const emitModel = (value, evnt) => {
      reactData.inputValue = value;
      emit('update:modelValue', value);
      inputMethods.dispatchEvent('input', {
        value
      }, evnt);
      if (_xeUtils.default.toValueString(props.modelValue) !== value) {
        inputMethods.dispatchEvent('change', {
          value
        }, evnt);
        // 自动更新校验状态
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, value);
        }
      }
    };
    const emitInputEvent = (value, evnt) => {
      const isDatePickerType = computeIsDatePickerType.value;
      const inpImmediate = computeInpImmediate.value;
      reactData.inputValue = value;
      if (!isDatePickerType) {
        if (inpImmediate) {
          emitModel(value, evnt);
        } else {
          inputMethods.dispatchEvent('input', {
            value
          }, evnt);
        }
      }
    };
    const inputEvent = evnt => {
      const inputElem = evnt.target;
      const value = inputElem.value;
      emitInputEvent(value, evnt);
    };
    const changeEvent = evnt => {
      const inpImmediate = computeInpImmediate.value;
      if (!inpImmediate) {
        triggerEvent(evnt);
      }
    };
    const focusEvent = evnt => {
      reactData.isActivated = true;
      const isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        datePickerOpenEvent(evnt);
      }
      triggerEvent(evnt);
    };
    const clickPrefixEvent = evnt => {
      const {
        disabled
      } = props;
      if (!disabled) {
        const {
          inputValue
        } = reactData;
        inputMethods.dispatchEvent('prefix-click', {
          value: inputValue
        }, evnt);
      }
    };
    let hidePanelTimeout;
    const hidePanel = () => {
      return new Promise(resolve => {
        reactData.visiblePanel = false;
        hidePanelTimeout = window.setTimeout(() => {
          reactData.animatVisible = false;
          resolve();
        }, 350);
      });
    };
    const clearValueEvent = (evnt, value) => {
      const {
        type
      } = props;
      const isNumType = computeIsNumType.value;
      const isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        hidePanel();
      }
      if (isNumType || ['text', 'search', 'password'].indexOf(type) > -1) {
        focus();
      }
      inputMethods.dispatchEvent('clear', {
        value
      }, evnt);
    };
    const clickSuffixEvent = evnt => {
      const {
        disabled
      } = props;
      if (!disabled) {
        if ((0, _dom.hasClass)(evnt.currentTarget, 'is--clear')) {
          emitModel('', evnt);
          clearValueEvent(evnt, '');
        } else {
          const {
            inputValue
          } = reactData;
          inputMethods.dispatchEvent('suffix-click', {
            value: inputValue
          }, evnt);
        }
      }
    };
    const dateParseValue = value => {
      const {
        type
      } = props;
      const {
        valueFormat
      } = props;
      const dateLabelFormat = computeDateLabelFormat.value;
      const firstDayOfWeek = computeFirstDayOfWeek.value;
      let dValue = null;
      let dLabel = '';
      if (value) {
        dValue = parseDate(value, valueFormat);
      }
      if (_xeUtils.default.isValidDate(dValue)) {
        dLabel = _xeUtils.default.toDateString(dValue, dateLabelFormat, {
          firstDay: firstDayOfWeek
        });
        // 由于年份和第几周是冲突的行为，所以需要特殊处理，判断是否跨年
        if (dateLabelFormat && type === 'week') {
          const firstWeekDate = _xeUtils.default.getWhatWeek(dValue, 0, firstDayOfWeek, firstDayOfWeek);
          if (firstWeekDate.getFullYear() < dValue.getFullYear()) {
            const yyIndex = dateLabelFormat.indexOf('yyyy');
            if (yyIndex > -1) {
              const yyNum = Number(dLabel.substring(yyIndex, yyIndex + 4));
              if (yyNum && !isNaN(yyNum)) {
                dLabel = dLabel.replace(`${yyNum}`, `${yyNum - 1}`);
              }
            }
          }
        }
      } else {
        dValue = null;
      }
      reactData.datePanelValue = dValue;
      reactData.datePanelLabel = dLabel;
    };
    /**
     * 值变化时处理
     */
    const changeValue = () => {
      const isDatePickerType = computeIsDatePickerType.value;
      const {
        inputValue
      } = reactData;
      if (isDatePickerType) {
        dateParseValue(inputValue);
        reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel;
      }
    };
    /**
     * 检查初始值
     */
    const initValue = () => {
      const {
        type
      } = props;
      const {
        inputValue
      } = reactData;
      const isDatePickerType = computeIsDatePickerType.value;
      const digitsValue = computeDigitsValue.value;
      if (isDatePickerType) {
        changeValue();
      } else if (type === 'float') {
        if (inputValue) {
          const validValue = (0, _number.toFloatValueFixed)(inputValue, digitsValue);
          if (inputValue !== validValue) {
            emitModel(validValue, {
              type: 'init'
            });
          }
        }
      }
    };
    const vaildMaxNum = num => {
      return props.max === null || _xeUtils.default.toNumber(num) <= _xeUtils.default.toNumber(props.max);
    };
    const vaildMinNum = num => {
      return props.min === null || _xeUtils.default.toNumber(num) >= _xeUtils.default.toNumber(props.min);
    };
    const dateRevert = () => {
      reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel;
    };
    const dateCheckMonth = date => {
      const month = _xeUtils.default.getWhatMonth(date, 0, 'first');
      if (!_xeUtils.default.isEqual(month, reactData.selectMonth)) {
        reactData.selectMonth = month;
      }
    };
    const dateChange = date => {
      const {
        modelValue,
        multiple
      } = props;
      const {
        datetimePanelValue
      } = reactData;
      const isDateTimeType = computeIsDateTimeType.value;
      const dateValueFormat = computeDateValueFormat.value;
      const firstDayOfWeek = computeFirstDayOfWeek.value;
      if (props.type === 'week') {
        const sWeek = _xeUtils.default.toNumber(props.selectDay);
        date = _xeUtils.default.getWhatWeek(date, 0, sWeek, firstDayOfWeek);
      } else if (isDateTimeType) {
        date.setHours(datetimePanelValue.getHours());
        date.setMinutes(datetimePanelValue.getMinutes());
        date.setSeconds(datetimePanelValue.getSeconds());
      }
      const inpVal = _xeUtils.default.toDateString(date, dateValueFormat, {
        firstDay: firstDayOfWeek
      });
      dateCheckMonth(date);
      if (multiple) {
        // 如果为多选
        const dateMultipleValue = computeDateMultipleValue.value;
        if (isDateTimeType) {
          // 如果是datetime特殊类型
          const dateListValue = [...computeDateListValue.value];
          const datetimeRest = [];
          const eqIndex = _xeUtils.default.findIndexOf(dateListValue, val => _xeUtils.default.isDateSame(date, val, 'yyyyMMdd'));
          if (eqIndex === -1) {
            dateListValue.push(date);
          } else {
            dateListValue.splice(eqIndex, 1);
          }
          dateListValue.forEach(item => {
            if (item) {
              item.setHours(datetimePanelValue.getHours());
              item.setMinutes(datetimePanelValue.getMinutes());
              item.setSeconds(datetimePanelValue.getSeconds());
              datetimeRest.push(item);
            }
          });
          emitModel(datetimeRest.map(date => _xeUtils.default.toDateString(date, dateValueFormat)).join(','), {
            type: 'update'
          });
        } else {
          // 如果是日期类型
          if (dateMultipleValue.some(val => _xeUtils.default.isEqual(val, inpVal))) {
            emitModel(dateMultipleValue.filter(val => !_xeUtils.default.isEqual(val, inpVal)).join(','), {
              type: 'update'
            });
          } else {
            emitModel(dateMultipleValue.concat([inpVal]).join(','), {
              type: 'update'
            });
          }
        }
      } else {
        // 如果为单选
        if (!_xeUtils.default.isEqual(modelValue, inpVal)) {
          emitModel(inpVal, {
            type: 'update'
          });
        }
      }
    };
    const afterCheckValue = () => {
      const {
        type,
        min,
        max,
        exponential
      } = props;
      const {
        inputValue,
        datetimePanelValue
      } = reactData;
      const isNumType = computeIsNumType.value;
      const isDatePickerType = computeIsDatePickerType.value;
      const dateLabelFormat = computeDateLabelFormat.value;
      const inpReadonly = computeInpReadonly.value;
      if (!inpReadonly) {
        if (isNumType) {
          if (inputValue) {
            let inpNumVal = type === 'integer' ? _xeUtils.default.toInteger((0, _number.handleNumber)(inputValue)) : _xeUtils.default.toNumber((0, _number.handleNumber)(inputValue));
            if (!vaildMinNum(inpNumVal)) {
              inpNumVal = min;
            } else if (!vaildMaxNum(inpNumVal)) {
              inpNumVal = max;
            }
            if (exponential) {
              const inpStringVal = _xeUtils.default.toValueString(inputValue).toLowerCase();
              if (inpStringVal === _xeUtils.default.toNumber(inpNumVal).toExponential()) {
                inpNumVal = inpStringVal;
              }
            }
            emitModel(getNumberValue(inpNumVal), {
              type: 'check'
            });
          }
        } else if (isDatePickerType) {
          if (inputValue) {
            let inpDateVal = parseDate(inputValue, dateLabelFormat);
            if (_xeUtils.default.isValidDate(inpDateVal)) {
              if (type === 'time') {
                inpDateVal = _xeUtils.default.toDateString(inpDateVal, dateLabelFormat);
                if (inputValue !== inpDateVal) {
                  emitModel(inpDateVal, {
                    type: 'check'
                  });
                }
                reactData.inputValue = inpDateVal;
              } else {
                let isChange = false;
                const firstDayOfWeek = computeFirstDayOfWeek.value;
                if (type === 'datetime') {
                  const dateValue = computeDateValue.value;
                  if (inputValue !== _xeUtils.default.toDateString(dateValue, dateLabelFormat) || inputValue !== _xeUtils.default.toDateString(inpDateVal, dateLabelFormat)) {
                    isChange = true;
                    datetimePanelValue.setHours(inpDateVal.getHours());
                    datetimePanelValue.setMinutes(inpDateVal.getMinutes());
                    datetimePanelValue.setSeconds(inpDateVal.getSeconds());
                  }
                } else {
                  isChange = true;
                }
                reactData.inputValue = _xeUtils.default.toDateString(inpDateVal, dateLabelFormat, {
                  firstDay: firstDayOfWeek
                });
                if (isChange) {
                  dateChange(inpDateVal);
                }
              }
            } else {
              dateRevert();
            }
          } else {
            emitModel('', {
              type: 'check'
            });
          }
        }
      }
    };
    const blurEvent = evnt => {
      const {
        inputValue
      } = reactData;
      const inpImmediate = computeInpImmediate.value;
      if (!inpImmediate) {
        emitModel(inputValue, evnt);
      }
      afterCheckValue();
      if (!reactData.visiblePanel) {
        reactData.isActivated = false;
      }
      inputMethods.dispatchEvent('blur', {
        value: inputValue
      }, evnt);
    };
    // 密码
    const passwordToggleEvent = evnt => {
      const {
        readonly,
        disabled
      } = props;
      const {
        showPwd
      } = reactData;
      if (!disabled && !readonly) {
        reactData.showPwd = !showPwd;
      }
      inputMethods.dispatchEvent('toggle-visible', {
        visible: reactData.showPwd
      }, evnt);
    };
    // 密码
    // 搜索
    const searchEvent = evnt => {
      inputMethods.dispatchEvent('search-click', {}, evnt);
    };
    // 搜索
    // 数值
    const numberChange = (isPlus, evnt) => {
      const {
        min,
        max,
        type
      } = props;
      const {
        inputValue
      } = reactData;
      const stepValue = computeStepValue.value;
      const numValue = type === 'integer' ? _xeUtils.default.toInteger((0, _number.handleNumber)(inputValue)) : _xeUtils.default.toNumber((0, _number.handleNumber)(inputValue));
      const newValue = isPlus ? _xeUtils.default.add(numValue, stepValue) : _xeUtils.default.subtract(numValue, stepValue);
      let restNum;
      if (!vaildMinNum(newValue)) {
        restNum = min;
      } else if (!vaildMaxNum(newValue)) {
        restNum = max;
      } else {
        restNum = newValue;
      }
      emitInputEvent(getNumberValue(restNum), evnt);
    };
    let downbumTimeout;
    const numberNextEvent = evnt => {
      const {
        readonly,
        disabled
      } = props;
      const isDisabledSubtractNumber = computeIsDisabledSubtractNumber.value;
      clearTimeout(downbumTimeout);
      if (!disabled && !readonly && !isDisabledSubtractNumber) {
        numberChange(false, evnt);
      }
      inputMethods.dispatchEvent('next-number', {}, evnt);
    };
    const numberDownNextEvent = evnt => {
      downbumTimeout = window.setTimeout(() => {
        numberNextEvent(evnt);
        numberDownNextEvent(evnt);
      }, 60);
    };
    const numberPrevEvent = evnt => {
      const {
        readonly,
        disabled
      } = props;
      const isDisabledAddNumber = computeIsDisabledAddNumber.value;
      clearTimeout(downbumTimeout);
      if (!disabled && !readonly && !isDisabledAddNumber) {
        numberChange(true, evnt);
      }
      inputMethods.dispatchEvent('prev-number', {}, evnt);
    };
    const numberKeydownEvent = evnt => {
      const isUpArrow = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ARROW_UP);
      const isDwArrow = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ARROW_DOWN);
      if (isUpArrow || isDwArrow) {
        evnt.preventDefault();
        if (isUpArrow) {
          numberPrevEvent(evnt);
        } else {
          numberNextEvent(evnt);
        }
      }
    };
    const keydownEvent = evnt => {
      const {
        exponential,
        controls
      } = props;
      const isNumType = computeIsNumType.value;
      if (isNumType) {
        const isCtrlKey = evnt.ctrlKey;
        const isShiftKey = evnt.shiftKey;
        const isAltKey = evnt.altKey;
        const keyCode = evnt.keyCode;
        if (!isCtrlKey && !isShiftKey && !isAltKey && ((0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.SPACEBAR) || (!exponential || keyCode !== 69) && keyCode >= 65 && keyCode <= 90 || keyCode >= 186 && keyCode <= 188 || keyCode >= 191)) {
          evnt.preventDefault();
        }
        if (controls) {
          numberKeydownEvent(evnt);
        }
      }
      triggerEvent(evnt);
    };
    const keyupEvent = evnt => {
      triggerEvent(evnt);
    };
    // 数值
    const numberStopDown = () => {
      clearTimeout(downbumTimeout);
    };
    const numberDownPrevEvent = evnt => {
      downbumTimeout = window.setTimeout(() => {
        numberPrevEvent(evnt);
        numberDownPrevEvent(evnt);
      }, 60);
    };
    const numberMousedownEvent = evnt => {
      numberStopDown();
      if (evnt.button === 0) {
        const isPrevNumber = (0, _dom.hasClass)(evnt.currentTarget, 'is--prev');
        if (isPrevNumber) {
          numberPrevEvent(evnt);
        } else {
          numberNextEvent(evnt);
        }
        downbumTimeout = window.setTimeout(() => {
          if (isPrevNumber) {
            numberDownPrevEvent(evnt);
          } else {
            numberDownNextEvent(evnt);
          }
        }, 500);
      }
    };
    const wheelEvent = evnt => {
      const isNumType = computeIsNumType.value;
      if (isNumType && props.controls) {
        if (reactData.isActivated) {
          const delta = evnt.deltaY;
          if (delta > 0) {
            numberNextEvent(evnt);
          } else if (delta < 0) {
            numberPrevEvent(evnt);
          }
          evnt.preventDefault();
        }
      }
      triggerEvent(evnt);
    };
    // 日期
    const dateMonthHandle = (date, offsetMonth) => {
      reactData.selectMonth = _xeUtils.default.getWhatMonth(date, offsetMonth, 'first');
    };
    const dateNowHandle = () => {
      const currentDate = _xeUtils.default.getWhatDay(Date.now(), 0, 'first');
      reactData.currentDate = currentDate;
      dateMonthHandle(currentDate, 0);
    };
    const dateToggleTypeEvent = () => {
      let {
        datePanelType
      } = reactData;
      if (datePanelType === 'month' || datePanelType === 'quarter') {
        datePanelType = 'year';
      } else {
        datePanelType = 'month';
      }
      reactData.datePanelType = datePanelType;
    };
    const datePrevEvent = evnt => {
      const {
        type
      } = props;
      const {
        datePanelType,
        selectMonth
      } = reactData;
      const isDisabledPrevDateBtn = computeIsDisabledPrevDateBtn.value;
      if (!isDisabledPrevDateBtn) {
        if (type === 'year') {
          reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, -yearSize, 'first');
        } else if (type === 'month' || type === 'quarter') {
          if (datePanelType === 'year') {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, -yearSize, 'first');
          } else {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, -1, 'first');
          }
        } else {
          if (datePanelType === 'year') {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, -yearSize, 'first');
          } else if (datePanelType === 'month') {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, -1, 'first');
          } else {
            reactData.selectMonth = _xeUtils.default.getWhatMonth(selectMonth, -1, 'first');
          }
        }
        inputMethods.dispatchEvent('date-prev', {
          type
        }, evnt);
      }
    };
    const dateTodayMonthEvent = evnt => {
      dateNowHandle();
      if (!props.multiple) {
        dateChange(reactData.currentDate);
        hidePanel();
      }
      inputMethods.dispatchEvent('date-today', {
        type: props.type
      }, evnt);
    };
    const dateNextEvent = evnt => {
      const {
        type
      } = props;
      const {
        datePanelType,
        selectMonth
      } = reactData;
      const isDisabledNextDateBtn = computeIsDisabledNextDateBtn.value;
      if (!isDisabledNextDateBtn) {
        if (type === 'year') {
          reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, yearSize, 'first');
        } else if (type === 'month' || type === 'quarter') {
          if (datePanelType === 'year') {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, yearSize, 'first');
          } else {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, 1, 'first');
          }
        } else {
          if (datePanelType === 'year') {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, yearSize, 'first');
          } else if (datePanelType === 'month') {
            reactData.selectMonth = _xeUtils.default.getWhatYear(selectMonth, 1, 'first');
          } else {
            reactData.selectMonth = _xeUtils.default.getWhatMonth(selectMonth, 1, 'first');
          }
        }
        inputMethods.dispatchEvent('date-next', {
          type
        }, evnt);
      }
    };
    const isDateDisabled = item => {
      const {
        disabledMethod
      } = props;
      const {
        datePanelType
      } = reactData;
      return disabledMethod && disabledMethod({
        type: datePanelType,
        viewType: datePanelType,
        date: item.date,
        $input: $xeinput
      });
    };
    const dateSelectItem = date => {
      const {
        type,
        multiple
      } = props;
      const {
        datePanelType
      } = reactData;
      if (type === 'month') {
        if (datePanelType === 'year') {
          reactData.datePanelType = 'month';
          dateCheckMonth(date);
        } else {
          dateChange(date);
          if (!multiple) {
            hidePanel();
          }
        }
      } else if (type === 'year') {
        dateChange(date);
        if (!multiple) {
          hidePanel();
        }
      } else if (type === 'quarter') {
        if (datePanelType === 'year') {
          reactData.datePanelType = 'quarter';
          dateCheckMonth(date);
        } else {
          dateChange(date);
          if (!multiple) {
            hidePanel();
          }
        }
      } else {
        if (datePanelType === 'month') {
          reactData.datePanelType = type === 'week' ? type : 'day';
          dateCheckMonth(date);
        } else if (datePanelType === 'year') {
          reactData.datePanelType = 'month';
          dateCheckMonth(date);
        } else {
          dateChange(date);
          if (type === 'datetime') {
            // 日期带时间
          } else {
            if (!multiple) {
              hidePanel();
            }
          }
        }
      }
    };
    const dateSelectEvent = item => {
      if (!isDateDisabled(item)) {
        dateSelectItem(item.date);
      }
    };
    const dateMoveDay = offsetDay => {
      if (!isDateDisabled({
        date: offsetDay
      })) {
        const dayList = computeDayList.value;
        if (!dayList.some(item => _xeUtils.default.isDateSame(item.date, offsetDay, 'yyyyMMdd'))) {
          dateCheckMonth(offsetDay);
        }
        dateParseValue(offsetDay);
      }
    };
    const dateMoveYear = offsetYear => {
      if (!isDateDisabled({
        date: offsetYear
      })) {
        const yearList = computeYearList.value;
        if (!yearList.some(item => _xeUtils.default.isDateSame(item.date, offsetYear, 'yyyy'))) {
          dateCheckMonth(offsetYear);
        }
        dateParseValue(offsetYear);
      }
    };
    const dateMoveQuarter = offsetQuarter => {
      if (!isDateDisabled({
        date: offsetQuarter
      })) {
        const quarterList = computeQuarterList.value;
        if (!quarterList.some(item => _xeUtils.default.isDateSame(item.date, offsetQuarter, 'yyyyq'))) {
          dateCheckMonth(offsetQuarter);
        }
        dateParseValue(offsetQuarter);
      }
    };
    const dateMoveMonth = offsetMonth => {
      if (!isDateDisabled({
        date: offsetMonth
      })) {
        const monthList = computeMonthList.value;
        if (!monthList.some(item => _xeUtils.default.isDateSame(item.date, offsetMonth, 'yyyyMM'))) {
          dateCheckMonth(offsetMonth);
        }
        dateParseValue(offsetMonth);
      }
    };
    const dateMouseenterEvent = item => {
      if (!isDateDisabled(item)) {
        const {
          datePanelType
        } = reactData;
        if (datePanelType === 'month') {
          dateMoveMonth(item.date);
        } else if (datePanelType === 'quarter') {
          dateMoveQuarter(item.date);
        } else if (datePanelType === 'year') {
          dateMoveYear(item.date);
        } else {
          dateMoveDay(item.date);
        }
      }
    };
    const updateTimePos = liElem => {
      if (liElem) {
        const height = liElem.offsetHeight;
        const ulElem = liElem.parentNode;
        ulElem.scrollTop = liElem.offsetTop - height * 4;
      }
    };
    const dateTimeChangeEvent = evnt => {
      reactData.datetimePanelValue = new Date(reactData.datetimePanelValue.getTime());
      updateTimePos(evnt.currentTarget);
    };
    const dateHourEvent = (evnt, item) => {
      reactData.datetimePanelValue.setHours(item.value);
      dateTimeChangeEvent(evnt);
    };
    const dateConfirmEvent = () => {
      const {
        multiple
      } = props;
      const {
        datetimePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const isDateTimeType = computeIsDateTimeType.value;
      if (isDateTimeType) {
        const dateValueFormat = computeDateValueFormat.value;
        if (multiple) {
          // 如果为多选
          const dateMultipleValue = computeDateMultipleValue.value;
          if (isDateTimeType) {
            // 如果是datetime特殊类型
            const dateListValue = [...computeDateListValue.value];
            const datetimeRest = [];
            dateListValue.forEach(item => {
              if (item) {
                item.setHours(datetimePanelValue.getHours());
                item.setMinutes(datetimePanelValue.getMinutes());
                item.setSeconds(datetimePanelValue.getSeconds());
                datetimeRest.push(item);
              }
            });
            emitModel(datetimeRest.map(date => _xeUtils.default.toDateString(date, dateValueFormat)).join(','), {
              type: 'update'
            });
          } else {
            // 如果是日期类型
            emitModel(dateMultipleValue.join(','), {
              type: 'update'
            });
          }
        } else {
          dateChange(dateValue || reactData.currentDate);
        }
      }
      hidePanel();
    };
    const dateMinuteEvent = (evnt, item) => {
      reactData.datetimePanelValue.setMinutes(item.value);
      dateTimeChangeEvent(evnt);
    };
    const dateSecondEvent = (evnt, item) => {
      reactData.datetimePanelValue.setSeconds(item.value);
      dateTimeChangeEvent(evnt);
    };
    const dateOffsetEvent = evnt => {
      const {
        isActivated,
        datePanelValue,
        datePanelType
      } = reactData;
      if (isActivated) {
        evnt.preventDefault();
        const isLeftArrow = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ARROW_LEFT);
        const isUpArrow = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ARROW_UP);
        const isRightArrow = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ARROW_RIGHT);
        const isDwArrow = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ARROW_DOWN);
        if (datePanelType === 'year') {
          let offsetYear = _xeUtils.default.getWhatYear(datePanelValue || Date.now(), 0, 'first');
          if (isLeftArrow) {
            offsetYear = _xeUtils.default.getWhatYear(offsetYear, -1);
          } else if (isUpArrow) {
            offsetYear = _xeUtils.default.getWhatYear(offsetYear, -4);
          } else if (isRightArrow) {
            offsetYear = _xeUtils.default.getWhatYear(offsetYear, 1);
          } else if (isDwArrow) {
            offsetYear = _xeUtils.default.getWhatYear(offsetYear, 4);
          }
          dateMoveYear(offsetYear);
        } else if (datePanelType === 'quarter') {
          let offsetQuarter = _xeUtils.default.getWhatQuarter(datePanelValue || Date.now(), 0, 'first');
          if (isLeftArrow) {
            offsetQuarter = _xeUtils.default.getWhatQuarter(offsetQuarter, -1);
          } else if (isUpArrow) {
            offsetQuarter = _xeUtils.default.getWhatQuarter(offsetQuarter, -2);
          } else if (isRightArrow) {
            offsetQuarter = _xeUtils.default.getWhatQuarter(offsetQuarter, 1);
          } else if (isDwArrow) {
            offsetQuarter = _xeUtils.default.getWhatQuarter(offsetQuarter, 2);
          }
          dateMoveQuarter(offsetQuarter);
        } else if (datePanelType === 'month') {
          let offsetMonth = _xeUtils.default.getWhatMonth(datePanelValue || Date.now(), 0, 'first');
          if (isLeftArrow) {
            offsetMonth = _xeUtils.default.getWhatMonth(offsetMonth, -1);
          } else if (isUpArrow) {
            offsetMonth = _xeUtils.default.getWhatMonth(offsetMonth, -4);
          } else if (isRightArrow) {
            offsetMonth = _xeUtils.default.getWhatMonth(offsetMonth, 1);
          } else if (isDwArrow) {
            offsetMonth = _xeUtils.default.getWhatMonth(offsetMonth, 4);
          }
          dateMoveMonth(offsetMonth);
        } else {
          let offsetDay = datePanelValue || _xeUtils.default.getWhatDay(Date.now(), 0, 'first');
          const firstDayOfWeek = computeFirstDayOfWeek.value;
          if (isLeftArrow) {
            offsetDay = _xeUtils.default.getWhatDay(offsetDay, -1);
          } else if (isUpArrow) {
            offsetDay = _xeUtils.default.getWhatWeek(offsetDay, -1, firstDayOfWeek);
          } else if (isRightArrow) {
            offsetDay = _xeUtils.default.getWhatDay(offsetDay, 1);
          } else if (isDwArrow) {
            offsetDay = _xeUtils.default.getWhatWeek(offsetDay, 1, firstDayOfWeek);
          }
          dateMoveDay(offsetDay);
        }
      }
    };
    const datePgOffsetEvent = evnt => {
      const {
        isActivated
      } = reactData;
      if (isActivated) {
        const isPgUp = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.PAGE_UP);
        evnt.preventDefault();
        if (isPgUp) {
          datePrevEvent(evnt);
        } else {
          dateNextEvent(evnt);
        }
      }
    };
    const dateOpenPanel = () => {
      const {
        type
      } = props;
      const isDateTimeType = computeIsDateTimeType.value;
      const dateValue = computeDateValue.value;
      if (['year', 'quarter', 'month', 'week'].indexOf(type) > -1) {
        reactData.datePanelType = type;
      } else {
        reactData.datePanelType = 'day';
      }
      reactData.currentDate = _xeUtils.default.getWhatDay(Date.now(), 0, 'first');
      if (dateValue) {
        dateMonthHandle(dateValue, 0);
        dateParseValue(dateValue);
      } else {
        dateNowHandle();
      }
      if (isDateTimeType) {
        reactData.datetimePanelValue = reactData.datePanelValue || _xeUtils.default.getWhatDay(Date.now(), 0, 'first');
        (0, _vue.nextTick)(() => {
          const timeBodyElem = refInputTimeBody.value;
          _xeUtils.default.arrayEach(timeBodyElem.querySelectorAll('li.is--selected'), updateTimePos);
        });
      }
    };
    // 日期
    // 弹出面板
    const updateZindex = () => {
      if (reactData.panelIndex < (0, _utils.getLastZIndex)()) {
        reactData.panelIndex = (0, _utils.nextZIndex)();
      }
    };
    const updatePlacement = () => {
      return (0, _vue.nextTick)().then(() => {
        const {
          transfer,
          placement
        } = props;
        const {
          panelIndex
        } = reactData;
        const targetElem = refInputTarget.value;
        const panelElem = refInputPanel.value;
        if (targetElem && panelElem) {
          const targetHeight = targetElem.offsetHeight;
          const targetWidth = targetElem.offsetWidth;
          const panelHeight = panelElem.offsetHeight;
          const panelWidth = panelElem.offsetWidth;
          const marginSize = 5;
          const panelStyle = {
            zIndex: panelIndex
          };
          const {
            boundingTop,
            boundingLeft,
            visibleHeight,
            visibleWidth
          } = (0, _dom.getAbsolutePos)(targetElem);
          let panelPlacement = 'bottom';
          console.log((0, _dom.getAbsolutePos)(targetElem));
          if (transfer) {
            let left = boundingLeft;
            let top = boundingTop + targetHeight;
            if (placement === 'top') {
              panelPlacement = 'top';
              top = boundingTop - panelHeight;
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (top + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top';
                top = boundingTop - panelHeight;
              }
              // 如果上面不够放，则向下（优先）
              if (top < marginSize) {
                panelPlacement = 'bottom';
                top = boundingTop + targetHeight;
              }
            }
            // 如果溢出右边
            if (left + panelWidth + marginSize > visibleWidth) {
              left -= left + panelWidth + marginSize - visibleWidth;
            }
            // 如果溢出左边
            if (left < marginSize) {
              left = marginSize;
            }
            Object.assign(panelStyle, {
              left: `${left}px`,
              top: `${top}px`,
              minWidth: `${targetWidth}px`
            });
          } else {
            if (placement === 'top') {
              panelPlacement = 'top';
              panelStyle.bottom = `${targetHeight}px`;
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                // 如果上面不够放，则向下（优先）
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = 'top';
                  panelStyle.bottom = `${targetHeight}px`;
                }
              }
            }
          }
          reactData.panelStyle = panelStyle;
          reactData.panelPlacement = panelPlacement;
          return (0, _vue.nextTick)();
        }
      });
    };
    const showPanel = () => {
      const {
        disabled
      } = props;
      const {
        visiblePanel
      } = reactData;
      const isDatePickerType = computeIsDatePickerType.value;
      if (!disabled && !visiblePanel) {
        if (!reactData.inited) {
          reactData.inited = true;
        }
        clearTimeout(hidePanelTimeout);
        reactData.isActivated = true;
        reactData.animatVisible = true;
        if (isDatePickerType) {
          dateOpenPanel();
        }
        setTimeout(() => {
          reactData.visiblePanel = true;
        }, 10);
        updateZindex();
        return updatePlacement();
      }
      return (0, _vue.nextTick)();
    };
    const datePickerOpenEvent = evnt => {
      const {
        readonly
      } = props;
      if (!readonly) {
        evnt.preventDefault();
        showPanel();
      }
    };
    const clickEvent = evnt => {
      triggerEvent(evnt);
    };
    // 弹出面板
    // 全局事件
    const handleGlobalMousedownEvent = evnt => {
      const {
        disabled
      } = props;
      const {
        visiblePanel,
        isActivated
      } = reactData;
      const isDatePickerType = computeIsDatePickerType.value;
      const el = refElem.value;
      const panelElem = refInputPanel.value;
      if (!disabled && isActivated) {
        reactData.isActivated = (0, _dom.getEventTargetNode)(evnt, el).flag || (0, _dom.getEventTargetNode)(evnt, panelElem).flag;
        if (!reactData.isActivated) {
          // 如果是日期类型
          if (isDatePickerType) {
            if (visiblePanel) {
              hidePanel();
              afterCheckValue();
            }
          } else {
            afterCheckValue();
          }
        }
      }
    };
    const handleGlobalKeydownEvent = evnt => {
      const {
        clearable,
        disabled
      } = props;
      const {
        visiblePanel
      } = reactData;
      const isDatePickerType = computeIsDatePickerType.value;
      if (!disabled) {
        const isTab = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.TAB);
        const isDel = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.DELETE);
        const isEsc = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ESCAPE);
        const isEnter = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ENTER);
        const isLeftArrow = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ARROW_LEFT);
        const isUpArrow = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ARROW_UP);
        const isRightArrow = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ARROW_RIGHT);
        const isDwArrow = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.ARROW_DOWN);
        const isPgUp = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.PAGE_UP);
        const isPgDn = (0, _event.hasEventKey)(evnt, _event.EVENT_KEYS.PAGE_DOWN);
        const operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
        let isActivated = reactData.isActivated;
        if (isTab) {
          if (isActivated) {
            afterCheckValue();
          }
          isActivated = false;
          reactData.isActivated = isActivated;
        } else if (operArrow) {
          if (isDatePickerType) {
            if (isActivated) {
              if (visiblePanel) {
                dateOffsetEvent(evnt);
              } else if (isUpArrow || isDwArrow) {
                datePickerOpenEvent(evnt);
              }
            }
          }
        } else if (isEnter) {
          if (isDatePickerType) {
            if (visiblePanel) {
              if (reactData.datePanelValue) {
                dateSelectItem(reactData.datePanelValue);
              } else {
                hidePanel();
              }
            } else if (isActivated) {
              datePickerOpenEvent(evnt);
            }
          }
        } else if (isPgUp || isPgDn) {
          if (isDatePickerType) {
            if (isActivated) {
              datePgOffsetEvent(evnt);
            }
          }
        }
        if (isTab || isEsc) {
          if (visiblePanel) {
            hidePanel();
          }
        } else if (isDel && clearable) {
          if (isActivated) {
            clearValueEvent(evnt, null);
          }
        }
      }
    };
    const handleGlobalMousewheelEvent = evnt => {
      const {
        disabled
      } = props;
      const {
        visiblePanel
      } = reactData;
      if (!disabled) {
        if (visiblePanel) {
          const panelElem = refInputPanel.value;
          if ((0, _dom.getEventTargetNode)(evnt, panelElem).flag) {
            updatePlacement();
          } else {
            hidePanel();
            afterCheckValue();
          }
        }
      }
    };
    const handleGlobalBlurEvent = () => {
      const {
        isActivated,
        visiblePanel
      } = reactData;
      if (visiblePanel) {
        hidePanel();
        afterCheckValue();
      } else if (isActivated) {
        afterCheckValue();
      }
    };
    const renderDateLabel = (item, label) => {
      const {
        festivalMethod
      } = props;
      if (festivalMethod) {
        const {
          datePanelType
        } = reactData;
        const festivalRest = festivalMethod({
          type: datePanelType,
          viewType: datePanelType,
          date: item.date,
          $input: $xeinput
        });
        const festivalItem = festivalRest ? _xeUtils.default.isString(festivalRest) ? {
          label: festivalRest
        } : festivalRest : {};
        const extraItem = festivalItem.extra ? _xeUtils.default.isString(festivalItem.extra) ? {
          label: festivalItem.extra
        } : festivalItem.extra : null;
        const labels = [(0, _vue.h)('span', {
          class: ['vxe-input--date-label', {
            'is-notice': festivalItem.notice
          }]
        }, extraItem && extraItem.label ? [(0, _vue.h)('span', label), (0, _vue.h)('span', {
          class: ['vxe-input--date-label--extra', extraItem.important ? 'is-important' : '', extraItem.className],
          style: extraItem.style
        }, _xeUtils.default.toValueString(extraItem.label))] : label)];
        const festivalLabel = festivalItem.label;
        if (festivalLabel) {
          // 默认最多支持3个节日重叠
          const festivalLabels = _xeUtils.default.toValueString(festivalLabel).split(',');
          labels.push((0, _vue.h)('span', {
            class: ['vxe-input--date-festival', festivalItem.important ? 'is-important' : '', festivalItem.className],
            style: festivalItem.style
          }, [festivalLabels.length > 1 ? (0, _vue.h)('span', {
            class: ['vxe-input--date-festival--overlap', `overlap--${festivalLabels.length}`]
          }, festivalLabels.map(label => (0, _vue.h)('span', label.substring(0, 3)))) : (0, _vue.h)('span', {
            class: 'vxe-input--date-festival--label'
          }, festivalLabels[0].substring(0, 3))]));
        }
        return labels;
      }
      return label;
    };
    const renderDateDayTable = () => {
      const {
        multiple
      } = props;
      const {
        datePanelType,
        datePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const dateHeaders = computeDateHeaders.value;
      const dayDatas = computeDayDatas.value;
      const dateListValue = computeDateListValue.value;
      const matchFormat = 'yyyyMMdd';
      return [(0, _vue.h)('table', {
        class: `vxe-input--date-${datePanelType}-view`,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }, [(0, _vue.h)('thead', [(0, _vue.h)('tr', dateHeaders.map(item => {
        return (0, _vue.h)('th', item.label);
      }))]), (0, _vue.h)('tbody', dayDatas.map(rows => {
        return (0, _vue.h)('tr', rows.map(item => {
          return (0, _vue.h)('td', {
            class: {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat),
              'is--hover': _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            },
            onClick: () => dateSelectEvent(item),
            onMouseenter: () => dateMouseenterEvent(item)
          }, renderDateLabel(item, item.label));
        }));
      }))])];
    };
    const renderDateWeekTable = () => {
      const {
        multiple
      } = props;
      const {
        datePanelType,
        datePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const weekHeaders = computeWeekHeaders.value;
      const weekDates = computeWeekDates.value;
      const dateListValue = computeDateListValue.value;
      const matchFormat = 'yyyyMMdd';
      return [(0, _vue.h)('table', {
        class: `vxe-input--date-${datePanelType}-view`,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }, [(0, _vue.h)('thead', [(0, _vue.h)('tr', weekHeaders.map(item => {
        return (0, _vue.h)('th', item.label);
      }))]), (0, _vue.h)('tbody', weekDates.map(rows => {
        const isSelected = multiple ? rows.some(item => dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat))) : rows.some(item => _xeUtils.default.isDateSame(dateValue, item.date, matchFormat));
        const isHover = rows.some(item => _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat));
        return (0, _vue.h)('tr', rows.map(item => {
          return (0, _vue.h)('td', {
            class: {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': isSelected,
              'is--hover': isHover
            },
            // event
            onClick: () => dateSelectEvent(item),
            onMouseenter: () => dateMouseenterEvent(item)
          }, renderDateLabel(item, item.label));
        }));
      }))])];
    };
    const renderDateMonthTable = () => {
      const {
        multiple
      } = props;
      const {
        datePanelType,
        datePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const monthDatas = computeMonthDatas.value;
      const dateListValue = computeDateListValue.value;
      const matchFormat = 'yyyyMM';
      return [(0, _vue.h)('table', {
        class: `vxe-input--date-${datePanelType}-view`,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }, [(0, _vue.h)('tbody', monthDatas.map(rows => {
        return (0, _vue.h)('tr', rows.map(item => {
          return (0, _vue.h)('td', {
            class: {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat),
              'is--hover': _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            },
            onClick: () => dateSelectEvent(item),
            onMouseenter: () => dateMouseenterEvent(item)
          }, renderDateLabel(item, _conf.default.i18n(`vxe.input.date.months.m${item.month}`)));
        }));
      }))])];
    };
    const renderDateQuarterTable = () => {
      const {
        multiple
      } = props;
      const {
        datePanelType,
        datePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const quarterDatas = computeQuarterDatas.value;
      const dateListValue = computeDateListValue.value;
      const matchFormat = 'yyyyq';
      return [(0, _vue.h)('table', {
        class: `vxe-input--date-${datePanelType}-view`,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }, [(0, _vue.h)('tbody', quarterDatas.map(rows => {
        return (0, _vue.h)('tr', rows.map(item => {
          return (0, _vue.h)('td', {
            class: {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat),
              'is--hover': _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            },
            onClick: () => dateSelectEvent(item),
            onMouseenter: () => dateMouseenterEvent(item)
          }, renderDateLabel(item, _conf.default.i18n(`vxe.input.date.quarters.q${item.quarter}`)));
        }));
      }))])];
    };
    const renderDateYearTable = () => {
      const {
        multiple
      } = props;
      const {
        datePanelType,
        datePanelValue
      } = reactData;
      const dateValue = computeDateValue.value;
      const yearDatas = computeYearDatas.value;
      const dateListValue = computeDateListValue.value;
      const matchFormat = 'yyyy';
      return [(0, _vue.h)('table', {
        class: `vxe-input--date-${datePanelType}-view`,
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }, [(0, _vue.h)('tbody', yearDatas.map(rows => {
        return (0, _vue.h)('tr', rows.map(item => {
          return (0, _vue.h)('td', {
            class: {
              'is--prev': item.isPrev,
              'is--current': item.isCurrent,
              'is--now': item.isNow,
              'is--next': item.isNext,
              'is--disabled': isDateDisabled(item),
              'is--selected': multiple ? dateListValue.some(val => _xeUtils.default.isDateSame(val, item.date, matchFormat)) : _xeUtils.default.isDateSame(dateValue, item.date, matchFormat),
              'is--hover': _xeUtils.default.isDateSame(datePanelValue, item.date, matchFormat)
            },
            onClick: () => dateSelectEvent(item),
            onMouseenter: () => dateMouseenterEvent(item)
          }, renderDateLabel(item, item.year));
        }));
      }))])];
    };
    const renderDateTable = () => {
      const {
        datePanelType
      } = reactData;
      switch (datePanelType) {
        case 'week':
          return renderDateWeekTable();
        case 'month':
          return renderDateMonthTable();
        case 'quarter':
          return renderDateQuarterTable();
        case 'year':
          return renderDateYearTable();
      }
      return renderDateDayTable();
    };
    const renderDatePanel = () => {
      const {
        multiple
      } = props;
      const {
        datePanelType
      } = reactData;
      const isDisabledPrevDateBtn = computeIsDisabledPrevDateBtn.value;
      const isDisabledNextDateBtn = computeIsDisabledNextDateBtn.value;
      const selectDatePanelLabel = computeSelectDatePanelLabel.value;
      return [(0, _vue.h)('div', {
        class: 'vxe-input--date-picker-header'
      }, [(0, _vue.h)('div', {
        class: 'vxe-input--date-picker-type-wrapper'
      }, [datePanelType === 'year' ? (0, _vue.h)('span', {
        class: 'vxe-input--date-picker-label'
      }, selectDatePanelLabel) : (0, _vue.h)('span', {
        class: 'vxe-input--date-picker-btn',
        onClick: dateToggleTypeEvent
      }, selectDatePanelLabel)]), (0, _vue.h)('div', {
        class: 'vxe-input--date-picker-btn-wrapper'
      }, [(0, _vue.h)('span', {
        class: ['vxe-input--date-picker-btn vxe-input--date-picker-prev-btn', {
          'is--disabled': isDisabledPrevDateBtn
        }],
        onClick: datePrevEvent
      }, [(0, _vue.h)('i', {
        class: 'vxe-icon-caret-left'
      })]), (0, _vue.h)('span', {
        class: 'vxe-input--date-picker-btn vxe-input--date-picker-current-btn',
        onClick: dateTodayMonthEvent
      }, [(0, _vue.h)('i', {
        class: 'vxe-icon-dot'
      })]), (0, _vue.h)('span', {
        class: ['vxe-input--date-picker-btn vxe-input--date-picker-next-btn', {
          'is--disabled': isDisabledNextDateBtn
        }],
        onClick: dateNextEvent
      }, [(0, _vue.h)('i', {
        class: 'vxe-icon-caret-right'
      })]), multiple && computeSupportMultiples.value ? (0, _vue.h)('span', {
        class: 'vxe-input--date-picker-btn vxe-input--date-picker-confirm-btn'
      }, [(0, _vue.h)('button', {
        class: 'vxe-input--date-picker-confirm',
        type: 'button',
        onClick: dateConfirmEvent
      }, _conf.default.i18n('vxe.button.confirm'))]) : null])]), (0, _vue.h)('div', {
        class: 'vxe-input--date-picker-body'
      }, renderDateTable())];
    };
    const renderTimePanel = () => {
      const {
        datetimePanelValue
      } = reactData;
      const dateTimeLabel = computeDateTimeLabel.value;
      const hourList = computeHourList.value;
      const minuteList = computeMinuteList.value;
      const secondList = computeSecondList.value;
      return [(0, _vue.h)('div', {
        class: 'vxe-input--time-picker-header'
      }, [(0, _vue.h)('span', {
        class: 'vxe-input--time-picker-title'
      }, dateTimeLabel), (0, _vue.h)('button', {
        class: 'vxe-input--time-picker-confirm',
        type: 'button',
        onClick: dateConfirmEvent
      }, _conf.default.i18n('vxe.button.confirm'))]), (0, _vue.h)('div', {
        ref: refInputTimeBody,
        class: 'vxe-input--time-picker-body'
      }, [(0, _vue.h)('ul', {
        class: 'vxe-input--time-picker-hour-list'
      }, hourList.map((item, index) => {
        return (0, _vue.h)('li', {
          key: index,
          class: {
            'is--selected': datetimePanelValue && datetimePanelValue.getHours() === item.value
          },
          onClick: evnt => dateHourEvent(evnt, item)
        }, item.label);
      })), (0, _vue.h)('ul', {
        class: 'vxe-input--time-picker-minute-list'
      }, minuteList.map((item, index) => {
        return (0, _vue.h)('li', {
          key: index,
          class: {
            'is--selected': datetimePanelValue && datetimePanelValue.getMinutes() === item.value
          },
          onClick: evnt => dateMinuteEvent(evnt, item)
        }, item.label);
      })), (0, _vue.h)('ul', {
        class: 'vxe-input--time-picker-second-list'
      }, secondList.map((item, index) => {
        return (0, _vue.h)('li', {
          key: index,
          class: {
            'is--selected': datetimePanelValue && datetimePanelValue.getSeconds() === item.value
          },
          onClick: evnt => dateSecondEvent(evnt, item)
        }, item.label);
      }))])];
    };
    const renderPanel = () => {
      const {
        type,
        transfer
      } = props;
      const {
        inited,
        animatVisible,
        visiblePanel,
        panelPlacement,
        panelStyle
      } = reactData;
      const vSize = computeSize.value;
      const isDatePickerType = computeIsDatePickerType.value;
      const renders = [];
      if (isDatePickerType) {
        if (type === 'datetime') {
          renders.push((0, _vue.h)('div', {
            class: 'vxe-input--panel-layout-wrapper'
          }, [(0, _vue.h)('div', {
            class: 'vxe-input--panel-left-wrapper'
          }, renderDatePanel()), (0, _vue.h)('div', {
            class: 'vxe-input--panel-right-wrapper'
          }, renderTimePanel())]));
        } else if (type === 'time') {
          renders.push((0, _vue.h)('div', {
            class: 'vxe-input--panel-wrapper'
          }, renderTimePanel()));
        } else {
          renders.push((0, _vue.h)('div', {
            class: 'vxe-input--panel-wrapper'
          }, renderDatePanel()));
        }
        return (0, _vue.h)(_vue.Teleport, {
          to: 'body',
          disabled: transfer ? !inited : true
        }, [(0, _vue.h)('div', {
          ref: refInputPanel,
          class: ['vxe-table--ignore-clear vxe-input--panel', `type--${type}`, {
            [`size--${vSize}`]: vSize,
            'is--transfer': transfer,
            'animat--leave': animatVisible,
            'animat--enter': visiblePanel
          }],
          placement: panelPlacement,
          style: panelStyle
        }, renders)]);
      }
      return null;
    };
    const renderNumberIcon = () => {
      const isDisabledAddNumber = computeIsDisabledAddNumber.value;
      const isDisabledSubtractNumber = computeIsDisabledSubtractNumber.value;
      return (0, _vue.h)('span', {
        class: 'vxe-input--number-suffix'
      }, [(0, _vue.h)('span', {
        class: ['vxe-input--number-prev is--prev', {
          'is--disabled': isDisabledAddNumber
        }],
        onMousedown: numberMousedownEvent,
        onMouseup: numberStopDown,
        onMouseleave: numberStopDown
      }, [(0, _vue.h)('i', {
        class: ['vxe-input--number-prev-icon', _conf.default.icon.INPUT_PREV_NUM]
      })]), (0, _vue.h)('span', {
        class: ['vxe-input--number-next is--next', {
          'is--disabled': isDisabledSubtractNumber
        }],
        onMousedown: numberMousedownEvent,
        onMouseup: numberStopDown,
        onMouseleave: numberStopDown
      }, [(0, _vue.h)('i', {
        class: ['vxe-input--number-next-icon', _conf.default.icon.INPUT_NEXT_NUM]
      })])]);
    };
    const renderDatePickerIcon = () => {
      return (0, _vue.h)('span', {
        class: 'vxe-input--date-picker-suffix',
        onClick: datePickerOpenEvent
      }, [(0, _vue.h)('i', {
        class: ['vxe-input--date-picker-icon', _conf.default.icon.INPUT_DATE]
      })]);
    };
    const renderSearchIcon = () => {
      return (0, _vue.h)('span', {
        class: 'vxe-input--search-suffix',
        onClick: searchEvent
      }, [(0, _vue.h)('i', {
        class: ['vxe-input--search-icon', _conf.default.icon.INPUT_SEARCH]
      })]);
    };
    const renderPasswordIcon = () => {
      const {
        showPwd
      } = reactData;
      return (0, _vue.h)('span', {
        class: 'vxe-input--password-suffix',
        onClick: passwordToggleEvent
      }, [(0, _vue.h)('i', {
        class: ['vxe-input--password-icon', showPwd ? _conf.default.icon.INPUT_SHOW_PWD : _conf.default.icon.INPUT_PWD]
      })]);
    };
    const rendePrefixIcon = () => {
      const {
        prefixIcon
      } = props;
      const prefixSlot = slots.prefix;
      const icons = [];
      if (prefixSlot) {
        icons.push((0, _vue.h)('span', {
          class: 'vxe-input--prefix-icon'
        }, prefixSlot({})));
      } else if (prefixIcon) {
        icons.push((0, _vue.h)('i', {
          class: ['vxe-input--prefix-icon', prefixIcon]
        }));
      }
      return icons.length ? (0, _vue.h)('span', {
        class: 'vxe-input--prefix',
        onClick: clickPrefixEvent
      }, icons) : null;
    };
    const renderSuffixIcon = () => {
      const {
        disabled,
        suffixIcon
      } = props;
      const {
        inputValue
      } = reactData;
      const suffixSlot = slots.suffix;
      const isClearable = computeIsClearable.value;
      const icons = [];
      if (suffixSlot) {
        icons.push((0, _vue.h)('span', {
          class: 'vxe-input--suffix-icon'
        }, suffixSlot({})));
      } else if (suffixIcon) {
        icons.push((0, _vue.h)('i', {
          class: ['vxe-input--suffix-icon', suffixIcon]
        }));
      }
      if (isClearable) {
        icons.push((0, _vue.h)('i', {
          class: ['vxe-input--clear-icon', _conf.default.icon.INPUT_CLEAR]
        }));
      }
      return icons.length ? (0, _vue.h)('span', {
        class: ['vxe-input--suffix', {
          'is--clear': isClearable && !disabled && !(inputValue === '' || _xeUtils.default.eqNull(inputValue))
        }],
        onClick: clickSuffixEvent
      }, icons) : null;
    };
    const renderExtraSuffixIcon = () => {
      const {
        controls
      } = props;
      const isNumType = computeIsNumType.value;
      const isDatePickerType = computeIsDatePickerType.value;
      const isPawdType = computeIsPawdType.value;
      const isSearchType = computeIsSearchType.value;
      let icons;
      if (isPawdType) {
        icons = renderPasswordIcon();
      } else if (isNumType) {
        if (controls) {
          icons = renderNumberIcon();
        }
      } else if (isDatePickerType) {
        icons = renderDatePickerIcon();
      } else if (isSearchType) {
        icons = renderSearchIcon();
      }
      return icons ? (0, _vue.h)('span', {
        class: 'vxe-input--extra-suffix'
      }, [icons]) : null;
    };
    inputMethods = {
      dispatchEvent(type, params, evnt) {
        emit(type, Object.assign({
          $input: $xeinput,
          $event: evnt
        }, params));
      },
      focus() {
        const inputElem = refInputTarget.value;
        reactData.isActivated = true;
        inputElem.focus();
        return (0, _vue.nextTick)();
      },
      blur() {
        const inputElem = refInputTarget.value;
        inputElem.blur();
        reactData.isActivated = false;
        return (0, _vue.nextTick)();
      },
      select() {
        const inputElem = refInputTarget.value;
        inputElem.select();
        reactData.isActivated = false;
        return (0, _vue.nextTick)();
      },
      showPanel,
      hidePanel,
      updatePlacement
    };
    Object.assign($xeinput, inputMethods);
    (0, _vue.watch)(() => props.modelValue, val => {
      reactData.inputValue = val;
      changeValue();
    });
    (0, _vue.watch)(() => props.type, () => {
      // 切换类型是重置内置变量
      Object.assign(reactData, {
        inputValue: props.modelValue,
        datetimePanelValue: null,
        datePanelValue: null,
        datePanelLabel: '',
        datePanelType: 'day',
        selectMonth: null,
        currentDate: null
      });
      initValue();
    });
    (0, _vue.watch)(computeDateLabelFormat, () => {
      const isDatePickerType = computeIsDatePickerType.value;
      if (isDatePickerType) {
        dateParseValue(reactData.datePanelValue);
        reactData.inputValue = props.multiple ? computeDateMultipleLabel.value : reactData.datePanelLabel;
      }
    });
    (0, _vue.nextTick)(() => {
      _event.GlobalEvent.on($xeinput, 'mousewheel', handleGlobalMousewheelEvent);
      _event.GlobalEvent.on($xeinput, 'mousedown', handleGlobalMousedownEvent);
      _event.GlobalEvent.on($xeinput, 'keydown', handleGlobalKeydownEvent);
      _event.GlobalEvent.on($xeinput, 'blur', handleGlobalBlurEvent);
    });
    (0, _vue.onUnmounted)(() => {
      numberStopDown();
      _event.GlobalEvent.off($xeinput, 'mousewheel');
      _event.GlobalEvent.off($xeinput, 'mousedown');
      _event.GlobalEvent.off($xeinput, 'keydown');
      _event.GlobalEvent.off($xeinput, 'blur');
    });
    initValue();
    const renderVN = () => {
      const {
        className,
        controls,
        type,
        align,
        showWordCount,
        countMethod,
        name,
        disabled,
        readonly,
        autocomplete
      } = props;
      const {
        inputValue,
        visiblePanel,
        isActivated
      } = reactData;
      const vSize = computeSize.value;
      const isCountError = computeIsCountError.value;
      const inputCount = computeInputCount.value;
      const isDatePickerType = computeIsDatePickerType.value;
      const inpReadonly = computeInpReadonly.value;
      const inpMaxlength = computeInpMaxlength.value;
      const inputType = computeInputType.value;
      const inpPlaceholder = computeInpPlaceholder.value;
      const childs = [];
      const prefix = rendePrefixIcon();
      const suffix = renderSuffixIcon();
      // 前缀图标
      if (prefix) {
        childs.push(prefix);
      }
      // 输入框
      childs.push((0, _vue.h)('input', {
        ref: refInputTarget,
        class: 'vxe-input--inner',
        value: inputValue,
        name,
        type: inputType,
        placeholder: inpPlaceholder,
        maxlength: inpMaxlength,
        readonly: inpReadonly,
        disabled,
        autocomplete,
        onKeydown: keydownEvent,
        onKeyup: keyupEvent,
        onWheel: wheelEvent,
        onClick: clickEvent,
        onInput: inputEvent,
        onChange: changeEvent,
        onFocus: focusEvent,
        onBlur: blurEvent
      }));
      // 后缀图标
      if (suffix) {
        childs.push(suffix);
      }
      // 特殊功能图标
      childs.push(renderExtraSuffixIcon());
      // 面板容器
      if (isDatePickerType) {
        childs.push(renderPanel());
      }
      let isWordCount = false;
      // 统计字数
      if (showWordCount && ['text', 'search'].includes(type)) {
        isWordCount = true;
        childs.push((0, _vue.h)('span', {
          class: ['vxe-input--count', {
            'is--error': isCountError
          }]
        }, countMethod ? `${countMethod({
          value: inputValue
        })}` : `${inputCount}${inpMaxlength ? `/${inpMaxlength}` : ''}`));
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-input', `type--${type}`, className, {
          [`size--${vSize}`]: vSize,
          [`is--${align}`]: align,
          'is--controls': controls,
          'is--prefix': !!prefix,
          'is--suffix': !!suffix,
          'is--readonly': readonly,
          'is--visivle': visiblePanel,
          'is--count': isWordCount,
          'is--disabled': disabled,
          'is--active': isActivated
        }]
      }, childs);
    };
    $xeinput.renderVN = renderVN;
    return $xeinput;
  },
  render() {
    return this.renderVN();
  }
});