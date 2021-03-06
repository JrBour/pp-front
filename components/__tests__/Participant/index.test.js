import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Participant from '@/components/Participant'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Participant', () => {
  let wrapper
  let store
  let state

  beforeEach(() => {
    state = {
      participants: [
        {
          id: '2'
        }
      ]
    }
    store = new Vuex.Store({ state })
    wrapper = shallowMount(Participant, {
      localVue,
      store,
      propsData: {
        user: {
          givenName: 'John',
          lastName: 'Doe',
          id: '1'
        },
        displayAddButton: true
      },
    })
  })

  describe('methods', () => {
    it('should emit add-participant method', async () => {
      const addButton = wrapper.find('button')
      await addButton.trigger('click')
      expect(wrapper.emitted('add-participant')).toBeTruthy()
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
