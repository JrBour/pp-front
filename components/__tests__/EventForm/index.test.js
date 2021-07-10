import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { ValidationProvider } from 'vee-validate'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import Datetime from '@/components/Datetime'
import EventForm from '@/components/EventForm'
import Loader from '@/components/Loader'
import User from '@/components/User'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('EventForm', () => {
  let wrapper
  let store
  let state

  beforeEach(() => {
    state = {
      participants: [
        {
          id: '12',
          givenName: 'John',
          lastName: 'Doe',
        }
      ]
    }
    store = new Vuex.Store({ state })

    wrapper = shallowMount(EventForm, {
      store,
      localVue,
      stubs: {
        Datetime,
        BaseButton,
        BaseInput,
        User,
        Loader,
        ValidationProvider
      },
      propsData: {
        loading: true,
        generalError: ""
      }
    })
  })

  describe('computed', () => {
    it('should return false to disabledSubmitButton methods', async () => {
      expect(wrapper.vm.disabledSubmitButton).toBe(true)
      await wrapper.setData({
        name: 'Fake name',
        description: 'Fake description',
        address: 'New address',
        zipcode: 'Zipcode',
        city: 'New city',
      })
      expect(wrapper.vm.disabledSubmitButton).toBe(false)
    })

    it('should return true to disabledSubmitButton methods when error are occured', async () => {
      expect(wrapper.vm.disabledSubmitButton).toBe(true)
      await wrapper.setData({
        errors: {
          name: 'An error occured'
        }
      })
      expect(wrapper.vm.disabledSubmitButton).toBe(true)
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
