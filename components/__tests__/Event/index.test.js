import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Event from '@/components/Event'
import User from '@/components/User'
import { 
  propsWrapperParticipantsTest,
  propsWrapperAddressTest,
  propsWrapperTitleTest,
  propsWrapper,
  userEvents
} from './constants/props'

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
        event: propsWrapperParticipantsTest
      })

      expect(wrapper.vm.participants).toStrictEqual(userEvents)
    })
    it('should return address with ellipsis when address length is upper than 30 characters', async () => {
      await wrapper.setProps({
        event: propsWrapperAddressTest
      })
      expect(wrapper.vm.address).toStrictEqual("60 rue de la petite maison a...")
    })
    it('should return title with ellipsis when name is upper than 18 characters', async () => {
      await wrapper.setProps({
        event: propsWrapperTitleTest
      })
      expect(wrapper.vm.title).toStrictEqual("Event name that...")
    })
  })
  describe('methods', () => {
    it('should edit showSettings data', async () => {
      const image = wrapper.find('img')
      await image.trigger('click')
      expect(wrapper.vm.showSettings).toBeTruthy()
    })
    it('should emit remove-event method', async () => {
      const image = wrapper.find('img')
      await image.trigger('click')
      const removeLink = wrapper.findAll('a').at(1)
      await removeLink.trigger('click')
      expect(wrapper.emitted('remove-event')).toBeTruthy()
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
