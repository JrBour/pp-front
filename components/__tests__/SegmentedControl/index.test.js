import { shallowMount } from '@vue/test-utils'
import SegmentedControl from '@/components/SegmentedControl'

describe('SegmentedControl', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(SegmentedControl, {
      propsData: {
          first: 'first',
          second: 'second',
      },
    })
  })

  describe('methods', () => {
    it('should emitted removeParticipants methods', async () => {
      await wrapper.findAll('button').at(0).trigger('click')
      expect(wrapper.emitted('get-segment')).toBeTruthy()
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
