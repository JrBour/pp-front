import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Event from '@/components/Event'
import User from '@/components/User'
import { propsWrapperTest, propsWrapper, userEvents } from './constants/props'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const routerPush = jest.fn()
const router = new VueRouter()
router.push = routerPush

describe('EventForm', () => {
  let wrapper
  let mutations
  let store
  let state
  let addEventMock = jest.fn();

  beforeEach(() => {
    state = {
      participants: [
        {
          id: '12',
          givenName: 'John',
          lastName: 'Doe',
        }
      ],
      user: {
        id: 12
      }
    }

    mutations = {
      addEvent: addEventMock
    }
    
    store = new Vuex.Store({ state, mutations })

    wrapper = shallowMount(Event, {
      store,
      localVue,
      router,
      data: () => ({
        image: 'https://www.industrialempathy.com/img/remote/ZiClJf-640w.webp'
      }),
      stubs: {
        User,
      },
      propsData: {
        event: propsWrapper
      }
    })
  })

  describe('computed', () => {
    it('should return participants when userEvents array length is lower than 5', async () => {
      await wrapper.setProps({
        event: propsWrapperTest
      })

      expect(wrapper.vm.participants).toStrictEqual(userEvents)
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
