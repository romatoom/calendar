<template>
  <div class="date-select">
    <div class="calendar-header">
      <div class="calendar-month">{{ monthView }}</div>
      <div class="calendar-year">{{ year }}</div>
    </div>

    <div class="calendar-weak">
      <div v-for="weekDay in weekDays" :key="weekDay" class="cell">
        {{ weekDay }}
      </div>
    </div>

    <div class="calendar-main">
      <div v-for="item in calendarData" :key="item" class="cell">
        {{ item }}
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
} from "@/utils/calendarDate.js";

export default {
  props: {
    initialDate: {
      type: String,
      default: getNowDate(),
    },
  },

  data() {
    return {
      year: null,
      month: null,
      day: null,
      // innerDate:
    };
  },

  watch: {
    currentDate() {
      this.$emit("select-date", this.currentDate);
    },
  },

  methods: {
    initializeData() {
      const dateObject = getYearMonthDayFromDate(this.initialDate);

      for (const part in dateObject) {
        this[part] = dateObject[part];
      }
    },
  },

  computed: {
    monthView() {
      if (!(this.day && this.month && this.year)) return;
      return monthFormatter.format(new Date(this.currentDate));
    },

    currentDate() {
      return getDateFromDayMonthYear({
        day: this.day,
        month: this.month,
        year: this.year,
      });
    },

    weekDays,

    calendarData() {
      return getCalendarData({
        month: this.month,
        year: this.year,
      });
    },
  },

  mounted() {
    this.initializeData();
  },
};
</script>

<style scoped>
.date-select {
  width: 350px;
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
}

.calendar-weak,
.calendar-main {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-main .cell {
  padding: 10px 0;
}
</style>
