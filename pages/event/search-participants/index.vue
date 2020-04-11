<template>
  <div class="search">
    <img :src="require('~/static/img/icons/back.svg')" alt="back" />
    <SegmentedControl
      first="Recherche"
      second="Invités"
      @get-segment="changeStatus"
    />
    <div v-if="status === 'Recherche'">
      <Input
        id="search"
        type="search"
        text="Rechercher par prenom et nom"
        name="search"
        :error="errors.search"
        :on-change="handleChangeField"
        :small="true"
        :required="false"
      />
    </div>
    <div v-else>
      <p
        v-if="$store.state.participants.length === 0"
        class="participants__warning"
      >
        Vous n'avez pas encore ajoute de participants
      </p>
    </div>
  </div>
</template>
<script>
import Input from '~/components/fields/input'
import SegmentedControl from '~/components/segmentedControl'
import axiosHelper from '~/lib/axiosHelper'

export default {
  components: {
    Input,
    SegmentedControl
  },
  data: () => ({
    search: '',
    status: 'Recherche',
    errors: {
      search: ''
    }
  }),
  middleware: 'authenticated',
  methods: {
    changeStatus(status) {
      this.status = status
    },
    async handleChangeField(name, value) {
      this[name] = value
      const valueHasSpace = value.split(' ')
      if (value.length > 3 && valueHasSpace.length > 1) {
        try {
          await axiosHelper({
            path: `users?givenName=${valueHasSpace[0]}&lastName=${valueHasSpace[1]}`
          })
        } catch (e) {
          this.errors.general =
            'Une erreur est survenur, veuillez reessayer plus tard'
        }
      } else if (value.length > 3) {
        try {
          await axiosHelper({
            path: `users?givenName=${value}`
          })
        } catch (e) {
          this.errors.general =
            'Une erreur est survenur, veuillez reessayer plus tard'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  margin-top: 10vh;
}
</style>
