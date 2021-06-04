import { shallowMount } from '@vue/test-utils'
import { ValidationProvider } from 'vee-validate'
import BaseInput from '@/components/BaseInput'

describe('BaseInput', () => {
  let wrapper
  const mockOnChange = jest.fn();
  beforeEach(() => {
    wrapper = shallowMount(BaseInput, {
      propsData: {
        text: 'Field',
        name: 'name',
        onChange: mockOnChange,
        defaultValue: 'test',
        error: ''
      },
      stubs: {
        Loader: true,
        ValidationProvider
      }
    })
  })

  describe('watcher', () => {
    it('should call onChange method when inputValue is edit', async () => {
      await wrapper.setData({
        inputValue: 'Test'
      })
      expect(mockOnChange.mock.calls.length).toBe(1)
    })
    it('should edit inputValue value when defaultValue is edit', async () => {
      await wrapper.setProps({
        defaultValue: 'testtttt'
      })
      expect(wrapper.vm.inputValue).toBe('testtttt')
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
