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
const regexAlphaFields = ['name', 'city']

export const validateEventFields = (name, value) => {
  if (requiredFields.includes(name) && value === '') {
    return 'Ce champ est requis'
  }
  if (regexAlphaFields.includes(name) && !regexAlpha.test(value)) {
    return "Ce champ n'est pas valide"
  }
}