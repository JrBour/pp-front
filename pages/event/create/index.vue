<template>
  <div class="event__wrapper">
    <h1>Nouvel <br />évènement</h1>
    <div class="events__cover">
      <h2>Image de couverture</h2>
      <input
        id="cover"
        type="file"
        name="cover"
        @change="processFile($event)"
      />
      <label for="cover"
        ><img :src="require('~/static/img/icons/upload.svg')" alt="upload"
      /></label>
    </div>
    <div v-if="image" class="events__image_wrapper">
      <img :src="image" class="events__image_display" />
      <button @click="removeCoverPicture">x</button>
    </div>
    <p v-if="errors.picture" class="error">{{ errors.picture }}</p>
    <Input
      id="name"
      text="Nom"
      name="name"
      :error="errors.name"
      :on-change="handleChangeField"
    />
    <Input
      id="description"
      text="Description"
      name="description"
      :error="errors.description"
      :on-change="handleChangeField"
    />
    <h2>Lieu</h2>
    <Input
      id="address"
      text="Adresse"
      name="address"
      :error="errors.address"
      :on-change="handleChangeField"
    />
    <Input
      id="zipcode"
      text="Code postal"
      name="zipcode"
      :error="errors.zipcode"
      :on-change="handleChangeField"
    />
    <Input
      id="city"
      text="Ville"
      name="city"
      :error="errors.city"
      :on-change="handleChangeField"
    />
    <h2>Date</h2>
    <Datetime
      id="start"
      text="Début"
      name="start"
      :error="errors.start"
      :on-change="handleChangeField"
    />
    <Datetime
      id="end"
      text="Fin"
      name="end"
      :error="errors.end"
      :on-change="handleChangeField"
    />
    <div>
      <p>Souhaitez-vous affichez les depenses des participants ?</p>
      <input v-model="showExpense" type="radio" name="no" value="false" />
      <label for="no">Non</label>
      <input v-model="showExpense" type="radio" name="yes" value="true" />
      <label for="yes">Oui</label>
    </div>
    <Button text="Valider" />
  </div>
</template>
<script>
import { validateEventFields } from './validator'
import Button from '~/components/button'
import Input from '~/components/fields/input'
import Datetime from '~/components/fields/datetime'

export default {
  components: {
    Input,
    Button,
    Datetime
  },
  data: () => ({
    name: '',
    description: '',
    address: '',
    zipcode: '',
    city: '',
    start: new Date().toLocaleString(),
    end: new Date().toLocaleString(),
    cover: '',
    image: '',
    showExpense: 'no',
    errors: {
      name: '',
      description: '',
      zipcode: '',
      address: '',
      city: '',
      picture: '',
      start: '',
      end: '',
      general: ''
    }
  }),
  middleware: 'authenticated',
  methods: {
    handleChangeField(name, value) {
      this[name] = value
      this.errors[name] = validateEventFields(name, value)
    },
    removeCoverPicture() {
      this.cover = ''
      this.image = ''
    },
    processFile(event) {
      const extensionsAllowed = ['jpg', 'jpeg', 'png']
      const fileName = event.target.files[0].name.split('.')
      const extension = fileName[fileName.length - 1]

      if (extensionsAllowed.includes(extension)) {
        this.errors.picture = ''
        this.cover = event.target.files[0]
        this.image = URL.createObjectURL(this.cover)
      } else {
        this.errors.picture =
          'Veuillez choisir un fichier avec le bon format (jpeg, jpg ou png)'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.event__wrapper {
  margin-bottom: 10vh;
}
h2 {
  font-weight: 500;
  font-size: 1.3em;
  margin: 3vh 0;
}
input[id='cover'] {
  display: none;
}
.events__image_wrapper {
  position: relative;
  margin: 2vh 0;
  & button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    font-size: 1.5em;
    height: 1.5em;
    width: 1.5em;
    border: none;
    border-radius: 50%;
    background: #ff7374;
  }
}
.events__image_display {
  width: 100%;
}
.events__cover {
  display: flex;
  justify-content: space-between;
  align-items: center;
  & label {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #3750b2;
    border-radius: 5px;
    & img {
      box-sizing: content-box;
      height: 1.8em;
      padding: 0.4em 1.5em;
    }
  }
}
</style>
