import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Navbar from '@/components/Navbar'

const localVue = createLocalVue();
localVue.use(Vuex)

describe('Navbar', () => {
  let wrapper
  let store
  let state

  beforeEach(() => {
    state = {
      notifications: [
        {
          isRead: false
        }
      ]
    }
    store = new Vuex.Store({ state })
    wrapper = shallowMount(Navbar, {
      store,
      localVue,
      mocks: {
          $router: {
            push: jest.fn(),
            history: {
              current: {
                path: 'cc'
              }
            }
          }
      },
    })
  })

  describe('computed', () => {
    it('should return 0 when all notification are read', () => {
      store = new Vuex.Store({ })
      wrapper = shallowMount(Navbar, {
        store,
        localVue,
        mocks: {
            $router: {
              push: jest.fn(),
              history: {
                current: {
                  path: 'cc'
                }
              }
            }
        },
      })
      expect(wrapper.vm.notifications).toBe(0)
    })
  })

  describe('snapshot', () => {
    it('renders properly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
