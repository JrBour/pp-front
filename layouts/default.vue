<template>
  <div class="container">
    <nuxt />
  </div>
</template>

<style>
@font-face {
  font-family: 'Rubik';
  font-weight: 300;
  src: url('/fonts/Rubik/Rubik-Light.ttf') format('truetype');
}

@font-face {
  font-family: 'Rubik';
  font-weight: 400;
  src: url('/fonts/Rubik/Rubik-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Rubik';
  font-weight: 400;
  font-style: italic;
  src: url('/fonts/Rubik/Rubik-Italic.ttf') format('truetype');
}

@font-face {
  font-family: 'Rubik';
  font-weight: 500;
  src: url('/fonts/Rubik/Rubik-Medium.ttf') format('truetype');
}

@font-face {
  font-family: 'Rubik';
  font-weight: 700;
  src: url('/fonts/Rubik/Rubik-Bold.ttf') format('truetype');
}

@font-face {
  font-family: 'Rubik';
  font-weight: 900;
  src: url('/fonts/Rubik/Rubik-Black.ttf') format('truetype');
}

html {
  font-family: 'Rubik', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.container {
  padding: 0 35px;
}

a {
  text-decoration: none;
  color: black;
}

* {
  font-family: 'Rubik';
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
