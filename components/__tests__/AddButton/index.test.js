import { shallowMount } from '@vue/test-utils'
import AddButton from '@/components/AddButton'

describe('BaseInput', () => {
  let wrapper
  const mockOnChange = jest.fn();
  beforeEach(() => {
    wrapper = shallowMount(AddButton, {
      propsData: {
        text: 'Submit',
      },
    })
  })

  describe('methods', () => {
    it('should emit handle-click method', async () => {
      const button = wrapper.find('button')
      await button.trigger('click');
      expect(wrapper.emitted('handle-click')).toBeTruthy();
   })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
