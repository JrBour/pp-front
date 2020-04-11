import { regexAlpha } from '~/constants/regex'

const requiredFields = [
  'name',
  'description',
  'address',
  'zipcode',
  'city',
  'start',
  'end'
]

const dateFields = ['start', 'end']
const regexAlphaFields = ['name', 'city']

export const validateEventFields = (name, value) => {
  if (requiredFields.includes(name) && value === '') {
    return 'Ce champ est requis'
  }
  if (regexAlphaFields.includes(name) && !regexAlpha.test(value)) {
    return "Ce champ n'est pas valide"
  }
  if (name === 'zipcode' && value.length !== 5) {
    return "Le code postal n'est pas valide"
  }
  if (
    dateFields.includes(name) &&
    new Date(value).getTime() < new Date().getTime()
  ) {
    return 'Un evenement ne peut pas etre cree pour le passe'
  }

  return ''
}
