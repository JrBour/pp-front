import { extend } from 'vee-validate'
import { required, email, max, min, numeric, alpha } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'Ce champ est requis'
})

extend('numeric', {
  ...numeric,
  message: 'Veuillez saisir des chiffres'
})

extend('alpha', {
  ...alpha,
  message: 'Veuillez ne saisir que des lettres'
})

extend('min', {
  ...min,
  validate(value, args) {
    return value.length >= args.length
  },
  params: ['length'],
  message: 'Ce champ doit contenir au moins {length} caracteres'
})

extend('max', {
  ...max,
  validate(value, args) {
    return value.length <= args.length
  },
  params: ['length'],
  message: 'Ce champ doit contenir au maximum {length} caracteres'
})

extend('email', {
  ...email,
  message: 'Email invalide'
})
