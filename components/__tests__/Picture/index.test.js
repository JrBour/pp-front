import { shallowMount } from '@vue/test-utils'
import Picture from '@/components/Picture'

describe('Picture', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Picture, {
      propsData: {
        media: 'lorem-ipsum',
      },
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
