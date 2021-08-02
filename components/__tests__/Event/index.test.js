import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Event from '@/components/Event'
import User from '@/components/User'

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
        event: {
          id: '12',
          author: {
            id: 12
          },
          cover: 'image name',
          image: {
            filePath: 'gg.png'
          },
          userEvents: [
            {
              user: {
                id: 12
              }
            }
          ],
          name: 'Event name',
          description: 'Lorem ipsum',
          address: '60 rue de',
          zipcode: 90900,
          city: 'Beverly hills',
          startAt: '2013-07-02T09:00:00',
          endAt: '2013-07-02T10:00:00',
          shareFees: true
        }
      }
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
