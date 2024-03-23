<template>
  <div class="date-input-block">
    <input
      v-model="currentDate"
      @click="toggleCalendarVisible"
      type="text"
      placeholder="Выберите дату"
      class="date-select"
      readonly
    />

    <MyCalendar
      v-if="calendarIsShowed"
      :initialDate="currentDate"
      @select-date="handleSetDate"
      @close="toggleCalendarVisible"
    />
  </div>
</template>

<script>
import MyCalendar from "@/components/MyCalendar.vue";
export default {
  components: { MyCalendar },

  data() {
    return {
      currentDate: "",
      calendarIsShowed: false,
    };
  },

  methods: {
    handleSetDate(date) {
      this.currentDate = date;
    },

    toggleCalendarVisible() {
      this.calendarIsShowed = !this.calendarIsShowed;
    },
  },
};
</script>

<style scoped>
.date-input-block {
  position: relative;
}

input.date-select {
  padding: 10px;
}
</style>
