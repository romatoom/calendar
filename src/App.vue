<template>
  <select v-model="locale" class="lang-select">
    <option
      v-for="lang in availableLanguages"
      :key="lang.locale"
      :value="lang.locale"
    >
      {{ lang.title }}
    </option>
  </select>

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
      :locale="locale"
    />
  </div>
</template>

<script>
import { getLanguages } from "@/utils/langs.js";

import MyCalendar from "@/components/MyCalendar.vue";
export default {
  components: { MyCalendar },

  data() {
    return {
      currentDate: "",
      calendarIsShowed: false,
      locale: "ru",
      availableLanguages: getLanguages(),
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

input.date-select,
.lang-select {
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 20px;
}

select.lang-select {
  cursor: pointer;
  background: var(--light) url("@/assets/arrow.svg") no-repeat right 5px center;
  border: 1px solid var(--gray);
  padding: 5px 30px 5px 10px; /* Резервируем место под стрелку */
  -webkit-appearance: none; /* Стиль для Safari */
  -moz-appearance: none; /* Стиль для Firefox */
  appearance: none; /* Стиль для прочих браузеров */
}

select.lang-select:focus {
  border-color: #5b9bd5;
}
</style>
