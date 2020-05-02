import { regexEmail } from '~/constants/regex'

const requiredFields = ['email', 'password']

const validateLoginField = (name, value) => {
  if (requiredFields.includes(name) && value === '') {
    return 'Ce champ est requis'
  }
  if (name === 'email' && !regexEmail.test(value)) {
    return "L'adresse e-mail n'est pas valide"
  }

  return ''
}

export default validateLoginField
