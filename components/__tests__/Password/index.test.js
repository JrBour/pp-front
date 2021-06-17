import { shallowMount } from '@vue/test-utils'
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
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
