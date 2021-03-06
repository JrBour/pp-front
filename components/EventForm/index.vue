<template>
  <form class="event__wrapper" @submit.prevent="submitEvent">
    <h1>Nouvel <br />évènement</h1>
    <div class="events__cover">
      <h2>Image de couverture</h2>
      <input
        id="cover"
        type="file"
        name="cover"
        @change="processFile($event)"
      />
      <label v-if="displayInputFile" for="cover"
        ><img :src="require('~/static/img/icons/upload.svg')" alt="upload"
      /></label>
    </div>
    <div v-if="image" class="events__image_wrapper">
      <img :src="image" class="events__image_display" />
      <button @click="removeCoverPicture">x</button>
    </div>
    <p v-if="errors.picture" class="error">{{ errors.picture }}</p>
    <BaseInput
      id="name"
      :default-value="name"
      text="Nom"
      name="name"
      rules="required"
      :error="errors.name"
      :on-change="handleChangeField"
    />
    <BaseInput
      id="description"
      text="Description"
      name="description"
      :default-value="description"
      :error="errors.description"
      rules="required|max:255"
      :on-change="handleChangeField"
    />
    <h2>Lieu</h2>
    <BaseInput
      id="address"
      text="Adresse"
      name="address|max:255"
      :default-value="address"
      :error="errors.address"
      :on-change="handleChangeField"
    />
    <BaseInput
      id="zipcode"
      text="Code postal"
      name="zipcode"
      :default-value="zipcode"
      rules="required|max:5|numeric"
      :error="errors.zipcode"
      :on-change="handleChangeField"
    />
    <BaseInput
      id="city"
      text="Ville"
      name="city"
      rules="required|max:255"
      :default-value="city"
      :error="errors.city"
      :on-change="handleChangeField"
    />
    <h2>Date</h2>
    <Datetime
      id="start"
      text="Début"
      name="start"
      :default-value="start"
      :error="errors.start"
      :on-change="handleChangeField"
    />
    <Datetime
      id="end"
      text="Fin"
      name="end"
      :default-value="end"
      :error="errors.end"
      :on-change="handleChangeField"
    />
    <h2>Participants</h2>
    <p
      v-if="$store.state.participants.length === 0"
      class="events__participants_warning"
    >
      Vous n'avez pas encore ajoute de participants
    </p>
    <div v-else class="events__participants">
      <User
        v-for="participant in $store.state.participants"
        :key="participant.id"
        :user="participant"
      />
    </div>
    <BaseButton
      text="Ajouter des participants"
      :small="true"
      @handle-click="addParticipants"
    />
    <div>
      <p class="events__expense_question">
        Souhaitez-vous affichez les depenses des participants ?
      </p>
      <div class="events__expense">
        <div>
          <label for="no" class="events__expense_label"
            >Non
            <input id="no" v-model="showExpense" type="radio" value="no" />
            <span></span>
          </label>
        </div>
        <div>
          <label for="yes" class="events__expense_label"
            >Oui
            <input id="yes" v-model="showExpense" type="radio" value="yes" />
            <span></span>
          </label>
        </div>
      </div>
    </div>
    <p v-if="generalError">{{ generalError }}</p>
    <BaseButton
      text="Valider"
      type="submit"
      :loading="loading"
      :disabled="disabledSubmitButton"
    />
  </form>
</template>
<script>
import Cookies from 'js-cookie'
import { validateEventFields } from './validator'
import parseJwt from '~/utils/token'

export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    generalError: {
      type: String,
      required: true
    },
    event: {
      type: Object,
      default: null
    }
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
    displayInputFile: true,
    baseUrl: process.env.NUXT_ENV_API_URL,
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
  computed: {
    disabledSubmitButton() {
      if (
        this.name.length === 0 ||
        this.description.length === 0 ||
        this.address.length === 0 ||
        this.zipcode.length === 0 ||
        this.city.length === 0
      ) {
        return true
      }

      // const startDate = new Date(this.start.split(',').join(''))
      // const endDate = new Date(this.end.split(',').join(''))
      // const nowDate = new Date()

      // if (
      //   startDate.getMonth() === nowDate.getMonth() &&
      //   startDate.getDate() === nowDate.getDate() &&
      //   startDate.getFullYear() === nowDate.getFullYear()
      // ) {
      //   return true
      // }

      // if (
      //   endDate.getMonth() === nowDate.getMonth() &&
      //   endDate.getDate() === nowDate.getDate() &&
      //   endDate.getFullYear() === nowDate.getFullYear()
      // ) {
      //   return true
      // }

      const errorsToCheck = { ...this.errors }
      delete errorsToCheck.general
      const checkError = Object.values(errorsToCheck).some(
        (value) => value !== ''
      )
      if (checkError) {
        return true
      }
      return false
    }
  },
  watch: {
    end(val) {
      if (
        this.end !== '' &&
        this.start !== '' &&
        new Date(this.start).getTime() >= new Date(this.end).getTime()
      ) {
        this.errors.end =
          "La date de fin doit etre superieur a la date de debut de l'evenement"
      }
    },
    event(val) {
      if (val.image !== '' && val.cover !== '') {
        this.cover = new File([this.cover], this.image)
        this.image = val.image
          ? typeof val.image === 'object'
            ? `${this.baseUrl}/media/${val.image.filePath}`
            : val.image
          : null
      }

      this.name = val.name
      this.description = val.description
      this.address = val.address
      this.zipcode = val.zipcode.toString()
      this.city = val.city
      this.start = val.startAt.includes('T')
        ? val.startAt
        : new Date().toLocaleString()
      this.end = val.endAt.includes('T')
        ? val.endAt
        : new Date().toLocaleString()
      this.showExpense =
        val.shareFees !== undefined
          ? val.shareFees
            ? 'yes'
            : 'no'
          : val.showExpense
    }
  },
  middleware: 'authenticated',
  methods: {
    addParticipants() {
      const event = {
        name: this.name,
        description: this.description,
        address: this.address,
        zipcode: this.zipcode.toString(),
        city: this.city,
        startAt: this.start,
        endAt: this.end,
        cover: new File([this.cover], this.image),
        image: this.image,
        showExpense: this.showExpense
      }
      this.$store.commit('addEvent', event)

      this.$router.push({ name: 'event-search-participants' })
    },
    submitEvent(e) {
      const token = Cookies.get('token')
      const event = {
        name: this.name,
        description: this.description,
        address: this.address,
        city: this.city,
        cover: this.cover,
        zipcode: parseInt(this.zipcode, 10),
        startAt: new Date(this.start).toISOString(),
        endAt: new Date(this.end).toISOString(),
        shareFees: this.showExpense === 'yes',
        image: this.image,
        author: `api/users/${parseJwt(token).user.id}`
      }
      this.$emit('submit-event', event)
    },
    handleChangeField(name, value) {
      this[name] = value
      this.errors[name] = validateEventFields(name, value)
    },
    removeCoverPicture() {
      this.cover = ''
      this.image = ''
      this.displayInputFile = false
      this.$nextTick(() => (this.displayInputFile = true))
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
.events__participants_warning {
  text-align: center;
}
.events__participants {
  display: flex;
  flex-wrap: wrap;
}
.event__wrapper {
  margin-bottom: 10vh;
}
h2 {
  font-weight: 500;
  font-size: 1.3em;
  margin: 3.5vh 0;
  margin-left: -2vh;
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
.events__expense {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  margin-top: 3vh;
  width: 60%;
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    & label {
      margin-right: 1vh;
    }
  }
}

.events__expense_question {
  font-size: 1.2em;
}

.events__expense_label {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  font-size: 1.1em;
  user-select: none;

  &:hover input ~ span {
    background-color: #ccc;
  }

  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    &:checked ~ span {
      background-color: #3750b2;
    }

    &:checked ~ span:after {
      display: block;
    }
  }

  &::after {
    content: '';
    position: absolute;
    display: none;
  }
}

.events__expense_label span {
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: #eee;
  border-radius: 50%;

  &::after {
    content: '';
    position: absolute;
    display: none;
    top: 7px;
    left: 7px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.events__image_display {
  width: 100%;
  margin-bottom: 2vh;
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
