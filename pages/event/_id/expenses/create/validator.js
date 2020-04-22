const requiredFields = ['title', 'amount']
const regexFloat = /^\d+(\.\d{1,2})?$/

export const validateExpenseField = (name, value) => {
  if (requiredFields.includes(name) && value === '') {
    return 'Ce champ est requis'
  }

  if (name === 'amount' && !regexFloat.test(value)) {
    return "Ce champ n'est pas valide"
  }

  return ''
}
