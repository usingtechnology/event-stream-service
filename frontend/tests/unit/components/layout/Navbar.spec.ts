import { createTestingPinia } from '@pinia/testing';
import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils';

import Navbar from '@/components/layout/Navbar.vue';
import { StorageKey } from '@/utils/constants';
import PrimeVue from 'primevue/config';

beforeEach(() => {
  sessionStorage.setItem(
    StorageKey.CONFIG,
    JSON.stringify({
      oidc: {
        authority: 'abc',
        clientId: '123'
      }
    })
  );

  vi.clearAllMocks();
});

afterEach(() => {
  sessionStorage.clear();
});

describe('Navbar.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [createTestingPinia(), PrimeVue],
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });
    expect(wrapper).toBeTruthy();
  });

  describe('isAuthenticated', () => {
    it('shows correct navbar when true', () => {
      const wrapper = mount(Navbar, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                auth: { isAuthenticated: true }
              }
            }),
            PrimeVue
          ],
          stubs: {
            RouterLink: RouterLinkStub
          }
        }
      });
      const linkEle = wrapper.findAll('a');
      expect(linkEle).toHaveLength(2);
      expect(linkEle[0].text()).toBe('Home');
      expect(linkEle[1].text()).toBe('Generate Credentials');
    });

    it('shows correct navbar when false', async () => {
      const wrapper = mount(Navbar, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                auth: { isAuthenticated: false }
              }
            }),
            PrimeVue
          ],
          stubs: {
            RouterLink: RouterLinkStub
          }
        }
      });
      const linkEle = wrapper.findAll('a');
      expect(linkEle).toHaveLength(1);
      expect(linkEle[0].text()).toBe('Home');
    });
  });
});
