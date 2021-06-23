import { shallowMount } from '@vue/test-utils'
import Expense from '@/components/Expense'

const expenseMock = {
          name: 'Name',
          user: {
            givenName: 'John',
            lastName: 'Doe'
          },
          amount: 12.12,
          createdAt: '12/03/2021'
        }

describe('Expense', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Expense, {
      propsData: {
        expense: expenseMock,
        canRemoveExpense: true
      }
    })
  })

  describe('methods', () => {
    it('should emit remove-expense method when we click on button to remove expense', async () => {
      const button = wrapper.find('button');
      await button.trigger('click');
      expect(wrapper.emitted('remove-expense')).toBeTruthy()
    })
  })

  describe('computed', () => {
    it('should change amount computed method according amount props', async () => {
      expect(wrapper.vm.amount).toBe(12.12)
      await wrapper.setProps({
        expense: {
          ...expenseMock,
          amount: 12
        }
      })
      expect(wrapper.vm.amount).toBe("12.00")

      await wrapper.setProps({
        expense: {
          ...expenseMock,
          amount: 12.1
        }
      })
      expect(wrapper.vm.amount).toBe("12.10")
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
