<template>
  <div>
    <div v-if="event === null">
      Chargement...
      <p v-if="errors.general">{{ errors.general }}</p>
    </div>
    <div v-else>
      <div class="event__title">
        <h1>{{ event.name }}</h1>
      </div>
      <div class="event__action">
        <img :src="require('~/static/img/icons/pencil.svg')" alt="pencil" />
        <img :src="require('~/static/img/icons/trash.svg')" alt="trash" />
      </div>
      <div
        v-if="event.image"
        class="event__cover"
        :style="{
          backgroundImage: `url(${baseUrl}/media/${event.image.filePath})`
        }"
      ></div>
      <div class="event__informations">
        <h2>Informations</h2>
        <div class="event__informations_address">
          <img
            :src="require('~/static/img/icons/calendar.svg')"
            alt="calendar"
          />
          <p>{{ event.address }}, {{ event.zipcode }}, {{ event.city }}</p>
        </div>
        <div class="event__informations_date">
          <img :src="require('~/static/img/icons/place.svg')" alt="place" />
          <p>
            <span>{{ date }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axiosHelper from '~/lib/axiosHelper'
import { days, months } from '~/constants/date'

export default {
  layout: 'noBorder',
  data: () => ({
    event: null,
    baseUrl: process.env.NUXT_ENV_API_URL,
    errors: {
      general: ''
    }
  }),
  computed: {
    date() {
      const date = new Date(this.event.startAt)
      const day = days[date.getDay()]
      const month = months[date.getMonth()]

      return `${day} ${date.getDate()} ${month}`
    }
  },
  async beforeCreate() {
    const id = this.$router.history.current.params.id
    try {
      const event = await axiosHelper({
        url: `api/events/${id}`
      })
      this.event = event.data
    } catch (e) {
      this.errors.general = "Une erreur s'est produite"
    }
  }
}
</script>
<style lang="scss">
.event__title {
  min-height: 23vh;
}
.event__informations {
  width: 100%;
  background: white;
  padding: 1.5em;
}
.event__action {
  display: flex;
  margin: 2vh 5vw;
  justify-content: flex-end;
  & img {
    margin-left: 2vw;
  }
}
.event__informations_date,
.event__informations_address {
  display: flex;
  align-items: center;
  margin-top: 2vh;
  margin-left: 3vw;
  & p {
    margin-left: 5vw;
  }
}
h2 {
  font-size: 1.3em;
}
.event__cover {
  width: 100%;
  height: 30vh;
  margin-bottom: 5vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
