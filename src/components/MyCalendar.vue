<template>
  <div class="date-select">
    <div class="calendar-header">
      <div class="calendar-month">Июль</div>
      <div class="calendar-year">2023</div>
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
import getCalendarData from "@/utils/calendarDate.js";

export default {
  props: {
    initialDate: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      currentDate: "",
    };
  },

  watch: {
    currentDate() {
      this.$emit("select-date", this.currentDate);
    },
  },

  methods: {},

  computed: {
    weekDays() {
      return ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    },

    calendarData() {
      return getCalendarData(this.currentDate);
    },
  },

  mounted() {
    const now = new Date();
    console.log(now);
    this.currentDate = this.initialDate;
  },
};
</script>

<style scoped>
.date-select {
  width: 300px;
}

.cell {
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
}

.calendar-weak,
.calendar-main {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
</style>
