<template>
  <div>
    <h1>Connexion</h1>
    <div>
      <label for="mail">E-mail</label>
      <input :value="email" type="email" name="mail" />
      <label for="password">Mot de passe</label>
      <input :value="password" type="password" name="password" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: ''
  })
}
</script>
