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
        <h2
          @click="$router.push({ name: 'event-id', params: { id: event.id } })"
        >
          {{ title }}
        </h2>
        <p>{{ address }}</p>
      </div>
      <div>
        <div v-if="showSettings">
          <a @click="$router.push(`event/${event.id}/edit`)">Editer</a>
          <a @click="removeEvent">Supprimer</a>
        </div>
        <img
          v-if="$store.state.user && $store.state.user.id === event.author.id"
          :src="require('~/static/img/icons/dots.svg')"
          @click="displaySettings"
        />
      </div>
    </div>
    <div class="event__footer">
      <div class="event__participants">
        <User
          v-for="participant in participants"
          :key="participant.id"
          :user="participant"
          :small="true"
          :display-full-name="false"
        />
        <div v-if="event.userEvents.length > 5" class="participants__remain">
          <p>{{ event.userEvents.length - 4 }}</p>
        </div>
      </div>
      <div class="event__hours">
        <p>{{ hours }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { shortDays, shortMonths } from '~/constants/date'
import User from '~/components/user'

export default {
  name: 'Event',
  components: {
    User
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    shortDays,
    shortMonths,
    showSettings: false
  }),
  computed: {
    participants() {
      if (this.event.userEvents.length > 5) {
        return this.event.userEvents.filter((userEvent, index) => {
          if (index < 4) {
            return userEvent.user
          }
        })
      }
      const participants = this.event.userEvents.map(({ user }) => user)

      return participants
    },
    address() {
      const addressFormatted = `${this.event.address} - ${this.event.city}`
      if (addressFormatted.length >= 30) {
        return `${addressFormatted.slice(0, 28)}...`
      }

      return addressFormatted
    },
    hours() {
      const start = new Date(this.event.startAt)
      const end = new Date(this.event.endAt)

      return `${start.getHours()}h${start.getMinutes()} - ${end.getHours()}h${end.getMinutes()}`
    },
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
    removeEvent() {
      this.$emit('remove-event', this.event.id)
    },
    displaySettings(e) {
      e.stopPropagation()
      this.showSettings = true
    }
  }
}
</script>
<style lang="scss" scoped>
.event__participants {
  display: flex;
}
.participants__remain {
  border-radius: 50%;
  background: rgba(255, 115, 116, 0.2);
  color: #47588a;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2em;
  height: 2em;
  font-weight: 500;
}
.event__hours {
  border-radius: 8px;
  color: #47588a;
  font-size: 0.8em;
  background: #b9e5ec;
  text-align: center;
  padding: 2px 10px;
  font-weight: 500;
}
.event__wrapper {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin-bottom: 3vh;
  padding: 14px 14px 10px 14px;
}
img {
  margin-top: 1vh;
}
.event__information {
  width: 70%;
  line-height: 1.4em;
  & p {
    font-size: 0.8em;
    font-weight: 500;
    color: #808080;
  }
}
.event__footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 2vh;
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
  font-weight: 600;
}
</style>
