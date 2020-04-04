const requiredFields = ['firstname', 'lastname', 'email', 'phone', 'password']
const regexAlphaFields = ['firstname', 'lastname']
const regexAlpha = /^([a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ']+([ ]{0,1}|[-]{0,1}))*[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ']+$/
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regexPhoneNumber = /^(0[1-9]\d{8})?$/

export const validateRegisterField = (name, value) => {
  if (requiredFields.includes(name) && value === '') {
    return 'Ce champ est requis'
  }
  if (regexAlphaFields.includes(name) && !regexAlpha.test(value)) {
    return "Ce champ n'est pas valide"
  }
  if (name === 'phone' && !regexPhoneNumber.test(value)) {
    return "Le numero de telephone n'est pas valide"
  }
  if (name === 'email' && !regexEmail.test(value)) {
    return "L'adresse e-mail n'est pas valide"
  }
  if (name === 'password' && value.length <= 8) {
    return 'Le mot de passe doit contenir au moins 8 caracteres'
  }

  return ''
}
