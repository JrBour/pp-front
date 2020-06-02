<template>
  <h1>Petit test</h1>
</template>

<script>
export default {
  data: () => ({
    clientId: process.env.NUXT_ENV_GOOGLE_CLIENT_ID
  }),
  beforeMount() {
    this.oauthSignIn()
  },
  methods: {
    oauthSignIn() {
      // Google's OAuth 2.0 endpoint for requesting an access token
      const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'

      // Create <form> element to submit parameters to OAuth 2.0 endpoint.
      const form = document.createElement('form')
      form.setAttribute('method', 'GET') // Send as a GET request.
      form.setAttribute('action', oauth2Endpoint)

      // Parameters to pass to OAuth 2.0 endpoint.
      const params = {
        client_id: this.clientId,
        redirect_uri: 'http://localhost:3000/login',
        response_type: 'token',
        scope: 'https://www.googleapis.com/auth/calendar.events',
        include_granted_scopes: 'true',
        state: 'pass-through value'
      }

      // Add form parameters as hidden input values.
      for (const p in params) {
        const input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', p)
        input.setAttribute('value', params[p])
        form.appendChild(input)
      }

      // Add form to page and submit it to open the OAuth 2.0 endpoint.
      document.body.appendChild(form)
      form.submit()
    }
  }
}
</script>

<style></style>
