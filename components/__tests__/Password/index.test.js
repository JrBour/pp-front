import { shallowMount } from '@vue/test-utils'
import { ValidationProvider } from 'vee-validate'
import Password from '@/components/Password'

describe('Password', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Password, {
      propsData: {
        rules: "required",
        onChange: jest.fn(),
        name: 'password',
      },
      stubs: {
        ValidationProvider
      }
    })
  })

  describe('methods', () => {
    it('should change type when we click on image', async () => {
      expect(wrapper.vm.type).toBe('password')
      const image = wrapper.find('img[alt="Eye icon"]')
      await image.trigger('click')
      expect(wrapper.vm.type).toBe('text')
      await image.trigger('click')
      expect(wrapper.vm.type).toBe('password')
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
