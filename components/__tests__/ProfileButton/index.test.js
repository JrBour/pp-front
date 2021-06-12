import { shallowMount } from '@vue/test-utils'
import ProfileButton from '@/components/ProfileButton'

describe('ProfileButton', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(ProfileButton, {
      propsData: {
        icon: 'lock',
        text: 'Edit password'
      },
    })
  })

  describe('methods', () => {
    it('should emit handle-click when we click on button', async () => {
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
