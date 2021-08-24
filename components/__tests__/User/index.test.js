import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import User from '@/components/User'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('User', () => {
  let wrapper
  let mutations
  let store
  const removeParticipantMock = jest.fn()

  beforeEach(() => {
    mutations = {
      removeParticipant: removeParticipantMock
    }
    
    store = new Vuex.Store({ mutations })
    wrapper = shallowMount(User, {
      localVue,
      store,
      propsData: {
        user: {
          id: '12',
          givenName: 'John',
          lastName: 'Doe',
          image: {
            filePath: 'pp.jpg'
          }
        },
      },
    })
  })

  describe('methods', () => {
    it('should emitted removeParticipants methods', async () => {
      await wrapper.find('button').trigger('click')
      expect(removeParticipantMock.mock.calls.length).toBe(1)
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
