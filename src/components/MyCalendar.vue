<template>
  <div class="date-select">
    <div class="calendar-header">
      <div class="change-month prev" @click="setPrevMonth">◀</div>

      <div class="current-date">
        <span class="calendar-month">{{ formattedViewedMonth }}</span>
        <span class="calendar-year">{{ viewedYear }}</span>
      </div>

      <div class="change-month next" @click="setNextMonth">►</div>
    </div>

    <div class="calendar-weak">
      <div v-for="weekDay in weekDays" :key="weekDay" class="cell">
        {{ weekDay }}
      </div>
    </div>

    <div class="calendar-main">
      <div
        v-for="(item, key) in calendarData"
        :key="key"
        class="cell"
        :class="{
          disabled: !item.enabled,
          selected: isSelected(item),
          current: isNowDay(item),
        }"
        @click="handleSelectDay(item)"
      >
        {{ item.day }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCalendarData,
  getNowDate,
  getDateFromDayMonthYear,
  getYearMonthDayFromDate,
  monthFormatter,
  weekDays,
  prevMonthData,
  nextMonthData,
} from "@/utils/calendarDate.js";

export default {
  props: {
    initialDate: {
      type: String,
      default: getNowDate(),
    },

    locale: {
      type: String,
      default: "ru",
    },
  },

  data() {
    return {
      year: null,
      month: null,
      day: null,

      viewedYear: null,
      viewedMonth: null,
    };
  },

  watch: {
    currentDate(value) {
      if (value !== this.initialDate) {
        this.$emit("select-date", this.currentDate);
      }
    },
  },

  methods: {
    initializeData() {
      const dateObject =
        this.initialDate === ""
          ? getYearMonthDayFromDate(getNowDate())
          : getYearMonthDayFromDate(this.initialDate);

      for (const part in dateObject) {
        this[part] = dateObject[part];
      }

      this.viewedYear = dateObject.year;
      this.viewedMonth = dateObject.month;
    },

    handleSelectDay(item) {
      if (!item.enabled) return;
      this.day = item.day;
      this.month = this.viewedMonth;
      this.year = this.viewedYear;

      this.$emit("select-date", this.currentDate);
      this.$emit("close");
    },

    setViewedMonthAndYear({ month, year }) {
      this.viewedMonth = month;
      this.viewedYear = year;
    },

    setNextMonth() {
      const nextMonth = nextMonthData({
        month: this.viewedMonth,
        year: this.viewedYear,
      });

      this.setViewedMonthAndYear(nextMonth);
    },

    setPrevMonth() {
      const prevMonth = prevMonthData({
        month: this.viewedMonth,
        year: this.viewedYear,
      });

      this.setViewedMonthAndYear(prevMonth);
    },

    isSelected(item) {
      return (
        item.enabled &&
        item.day === this.day &&
        this.viewedMonth === this.month &&
        this.viewedYear === this.year
      );
    },

    isNowDay(item) {
      const { day, month, year } = this.getNowYearMonthDay;

      return (
        item.enabled &&
        item.day === day &&
        this.viewedMonth === month &&
        this.viewedYear === year
      );
    },
  },

  computed: {
    getNowYearMonthDay() {
      return getYearMonthDayFromDate(getNowDate());
    },

    formattedViewedMonth() {
      return monthFormatter(this.locale).format(
        new Date(this.viewedYear, this.viewedMonth - 1, 1)
      );
    },

    currentDate() {
      return getDateFromDayMonthYear({
        day: this.day,
        month: this.month,
        year: this.year,
      });
    },

    weekDays() {
      return weekDays(this.locale);
    },

    calendarData() {
      return getCalendarData(
        {
          month: this.viewedMonth,
          year: this.viewedYear,
        },
        this.locale
      );
    },
  },

  mounted() {
    this.initializeData();
  },
};
</script>

<style scoped>
.date-select {
  position: absolute;
  top: 50px;
  z-index: 1000;
  background-color: white;
  width: 350px;
  padding: 20px;
  border: 1px solid var(--gray);
  border-radius: 12px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.current-date {
  display: flex;
  gap: 5px;
}

.cell {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
}

.calendar-weak,
.calendar-main {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-main .cell {
  padding: 10px 0;
  cursor: pointer;
}

.calendar-main .cell.disabled {
  pointer-events: none;
  cursor: default;
  color: var(--gray);
}

.calendar-main .cell {
  border-radius: 6px;
}

.calendar-main .cell:hover {
  border: 1px solid var(--primary);
}

.calendar-main .cell.selected {
  background-color: var(--primary);
  color: var(--primary-light);
}

.calendar-main .cell.current {
  font-weight: bold;
}

.change-month {
  color: var(--primary);
  cursor: pointer;
  padding: 10px;
}
</style>
