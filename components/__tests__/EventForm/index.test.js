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
      data: () => ({
        image: 'https://www.industrialempathy.com/img/remote/ZiClJf-640w.webp'
      }),
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
    it('should return false to disabledSubmitButton methods and return true if errors happened', async () => {
      expect(wrapper.vm.disabledSubmitButton).toBe(true)
      await wrapper.setData({
        name: 'Fake name',
        description: 'Fake description',
        address: 'New address',
        zipcode: 'Zipcode',
        city: 'New city',
      })
      expect(wrapper.vm.disabledSubmitButton).toBe(false)

      await wrapper.setData({
        errors:{
          name: 'an error occured'
        }
      })
      expect(wrapper.vm.disabledSubmitButton).toBe(true)
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

    it('should return an error when end date is lower than start date', async () => {
      expect(wrapper.vm.errors.end).toBe("")
      await wrapper.setData({
        start: '10/12/2020',
        end: '09/12/2020'
      })
      expect(wrapper.vm.errors.end).toBe("La date de fin doit etre superieur a la date de debut de l'evenement")
    })

    it('should called removePicture methods', async () => {
      expect(wrapper.vm.image).toBe("https://www.industrialempathy.com/img/remote/ZiClJf-640w.webp")
      const removePictureButton = wrapper.findAll('button').at(0)
      await removePictureButton.trigger('click')
      expect(wrapper.vm.image).toBe("")
    })

    it('should emit submit-event when form is submitted', async () => {
      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyIjp7ImlkIjoiMTIifX0.MuiVqIrA_30LuCVaFAwEfX8Al1zBdFf3ERSzVyGoRZE',
      });

      await wrapper.setData({
        start: 'Fri, 23 Jul 2021 16:54:32 GMT',
        end: 'Fri, 23 Jul 2021 16:54:30 GMT'
      })
      const form = wrapper.find('form');
      await form.trigger('submit')
      expect(wrapper.emitted('submit-event')).toBeTruthy()
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
