<template>
  <input v-model="currentDate" type="text" @click="handleClickInputDate" />

  <MyCalendar
    v-if="calendarIsShowed"
    :initialDate="currentDate"
    @select-date="handleSetDate"
  />
</template>

<script>
import MyCalendar from "@/components/MyCalendar.vue";
export default {
  components: { MyCalendar },

  data() {
    return {
      currentDate: "2023-07-26",
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
