/**
* @jest-environment jsdom
*/

import { renderLogin } from '../../src/components/login';
// import { navigateTo } from '../../src/main'

jest.mock('../../src/lib/auth', () => ({
  loginFunction: jest.fn((email, password) => {
    if (email === 'mochilerxs@gmail.com' && password === '123456') {
      return Promise.resolve();
    }
    return Promise.reject();
  }),
  accountGoogle: jest.fn(() => Promise.resolve()),
  googlePersistanceFunction: jest.fn(() => Promise.resolve()),
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
  it('cuando se hace click en el botón ingresar y no cumple los requerimientos para login, muestra los errores correspondientes', () => {
    const DOM = document.createElement('div');
    const navigateToMock = jest.fn();
    DOM.append(renderLogin(navigateToMock));
    const emailInput = DOM.querySelector('#inputUsername');
    const passwordInput = DOM.querySelector('#inputPassword');
    const loginButton = DOM.querySelector('#login');
    loginButton.click();
    const errorSpan = DOM.querySelector('.span-login');
    if (emailInput.value === 'mochilerxs'
    && passwordInput.value === '') {
      expect(errorSpan).toBe('Correo invalido');
    } else if (emailInput.value === 'g@gmail.com'
    && passwordInput.value === '123456') {
      expect(errorSpan).toBe('Datos incorrectos, revisa tu correo y contraseña');
    }
  });
  it('cuando se hace click en el botón de google nos lleva a la url de feed', (done) => {
    const DOM = document.createElement('div');
    const navigateToMock = jest.fn();
    DOM.append(renderLogin(navigateToMock));
    const createAccountButton = DOM.querySelector('#login-google');
    createAccountButton.click();
    setTimeout(() => {
      expect(navigateToMock).toHaveBeenLastCalledWith('/feed');
      done();
    });
  });
});
