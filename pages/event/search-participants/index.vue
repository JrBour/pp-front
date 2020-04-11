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
        text="Rechercher par nom ou/et prenom"
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
      console.log(status)
      this.status = status
    },
    handleChangeField(name, value) {
      this[name] = value
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  margin-top: 10vh;
}
</style>
