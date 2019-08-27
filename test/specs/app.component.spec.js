import App from '../../src/app';
import { shallowMount } from '@vue/test-utils';

jest.mock('firebase/app', () => {
  const data = { test: 'test' };
  const snapshot = { val: () => data };
  return {
    initializeApp: jest.fn().mockReturnThis(),
    onAuthStateChanged: jest.fn().mockReturnValue({}),
    signInAnonymously: jest.fn().mockReturnValue(new Promise((resolve) => resolve())),
    database: jest.fn().mockReturnValue({
      ref: jest.fn().mockReturnThis(),
      on: jest.fn(() => Promise.resolve(snapshot)),
      once: jest.fn(() => Promise.resolve(snapshot)),
    }),
    auth: jest.fn().mockReturnThis(),
  };
});

describe('AppComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App);
  });

  beforeEach(() => {
    wrapper.destroy();
  });

  it('component is vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
