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
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
