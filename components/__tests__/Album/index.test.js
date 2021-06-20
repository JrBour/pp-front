import { shallowMount } from '@vue/test-utils'
import Album from '@/components/Album'


describe('Participant', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Album, {
      propsData: {
        id: 1,
        media: 'media.jpg',
        title: 'Media',
        number: 2
      }
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
