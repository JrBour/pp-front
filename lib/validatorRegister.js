import { regexAlpha, regexPhoneNumber, regexEmail } from '~/constants/regex'

const requiredFields = ['firstname', 'lastname', 'email', 'phone', 'password']
const regexAlphaFields = ['firstname', 'lastname']

const validateRegisterField = (name, value) => {
  if (requiredFields.includes(name) && value === '') {
    return 'Ce champ est requis'
  }
  if (regexAlphaFields.includes(name) && !regexAlpha.test(value)) {
    return "Ce champ n'est pas valide"
  }
  if (name === 'phone' && !regexPhoneNumber.test(value)) {
    return "Le numéro de téléphone n'est pas valide"
  }
  if (name === 'email' && !regexEmail.test(value)) {
    return "L'adresse e-mail n'est pas valide"
  }
  if (name === 'password' && value.length <= 8) {
    return 'Le mot de passe doit contenir au moins 8 caractères'
  }

  return ''
}

export default validateRegisterField
