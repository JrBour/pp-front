const dateFields = ['start', 'end']

export const validateEventFields = (name, value) => {
  if (
    dateFields.includes(name) &&
    new Date(value).getTime() < new Date().getTime()
  ) {
    return 'Un evenement ne peut pas etre cree pour le passe'
  }

  return ''
}
