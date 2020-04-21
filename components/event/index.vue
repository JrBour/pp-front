<template>
  <div class="event__wrapper">
    <div class="event__header">
      <div v-if="start" class="event__date">
        <p class="event__date_day">{{ shortDays[start.getDay()] }}</p>
        <p class="event__date_date">{{ start.getDate() }}</p>
        <p class="event__date_month">{{ shortMonths[start.getMonth()] }}</p>
      </div>
      <div class="event__separator"></div>
      <div class="event__information">
        <h2>{{ title }}</h2>
        <p>{{ event.address }} - {{ event.city }}</p>
      </div>
      <img :src="require('~/static/img/icons/dots.svg')" />
    </div>
    <div>
      <div></div>
      <div class="event__hour"></div>
    </div>
  </div>
</template>
<script>
import { shortDays, shortMonths } from '~/constants/date'

export default {
  name: 'Event',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    shortDays,
    shortMonths
  }),
  computed: {
    start() {
      return new Date(this.event.startAt)
    },
    title() {
      if (this.event.name.length >= 18) {
        const title = this.event.name.slice(0, 15)
        return `${title}...`
      }

      return this.event.name
    }
  }
}
</script>
<style lang="scss" scoped>
.event__wrapper {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin-bottom: 3vh;
  padding: 14px;
}
img {
  margin-top: 1vh;
}
.event__information {
  width: 70%;
  line-height: 1.4em;
  & p {
    font-size: 0.8em;
    font-weight: 400;
    color: #808080;
  }
}
.event__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.event__separator {
  height: 7vh;
  width: 1px;
  background: rgba(139, 137, 137, 0.5);
}
.event__date {
  text-align: center;
  line-height: 1.1em;
}
.event__date_day {
  font-size: 0.8em;
  color: #7c7c7c;
}
.event__date_date {
  font-weight: 500;
  font-size: 1.2em;
  color: #000;
}
.event__date_month {
  font-size: 0.8em;
  color: #47588a;
  line-height: 1.1em;
}
.event__header button {
  background: none;
  border: none;
  font-size: 1.5em;
}
h2 {
  color: #47588a;
  font-size: 1.2em;
  font-weight: 500;
}
</style>
