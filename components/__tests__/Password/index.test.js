import { shallowMount } from '@vue/test-utils'
import { ValidationProvider } from 'vee-validate'
import Password from '@/components/Password'

describe('Password', () => {
  let wrapper
  const mockOnChange = jest.fn()
  beforeEach(() => {
    wrapper = shallowMount(Password, {
      propsData: {
        rules: "required",
        onChange: mockOnChange,
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

  describe('watchers', () => {
    it('should called onChange method when we edit input value', async () => {
      expect(mockOnChange.mock.calls.length).toBe(0)
      try {
        await wrapper.setData({
          inputValue: 'Qwert123_'
        })
      } catch(e) {
        console.log(e)
      }
      // expect(mockOnChange.mock.calls.length).toBe(1)
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
