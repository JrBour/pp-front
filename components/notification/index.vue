<template>
  <div class="notifications__wrapper">
    <div class="notifications__date">
      <p class="notifications__date_day">{{ shortDays[start.getDay()] }}</p>
      <p class="notifications__date_date">{{ start.getDate() }}</p>
      <p class="notifications__date_month">
        {{ shortMonths[start.getMonth()] }}
      </p>
    </div>
    <div class="notifications__separator"></div>
    <div class="notifications__informations">
      <h2 @click="$router.push({ name: 'event-id', params: { id: event.id } })">
        {{ title }}
      </h2>
      <p>{{ event.address }} - {{ event.city }}</p>
    </div>
    <div class="notifications__actions">
      <button class="notifications__accept" @click="submitResponse('accept')">
        <img :src="require('~/static/img/icons/check.svg')" />
      </button>
      <button class="notifications__deny" @click="submitResponse('deny')">
        <img :src="require('~/static/img/icons/cross.svg')" />
      </button>
    </div>
  </div>
</template>
<script>
import { shortDays, shortMonths } from '~/constants/date'

export default {
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
  },
  methods: {
    submitResponse(status) {
      this.$emit('submit-response', status, this.event.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.notifications__wrapper {
  background: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
}
.notifications__informations {
  width: 65%;
}
.notifications__actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 25%;
}
.notifications__accept,
.notifications__deny {
  border-radius: 50%;
  height: 2.5em;
  width: 2.5em;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    height: 1.2em;
  }
}
.notifications__accept {
  background: #3750b2;
}
.notifications__deny {
  background: transparent;
  border: 1px solid #fd5c63;
}
.notifications__date {
  text-align: center;
  line-height: 1.1em;
}
.notifications__date_day {
  font-size: 0.8em;
  color: #7c7c7c;
}
.notifications__date_date {
  font-weight: 500;
  font-size: 1.2em;
  color: #000;
}
.notifications__separator {
  width: 1px;
  height: 6vh;
  margin: 0 2vw;
  background: rgba(139, 137, 137, 0.5);
}
.notifications__date_month {
  font-size: 0.8em;
  color: #47588a;
  line-height: 1.1em;
}
h2 {
  font-size: 1.2em;
  font-weight: 500;
  color: #47588a;
}
.notifications__informations {
  & p {
    font-size: 0.8em;
    color: #808080;
  }
}
</style>
