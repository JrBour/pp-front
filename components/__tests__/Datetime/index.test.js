import { shallowMount } from '@vue/test-utils'
import Datetime from '@/components/Datetime'

describe('Datetime', () => {
  let wrapper
  const mockOnChange = jest.fn()
  beforeEach(() => {
    const div = document.createElement('div')
    div.id = 'root'
    document.body.appendChild(div)

    wrapper = shallowMount(Datetime, {
      attachTo: '#root',
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

  describe('methods', () => {
    it('should change type to datetime-local when focus has happened on datetime input', async () => {
      const input = wrapper.find('input')
      await input.trigger('focus')
      expect(wrapper.vm.type).toBe('datetime-local')
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
