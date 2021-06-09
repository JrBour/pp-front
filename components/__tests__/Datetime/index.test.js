import { shallowMount } from '@vue/test-utils'
import Datetime from '@/components/Datetime'

describe('Datetime', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Datetime, {
      propsData: {
        text: 'Lorem ipsum',
        id: 'id',
        name: 'name',
        error: '',
        onChange: jest.fn(),
      },
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
