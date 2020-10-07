const regexPhoneNumber = /^(0[1-9]\d{8})?$/

const validateRegisterField = (name, value) => {
  if (name === 'phone' && !regexPhoneNumber.test(value)) {
    return "Le numéro de téléphone n'est pas valide"
  }
  return ''
}

export default validateRegisterField
