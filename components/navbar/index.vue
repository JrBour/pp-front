<template>
  <nav>
    <ul>
      <li @click="$router.push('events')">
        <img src="`img/icons/home`" alt="home" />
      </li>
      <li @click="$router.push('album')">
        <img src="`img/icons/album`" alt="album" />
      </li>
      <li @click="$router.push('notifications')">
        <img src="`img/icons/bell`" alt="notifications" />
      </li>
      <li @click="$router.push('profile')">
        <img src="`img/icons/user`" alt="home" />
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'Navbar'
}
</script>
<style lang="scss" scoped>
nav {
  position: fixed;
  bottom: 0;
  background: white;
  width: 100%;
  height: 52px;
  box-shadow: 0px 0px 14px rgba(38, 49, 148, 0.11);
}
ul {
  display: flex;
}
</style>
