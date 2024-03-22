<template>
  <input
    v-model="currentDate"
    @click="handleClickInputDate"
    type="text"
    placeholder="Выберите дату"
  />

  <MyCalendar
    v-if="calendarIsShowed"
    initialDate="2023-04-22"
    @select-date="handleSetDate"
  />

  <!--
    <MyCalendar
      v-if="calendarIsShowed"
      @select-date="handleSetDate"
    />
  -->
</template>

<script>
import MyCalendar from "@/components/MyCalendar.vue";
export default {
  components: { MyCalendar },

  data() {
    return {
      currentDate: null,
      calendarIsShowed: false,
    };
  },

  methods: {
    handleSetDate(date) {
      this.currentDate = date;
    },

    handleClickInputDate() {
      this.calendarIsShowed = true;
    },
  },
};
</script>

<style scoped></style>
