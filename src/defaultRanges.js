import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
  differenceInCalendarDays,
} from 'date-fns';
import { zhCN } from 'date-fns/esm/locale';
const dateOptions = { locale: zhCN };

// const startOfWeek = startOfWeek(new Date(), dateOptions);

const defineds = {
  startOfWeek: startOfWeek(new Date(), dateOptions),
  endOfWeek: endOfWeek(new Date(), dateOptions),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7), dateOptions),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7), dateOptions),
  startOfToday: startOfDay(new Date(), dateOptions),
  endOfToday: endOfDay(new Date(), dateOptions),
  startOfYesterday: startOfDay(addDays(new Date(), -1), dateOptions),
  endOfYesterday: endOfDay(addDays(new Date(), -1), dateOptions),
  startOfMonth: startOfMonth(new Date(), dateOptions),
  endOfMonth: endOfMonth(new Date(), dateOptions),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1), dateOptions),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1), dateOptions),
};

const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (
      isSameDay(range.startDate, definedRange.startDate) &&
      isSameDay(range.endDate, definedRange.endDate)
    );
  },
};

export function createStaticRanges(ranges) {
  return ranges.map(range => ({ ...staticRangeHandler, ...range }));
}

export const defaultStaticRanges = createStaticRanges([
  {
    label: '今天',
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday,
    }),
  },
  {
    label: '昨天',
    range: () => ({
      startDate: defineds.startOfYesterday,
      endDate: defineds.endOfYesterday,
    }),
  },

  {
    label: '本周',
    range: () => ({
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfWeek,
    }),
  },
  {
    label: '上周',
    range: () => ({
      startDate: defineds.startOfLastWeek,
      endDate: defineds.endOfLastWeek,
    }),
  },
  {
    label: '本月',
    range: () => ({
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth,
    }),
  },
  {
    label: '上月',
    range: () => ({
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth,
    }),
  },
]);

export const defaultInputRanges = [
  {
    label: '天前',
    range(value) {
      return {
        startDate: addDays(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
        endDate: defineds.endOfToday,
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.endDate, defineds.endOfToday)) return '-';
      if (!range.startDate) return '∞';
      return differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1;
    },
  },
  {
    label: '天后',
    range(value) {
      const today = new Date();
      return {
        startDate: today,
        endDate: addDays(today, Math.max(Number(value), 1) - 1),
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.startDate, defineds.startOfToday)) return '-';
      if (!range.endDate) return '∞';
      return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
    },
  },
];
