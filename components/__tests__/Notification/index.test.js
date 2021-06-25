import { shallowMount } from '@vue/test-utils'
import Notification from '@/components/Notification'

const event = {
  id: '12',
  startAt: '12/03/2021',
  name: 'Event name',
  address: '12 rue du gnou',
  city: 'Paris'
}

describe('Notification', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Notification, {
      propsData: {
        event
      }
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
