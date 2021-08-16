import { shallowMount } from '@vue/test-utils'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import UserForm from '@/components/UserForm'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import Password from '@/components/Password'

describe('UserForm', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(UserForm, {
      stubs: {
        Password,
        BaseButton,
        BaseInput,
        ValidationObserver,
        ValidationProvider
      },
      propsData: {
        loading: false,
      },
    })
  })

  describe('computed', () => {
    it('should return false when all fields are filled correctly', async () => {
      await wrapper.setData({
        email: 'john@doe.com',
        firstname: 'John',
        lastname: 'Doe',
        password: 'P4ssword',
        phone: '0123456789',
      })

      expect(wrapper.vm.disabledSubmitButton).toBeFalsy()
    })
    it('should return true when an error is setted', async () => {
      await wrapper.setData({
        email: 'johndoe.com',
        firstname: 'John',
        lastname: 'Doe',
        password: 'P4ssword',
        phone: '0123456789',
        errors: {
          email: 'Invalid format'
        }
      })

      expect(wrapper.vm.disabledSubmitButton).toBeTruthy()
    })
  })

  describe('watch', () => {
    it('should set value to data when user props is not undefined', async () => {
      await wrapper.setProps({
        user: {
          email: 'john@doe.com',
          givenName: 'John',
          lastName: 'Doe',
          phone: '0123456789',
          image: null
        }
      })
      expect(wrapper.vm.email).toBe('john@doe.com')
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
