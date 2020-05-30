<template>
  <div>
    <client-only>
      <vue-web-cam
        ref="webcam"
        :device-id="deviceId"
        width="100%"
        @error="onError"
        @cameras="onCameras"
        @camera-change="onCameraChange"
      />
      <button type="button" @click="onCapture"></button>
    </client-only>
  </div>
</template>

<script>
import axiosHelper from '~/lib/axiosHelper'

/**
 * Check if an event is occuring
 * Display camera icons on navbar if an event is occuring
 * Check on the camera page if an event is occuring
 * Create the media object when the customer click on the button for take a picture
 * Then, create the album if this.$store.state.currentEvent.album is equal to null
 * Then, create album_media
 */

export default {
  data: () => ({
    img: null,
    imgFile: null,
    camera: null,
    deviceId: null,
    devices: []
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
  methods: {
    removeImage(){
      this.img = null;
      this.image = null;
    },
    async onCapture() {
      this.img = this.$refs.webcam.capture()
      this.imgFile = await this.srcToFile(this.img, new Date().getTime(), 'text/plain')

      try {
        const formData = new FormData();
        formData.append('file', this.imgFile)

        const media = await axiosHelper({
          url: 'api/media_objects',
          method: 'POST',
          data: formData
        })


      } catch(e) {
        this.error = "Une erreur est survenur, veuillez reesayer plus tard";
      }
    },
    srcToFile(src, fileName, mimeType) {
      return (fetch(src)
        .then((res) => res.arrayBuffer())
        .then((buf) => new File([buf], fileName, {type:mimeType}))
      )
    },
    onError(error) {
      console.log('On Error Event', error)
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
.image, video {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
}
img {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 103;
  height: 20px;
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