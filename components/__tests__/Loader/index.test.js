import { shallowMount } from '@vue/test-utils'
import Loader from '@/components/Loader'

describe('Loader', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Loader, {
      propsData: {
        height: '140px',
      },
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
