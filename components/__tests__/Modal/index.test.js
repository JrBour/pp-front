import { shallowMount } from '@vue/test-utils'
import Modal from '@/components/Modal'

describe('Modal', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Modal, {
      propsData: {
        text: 'Lorem ipsum',
      },
    })
  })

  describe('methods', () => {
    it('should emit cancel method', async () => {
      const cancelButton = wrapper.find('button.modal__action_cancel')
      await cancelButton.trigger('click')
      expect(wrapper.emitted('cancel')).toBeTruthy()
    })
     it('should emit confirm method', async () => {
      const confirmButton = wrapper.find('button.modal__action_confirm')
      await confirmButton.trigger('click')
      expect(wrapper.emitted('confirm')).toBeTruthy()
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
