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

  describe('methods', () => {
    it('should reset profile picture value when removeProfilePicture methods is called', async () => {
      await wrapper.setData({
        profile: 'test',
        image: 'http://localhost/image.png' 
      })
      await wrapper.find('button.register__button_remove').trigger('click')
      expect(wrapper.vm.profile).toBe('')
      expect(wrapper.vm.image).toBe('')
    })
    it('should submit form', async () => {
      await wrapper.setData({
        email: 'john@doe.com',
        firstname: 'John',
        lastname: 'Doe',
        password: 'P4ssword',
        phone: '0123456789',
      })
      await wrapper.find('form').trigger('submit')
      expect(wrapper.emitted('submit-form')).toBeTruthy()
    })

    it('should set data when processFile method is called and extension file is correct', async () => {
      const event = {
        target: {
          files: [{
            name: 'coucou.jpg'
          }]
        }
      }
      global.URL.createObjectURL = jest.fn();
      wrapper.vm.processFile(event);

      expect(wrapper.vm.profile.name).toBe('coucou.jpg')
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
