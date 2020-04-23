<template>
  <nav class="navbar">
    <ul class="navbar__wrapper">
      <li @click="$router.push({ name: 'events' })">
        <img
          :src="
            require(`~/static/img/icons/home-${
              currentRoute.includes('event') ? 'enable' : 'disable'
            }.svg`)
          "
          alt="home"
        />
      </li>
      <li @click="$router.push({ name: 'album' })">
        <img
          :src="
            require(`~/static/img/icons/album-${
              currentRoute.includes('album') ? 'enable' : 'disable'
            }.svg`)
          "
          alt="album"
        />
      </li>
      <li @click="$router.push({ name: 'notifications' })">
        <div class="notification__item">
          <img
            :src="
              require(`~/static/img/icons/bell-${
                currentRoute.includes('notifications') ? 'enable' : 'disable'
              }.svg`)
            "
            class="navbar__item_bell"
            alt="notifications"
          />
          <div v-if="notifications !== 0" class="notifications__number">
            <p>{{ notifications }}</p>
          </div>
        </div>
      </li>
      <li @click="$router.push({ name: 'profile' })">
        <img
          :src="
            require(`~/static/img/icons/user-${
              currentRoute.includes('profile') ? 'enable' : 'disable'
            }.svg`)
          "
          alt="profile"
        />
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
  data: () => ({
    currentRoute: ''
  }),
  computed: {
    notifications() {
      const notifications = this.$store.state.notifications
      if (notifications) {
        const notificationsNotread = notifications.filter(
          ({ isRead }) => isRead === false
        )
        return notificationsNotread.length
      }
      return 0
    }
  },
  watch: {
    $route(to, from) {
      this.currentRoute = to.path
    }
  },
  mounted() {
    this.currentRoute = this.$router.history.current.path
  }
}
</script>
<style lang="scss" scoped>
.notification__item {
  position: relative;
}
.notifications__number {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -5px;
  right: 1.9em;
  font-size: 0.9em;
  font-weight: 500;
  padding: 9px;
  height: 1em;
  width: 1em;
  border-radius: 50%;
  color: white;
  background: #fd5c63;
}
.navbar {
  position: fixed;
  z-index: 10;
  bottom: 0;
  background: white;
  width: 100%;
  height: 52px;
  box-shadow: 0px 0px 14px rgba(38, 49, 148, 0.11);
  border-radius: 10px 10px 0 0;
}

.navbar__wrapper {
  display: flex;
  list-style: none;
  align-items: center;
  height: 100%;
  padding: 0;
  justify-content: space-around;
  & li {
    position: relative;
    height: 2em;
    margin-top: 1vh;
  }
  & li img {
    height: 100%;
    width: 100%;
  }
  & li > div {
    height: 100%;
    width: 100%;
  }
}

.navbar__item_bell {
  transform: rotate(30deg);
}
</style>
