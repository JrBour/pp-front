<template>
  <div class="blank__wrapper">
    <Loader height="140px" />
    <nuxt keep-alive />
  </div>
</template>

<script>
import Loader from '~/components/loader'

export default {
  components: {
    Loader
  },
  head() {
    return {
      bodyAttrs: {
        class: 'blank'
      }
    }
  }
}
</script>

<style>
.blank__wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.container__wrapper {
  padding: 0 35px;
}

.container {
  background-image: url('/img/icons/bg-template.svg');
  background-position: top left;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: rgba(248, 248, 248, 0.6);
  min-height: 100vh;
  width: 100%;
  overflow: scroll;
}

.blank h1 {
  padding-top: 7vh;
  font-size: 2.5em;
}
</style>
