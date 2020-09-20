<template>
  <div>
    <div v-if="!loadApi">
      <img
        class="back"
        :src="require('~/static/img/icons/back-white.svg')"
        alt="Back"
        @click="$router.back()"
      />
      <p v-if="error">{{ error }}</p>
      <client-only>
        <img
          class="changeCamera"
          :src="require('~/static/img/icons/camera-change.svg')"
          alt="change camera"
          @click="changeCamera"
        />
        <vue-web-cam
          ref="webcam"
          :device-id="deviceId"
          width="100%"
          @error="onError"
          @cameras="onCameras"
          @camera-change="onCameraChange"
        />
        <button v-if="!loading" type="button" @click="onCapture"></button>
        <Loader v-if="loading" height="74px" fill="#fff" opacity="1" />
      </client-only>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import axiosHelper from '~/lib/axiosHelper'
import parseToken from '~/utils/token'

export default {
  data: () => ({
    error: '',
    events: null,
    img: null,
    imgFile: null,
    camera: null,
    deviceId: null,
    devices: [],
    loading: false,
    loadApi: false
  }),
  layout: 'blank',
  computed: {
    device() {
      return this.devices.find((n) => n.deviceId === this.deviceId)
    }
  },
  watch: {
    camera(id) {
      this.deviceId = id
    },
    devices() {
      /* eslint-disable */
      const [first, ...tail] = this.devices
      if (first) {
        this.camera = first.deviceId
        this.deviceId = first.deviceId
      }
    }
  },
  middleware: 'authenticated',
  async beforeMount() {
    if (this.$store.state.events === null && this.$store.state.eventOccuring === null) {
      this.loadApi = true
      const userId = parseToken(Cookies.get('token')).user.id
      const date = new Date()
      const currentMonth = date.getMonth() + 1
      const month = currentMonth.length === 1 ? `0${currentMonth}` : currentMonth

      const eventsFromUserEvents = await axiosHelper({
        url: `api/events?userEvents.user.id=${userId}&userEvents.status=accept&startAt[after]=${date.getFullYear()}-${month}-${date.getDate()}`
      })

      const eventsFromAuthor = await axiosHelper({
        url: `api/events?author.id=${userId}&startAt[after]=${date.getFullYear()}-${month}-${date.getDate()}`
      })
      this.events = this.handleEvent(eventsFromAuthor, eventsFromUserEvents)
      this.$store.commit('addEvents', this.events)

      const currentDate = Date.now()
      const eventOccuring = this.events.find(({ startAt, endAt }) => {
        return (
          new Date(startAt).getTime() < currentDate &&
          new Date(endAt).getTime() > currentDate
        )
      })

      if (eventOccuring) {
        this.$store.commit('addEventOccuring', eventOccuring)
      } else {
        this.$router.push('/events')
      }
    }

    if (this.$store.state.eventOccuring.album === null) {
        try {
          await axiosHelper({
            url: 'api/albums',
            method: 'post',
            data: {
              event: `api/events/${this.$store.state.eventOccuring.id}`,
              name: 'ntm'
            }     
          })
          const event = await axiosHelper({
            url: `api/events/${this.$store.state.eventOccuring.id}`
          })
          this.$store.commit('addEventOccuring', event.data)
        } catch(e){
          this.error = 'Une erreur est survenue, veuillez réessayer plus tard'
        }
      }
      this.loadApi = false
  },
  methods: {
    changeCamera(){
      const [first, second] = this.devices
      if (second) {
        this.camera = this.camera === first.deviceId ? second.deviceId : first.deviceId 
        this.deviceId = this.camera === first.deviceId ? second.deviceId : first.deviceId
      }
    },
    handleEvent(eventsFromAuthor, eventsFromUserEvents) {
      let events = []
      const eventFromAuthorId = eventsFromAuthor.data.map(({ id }) => id)

      events = eventsFromUserEvents.data.filter(
        ({ id }) => !eventFromAuthorId.includes(id)
      )

      events = [...events, ...eventsFromAuthor.data]
      return events.sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      )
    },
    removeImage(){
      this.img = null;
      this.image = null;
    },
    async onCapture() {
      this.loading = true;
      this.img = this.$refs.webcam.capture()
      this.imgFile = await this.srcToFile(this.img, new Date().getTime(), 'image/jpeg')
      
      try {
        const formData = new FormData();
        formData.append('file', this.imgFile)

        const media = await axiosHelper({
          url: 'api/media_objects',
          method: 'post',
          data: formData
        })

        const data = {
          album: `api/albums/${this.$store.state.eventOccuring.album.id}`,
          media: `api/media_objects/${media.data.id}`
        }

        await axiosHelper({
          url: 'api/album_media',
          method: 'post',
          data
        })

      } catch(e) {
        this.error = "Une erreur est survenue, veuillez réessayer plus tard";
      } finally {
        this.loading = false;
      }
    },
    srcToFile(src, fileName, type) {
      return (fetch(src)
        .then((res) => res.arrayBuffer())
        .then((buf) => new File([buf], `${fileName}.jpg`, { type }))
      )
    },
    onError(error) {
      this.error = 'Une erreur est survenue, veuillez réessayer plus tard'
    },
    onCameras(cameras) {
      this.devices = cameras
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId
      this.camera = deviceId
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ svg {
  margin: auto;
  position: absolute;
  bottom: 40px;
  left: 50%;
  z-index: 104;
  transform: translateX(-50%);
}
.loader__wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.image, video {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
}
.back {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 103;
  height: 20px;
}
.changeCamera {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 103;
  height: 25px;
}
.image {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 102;
}
button {
  position: absolute;
  z-index: 100;
  border: 2px solid white;
  border-radius: 50%;
  left: 50%;
  height: 74px;
  width: 74px;
  background: none;
  bottom: 40px;
  transform: translateX(-50%);
}
video {
  object-fit: cover;
  z-index: 99;
}
</style>