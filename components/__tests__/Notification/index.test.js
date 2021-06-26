import { shallowMount } from '@vue/test-utils'
import Notification from '@/components/Notification'

const event = {
  id: '12',
  startAt: '12/03/2021',
  name: 'Event name Lorem ipsum Lorem ipsum',
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

  describe('method', () => {
    it('should emit submit-response method', async () => {
      const acceptButton = wrapper.findAll('button').at(0)
      await acceptButton.trigger('click')
      expect(wrapper.emitted('submit-response')).toBeTruthy()
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
