import { mount } from '@vue/test-utils'
import BaseInput from '@/components/BaseInput'

describe('BaseInput', () => {
  let wrapper
  beforeEach(() => {
    let spy = jest.fn()

    wrapper = mount(BaseInput, {
      propsData: {
        text: 'Test',
        name: 'test',
        onChange: spy
      }
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
