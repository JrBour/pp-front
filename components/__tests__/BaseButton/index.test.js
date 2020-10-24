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

  // describe('methods', () => {
  //   it('should emit the method on-click', async () => {
  //     const button = wrapper.find('button')
  //     await button.trigger('click')
  //     expect(wrapper.emitted('on-click')).toBeTruthy()
  //   })
  //   it('should change the return of the computed method for button with primary theme', () => {
  //     wrapper.setData({ hover: true })
  //     expect(wrapper.vm.colorArrow).toBe('blue')
  //     wrapper.setData({ hover: false })
  //     expect(wrapper.vm.colorArrow).toBe('white')
  //     wrapper.setProps({ disabled: true })
  //     expect(wrapper.vm.colorArrow).toBe('gray')
  //   })
  //   it('should change the return of the computed method for button with secondary theme', () => {
  //     wrapper.setProps({ theme: 'secondary' })
  //     wrapper.setData({ hover: true })
  //     expect(wrapper.vm.colorArrow).toBe('white')
  //     wrapper.setData({ hover: false })
  //     expect(wrapper.vm.colorArrow).toBe('blue')
  //   })
  // })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
