import { CALENDAR_MIN_DATE, CALENDAR_MAX_DATE } from '@/data/date';

export const REGEXP_EMIAL = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
export const REGEXP_MOBILEPHONE = /^1[3456789]\d{9}$/;
export const REGEXP_FIXMOB = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
export const REGEXP_MONEY = /^(-)?(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/;

export default {
  name: 'form-mixin',
  data() {
    return {
      CALENDAR_MIN_DATE,
      CALENDAR_MAX_DATE,
      REGEXP_EMIAL,
      REGEXP_MOBILEPHONE,
      REGEXP_FIXMOB,
      REGEXP_MONEY,
    };
  },
  methods: {
    formValidator_noEmpty(v) {
      if (v === undefined || v === null || v === '') {
        return false;
      }
      return true;
    },
    formValidator_phone(v) {
      if (!this.formValidator_noEmpty(v)) {
        return true;
      }

      return this.REGEXP_MOBILEPHONE.test(v) || this.REGEXP_FIXMOB.test(v);
    },
    formValidator_email(v) {
      if (!this.formValidator_noEmpty(v)) {
        return true;
      }

      return this.REGEXP_EMIAL.test(v);
    },
    formValidator_money(v) {
      if (!this.formValidator_noEmpty(v)) {
        return true;
      }

      return this.REGEXP_MONEY.test(v);
    },
    onPickerConfirm(name, value, picker, callback) {
      this[name] = value;
      this[picker] = false;
      callback && callback(value);
    },
    onCalendarConfirm(name, value, picker, callback) {
      this.onPickerConfirm(name, dayjs(value).format('YYYY-MM-DD'), picker);
      callback && callback(value);
    },
    onCalendarRangeConfirm(start, end, value, picker, callback) {
      this.onPickerConfirm(
        start,
        dayjs(value[0]).format('YYYY-MM-DD'),
        picker,
        callback
      );
      this.onPickerConfirm(end, dayjs(value[1]).format('YYYY-MM-DD'), picker);
    },
  },
};
