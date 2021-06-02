import { shallowMount } from '@vue/test-utils'
import BaseButton from '@/components/BaseButton'

describe('BaseButton', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(BaseButton, {
      propsData: {
        text: 'button'
      },
      stubs: {
        Loader: true
      }
    })
  })

  describe('methods', () => {
    it('should emit the method handle-click', async () => {
      const button = wrapper.find('button')
      await button.trigger('click')
      expect(wrapper.emitted('handle-click')).toBeTruthy()
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
