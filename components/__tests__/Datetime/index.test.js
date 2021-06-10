import { shallowMount } from '@vue/test-utils'
import Datetime from '@/components/Datetime'

describe('Datetime', () => {
  let wrapper
  const mockOnChange = jest.fn()
  beforeEach(() => {
    wrapper = shallowMount(Datetime, {
      propsData: {
        text: 'Lorem ipsum',
        id: 'id',
        name: 'name',
        error: '',
        onChange: mockOnChange,
        defaultValue: '12/12/2020'
      },
    })
  })

  describe('watcher', () => {
    it('should call onChange method when we edit value', async () => {
      await wrapper.setData({
        inputValue: '22/12/12'
      })
      expect(mockOnChange.mock.calls.length).toBe(1)
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
