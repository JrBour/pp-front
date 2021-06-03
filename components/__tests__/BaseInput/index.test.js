import { shallowMount } from '@vue/test-utils'
import { ValidationProvider } from 'vee-validate'
import BaseInput from '@/components/BaseInput'

describe('BaseInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(BaseInput, {
      propsData: {
        text: 'Field',
        name: 'name',
        onChange: jest.fn(),
        defaultValue: 'test',
        error: ''
      },
      stubs: {
        Loader: true,
        ValidationProvider
      }
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
