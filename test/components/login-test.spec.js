/**
 * @jest-environment jsdom
 */

import { renderLogin } from '../../src/components/login';
// import { navigateTo } from '../../src/main'

jest.mock('../../src/lib/auth', () => ({
  loginFunction: jest.fn(() => Promise.resolve()),
  accountGoogle: jest.fn(() => Promise.resolve()),
}));

describe('renderLogin', () => {
  it('debería ser una función', () => {
    expect(typeof renderLogin).toBe('function');
  });
  it('tiene un botón para crear cuenta', () => {
    const DOM = document.createElement('div');
    DOM.append(renderLogin());
    const haveCreateButton = DOM.querySelector('#login');
    expect(haveCreateButton).not.toBe(undefined);
  });
  it('cuando se hace click en el botón crear cuenta nos lleva a la url de signin', () => {
    const DOM = document.createElement('div');
    const navigateToMock = jest.fn();
    DOM.append(renderLogin(navigateToMock));
    const createAccountButton = DOM.querySelector('#account');
    createAccountButton.click();
    expect(navigateToMock).toHaveBeenLastCalledWith('/signin');
  });
  it('cuando se hace click en el botón ingresar nos lleva a la url de feed', (done) => {
    const DOM = document.createElement('div');
    const navigateToMock = jest.fn();
    DOM.append(renderLogin(navigateToMock));
    const emailInput = DOM.querySelector('#inputUsername');
    const passwordInput = DOM.querySelector('#inputPassword');
    emailInput.value = 'mochilerxs@gmail.com';
    passwordInput.value = '123456';
    const loginButton = DOM.querySelector('#login');
    loginButton.click();
    setTimeout(() => {
      expect(navigateToMock).toHaveBeenLastCalledWith('/feed');
      done();
    });
  });
  

  it('cuando se hace click en el botón de google nos lleva a la url de feed', () => {
    const DOM = document.createElement('div');
    const navigateToMock = jest.fn();
    DOM.append(renderLogin(navigateToMock));
    const createAccountButton = DOM.querySelector('#login-google');
    createAccountButton.click();
    expect(navigateToMock).toHaveBeenLastCalledWith('/feed');
  });
});
