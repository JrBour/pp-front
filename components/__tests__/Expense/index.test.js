import { shallowMount } from '@vue/test-utils'
import Expense from '@/components/Expense'

describe('Expense', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Expense, {
      propsData: {
        expense: {
          name: 'Name',
          user: {
            givenName: 'John',
            lastName: 'Doe'
          },
          amount: 12.12,
          createdAt: '12/03/2021'
        },
        canRemoveExpense: true
      }
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
