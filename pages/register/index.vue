<template>
  <div>
    <h1>Inscription</h1>
    <label for="firstname">Prenom</label>
    <input :value="firstname" type="text" name="firstname" />
    <label for="lastname">Nom</label>
    <input :value="lastname" type="text" name="lastname" />
    <label for="email">Email</label>
    <input :value="email" type="email" name="email" />
    <label for="password">Mot de passe</label>
    <input :value="password" type="password" name="password" />
  </div>
</template>

<script>
export default {
  data: () => ({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  })
}
</script>
